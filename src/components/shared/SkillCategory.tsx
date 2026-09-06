import React from 'react';
import { VscChevronDown, VscFolderOpened, VscChevronRight } from 'react-icons/vsc';

interface SkillCategoryProps {
  categoryName: string;
  skills: string[];
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ categoryName, skills }) => {
  return (
    <div>
      <div className="skill-title">
        <VscChevronDown />
        <VscFolderOpened />&nbsp;
        {categoryName}:
      </div>
      <div className="skill-list">
        {skills.map((skill: string, idx: number) => (
          <div key={`${skill}-${idx}`}>
            <VscChevronRight />&nbsp;
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCategory;
