import { FormEvent, useState } from 'react';
import '../style/portfolioChat.css';

type PortfolioPage = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface PortfolioChatProps {
    onNavigate: (page: PortfolioPage) => void;
}

type ChatMessage = {
    role: 'user' | 'assistant';
    content: string;
};

const starterMessage: ChatMessage = {
    role: 'assistant',
    content: 'Hi, I am Apoorva\'s portfolio assistant. Ask me about experience, projects, skills, education, the resume, or how Apoorva could contribute to a role.',
};

const suggestedQuestions = [
    'What kind of AI work has Apoorva done?',
    'Tell me about the work at Esri.',
    'How does Apoorva fit a frontend role?',
];

const apiBaseUrl = (process.env.REACT_APP_API_URL || 'https://apoorvarajan-github-io.onrender.com').replace(/\/$/, '');

const PortfolioChat = ({ onNavigate }: PortfolioChatProps) => {
    const [messages, setMessages] = useState<ChatMessage[]>([starterMessage]);
    const [question, setQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const navigateForQuestion = (value: string) => {
        const normalizedQuestion = value.toLowerCase();
        const destinations: { keywords: string[]; page: PortfolioPage }[] = [
            { keywords: ['skill', 'technology', 'tech stack', 'tool', 'language', 'framework'], page: 1 },
            { keywords: ['experience', 'work history', 'career', 'esri', 'microsoft', 'job'], page: 2 },
            { keywords: ['project', 'built', 'github', 'portfolio project'], page: 3 },
            { keywords: ['education', 'degree', 'university', 'coursework', 'master'], page: 4 },
            { keywords: ['award', 'achievement', 'recognition'], page: 5 },
            { keywords: ['online course', 'certificate', 'certification'], page: 6 },
        ];
        const destination = destinations.find((item) => item.keywords.some((keyword) => normalizedQuestion.includes(keyword)));
        if (destination) {
            onNavigate(destination.page);
        }
    };

    const askQuestion = async (event?: FormEvent) => {
        event?.preventDefault();
        const trimmedQuestion = question.trim();
        if (!trimmedQuestion || isLoading) {
            return;
        }

        const nextMessages = [...messages, { role: 'user' as const, content: trimmedQuestion }];
        navigateForQuestion(trimmedQuestion);
        setMessages(nextMessages);
        setQuestion('');
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(`${apiBaseUrl}/api/chat`, {
                body: JSON.stringify({ messages: nextMessages }),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            });
            const responseType = response.headers.get('content-type') || '';
            if (!responseType.includes('application/json')) {
                throw new Error(apiBaseUrl
                    ? 'The chatbot service returned an invalid response. Please try again later.'
                    : 'The chatbot backend is not connected in production. Configure REACT_APP_API_URL and redeploy.');
            }
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail ? `${data.error} (${data.detail})` : data.error || 'The assistant could not answer right now.');
            }

            setMessages((currentMessages) => [...currentMessages, { role: 'assistant', content: data.answer }]);
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'The assistant could not answer right now.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button className="chat-launcher" type="button" onClick={() => setIsOpen(true)} aria-label="Open portfolio assistant">
                <span className="chat-launcher-icon">+</span>
                <span>Ask about Apoorva</span>
            </button>

            {isOpen && <div className="portfolio-chat-backdrop" onClick={() => setIsOpen(false)}>
                <section className="portfolio-chat" aria-labelledby="portfolio-chat-title" onClick={(event) => event.stopPropagation()}>
                    <div className="portfolio-chat-heading">
                        <div>
                            <p className="job-fit-kicker">ASK THE PORTFOLIO</p>
                            <h2 id="portfolio-chat-title">Have a question?</h2>
                            <p>Ask about Apoorva&apos;s experience, work, or resume.</p>
                        </div>
                        <div className="chat-heading-actions">
                            <span className="chat-status"><i /> Online</span>
                            <button className="chat-close" type="button" onClick={() => setIsOpen(false)} aria-label="Close portfolio assistant">×</button>
                        </div>
                    </div>

                    <div className="chat-window" aria-live="polite">
                        {messages.map((message, index) => (
                            <div className={`chat-message chat-message-${message.role}`} key={`${message.role}-${index}`}>
                                <span className="chat-speaker">{message.role === 'assistant' ? 'AR' : 'You'}</span>
                                <p>{message.content}</p>
                            </div>
                        ))}
                        {isLoading && <div className="chat-message chat-message-assistant"><span className="chat-speaker">AR</span><p className="chat-typing">Thinking...</p></div>}
                    </div>

                    <div className="chat-suggestions">
                        {suggestedQuestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => setQuestion(suggestion)}>{suggestion}</button>)}
                    </div>

                    <form className="chat-composer" onSubmit={askQuestion}>
                        <label htmlFor="portfolio-question">Message the assistant</label>
                        <div className="chat-input-row">
                            <input
                                id="portfolio-question"
                                value={question}
                                onChange={(event) => setQuestion(event.target.value)}
                                placeholder="Ask about Apoorva&apos;s experience..."
                                maxLength={2000}
                            />
                            <button type="submit" disabled={!question.trim() || isLoading} aria-label="Send question">Send</button>
                        </div>
                    </form>
                    {error && <p className="chat-error" role="alert">{error}</p>}
                </section>
            </div>
            }
        </>
    );
};

export default PortfolioChat;
