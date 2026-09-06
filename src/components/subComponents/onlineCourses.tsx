import { FaLaptopCode } from "react-icons/fa";
import contentJSON from './contents.json';
import { ExpandableListItem, ListSection } from '../shared';
import '../../style/subComponentStyles/experience.css';

const OnlineCourses = () => {
    const courses = contentJSON.Online_Courses;
    const icon = <FaLaptopCode />;

    return (
        <ListSection title="Online Course and Certifications" className="ach">
            <div className="exp-list ach">
                {courses.map((item: any, index: number) => (
                    <ExpandableListItem
                        key={`${item.CourseName}-${index}`}
                        icon={icon}
                        title={item.CourseName}
                        subtitle={item.Provider}
                        imageUrl={item.Certificate}
                        isLast={index === courses.length - 1}
                    />
                ))}
            </div>
        </ListSection>
    );
};

export default OnlineCourses