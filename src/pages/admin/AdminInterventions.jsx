import { useState } from 'react';
import { useInterventions, interventionService } from '../../hooks/useInterventionDB';
import AdminLayout from '../../components/AdminLayout';
import './AdminInterventions.css';

function AdminInterventions() {
  const interventions = useInterventions();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    image: '',
    color: '#10b981',
    published: false
  });

  const colorOptions = [
    { value: '#10b981', label: 'Green' },
    { value: '#3b82f6', label: 'Blue' },
    { value: '#ef4444', label: 'Red' },
    { value: '#8b5cf6', label: 'Purple' },
    { value: '#f59e0b', label: 'Orange' },
    { value: '#ec4899', label: 'Pink' },
  ];

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      image: '',
      color: '#10b981',
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
        await interventionService.updateIntervention(editingId, formData);
      } else {
        await interventionService.addIntervention(formData);
      }
      resetForm();
    } catch (error) {
      console.error('Failed to save intervention:', error);
    }
  };

  const handleEdit = (intervention) => {
    setEditingId(intervention.id);
    setFormData({
      title: intervention.title,
      description: intervention.description || '',
      content: intervention.content || '',
      image: intervention.image || '',
      color: intervention.color || '#10b981',
      published: intervention.published
    });
    setIsCreating(true);
  };

  const handleDelete = async (id) => {
    try {
      await interventionService.deleteIntervention(id);
      setDeleteConfirmId(null);
    } catch (error) {
      console.error('Failed to delete intervention:', error);
    }
  };

  const togglePublish = async (intervention) => {
    try {
      await interventionService.updateIntervention(intervention.id, { published: !intervention.published });
    } catch (error) {
      console.error('Failed to update intervention:', error);
    }
  };

  const generateUrl = (slug) => `/interventions/${slug}`;

  return (
    <AdminLayout>
      <div className="admin-interventions">
        <div className="page-header">
          <div>
            <h1>Intervention Management</h1>
            <p>Create and manage intervention programs</p>
          </div>
          {!isCreating && (
            <button className="create-btn" onClick={() => setIsCreating(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              New Intervention
            </button>
          )}
        </div>

        {isCreating && (
          <div className="intervention-form-container glass-card">
            <h2>{editingId ? 'Edit Intervention' : 'Create New Intervention'}</h2>
            <form onSubmit={handleSubmit} className="intervention-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Enter intervention title..."
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="color">Theme Color</label>
                  <div className="color-select">
                    <select
                      id="color"
                      value={formData.color}
                      onChange={(e) => handleChange('color', e.target.value)}
                    >
                      {colorOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="color-preview" style={{ backgroundColor: formData.color }}></div>
                  </div>
                </div>
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
                <label htmlFor="description">Short Description (for homepage card)</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Brief description for the homepage card..."
                  rows={3}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="content">Full Content (for detail page)</label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleChange('content', e.target.value)}
                  placeholder="Detailed content about this intervention..."
                  rows={8}
                />
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => handleChange('published', e.target.checked)}
                  />
                  <span>Publish immediately (shows on homepage and navbar)</span>
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  {editingId ? 'Update Intervention' : 'Create Intervention'}
                </button>
              </div>
            </form>
          </div>
        )}

        {!isCreating && (
          <>
            {!interventions || interventions.length === 0 ? (
              <div className="empty-state glass-card">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <h3>No interventions yet</h3>
                <p>Create your first intervention program to display on the website.</p>
                <button className="create-btn" onClick={() => setIsCreating(true)}>
                  Create First Intervention
                </button>
              </div>
            ) : (
              <div className="interventions-grid">
                {interventions.map((intervention) => (
                  <div key={intervention.id} className="intervention-card glass-card">
                    {intervention.image && (
                      <div className="intervention-image">
                        <img src={intervention.image} alt={intervention.title} />
                        <div className="intervention-color-bar" style={{ backgroundColor: intervention.color }}></div>
                      </div>
                    )}
                    <div className="intervention-card-content">
                      <div className="intervention-meta">
                        <span className={`publish-status ${intervention.published ? 'published' : 'draft'}`}>
                          {intervention.published ? 'Published' : 'Draft'}
                        </span>
                        <span className="intervention-url">{generateUrl(intervention.slug)}</span>
                      </div>
                      <h3>{intervention.title}</h3>
                      <p className="intervention-excerpt">
                        {intervention.description?.substring(0, 100)}...
                      </p>
                      <div className="intervention-actions">
                        <button onClick={() => togglePublish(intervention)} className="toggle-btn">
                          {intervention.published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button onClick={() => handleEdit(intervention)} className="edit-btn">
                          Edit
                        </button>
                        {deleteConfirmId === intervention.id ? (
                          <>
                            <button onClick={() => handleDelete(intervention.id)} className="confirm-delete-btn">
                              Confirm
                            </button>
                            <button onClick={() => setDeleteConfirmId(null)} className="cancel-btn">
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button onClick={() => setDeleteConfirmId(intervention.id)} className="delete-btn">
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

export default AdminInterventions;
