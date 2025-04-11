import './ContactElement.css';

interface contactElementProps{
contactIcon:string,
contactType:string,
contactInfo:string,
}

function ContactElement({contactIcon, contactType, contactInfo}: contactElementProps){      //contactm icon, contactType, contactIno
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