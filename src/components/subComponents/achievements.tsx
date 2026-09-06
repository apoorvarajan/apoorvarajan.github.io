import { FaTrophy } from "react-icons/fa";
import contentJSON from './contents.json';
import { ExpandableListItem, ListSection } from '../shared';
import '../../style/subComponentStyles/experience.css';

const Achievements = () => {
    const achievements = contentJSON.Achievements;
    const icon = <FaTrophy />;

    return (
        <ListSection title="Achievements" className="ach">
            <div className="exp-list ach">
                {achievements.map((item: any, index: number) => (
                    <ExpandableListItem
                        key={`${item.title}-${index}`}
                        icon={icon}
                        title={item.title}
                        time={item.time}
                        imageUrl={item.doc}
                        isLast={index === achievements.length - 1}
                    />
                ))}
            </div>
        </ListSection>
    );
};

export default Achievements