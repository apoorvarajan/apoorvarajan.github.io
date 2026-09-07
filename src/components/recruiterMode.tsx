import { useEffect, useState } from 'react';
import { FiArrowLeft, FiArrowUpRight, FiBriefcase, FiCheck, FiFileText, FiGithub, FiMail, FiMap, FiLinkedin } from 'react-icons/fi';
import contentJSON from './subComponents/contents.json';
import '../style/recruiterMode.css';

type LensKey = 'all' | 'frontend' | 'ai' | 'data';

const resumePath = '/documents/Resume_ApoorvaRajan.pdf';
const socialLinks = {
    email: 'mailto:apoorvarajan1997@gmail.com',
    linkedin: 'https://www.linkedin.com/in/apoorva-rajan/',
    github: 'https://github.com/apoorvarajan',
};

const lenses: { key: LensKey; label: string; description: string; keywords: string[]; skillCategories: string[] }[] = [
    { key: 'all', label: 'Full profile', description: 'See the complete recruiter snapshot.', keywords: [], skillCategories: [] },
    { key: 'frontend', label: 'Frontend & product', description: 'Web products, interfaces, performance, and design systems.', keywords: ['react', 'typescript', 'frontend', 'front end', 'web component', 'fluent ui', 'lit', 'lumina', 'ui', 'pwa', 'performance', 'fabric'], skillCategories: ['Languages', 'Frameworks', 'Tools'] },
    { key: 'ai', label: 'AI & applied ML', description: 'Agent workflows, language applications, retrieval, and machine learning.', keywords: ['ai', 'agent', 'gpt', 'openai', 'language', 'retrieval', 'machine learning', 'reinforcement', 'cnn', 'lstm', 'spark nlp'], skillCategories: ['Languages', 'Libraries', 'Cloud Technologies'] },
    { key: 'data', label: 'Data & platforms', description: 'Data exploration, processing, cloud services, and platform integration.', keywords: ['data', 'fabric', 'onelake', 'arcgis', 'spark', 'sql', 'scala', 'gcp', 'bigquery', 'database', 'api', 'grpc'], skillCategories: ['Languages', 'Frameworks', 'Cloud Technologies', 'Databases'] },
];

const getLens = (key: LensKey) => lenses.find((lens) => lens.key === key) || lenses[0];
const searchable = (value: string | string[]) => (Array.isArray(value) ? value.join(' ') : value).toLowerCase();
const matchesLens = (value: string | string[], lens: ReturnType<typeof getLens>) => lens.key === 'all' || lens.keywords.some((keyword) => searchable(value).includes(keyword));
const getExperienceSummary = (description: string[], lens: ReturnType<typeof getLens>) => {
    const relevantPoints = description.filter((point) => matchesLens(point, lens));
    if (lens.key === 'all') {
        return description[0] || 'This role adds professional engineering experience to the overall profile.';
    }
    if (!relevantPoints.length) {
        return `This role adds additional context to the ${lens.label.toLowerCase()} profile through adjacent engineering experience.`;
    }
    if (relevantPoints.length === 1) {
        return relevantPoints[0];
    }
    return `${relevantPoints[0]} ${relevantPoints[1]}`;
};

const RecruiterMode = () => {
    const [activeLens, setActiveLens] = useState<LensKey>('all');
    const lens = getLens(activeLens);
    const featuredExperience = contentJSON.work_Exp.slice(0, 5).sort((first, second) => {
        const firstIsRelevant = matchesLens(`${first.role} ${first.company} ${first.desc.join(' ')}`, lens);
        const secondIsRelevant = matchesLens(`${second.role} ${second.company} ${second.desc.join(' ')}`, lens);
        return Number(secondIsRelevant) - Number(firstIsRelevant);
    });
    const featuredProjects = contentJSON.proj.filter((project) => matchesLens(`${project.role} ${project.desc.join(' ')}`, lens)).slice(0, 4);
    const visibleSkills = Object.entries(contentJSON['Technical Skills']).filter(([category]) => lens.key === 'all' || lens.skillCategories.includes(category));

    useEffect(() => {
        const description = 'Recruiter view of Apoorva Rajan, a Software Engineer at Esri building TypeScript web applications, Microsoft Fabric mapping experiences, and AI-powered agent workflows.';
        document.title = 'Recruiter Mode | Apoorva Rajan';
        const metadata: Record<string, string> = {
            description,
            'og:title': 'Recruiter Mode | Apoorva Rajan',
            'og:description': description,
            'og:url': 'https://apoorvarajan.github.io/recruiter',
            'og:type': 'profile',
            'twitter:title': 'Recruiter Mode | Apoorva Rajan',
            'twitter:description': description,
        };
        Object.entries(metadata).forEach(([name, content]) => {
            const selector = name.startsWith('og:') || name.startsWith('twitter:') ? `meta[property="${name}"]` : `meta[name="${name}"]`;
            let element = document.head.querySelector(selector) as HTMLMetaElement | null;
            if (!element) {
                element = document.createElement('meta');
                if (name.startsWith('og:') || name.startsWith('twitter:')) element.setAttribute('property', name);
                else element.setAttribute('name', name);
                document.head.appendChild(element);
            }
            element.content = content;
        });
        const canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
        if (canonical) canonical.href = 'https://apoorvarajan.github.io/recruiter';
    }, []);

    return (
        <main className="recruiter-page">
            <header className="recruiter-nav">
                <a className="recruiter-back" href="/"><FiArrowLeft aria-hidden="true" /> Back to portfolio</a>
                <span className="recruiter-mark">AR / RECRUITER MODE</span>
            </header>

            <section className="recruiter-hero" aria-labelledby="recruiter-title">
                <div className="hero-copy">
                    <p className="recruiter-eyebrow">A quick read on the work</p>
                    <h1 id="recruiter-title">Apoorva Rajan</h1>
                    <p className="hero-role">Software Engineer 2 at Esri</p>
                    <p className="hero-summary">I build TypeScript web applications, Microsoft Fabric mapping and data exploration experiences, and AI-powered agent workflows for geospatial software.</p>
                    <div className="hero-actions" aria-label="Recruiter quick actions">
                        <a className="action-primary" href={resumePath}><FiFileText aria-hidden="true" /> Resume <FiArrowUpRight aria-hidden="true" /></a>
                        <a href={socialLinks.email}><FiMail aria-hidden="true" /> Email</a>
                        <a href={socialLinks.linkedin} target="_blank" rel="noreferrer"><FiLinkedin aria-hidden="true" /> LinkedIn</a>
                        <a href={socialLinks.github} target="_blank" rel="noreferrer"><FiGithub aria-hidden="true" /> GitHub</a>
                    </div>
                </div>
                <div className="hero-signal" aria-label="Professional snapshot">
                    <span className="signal-label">CURRENT FOCUS</span>
                    <strong>Geospatial software + AI workflows</strong>
                    <span className="signal-rule" />
                    <span className="signal-label">CAREER THREAD</span>
                    <strong>Frontend engineering grounded in data and applied ML</strong>
                </div>
            </section>

            <section className="recruiter-section lens-section" aria-labelledby="lens-title">
                <div className="section-heading">
                    <p className="recruiter-eyebrow">Explore by signal</p>
                    <h2 id="lens-title">What kind of work are you hiring for?</h2>
                    <p>{lens.description}</p>
                </div>
                <div className="lens-controls" role="group" aria-label="Filter recruiter view by engineering direction">
                    {lenses.map((item) => (
                        <button key={item.key} type="button" className={activeLens === item.key ? 'lens-button is-active' : 'lens-button'} onClick={() => setActiveLens(item.key)} aria-pressed={activeLens === item.key}>
                            {activeLens === item.key && <FiCheck aria-hidden="true" />}{item.label}
                        </button>
                    ))}
                </div>
            </section>

            <section className="recruiter-section experience-section" aria-labelledby="experience-title">
                <div className="section-heading"><p className="recruiter-eyebrow">Professional experience</p><h2 id="experience-title">Where the work has landed</h2></div>
                <div className="experience-list">
                    {featuredExperience.map((item) => {
                        const relevant = matchesLens(`${item.role} ${item.company} ${item.desc.join(' ')}`, lens);
                        const experiencePoints = (item.desc.length ? item.desc : ['Professional engineering experience at this stage of the career.']).slice().sort((first, second) => Number(matchesLens(second, lens)) - Number(matchesLens(first, lens)));
                        return <article className={relevant ? 'experience-row is-relevant' : 'experience-row'} key={`${item.role}-${item.time}`}>
                            <div className="experience-meta"><span>{item.time}</span><FiBriefcase aria-hidden="true" /></div>
                            <div><h3>{item.role}</h3><p className="experience-company">{item.company}</p><p className="experience-summary"><span>{lens.key === 'all' ? 'Career signal' : `${lens.label} contribution`}</span>{getExperienceSummary(item.desc, lens)}</p><ul className="experience-points">{experiencePoints.map((point) => <li className={matchesLens(point, lens) ? 'is-relevant' : ''} key={point}>{point}</li>)}</ul></div>
                        </article>;
                    })}
                </div>
            </section>

            <section className="recruiter-section evidence-grid" aria-labelledby="evidence-title">
                <div className="section-heading">
                    <p className="recruiter-eyebrow">Then, the proof</p>
                    <h2 id="evidence-title">Selected projects</h2>
                </div>
                <div className="project-grid">
                    {featuredProjects.map((project) => (
                        <article className="recruiter-card project-card" key={project.role}>
                            <div className="card-topline"><FiMap aria-hidden="true" /><a href={project.link} target="_blank" rel="noreferrer" aria-label={`Open ${project.role} on GitHub`}><FiArrowUpRight aria-hidden="true" /><span className="sr-only">Open project on GitHub</span></a></div>
                            <h3>{project.role}</h3>
                            <p>{project.desc[0]}</p>
                            <a className="text-link" href={project.link} target="_blank" rel="noreferrer">View project <FiArrowUpRight aria-hidden="true" /></a>
                        </article>
                    ))}
                </div>
            </section>

            <section className="recruiter-section skills-section" aria-labelledby="skills-title">
                <div className="section-heading"><p className="recruiter-eyebrow">Technical toolkit</p><h2 id="skills-title">The stack behind the work</h2></div>
                <div className="skills-grid">
                    {visibleSkills.map(([category, skills]) => <div className="skill-group" key={category}><h3>{category}</h3><div className="skill-tags">{(skills as string[]).map((skill) => <span key={skill}>{skill}</span>)}</div></div>)}
                </div>
            </section>

            <section className="recruiter-section closing-section" aria-labelledby="closing-title">
                <div><p className="recruiter-eyebrow">Next conversation</p><h2 id="closing-title">Interested in the details?</h2><p>The full portfolio includes education, awards, coursework, and the complete project and experience history.</p></div>
                <a className="action-primary" href="/">Open full portfolio <FiArrowUpRight aria-hidden="true" /></a>
            </section>
        </main>
    );
};

export default RecruiterMode;