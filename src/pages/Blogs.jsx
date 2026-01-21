import { Link } from 'react-router-dom';
import { useScrollAnimation, useMultipleScrollAnimation } from '../hooks/useScrollAnimation';
import { usePublishedBlogs } from '../hooks/useBlogDB';
import './Blogs.css';

function Blogs() {
  const blogs = usePublishedBlogs();
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [setBlogRef, visibleBlogs] = useMultipleScrollAnimation(blogs?.length || 0);

  return (
    <div className="blogs-page">
      <section
        className={`blogs-hero ${heroVisible ? 'animate-fade-in' : 'animate-hidden'}`}
        ref={heroRef}
      >
        <h1>Our Blog</h1>
        <p>Stories, updates, and insights from our global health initiatives</p>
      </section>

      <section className="blogs-content">
        {!blogs || blogs.length === 0 ? (
          <div className="no-blogs glass-card">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
            </svg>
            <h2>No blog posts yet</h2>
            <p>Check back soon for stories and updates from our team.</p>
          </div>
        ) : (
          <div className="blogs-grid">
            {blogs.map((blog, index) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.slug}`}
                className={`blog-card glass-card ${visibleBlogs.has(index) ? 'animate-fade-up' : 'animate-hidden'}`}
                ref={setBlogRef(index)}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {blog.image ? (
                  <div className="blog-card-image">
                    <img src={blog.image} alt={blog.title} />
                  </div>
                ) : (
                  <div className="blog-card-image placeholder">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                )}
                <div className="blog-card-content">
                  <span className="blog-card-date">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <h2>{blog.title}</h2>
                  <p>{blog.content.substring(0, 150)}...</p>
                  <span className="read-more">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Blogs;
