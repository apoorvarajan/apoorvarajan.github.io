import contentJSON from './contents.json';
import { ListSection, SkillCategory } from '../shared';
import '../../style/subComponentStyles/skills.css';

const Skills = () => {
    const technicalSkills = contentJSON['Technical Skills'];

    return (
        <ListSection title="SKILLS">
            <div className="techskill-class">
                {Object.entries(technicalSkills).map(([categoryName, skills], index) => (
                    <SkillCategory
                        key={`${categoryName}-${index}`}
                        categoryName={categoryName}
                        skills={skills as string[]}
                    />
                ))}
            </div>
        </ListSection>
    );
};

export default Skills