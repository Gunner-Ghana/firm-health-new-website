import { useState, useRef } from 'react';
import { usePhotos, photoService } from '../../hooks/usePhotoDB';
import AdminLayout from '../../components/AdminLayout';
import './AdminPhotos.css';

function AdminPhotos() {
  const photos = usePhotos();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'General',
    image: '',
    published: true
  });

  const categories = [
    'General',
    'Health Screening',
    'Blood Donation',
    'Feed the Aged',
    'Community Outreach',
    'Training',
    'Events',
    'Volunteers'
  ];

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'General',
      image: '',
      published: true
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
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, image: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Please upload an image');
      return;
    }
    try {
      if (editingId) {
        await photoService.updatePhoto(editingId, formData);
      } else {
        await photoService.addPhoto(formData);
      }
      resetForm();
    } catch (error) {
      console.error('Failed to save photo:', error);
    }
  };

  const handleEdit = (photo) => {
    setEditingId(photo.id);
    setFormData({
      title: photo.title,
      category: photo.category,
      image: photo.image,
      published: photo.published
    });
    setIsCreating(true);
  };

  const handleDelete = async (id) => {
    try {
      await photoService.deletePhoto(id);
      setDeleteConfirmId(null);
    } catch (error) {
      console.error('Failed to delete photo:', error);
    }
  };

  const togglePublish = async (photo) => {
    try {
      await photoService.updatePhoto(photo.id, { published: !photo.published });
    } catch (error) {
      console.error('Failed to update photo:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-photos">
        <div className="page-header">
          <div>
            <h1>Photo Gallery</h1>
            <p>Manage photos displayed in the homepage gallery</p>
          </div>
          {!isCreating && (
            <button className="create-btn" onClick={() => setIsCreating(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Photo
            </button>
          )}
        </div>

        {isCreating && (
          <div className="photo-form-container glass-card">
            <h2>{editingId ? 'Edit Photo' : 'Add New Photo'}</h2>
            <form onSubmit={handleSubmit} className="photo-form">
              <div className="form-group">
                <label>Photo</label>
                <div className="image-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                  />
                  {formData.image ? (
                    <div className="image-preview">
                      <img src={formData.image} alt="Preview" />
                      <button
                        type="button"
                        className="remove-image"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, image: '' }));
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      <span>Click to upload photo</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Enter photo title..."
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
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
                  {editingId ? 'Update Photo' : 'Add Photo'}
                </button>
              </div>
            </form>
          </div>
        )}

        {!isCreating && (
          <>
            {!photos || photos.length === 0 ? (
              <div className="empty-state glass-card">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <h3>No photos yet</h3>
                <p>Add photos to display in the homepage gallery.</p>
                <button className="create-btn" onClick={() => setIsCreating(true)}>
                  Add First Photo
                </button>
              </div>
            ) : (
              <div className="photos-grid">
                {photos.map((photo) => (
                  <div key={photo.id} className="photo-card glass-card">
                    <div className="photo-image">
                      <img src={photo.image} alt={photo.title} />
                      <span className={`publish-status ${photo.published ? 'published' : 'draft'}`}>
                        {photo.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <div className="photo-info">
                      <span className="photo-category">{photo.category}</span>
                      <h3>{photo.title}</h3>
                    </div>
                    <div className="photo-actions">
                      <button onClick={() => togglePublish(photo)} className="toggle-btn">
                        {photo.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button onClick={() => handleEdit(photo)} className="edit-btn">
                        Edit
                      </button>
                      {deleteConfirmId === photo.id ? (
                        <>
                          <button onClick={() => handleDelete(photo.id)} className="confirm-delete-btn">
                            Confirm
                          </button>
                          <button onClick={() => setDeleteConfirmId(null)} className="cancel-btn">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button onClick={() => setDeleteConfirmId(photo.id)} className="delete-btn">
                          Delete
                        </button>
                      )}
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

export default AdminPhotos;
