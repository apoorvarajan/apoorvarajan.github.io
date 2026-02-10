import {FaProjectDiagram} from "react-icons/fa"
import { MdOpenInNew } from 'react-icons/md';

import contentJSON from './contents.json'

import '../../style/subComponentStyles/experience.css'


const exp_section = {
    "PROJECTS":{
        "content":contentJSON.proj,
        "icon":<FaProjectDiagram className="exp-icon"/>,
        //"ref":myRef2
    }
}

const Projects = () =>{
    return <div>
            {Object.entries(exp_section).map(([item,value],key)=>{
                //ref={value.ref}
                        return <div className="subsec">
                            <div className="head">
                                {item}
                                <div className="line"/>
                            </div>
                            <div className="exp-list">
                            {value.content.map((item2:any,key2:any)=>{
                                return <div className="wrap-exp" onClick={()=>{
                                            // let elem = document.getElementById("desc_"+key+key2)
                                            // if(item2.role=="Senior Software Engineer"){
                                            //     elem= document.getElementById("desc_"+key+(key2+1))
                                            // }
                                            // if(elem){
                                            //     if(elem.style.display=='block'){
                                            //         elem.style.display='none'
                                            //     }
                                            //     else{
                                            //         elem.style.display='block'
                                            //     }
                                            // }
                                        }}>
                                        <div>
                                            <div className="exp-icon-wrap">
                                                {value.icon}
                                            </div>
                                            {key2<value.content.length-1 &&<div className="vertical-line"></div>}
                                        </div>
                                        <div className="ach-div">
                                            <div className="role">
                                                {item2.link? <a target="_blank" rel="noreferrer" className="anchor_cd" href={item2.link}>{item2.role}<MdOpenInNew /></a>:item2.role}
                                                {item2.time?<span style={{float: 'right',color: 'darkblue',fontWeight: 'normal'}}>{item2.time}</span>:null}
                                            </div>
                                            {item2.company?<div className="company-name">{item2.company}</div>:null}
                                            <div style={{minHeight:"2em"}}>
                                                <ul   className="expand-sec" id={"desc_"+key+key2}>
                                                {/* style={{display:'none'}} */}
                                                    {item2.desc.map((descitem:any,desckey:any)=>{
                                                        return <li>
                                                                    <div className="role-desc">
                                                                        {descitem}
                                                                    </div>
                                                                </li>
                                                    })}
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                            })}
                        </div>
                        </div>
                    })}
            </div>
}

export default Projects