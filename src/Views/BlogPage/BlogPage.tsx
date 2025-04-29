import "./BlogPage.css";
import PageBanner from "../../Shared/PageBanner";
import { ProjectImages } from "../../assets/ProjectImages";
import BlogCard from "./BlogCard";
import { blogs } from "./Blogs";
import { Link } from "react-router-dom";
import { useState } from "react";

function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const categories = [...new Set(blogs.map((blog) => blog.category))].map(
    (category) => ({
      name: category,
      count: blogs.filter((blog) => blog.category === category).length,
    })
  );

  const tags = [...new Set(blogs.map((blog) => blog.tag))];

  const recentPosts = blogs.slice(0, 3);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = selectedCategory
      ? blog.category === selectedCategory
      : true;
    const matchesTag = selectedTag ? blog.tag === selectedTag : true;
    return matchesCategory && matchesTag;
  });

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); 
    } else {
      setSelectedCategory(category);
      setSelectedTag(null); 
    }
  };

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null); 
    } else {
      setSelectedTag(tag);
      setSelectedCategory(null);
    }
  };

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
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))
            ) : (
              <p className="project-normal-font">
                No blogs found for the selected category or tag.
              </p>
            )}
          </div>
          <div className="blog-side-bar">
            <div className="sidebar-section">
              <h4>Categories</h4>
              <ul className="category-list">
                {categories.map((category) => (
                  <li
                    key={category.name}
                    className={`category-item ${
                      selectedCategory === category.name ? "active" : ""
                    }`}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <span className="project-normal-font">
                      {category.name} ({category.count})
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-section">
              <h4>Recent Posts</h4>
              <ul className="recent-posts-list">
                {recentPosts.map((post) => (
                  <li key={post.id}>
                    <div className="recent-post-item">
                      <Link to={`/blog/${post.id}`} className="link-class">
                        <h5>{post.title}</h5>
                      </Link>
                      <p>{post.date} • Admin</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-section">
              <h4>Tags</h4>
              <div className="tags-list">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className={`tag-item ${
                      selectedTag === tag ? "active" : ""
                    }`}
                    onClick={() => handleTagClick(tag)}
                  >
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
