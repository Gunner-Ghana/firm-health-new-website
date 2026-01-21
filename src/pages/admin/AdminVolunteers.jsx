import { useState, useRef } from 'react';
import { useVolunteers } from '../../hooks/useVolunteerDB';
import volunteerService from '../../db/volunteerService';
import AdminLayout from '../../components/AdminLayout';
import './AdminVolunteers.css';

function AdminVolunteers() {
  const volunteers = useVolunteers();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [viewingVolunteer, setViewingVolunteer] = useState(null);
  const [uploadingImageId, setUploadingImageId] = useState(null);
  const fileInputRef = useRef(null);

  const handleEdit = (volunteer) => {
    setEditingId(volunteer.id);
    setEditForm({ ...volunteer });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveEdit = async () => {
    try {
      await volunteerService.updateVolunteer(editingId, editForm);
      setEditingId(null);
      setEditForm({});
    } catch (error) {
      console.error('Failed to update volunteer:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await volunteerService.deleteVolunteer(id);
      setDeleteConfirmId(null);
    } catch (error) {
      console.error('Failed to delete volunteer:', error);
    }
  };

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (volunteerId, event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        await volunteerService.updateProfileImage(volunteerId, reader.result);
        setUploadingImageId(null);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  const handleRemoveImage = async (volunteerId) => {
    try {
      await volunteerService.updateProfileImage(volunteerId, null);
    } catch (error) {
      console.error('Failed to remove image:', error);
    }
  };

  const handleToggleShowOnWebsite = async (volunteerId, currentValue) => {
    try {
      await volunteerService.toggleShowOnWebsite(volunteerId, !currentValue);
    } catch (error) {
      console.error('Failed to toggle show on website:', error);
    }
  };

  const triggerImageUpload = (volunteerId) => {
    setUploadingImageId(volunteerId);
    fileInputRef.current?.click();
  };

  return (
    <AdminLayout>
      <div className="admin-volunteers">
        <div className="page-header">
          <h1>Volunteer Management</h1>
          <p>Manage and review volunteer applications</p>
        </div>

        <div className="volunteers-stats">
          <div className="mini-stat glass-card">
            <span className="mini-stat-number">{volunteers?.length || 0}</span>
            <span className="mini-stat-label">Total</span>
          </div>
          <div className="mini-stat glass-card">
            <span className="mini-stat-number">{volunteers?.filter(v => v.status === 'pending').length || 0}</span>
            <span className="mini-stat-label">Pending</span>
          </div>
          <div className="mini-stat glass-card">
            <span className="mini-stat-number">{volunteers?.filter(v => v.status === 'approved').length || 0}</span>
            <span className="mini-stat-label">Approved</span>
          </div>
          <div className="mini-stat glass-card">
            <span className="mini-stat-number">{volunteers?.filter(v => v.showOnWebsite).length || 0}</span>
            <span className="mini-stat-label">On Website</span>
          </div>
        </div>

        {/* Hidden file input for image upload */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={(e) => {
            if (uploadingImageId) {
              handleImageUpload(uploadingImageId, e);
            }
          }}
        />

        {!volunteers || volunteers.length === 0 ? (
          <div className="empty-state glass-card">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
            <h3>No volunteers yet</h3>
            <p>Volunteer applications will appear here once submitted.</p>
          </div>
        ) : (
          <div className="volunteers-grid">
            {volunteers.map((volunteer) => (
              <div key={volunteer.id} className="volunteer-card glass-card">
                {editingId === volunteer.id ? (
                  <div className="edit-form">
                    <div className="edit-row">
                      <input
                        type="text"
                        value={editForm.firstName || ''}
                        onChange={(e) => handleEditChange('firstName', e.target.value)}
                        placeholder="First Name"
                      />
                      <input
                        type="text"
                        value={editForm.lastName || ''}
                        onChange={(e) => handleEditChange('lastName', e.target.value)}
                        placeholder="Last Name"
                      />
                    </div>
                    <input
                      type="email"
                      value={editForm.email || ''}
                      onChange={(e) => handleEditChange('email', e.target.value)}
                      placeholder="Email"
                    />
                    <input
                      type="tel"
                      value={editForm.phone || ''}
                      onChange={(e) => handleEditChange('phone', e.target.value)}
                      placeholder="Phone"
                    />
                    <input
                      type="text"
                      value={editForm.occupation || ''}
                      onChange={(e) => handleEditChange('occupation', e.target.value)}
                      placeholder="Occupation"
                    />
                    <select
                      value={editForm.status || 'pending'}
                      onChange={(e) => handleEditChange('status', e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <textarea
                      value={editForm.biography || ''}
                      onChange={(e) => handleEditChange('biography', e.target.value)}
                      placeholder="Biography (displayed on the website)"
                      rows={4}
                    />
                    <div className="edit-actions">
                      <button onClick={handleSaveEdit} className="save-btn">Save</button>
                      <button onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="volunteer-header">
                      <div className="volunteer-avatar-wrapper">
                        {volunteer.profileImage ? (
                          <img
                            src={volunteer.profileImage}
                            alt={`${volunteer.firstName} ${volunteer.lastName}`}
                            className="volunteer-avatar-image"
                          />
                        ) : (
                          <div className="volunteer-avatar">
                            {volunteer.firstName?.charAt(0)}{volunteer.lastName?.charAt(0)}
                          </div>
                        )}
                        <button
                          className="avatar-upload-btn"
                          onClick={() => triggerImageUpload(volunteer.id)}
                          title="Upload photo"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                          </svg>
                        </button>
                        {volunteer.profileImage && (
                          <button
                            className="avatar-remove-btn"
                            onClick={() => handleRemoveImage(volunteer.id)}
                            title="Remove photo"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                      <div className="volunteer-info">
                        <h3>{volunteer.firstName} {volunteer.lastName}</h3>
                        <p>{volunteer.email}</p>
                      </div>
                      <span className={`status-badge status-${volunteer.status}`}>
                        {volunteer.status}
                      </span>
                    </div>
                    <div className="volunteer-details">
                      <div className="detail-item">
                        <span className="detail-label">Phone</span>
                        <span className="detail-value">{volunteer.phone || '-'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Occupation</span>
                        <span className="detail-value">{volunteer.occupation}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Availability</span>
                        <span className="detail-value">{volunteer.availability}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Applied</span>
                        <span className="detail-value">{new Date(volunteer.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Show on Website Toggle */}
                    <div className="website-toggle">
                      <label className="toggle-label">
                        <span>Show on Website</span>
                        <button
                          className={`toggle-switch ${volunteer.showOnWebsite ? 'active' : ''}`}
                          onClick={() => handleToggleShowOnWebsite(volunteer.id, volunteer.showOnWebsite)}
                          disabled={volunteer.status !== 'approved'}
                          title={volunteer.status !== 'approved' ? 'Volunteer must be approved first' : ''}
                        >
                          <span className="toggle-slider"></span>
                        </button>
                      </label>
                      {volunteer.status !== 'approved' && (
                        <span className="toggle-hint">Approve volunteer first</span>
                      )}
                    </div>

                    {volunteer.skills?.length > 0 && (
                      <div className="volunteer-skills">
                        {volunteer.skills.map((skill, idx) => (
                          <span key={idx} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    )}
                    <div className="volunteer-actions">
                      <button onClick={() => setViewingVolunteer(volunteer)} className="view-btn">View</button>
                      <button onClick={() => handleEdit(volunteer)} className="edit-btn">Edit</button>
                      {deleteConfirmId === volunteer.id ? (
                        <>
                          <button onClick={() => handleDelete(volunteer.id)} className="confirm-delete-btn">Confirm</button>
                          <button onClick={() => setDeleteConfirmId(null)} className="cancel-btn">Cancel</button>
                        </>
                      ) : (
                        <button onClick={() => setDeleteConfirmId(volunteer.id)} className="delete-btn">Delete</button>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* View Modal */}
        {viewingVolunteer && (
          <div className="modal-overlay" onClick={() => setViewingVolunteer(null)}>
            <div className="modal glass-card" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setViewingVolunteer(null)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="modal-header">
                {viewingVolunteer.profileImage ? (
                  <img
                    src={viewingVolunteer.profileImage}
                    alt={`${viewingVolunteer.firstName} ${viewingVolunteer.lastName}`}
                    className="volunteer-avatar-image large"
                  />
                ) : (
                  <div className="volunteer-avatar large">
                    {viewingVolunteer.firstName?.charAt(0)}{viewingVolunteer.lastName?.charAt(0)}
                  </div>
                )}
                <h2>{viewingVolunteer.firstName} {viewingVolunteer.lastName}</h2>
                <span className={`status-badge status-${viewingVolunteer.status}`}>
                  {viewingVolunteer.status}
                </span>
              </div>
              <div className="modal-content">
                <div className="modal-section">
                  <h4>Contact Information</h4>
                  <p><strong>Email:</strong> {viewingVolunteer.email}</p>
                  <p><strong>Phone:</strong> {viewingVolunteer.phone || '-'}</p>
                </div>
                <div className="modal-section">
                  <h4>Professional</h4>
                  <p><strong>Occupation:</strong> {viewingVolunteer.occupation}</p>
                  <p><strong>Availability:</strong> {viewingVolunteer.availability}</p>
                </div>
                {viewingVolunteer.skills?.length > 0 && (
                  <div className="modal-section">
                    <h4>Skills</h4>
                    <div className="volunteer-skills">
                      {viewingVolunteer.skills.map((skill, idx) => (
                        <span key={idx} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
                {viewingVolunteer.experience && (
                  <div className="modal-section">
                    <h4>Experience</h4>
                    <p>{viewingVolunteer.experience}</p>
                  </div>
                )}
                {viewingVolunteer.motivation && (
                  <div className="modal-section">
                    <h4>Motivation</h4>
                    <p>{viewingVolunteer.motivation}</p>
                  </div>
                )}
                {viewingVolunteer.biography && (
                  <div className="modal-section">
                    <h4>Biography</h4>
                    <p>{viewingVolunteer.biography}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminVolunteers;
