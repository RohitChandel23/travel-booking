import './BlogPage.css'; 
import PageBanner from "../Shared/PageBanner";
import { ProjectImages } from "../../assets/ProjectImages";
import BlogCard from './BlogCard';

function BlogPage(){
return(
<>
<PageBanner 
normalText="Home / " 
coloredText="Blog"
headingText="Our Blog"
bannerImage={ProjectImages.TOURPAGE_BANNER}
/>

<div className="blog-page-wrapper">
    <div className='blog-page-container'>
        <div className='blog-main-content'>
{/* blogCard image , date, title, short description*/}
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>

        </div>
        <div className='blog-side-bar'>

        </div>

    </div>

</div>

</>
)
}
export default BlogPage;