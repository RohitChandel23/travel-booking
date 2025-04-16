import './BlogCard.css';
import { Link } from 'react-router-dom';
import { Blog } from '../Blogs';
interface BlogCardProps {
  blog: Blog;
}

function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="blog-card-wrapper">
      <div className="blog-image-container">
        <img src={blog.image} className="blog-card-image" alt={blog.title} />
      </div>

      <div className="blog-date-part">
        <p>{blog.date} • Admin</p>
      </div>

      <Link to={`/blog/${blog.id}`} className='link-class'>
      <h4>{blog.title}</h4>
      </Link>

      <p className="project-normal-font">{blog.shortDescription}</p>

      <Link to={`/blog/${blog.id}`} className="read-more">
        Read More <span><i className="fa-solid fa-long-arrow-right" /></span>
      </Link>
    </div>
  );
}

export default BlogCard;
