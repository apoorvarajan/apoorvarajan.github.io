import { useRef } from 'react';

import emailjs from '@emailjs/browser';

import '../../style/subComponentStyles/email.css';

interface EmailPopUpProps {
    setEmail: (value: boolean) => void;
}

const EmailPopUp = (props: EmailPopUpProps) => {
    const email_name = useRef<HTMLInputElement | null>(null);
    const email_id = useRef<HTMLInputElement | null>(null);
    const email_body = useRef<HTMLTextAreaElement | null>(null);

    const sendEmail = (name: React.RefObject<HTMLInputElement>, id: React.RefObject<HTMLInputElement>, body: React.RefObject<HTMLTextAreaElement>) => {
        const from_name = name.current?.value ?? '';
        const emailValue = id.current?.value ?? '';
        const msg = body.current?.value ?? '';

        if (from_name === '' || emailValue === '' || msg === '') {
            alert('All fields are required');
            return;
        }

        emailjs.send('service_39ooedg', 'template_esgtfkf', { from_name: from_name, from_email: emailValue, message: msg }, 'CfzZYSUg6pFsrplYg');
        alert('Thank you for sending me email! I will get back to you');
        props.setEmail(false);
    };

    return <div className="modal-popup">
        <div className="email-wrap">
            <div className="close-icon" onClick={() => props.setEmail(false)}>
                Close
            </div>
            <div className="email-input-wrap">
                <div className="email-elem">
                    <label htmlFor="emailName">Name:</label>
                    <input ref={email_name} id="emailName" className="email-input" />
                </div>
                <div className="email-elem">
                    <label htmlFor="emailid">Your Email id:</label>
                    <input ref={email_id} id="emailid" className="email-input" />
                </div>
            </div>
            <div className="email-elem">
                <label htmlFor="body">Message</label>
                <textarea ref={email_body} id="body" className="email-textarea" />
            </div>
            <div>
                <button className="send-button" onClick={() => sendEmail(email_name, email_id, email_body)}>Send</button>
            </div>
        </div>
    </div>
};

export default EmailPopUp