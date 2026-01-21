import { useState } from 'react';
import { useBlogs, blogService } from '../../hooks/useBlogDB';
import AdminLayout from '../../components/AdminLayout';
import './AdminBlogs.css';

function AdminBlogs() {
  const blogs = useBlogs();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    published: false
  });

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      image: '',
      published: false
    });
    setIsCreating(false);
    setEditingId(null);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await blogService.updateBlog(editingId, formData);
      } else {
        await blogService.addBlog(formData);
      }
      resetForm();
    } catch (error) {
      console.error('Failed to save blog:', error);
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setFormData({
      title: blog.title,
      content: blog.content,
      image: blog.image || '',
      published: blog.published
    });
    setIsCreating(true);
  };

  const handleDelete = async (id) => {
    try {
      await blogService.deleteBlog(id);
      setDeleteConfirmId(null);
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

  const togglePublish = async (blog) => {
    try {
      await blogService.updateBlog(blog.id, { published: !blog.published });
    } catch (error) {
      console.error('Failed to update blog:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-blogs">
        <div className="page-header">
          <div>
            <h1>Blog Management</h1>
            <p>Create and manage blog posts</p>
          </div>
          {!isCreating && (
            <button className="create-btn" onClick={() => setIsCreating(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              New Post
            </button>
          )}
        </div>

        {isCreating && (
          <div className="blog-form-container glass-card">
            <h2>{editingId ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
            <form onSubmit={handleSubmit} className="blog-form">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter blog title..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Cover Image</label>
                <div className="image-upload">
                  {formData.image ? (
                    <div className="image-preview">
                      <img src={formData.image} alt="Preview" />
                      <button type="button" className="remove-image" onClick={() => handleChange('image', '')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <label className="upload-area">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        hidden
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      <span>Click to upload image</span>
                    </label>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleChange('content', e.target.value)}
                  placeholder="Write your blog content..."
                  rows={12}
                  required
                />
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => handleChange('published', e.target.checked)}
                  />
                  <span>Publish immediately</span>
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  {editingId ? 'Update Post' : 'Create Post'}
                </button>
              </div>
            </form>
          </div>
        )}

        {!isCreating && (
          <>
            {!blogs || blogs.length === 0 ? (
              <div className="empty-state glass-card">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                </svg>
                <h3>No blog posts yet</h3>
                <p>Create your first blog post to share news and updates.</p>
                <button className="create-btn" onClick={() => setIsCreating(true)}>
                  Create First Post
                </button>
              </div>
            ) : (
              <div className="blogs-grid">
                {blogs.map((blog) => (
                  <div key={blog.id} className="blog-card glass-card">
                    {blog.image && (
                      <div className="blog-image">
                        <img src={blog.image} alt={blog.title} />
                      </div>
                    )}
                    <div className="blog-content">
                      <div className="blog-meta">
                        <span className={`publish-status ${blog.published ? 'published' : 'draft'}`}>
                          {blog.published ? 'Published' : 'Draft'}
                        </span>
                        <span className="blog-date">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3>{blog.title}</h3>
                      <p className="blog-excerpt">
                        {blog.content.substring(0, 120)}...
                      </p>
                      <div className="blog-actions">
                        <button onClick={() => togglePublish(blog)} className="toggle-btn">
                          {blog.published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button onClick={() => handleEdit(blog)} className="edit-btn">
                          Edit
                        </button>
                        {deleteConfirmId === blog.id ? (
                          <>
                            <button onClick={() => handleDelete(blog.id)} className="confirm-delete-btn">
                              Confirm
                            </button>
                            <button onClick={() => setDeleteConfirmId(null)} className="cancel-btn">
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button onClick={() => setDeleteConfirmId(blog.id)} className="delete-btn">
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminBlogs;
