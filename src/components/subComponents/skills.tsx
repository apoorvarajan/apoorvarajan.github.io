import contentJSON from './contents.json'
import '../../style/subComponentStyles/skills.css'

import { VscChevronDown, VscFolderOpened, VscChevronRight } from "react-icons/vsc"

const Skills = () =>{
    // ref={myRef5}
    return <div className="subsec"> 
                <div className="head">
                    SKILLS
                    <div className="line"/>
                </div>
                <div className="techskill-class">
                    {Object.entries(contentJSON['Technical Skills']).map(([key,value],index)=>{
                        return <div>
                                    <div className="skill-title">
                                        <VscChevronDown/>
                                        <VscFolderOpened/>&nbsp;
                                        {key+":"}
                                    </div>
                                    <div className="skill-list">
                                        {value.map((val)=>{
                                            return <div>
                                                <VscChevronRight/>&nbsp;
                                                {val}
                                            </div>
                                        })}
                                    </div>
                                </div>
                    })}
                </div>
            </div>
}
export default Skills