const ANALYTICS_ENDPOINT = process.env.REACT_APP_ANALYTICS_ENDPOINT;
const SESSION_STORAGE_KEY = 'portfolio_analytics_session';
const VISITOR_STORAGE_KEY = 'portfolio_analytics_visitor';
const UTM_STORAGE_KEY = 'portfolio_analytics_utm';
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;
const MAX_TEXT_LENGTH = 160;

type EventDetails = Partial<{
    page: string;
    url: string;
    element_type: string;
    element_text: string;
    element_id: string;
    element_class: string;
    destination: string;
}>;

type AnalyticsPayload = {
    event: string;
    session_id: string;
    visitor_id: string;
    page: string;
    url: string;
    referrer: string;
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_content: string;
    element_type: string;
    element_text: string;
    element_id: string;
    element_class: string;
    destination: string;
    screen_width: string;
    screen_height: string;
    user_agent: string;
};

type StoredSession = { id: string; lastActivity: number };
type StoredUtm = Record<'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_content', string>;

let lastPageViewKey = '';

const emptyUtm: StoredUtm = {
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
};

const getStorage = (type: 'local' | 'session'): Storage | null => {
    try {
        return type === 'local' ? window.localStorage : window.sessionStorage;
    } catch {
        return null;
    }
};

const createId = () => {
    try {
        if (window.crypto?.randomUUID) {
            return window.crypto.randomUUID();
        }
    } catch {}
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
};

const readJson = <T,>(storage: Storage | null, key: string): T | null => {
    if (!storage) return null;
    try {
        const value = storage.getItem(key);
        return value ? JSON.parse(value) as T : null;
    } catch {
        return null;
    }
};

const writeJson = (storage: Storage | null, key: string, value: unknown) => {
    try {
        storage?.setItem(key, JSON.stringify(value));
    } catch {}
};

const getVisitorId = () => {
    const storage = getStorage('local');
    const storedVisitorId = storage?.getItem(VISITOR_STORAGE_KEY);
    if (storedVisitorId) return storedVisitorId;
    const visitorId = createId();
    try {
        storage?.setItem(VISITOR_STORAGE_KEY, visitorId);
    } catch {}
    return visitorId;
};

const getSessionId = () => {
    const storage = getStorage('session');
    const now = Date.now();
    const storedSession = readJson<StoredSession>(storage, SESSION_STORAGE_KEY);
    const session = storedSession && now - storedSession.lastActivity < SESSION_TIMEOUT_MS
        ? storedSession
        : { id: createId(), lastActivity: now };
    writeJson(storage, SESSION_STORAGE_KEY, { ...session, lastActivity: now });
    return session.id;
};

const getUtm = (): StoredUtm => {
    const storage = getStorage('session');
    const storedUtm = readJson<Partial<StoredUtm>>(storage, UTM_STORAGE_KEY);
    const currentParams = new URLSearchParams(window.location.search);
    const currentUtm = Object.keys(emptyUtm).reduce((values, key) => {
        const value = currentParams.get(key);
        values[key as keyof StoredUtm] = value ? value.slice(0, MAX_TEXT_LENGTH) : '';
        return values;
    }, { ...emptyUtm });
    const hasCurrentUtm = Object.values(currentUtm).some(Boolean);
    if (hasCurrentUtm) {
        writeJson(storage, UTM_STORAGE_KEY, currentUtm);
        return currentUtm;
    }
    return { ...emptyUtm, ...storedUtm };
};

const cleanText = (value: string | null | undefined) => (value || '').replace(/\s+/g, ' ').trim().slice(0, MAX_TEXT_LENGTH);

const getPayload = (event: string, details: EventDetails = {}): AnalyticsPayload => {
    const utm = getUtm();
    return {
        event,
        session_id: getSessionId(),
        visitor_id: getVisitorId(),
        page: details.page || window.location.pathname || '/',
        url: details.url || window.location.href,
        referrer: document.referrer || '',
        ...utm,
        element_type: details.element_type || '',
        element_text: cleanText(details.element_text),
        element_id: cleanText(details.element_id),
        element_class: cleanText(details.element_class),
        destination: cleanText(details.destination),
        screen_width: String(window.screen?.width || ''),
        screen_height: String(window.screen?.height || ''),
        user_agent: navigator.userAgent || '',
    };
};

const send = (payload: AnalyticsPayload) => {
    if (!ANALYTICS_ENDPOINT) return;
    const body = JSON.stringify(payload);
    try {
        const blob = new Blob([body], { type: 'text/plain;charset=UTF-8' });
        if (navigator.sendBeacon?.(ANALYTICS_ENDPOINT, blob)) return;
    } catch {}
    try {
        void fetch(ANALYTICS_ENDPOINT, {
            body,
            cache: 'no-store',
            headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
            keepalive: true,
            method: 'POST',
            mode: 'no-cors',
        }).catch(() => undefined);
    } catch {}
};

const getInteractiveElement = (target: EventTarget | null): HTMLElement | null => {
    if (!(target instanceof Element)) return null;
    if (target.closest('input, textarea, select, [contenteditable="true"]')) return null;
    return target.closest('a, button, [role="button"], .resume_download, .view-button, .yes-class, .no-class, [data-analytics]') as HTMLElement | null;
};

const getElementText = (element: HTMLElement) => {
    const explicitName = element.getAttribute('aria-label') || element.getAttribute('title');
    if (explicitName) return cleanText(explicitName);
    const imageAlt = element.querySelector('img[alt]')?.getAttribute('alt');
    if (imageAlt) return cleanText(imageAlt);
    return cleanText(element.innerText || element.textContent);
};

const getDestination = (element: HTMLElement) => {
    if (element instanceof HTMLAnchorElement) return element.href;
    const anchor = element.closest('a');
    return anchor?.href || element.dataset.analyticsDestination || '';
};

const classifyElement = (element: HTMLElement, destination: string) => {
    const className = element.className || '';
    const projectCard = element.closest('.project-card');
    if (projectCard) return 'project';
    if (/resume/i.test(`${destination} ${className} ${getElementText(element)}`)) return 'resume';
    if (/linkedin/i.test(destination)) return 'linkedin';
    if (/github/i.test(destination)) return 'github';
    if (/mailto:|contact|email/i.test(`${destination} ${className} ${getElementText(element)}`)) return 'contact';
    if (element.classList.contains('lens-button')) return 'recruiter_lens';
    if (element instanceof HTMLAnchorElement) return 'link';
    if (element instanceof HTMLButtonElement) return 'button';
    return 'clickable';
};

export const analytics = {
    pageView: (page = window.location.pathname || '/') => {
        const normalizedPage = page.replace(/\/+$/, '') || '/';
        const pageKey = `${normalizedPage}|${window.location.href}`;
        if (pageKey === lastPageViewKey) return;
        lastPageViewKey = pageKey;
        send(getPayload('page_view', { page: normalizedPage }));
    },
    track: (event: string, details: EventDetails = {}) => send(getPayload(event, details)),
    trackClick: (target: EventTarget | null) => {
        const element = getInteractiveElement(target);
        if (!element) return;
        const destination = getDestination(element);
        const projectName = element.closest('.project-card')?.querySelector('h3')?.textContent;
        const elementText = projectName ? `${cleanText(projectName)} / ${getElementText(element)}` : getElementText(element);
        analytics.track('click', {
            destination,
            element_class: typeof element.className === 'string' ? element.className : '',
            element_id: element.id,
            element_text: elementText,
            element_type: classifyElement(element, destination),
        });
    },
};

export default analytics;
