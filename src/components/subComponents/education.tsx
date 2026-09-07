import { HiAcademicCap } from "react-icons/hi";
import contentJSON from './contents.json';
import { TimelineItem, ListSection } from '../shared';
import '../../style/subComponentStyles/experience.css';

const Education = () => {
    return (
        <ListSection title="EDUCATION">
            <div className="exp-list">
                {contentJSON.edu.map((item: any, index: number) => (
                    <TimelineItem
                        key={`${item.role}-${index}`}
                        icon={<HiAcademicCap className="exp-icon" />}
                        title={item.role}
                        description={item.desc}
                        isLast={index === contentJSON.edu.length - 1}
                    />
                ))}
            </div>
        </ListSection>
    );
};

export default Education