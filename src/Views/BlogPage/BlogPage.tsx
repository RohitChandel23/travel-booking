// import './BlogPage.css'; 
// import PageBanner from "../Shared/PageBanner";
// import { ProjectImages } from "../../assets/ProjectImages";
// import BlogCard from './BlogCard';

// function BlogPage(){
// return(
// <>
// <PageBanner 
// normalText="Home / " 
// coloredText="Blog"
// headingText="Our Blog"
// bannerImage={ProjectImages.TOURPAGE_BANNER}
// />

// <div className="blog-page-wrapper">
//     <div className='blog-page-container'>
//         <div className='blog-main-content'>
// {/* blogCard image , date, title, short description*/}
//             <BlogCard/>
//             <BlogCard/>
//             <BlogCard/>

//         </div>
//         <div className='blog-side-bar'>

//         </div>

//     </div>

// </div>

// </>
// )
// }
// export default BlogPage;




// import './BlogPage.css';
// import PageBanner from '../Shared/PageBanner';
// import { ProjectImages } from '../../assets/ProjectImages';
// import BlogCard from './BlogCard';
// import { blogs } from './Blogs'; // Import blog data

// function BlogPage() {
//   // Extract unique categories and tags for sidebar
//   const categories = [...new Set(blogs.map((blog) => blog.category))];
//   const tags = [...new Set(blogs.map((blog) => blog.tag))];

//   return (
//     <>
//       <PageBanner
//         normalText="Home / "
//         coloredText="Blog"
//         headingText="Our Blog"
//         bannerImage={ProjectImages.TOURPAGE_BANNER}
//       />

//       <div className="blog-page-wrapper">
//         <div className="blog-page-container">
//           <div className="blog-main-content">
//             {blogs.map((blog) => (
//               <BlogCard key={blog.id} blog={blog} />
//             ))}
//           </div>
//           <div className="blog-side-bar">
//             <div className="sidebar-section">
//               <h4>Categories</h4>
//               <ul>
//                 {categories.map((category) => (
//                   <li key={category}>{category}</li>
//                 ))}
//               </ul>
//             </div>
//             <div className="sidebar-section">
//               <h4>Tags</h4>
//               <ul>
//                 {tags.map((tag) => (
//                   <li key={tag}>{tag}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default BlogPage;



import './BlogPage.css';
import PageBanner from '../Shared/PageBanner';
import { ProjectImages } from '../../assets/ProjectImages';
import BlogCard from './BlogCard';
import { blogs } from './Blogs'; // Import blog data
import { Link } from 'react-router-dom';

function BlogPage() {
  // Categories with counts
  const categories = [...new Set(blogs.map((blog) => blog.category))].map((category) => ({
    name: category,
    count: blogs.filter((blog) => blog.category === category).length,
  }));

  // Tags
  const tags = [...new Set(blogs.map((blog) => blog.tag))];

  // Recent posts (limit to 3)
  const recentPosts = blogs.slice(0, 3);

  return (
    <>
      <PageBanner
        normalText="Home / "
        coloredText="Blog"
        headingText="Our Blog"
        bannerImage={ProjectImages.TOURPAGE_BANNER}
      />

      <div className="blog-page-wrapper">
        <div className="blog-page-container">
          <div className="blog-main-content">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
          <div className="blog-side-bar">
            {/* Search Bar */}
            <div className="sidebar-section sidebar-search">
              <input type="text" placeholder="Type anything..." />
              <i className="fa-solid fa-magnifying-glass search-icon" />
            </div>

            {/* Categories */}
            <div className="sidebar-section">
              <h4>Categories</h4>
              <ul className="category-list">
                {categories.map((category) => (
                  <li key={category.name}>
                    <span>{category.name} ({category.count})</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts */}
            <div className="sidebar-section">
              <h4>Recent Posts</h4>
              <ul className="recent-posts-list">
                {recentPosts.map((post) => (
                  <li key={post.id}>
                    <div className="recent-post-item">
                      <Link to={`/blog-detail/${post.id}`}>
                        <h5>{post.title}</h5>
                      </Link>
                      <p>{post.date} • Admin</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="sidebar-section">
              <h4>Tags</h4>
              <div className="tags-list">
                {tags.map((tag) => (
                  <span key={tag} className="tag-item">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogPage;