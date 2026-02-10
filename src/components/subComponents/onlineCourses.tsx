import React from 'react'

import { FaLaptopCode } from "react-icons/fa";

import contentJSON from './contents.json'

const OnlineCourses = () => {
    //ref={myRef7}
    return <div className="subsec">
    <div className="head">
        {"Online Course and Certifications"}
        <div className="line"/>
    </div>
<div className="exp-list ach">
    {contentJSON.Online_Courses.map((item,key2)=>{
        return <div>
                <div>
                    <div className="exp-icon-wrap">
                        <FaLaptopCode/>
                    </div>
                    {key2<contentJSON.Online_Courses.length-1 &&<div className="vertical-line"></div>}
                </div>
                <div className="ach-div">
                    <div className="role">
                        {item.CourseName}
                        <span style={{float: 'right',color: 'black',fontWeight: 'normal'}}>{item.Provider}</span>
                    </div>
                    <div className="view-button" onClick={()=>{
                        let elem = document.getElementById("course_"+key2)
                        if(elem){
                            if(elem.style.display==='block'){
                                elem.style.display='none'
                            }
                            else{
                                elem.style.display='block'
                            }
                        }
                    }}>
                        VIEW CERTIFICATE
                    </div>
                    {/* <embed src={item.Certificate} width="800px" height="2100px" /> */}
                    <img alt="crs-pic" src={item.Certificate} width="500em" id={"course_"+key2} hidden/>
                </div>
            </div>
    })}
</div>
</div>
}

export default OnlineCourses