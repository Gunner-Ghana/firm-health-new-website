import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogService } from '../hooks/useBlogDB';
import './BlogPost.css';

function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await blogService.getBlogBySlug(slug);
        if (blogData && blogData.published) {
          setBlog(blogData);
        } else {
          navigate('/blogs');
        }
      } catch (error) {
        console.error('Failed to fetch blog:', error);
        navigate('/blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="blog-post-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <div className="blog-post-page">
      <article className="blog-article">
        <Link to="/blogs" className="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Blogs
        </Link>

        <header className="blog-header">
          <span className="blog-date">
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          <h1>{blog.title}</h1>
        </header>

        {blog.image && (
          <div className="blog-featured-image">
            <img src={blog.image} alt={blog.title} />
          </div>
        )}

        <div className="blog-body glass-card">
          {blog.content.split('\n').map((paragraph, index) => (
            paragraph.trim() && <p key={index}>{paragraph}</p>
          ))}
        </div>

        <footer className="blog-footer">
          <Link to="/blogs" className="back-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to All Blogs
          </Link>
        </footer>
      </article>
    </div>
  );
}

export default BlogPost;
