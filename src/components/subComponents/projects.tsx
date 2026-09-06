import { FaProjectDiagram } from "react-icons/fa";
import contentJSON from './contents.json';
import { TimelineItem, ListSection } from '../shared';
import '../../style/subComponentStyles/experience.css';

const Projects = () => {
    const icon = <FaProjectDiagram className="exp-icon" />;
    const projects = contentJSON.proj;

    return (
        <ListSection title="PROJECTS">
            <div className="exp-list">
                {projects.map((item: any, index: number) => (
                    <TimelineItem
                        key={`${item.role}-${index}`}
                        icon={icon}
                        title={item.role}
                        link={item.link}
                        description={item.desc}
                        isLast={index === projects.length - 1}
                    />
                ))}
            </div>
        </ListSection>
    );
};

export default Projects