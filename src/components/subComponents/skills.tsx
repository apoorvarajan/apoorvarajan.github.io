import contentJSON from './contents.json';
import '../../style/subComponentStyles/skills.css';

import { VscChevronDown, VscFolderOpened, VscChevronRight } from "react-icons/vsc";

const Skills = () => {
    return <div className="subsec">
        <div className="head">
            SKILLS
            <div className="line" />
        </div>
        <div className="techskill-class">
            {Object.entries(contentJSON['Technical Skills']).map(([key, value], index) => (
                <div key={`${key}-${index}`}>
                    <div className="skill-title">
                        <VscChevronDown />
                        <VscFolderOpened />&nbsp;
                        {key + ":"}
                    </div>
                    <div className="skill-list">
                        {value.map((val: string, valIndex: number) => (
                            <div key={`${val}-${valIndex}`}>
                                <VscChevronRight />&nbsp;
                                {val}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
};

export default Skills