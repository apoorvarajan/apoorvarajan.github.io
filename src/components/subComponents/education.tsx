import { HiAcademicCap } from "react-icons/hi";
import contentJSON from './contents.json';
import { TimelineItem, ListSection } from '../shared';
import '../../style/subComponentStyles/experience.css';

const Education = () => {
    const icon = <HiAcademicCap className="exp-icon" />;
    const education = contentJSON.edu;

    return (
        <ListSection title="EDUCATION">
            <div className="exp-list">
                {education.map((item: any, index: number) => (
                    <TimelineItem
                        key={`${item.role}-${index}`}
                        icon={icon}
                        title={item.role}
                        description={item.desc}
                        isLast={index === education.length - 1}
                    />
                ))}
            </div>
        </ListSection>
    );
};

export default Education