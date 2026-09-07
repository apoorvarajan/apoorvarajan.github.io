import { HiBriefcase } from "react-icons/hi";
import contentJSON from './contents.json';
import { TimelineItem, ListSection } from '../shared';
import '../../style/subComponentStyles/experience.css';

const Experience = () => {
    return (
        <ListSection title="WORK EXPERIENCE">
            <div className="exp-list">
                {contentJSON.work_Exp.map((item: any, index: number) => (
                    <TimelineItem
                        key={`${item.role}-${index}`}
                        icon={<HiBriefcase className="exp-icon" />}
                        title={item.role}
                        subtitle={item.company}
                        time={item.time}
                        link={item.link}
                        description={item.desc || []}
                        isLast={index === contentJSON.work_Exp.length - 1}
                    />
                ))}
            </div>
        </ListSection>
    );
};

export default Experience