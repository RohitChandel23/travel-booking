import './PageBaner.css';

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
        <p>{normalText}{" "}<span className='project-theme-color project-normal-font'>{coloredText}</span></p>   {/* text, red text */}
    </div>
    </div>
    </>
    )
}
export default PageBanner;