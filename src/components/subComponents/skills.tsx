import contentJSON from './contents.json';
import { ListSection, SkillCategory } from '../shared';
import '../../style/subComponentStyles/skills.css';

const Skills = () => {
    return (
        <ListSection title="SKILLS">
            <div className="techskill-class">
                {Object.entries(contentJSON['Technical Skills']).map(([categoryName, skills], index) => (
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