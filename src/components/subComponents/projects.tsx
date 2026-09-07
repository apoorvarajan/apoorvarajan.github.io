import { FaProjectDiagram } from "react-icons/fa";
import contentJSON from './contents.json';
import { TimelineItem, ListSection } from '../shared';
import '../../style/subComponentStyles/experience.css';

const Projects = () => {
    return (
        <ListSection title="PROJECTS">
            <div className="exp-list">
                {contentJSON.proj.map((item: any, index: number) => (
                    <TimelineItem
                        key={`${item.role}-${index}`}
                        icon={<FaProjectDiagram className="exp-icon" />}
                        title={item.role}
                        link={item.link}
                        description={item.desc}
                        isLast={index === contentJSON.proj.length - 1}
                    />
                ))}
            </div>
        </ListSection>
    );
};

export default Projects