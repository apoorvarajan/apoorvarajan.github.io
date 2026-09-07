import { FaTrophy } from "react-icons/fa";
import contentJSON from './contents.json';
import { ExpandableListItem, ListSection } from '../shared';
import '../../style/subComponentStyles/experience.css';

const Achievements = () => {
    return (
        <ListSection title="Achievements" className="ach">
            <div className="exp-list ach">
                {contentJSON.Achievements.map((item: any, index: number) => (
                    <ExpandableListItem
                        key={`${item.title}-${index}`}
                        icon={<FaTrophy />}
                        title={item.title}
                        time={item.time}
                        imageUrl={item.doc}
                        isLast={index === contentJSON.Achievements.length - 1}
                    />
                ))}
            </div>
        </ListSection>
    );
};

export default Achievements