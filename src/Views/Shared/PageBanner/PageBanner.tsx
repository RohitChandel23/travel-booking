import './PageBaner.css';
import { ProjectImages } from '../../../assets/ProjectImages';

interface PageBannerProps{
normalText: string,
coloredText: string,
headingText: string
}

function PageBanner({normalText, coloredText, headingText}: PageBannerProps){ 
    return(
    <>
    <div className='page-banner-container'>
        <img src={ProjectImages.TOURPAGE_BANNER} alt="page-banner" />
        <div className='pageBanner-text-content'>
        <h1 className='project-heading-font'>{headingText}</h1>
        <p>{normalText}{" "}<span className='project-theme-color project-normal-font'>{coloredText}</span></p>   {/* text, red text */}
    </div>
    </div>
    </>
    )
}
export default PageBanner;