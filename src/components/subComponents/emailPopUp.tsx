import { useRef } from 'react'

import emailjs from '@emailjs/browser';

import '../../style/subComponentStyles/email.css'

const EmailPopUp = (props:any) =>{
    const email_name:any = useRef(null);
    const email_id:any = useRef(null);
    const email_body:any = useRef(null);
    const sendEmail=(name:any,id:any,body:any)=>{
        let from_name=name.current.value
        let email_id=id.current.value
        let msg=body.current.value
        if(from_name==="" || email_id==="" || msg===""){
            alert("All fields are required")
        }
        else{
            emailjs.send('service_39ooedg', 'template_esgtfkf', {"from_name":from_name,"from_email":email_id,"message":msg}, 'CfzZYSUg6pFsrplYg');
        }
        alert("Thank you for sending me email! I will get back to you")
        props.setEmail(false)
    }
    return <div className="modal-popup">
            <div className="email-wrap">
                    <div className="close-icon" onClick={()=>props.setEmail(false)}>
                        Close
                    </div>
                    <div className="email-input-wrap">
                        <div className="email-elem">
                            <label htmlFor="emailName" >Name:</label>
                            <input ref={email_name} id="emailName" className="email-input"/>
                        </div>
                        <div className="email-elem">
                            <label htmlFor="emailid">Your Email id:</label>
                            <input ref={email_id} id="emailid" className="email-input"/>
                        </div>
                    </div>
                    <div className="email-elem">
                        <label htmlFor="body">Message</label>
                        <textarea ref={email_body} id="body" className="email-textarea"/>
                    </div>
                    <div>
                        <button className="send-button" onClick={()=>sendEmail(email_name,email_id,email_body)}>Send</button>
                    </div>
                </div>
            </div>
}

export default EmailPopUp