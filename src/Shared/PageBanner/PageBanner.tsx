import './PageBaner.css';
import { Link } from 'react-router-dom';
import { ROUTES_CONFIG } from '../Constants';

interface PageBannerProps{
normalText: string,
coloredText: string | undefined,
headingText: string
bannerImage:string
}

function PageBanner({normalText, coloredText, headingText, bannerImage}: PageBannerProps){ 

    return(
    <>
    <div className='page-banner-container'>
        <img src={bannerImage} alt="page-banner" />
        <div className='pageBanner-text-content'>
        <h1 className='project-heading-font'>{headingText}</h1>
    
        {/* <p>{normalText}{" "}<span className='project-theme-color project-normal-font'>{coloredText}</span></p> */}

        
<p><Link to ={ROUTES_CONFIG.HOMEPAGE.path} className='page-banner-text'><span className='page-banner-normal'>{normalText}</span>{" "}</Link>
<span className='page-banner-text-color'>
    <Link to = {`/${coloredText}`} className='link-class'>
        <span className='page-banner-color'>{coloredText}</span></Link></span></p>


    </div>
    </div>
    </>
    )
}
export default PageBanner;