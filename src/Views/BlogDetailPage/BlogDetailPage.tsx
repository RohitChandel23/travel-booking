import './BlogDetailPage.css';
import { useParams } from 'react-router-dom';
import { ProjectImages } from '../../assets/ProjectImages';
import AddingComment from '../../Shared/AddingComment/AddingComment';
import { blogs, Blog } from '../BlogPage/Blogs';
import {useEffect} from 'react';

function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const blog: Blog | undefined = blogs.find((b) => b.id === parseInt(id || ''));

  if (!blog) {
    return <div className="blog-detail-page-wrapper">Blog not found</div>;
  }

  useEffect(()=>{
    window.scrollTo(0, 0);
  })

  return (
    <div className="blog-detail-page-wrapper">
      <div className="blog-detail-page-container">
        <div className="blog-detail-image-container">
          <img
            src={blog.image}
            className="blog-detail-image"
            alt={blog.title}
          />
        </div>

        <div className="blog-detail-content-wrapper">
          <div className="blog-detail-date">
            <p>{blog.date} • Admin</p>
          </div>

          <h3 className="blog-detail-title">{blog.title}</h3>
          <p className="blog__description project-normal-font">
            {blog.content.map((paragraph, index) => (
              <span key={index}>
                {paragraph}
                <br />
                <br />
              </span>
            ))}
          </p>
        </div>

        <div className="blog-details-tag-share-wrapper">
          <div className="blog-share-tag-container">
            <div className="blog-share-container">
              <span>Share: </span>
              <span className="social-share-icons">
                <i className="fa-brands fa-facebook-f" />
                <i className="fa-brands fa-x-twitter" />
                <i className="fa-brands fa-whatsapp" />
                <i className="fa-brands fa-linkedin-in" />
                <i className="fa-solid fa-link" />
              </span>
            </div>

            <div className="blog-detail-page-tags">
              <span>{blog.tag}</span>
            </div>
          </div>
          <div className="blog-tags"></div>
        </div>

        <div className="author-section">
          <div className="author-image-wrapper">
            <div className="author-image-container">
              <img src={ProjectImages.BLANK_PROFILE} alt="Author" />
            </div>
          </div>
          <div className="author-information-container">
            <h6>Simmons</h6>
            <span>Author</span>
            <p className="project-normal-font">
              Objectively productivate just in time information with dynamic
              channels. Energistically exploit seamless growth strategies after
              24/7 experiences.
            </p>
          </div>
        </div>

        <div className="blog-reply-container">
          <AddingComment />
        </div>
      </div>
    </div>
  );
}

export default BlogDetailPage;
