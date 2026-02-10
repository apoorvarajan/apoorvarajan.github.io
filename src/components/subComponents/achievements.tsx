import React from 'react'

import {FaTrophy} from "react-icons/fa"

import contentJSON from './contents.json'

import '../../style/subComponentStyles/experience.css'

const Achievements = () => {
    //ref={myRef6}
    return <div className="subsec">
            <div className="head">
                {"Achievements"}
                <div className="line"/>
            </div>
            <div className="exp-list ach">
            {contentJSON.Achievements.map((item,key2)=>{
                return <div>
                        <div>
                            <div className="exp-icon-wrap">
                                <FaTrophy/>
                            </div>
                            {key2<Achievements.length-1 &&<div className="vertical-line"></div>}
                        </div>
                        <div className="ach-div">
                            <div className="role">
                                {item.title}
                                <span style={{float: 'right',color: 'black',fontWeight: 'normal'}}>{item.time}</span>
                            </div>
                            <div className="view-button" onClick={()=>{
                                let elem = document.getElementById("cert_"+key2)
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
                            <img alt="cert-pic" src={item.doc} width="500em" id={"cert_"+key2} hidden/>
                        </div>
                    </div>
            })}
        </div>
    </div>
}

export default Achievements