import { HiBriefcase } from "react-icons/hi";
import contentJSON from './contents.json';
import { TimelineItem, ListSection } from '../shared';
import '../../style/subComponentStyles/experience.css';

const Experience = () => {
    const icon = <HiBriefcase className="exp-icon" />;
    const workExp = contentJSON.work_Exp;

    return (
        <ListSection title="WORK EXPERIENCE">
            <div className="exp-list">
                {workExp.map((item: any, index: number) => (
                    <TimelineItem
                        key={`${item.role}-${index}`}
                        icon={icon}
                        title={item.role}
                        subtitle={item.company}
                        time={item.time}
                        link={item.link}
                        description={item.desc || []}
                        isLast={index === workExp.length - 1}
                    />
                ))}
            </div>
        </ListSection>
    );
};

export default Experience