import { useState, useRef } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { useSponsors, sponsorService } from '../../hooks/useSponsorDB';
import './AdminSponsors.css';

function AdminSponsors() {
  const sponsors = useSponsors();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    image: '',
    published: true
  });
  const fileInputRef = useRef(null);

  const resetForm = () => {
    setFormData({ name: '', website: '', image: '', published: true });
    setEditingId(null);
    setShowForm(false);
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
    if (!formData.name.trim()) return;

    if (editingId) {
      await sponsorService.updateSponsor(editingId, formData);
    } else {
      await sponsorService.addSponsor(formData);
    }
    resetForm();
  };

  const handleEdit = (sponsor) => {
    setFormData({
      name: sponsor.name,
      website: sponsor.website || '',
      image: sponsor.image || '',
      published: sponsor.published
    });
    setEditingId(sponsor.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await sponsorService.deleteSponsor(id);
    setDeletingId(null);
  };

  const handleTogglePublish = async (sponsor) => {
    await sponsorService.updateSponsor(sponsor.id, { published: !sponsor.published });
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-sponsors">
          <div className="page-header">
            <div>
              <h1>Sponsors & Partners</h1>
              <p>Manage sponsors and partners displayed on the homepage</p>
            </div>
            {!showForm && (
              <button className="create-btn" onClick={() => setShowForm(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Sponsor
              </button>
            )}
          </div>

          {showForm && (
            <div className="glass-card sponsor-form-container">
              <h2>{editingId ? 'Edit Sponsor' : 'Add New Sponsor'}</h2>
              <form className="sponsor-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Sponsor Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter sponsor name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Website URL</label>
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Sponsor Logo *</label>
                  <div className="image-upload">
                    {formData.image ? (
                      <div className="image-preview sponsor-preview">
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
                        <span>Click to upload logo</span>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                    />
                    Published (visible on homepage)
                  </label>
                </div>

                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={resetForm}>Cancel</button>
                  <button type="submit" className="save-btn">
                    {editingId ? 'Save Changes' : 'Add Sponsor'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {sponsors && sponsors.length > 0 ? (
            <div className="sponsors-grid">
              {sponsors.map((sponsor) => (
                <div key={sponsor.id} className="glass-card sponsor-card">
                  <div className="sponsor-card-image">
                    {sponsor.image ? (
                      <img src={sponsor.image} alt={sponsor.name} />
                    ) : (
                      <div className="sponsor-card-placeholder">
                        <span>{sponsor.name.substring(0, 3).toUpperCase()}</span>
                      </div>
                    )}
                    <span className={`publish-status ${sponsor.published ? 'published' : 'draft'}`}>
                      {sponsor.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <div className="sponsor-card-info">
                    <h3>{sponsor.name}</h3>
                    {sponsor.website && (
                      <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="sponsor-website">
                        {sponsor.website}
                      </a>
                    )}
                  </div>
                  <div className="sponsor-card-actions">
                    <button className="toggle-btn" onClick={() => handleTogglePublish(sponsor)}>
                      {sponsor.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button className="edit-btn" onClick={() => handleEdit(sponsor)}>Edit</button>
                    {deletingId === sponsor.id ? (
                      <>
                        <button className="confirm-delete-btn" onClick={() => handleDelete(sponsor.id)}>Confirm</button>
                        <button className="cancel-btn" onClick={() => setDeletingId(null)}>Cancel</button>
                      </>
                    ) : (
                      <button className="delete-btn" onClick={() => setDeletingId(sponsor.id)}>Delete</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card empty-state">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
              </svg>
              <h3>No Sponsors Added</h3>
              <p>Add your first sponsor or partner to display on the homepage.</p>
              <button className="create-btn" onClick={() => setShowForm(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Sponsor
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminSponsors;
