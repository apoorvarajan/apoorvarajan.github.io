import { useState } from 'react';
import Skills from './subComponents/skills';
import Experience from './subComponents/experience';
import Projects from './subComponents/projects';
import Education from './subComponents/education';
import Achievements from './subComponents/achievements';
import OnlineCourses from './subComponents/onlineCourses';
import PortfolioChat from './portfolioChat';
import { TabNavigation, PrimaryProfile } from './shared';
import '../style/home.css';

const Home = () => {
    const [page, setPage] = useState(0);

    const navItems = [
        { label: 'Home', onClick: () => setPage(0), isActive: page === 0 },
        { label: 'Skills', onClick: () => setPage(1), isActive: page === 1 },
        { label: 'Experience', onClick: () => setPage(2), isActive: page === 2 },
        { label: 'Projects', onClick: () => setPage(3), isActive: page === 3 },
        { label: 'Education', onClick: () => setPage(4), isActive: page === 4 },
        { label: 'Achievements', onClick: () => setPage(5), isActive: page === 5 },
        { label: 'Online Courses', onClick: () => setPage(6), isActive: page === 6 },
    ];

    const content = [
        <PrimaryProfile
            name="Apoorva"
            about="I am a Software Engineer at Esri with over 5 years of experience building TypeScript web applications, Microsoft Fabric mapping and data exploration experiences, and AI-powered agent workflows for geospatial software."
            photoSrc="./headshot.png"
            resumePath="../documents/Resume_ApoorvaRajan.pdf"
        />,
        <Skills />,
        <Experience />,
        <Projects />,
        <Education />,
        <Achievements />,
        <OnlineCourses />,
    ];

    return (
        <main className="home-container">
            <TabNavigation items={navItems} />
            {content[page]}
            <PortfolioChat onNavigate={setPage} />
        </main>
    );
};

export default Home