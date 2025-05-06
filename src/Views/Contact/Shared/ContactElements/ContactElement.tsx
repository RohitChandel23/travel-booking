import './ContactElement.css';

interface ContactElementProps{
    readonly contactIcon:string,
    readonly contactType:string,
    readonly contactInfo:string,
}

function ContactElement({contactIcon, contactType, contactInfo}: ContactElementProps){      
return(
    <div className="contact-element-wrapper">
    <div className='contact-element-container'>
    <i className={contactIcon}></i>
    <p>{contactType}</p>
    <span>{contactInfo}</span>
    </div>
    </div>
)
}
export default ContactElement;