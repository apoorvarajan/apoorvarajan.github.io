import React, { useState } from 'react'
import Skills from './subComponents/skills'
import Experience from './subComponents/experience'
import Projects from './subComponents/projects'
import Education from './subComponents/education'
import Achievements from './subComponents/achievements'
import OnlineCourses from './subComponents/onlineCourses'
import EmailPopUp from './subComponents/emailPopUp'
import '../style/home.css'

var { SocialIcon } = require('react-social-icons');

const Home = (props:any) =>{
    const [page,setPage]= useState(0)
    const [email, setEmail] = useState(false)
    const header_elems =[
        {
            "tag":"Home",
            "refFunc":() => setPage(0)
        },
        {
            "tag":"Skills",
            "refFunc":() => setPage(1)
        },
        {
            "tag":"Experience",
            "refFunc":() => setPage(2)
        },
        {
            "tag":"Projects",
            "refFunc":() => setPage(3)
        },
        {
            "tag":"Education",
            "refFunc":() => setPage(4)
        },
        {
            "tag":"Achievements",
            "refFunc":() => setPage(5)
        },
        {
            "tag":"Online Courses",
            "refFunc":() => setPage(6)
        }]
    const social_icons = [
        ["mailto:apoorvarajan1997@gmail.com","Email"],
        ["https://www.linkedin.com/in/apoorva-rajan/","LinkedIn"],
        ["https://github.com/apoorvarajan","GitHub"]
    ]
    return <div className="home-container">
            <div className="header">
                {header_elems.map((item,key)=>{
                    return <div onClick={()=>item.refFunc()}>
                        {item.tag}
                    </div>
                })}
            </div>
            {page==0?<div className="primary-wrap">
                <div className='forborder'>
                    <div className="primary-details">
                        <div className="name-contact">
                            <div className="name">
                                Hey There! My name is Apoorva
                            </div>
                            <div className="contact">
                                {social_icons.map((item,key)=>{
                                    return <div className='resume_download'>
                                            <SocialIcon url={item[0]}/>
                                            <span className="tooltiptext">{item[1]}</span>
                                        </div>
                                })}
                                <div onClick={()=> window.location.href="../documents/Resume_ApoorvaRajan.pdf"} className='resume_download'>
                                    <img src="./resume_icon.svg" width="50em"/>
                                    <span className="tooltiptext">Resume</span>
                                </div>
                
                            </div>
                            <div className="about-me">
                                I am a Software Engineer at Esri (Environmental Systems Research Institute) with over 4 years of experience currently based in United States.
                            </div>
                        </div>
                        <div className="photo-wrap">
                            <img className="photo" height="250em" src="./headshot.png"/>
                        </div>
                    </div>
                </div>
            </div>:
            page==1? <Skills/>
            :page==2? <Experience/>
            :page==3? <Projects/>
            :page==4? <Education/>
            :page==5? <Achievements/>
            :page==6? <OnlineCourses/>
            :null}
            {email?<EmailPopUp setEmail={setEmail}/>:
            <div className='drop-a-note' onClick={()=>setEmail(true)}> Leave me a message </div>}
        </div>
}

export default Home