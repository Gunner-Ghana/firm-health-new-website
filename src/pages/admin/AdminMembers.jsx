import { useState, useRef } from 'react';
import { useMembersByType, memberService } from '../../hooks/useMemberDB';
import AdminLayout from '../../components/AdminLayout';
import './AdminMembers.css';

function AdminMembers() {
  const [activeTab, setActiveTab] = useState('board');
  const boardMembers = useMembersByType('board');
  const teamMembers = useMembersByType('team');
  const members = activeTab === 'board' ? boardMembers : teamMembers;

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    position: '',
    email: '',
    image: '',
    shortBio: '',
    fullBio: '',
    type: 'board',
    published: true
  });

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      position: '',
      email: '',
      image: '',
      shortBio: '',
      fullBio: '',
      type: activeTab,
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
    try {
      if (editingId) {
        await memberService.updateMember(editingId, formData);
      } else {
        await memberService.addMember({ ...formData, type: activeTab });
      }
      resetForm();
    } catch (error) {
      console.error('Failed to save member:', error);
    }
  };

  const handleEdit = (member) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      role: member.role,
      position: member.position,
      email: member.email,
      image: member.image || '',
      shortBio: member.shortBio,
      fullBio: member.fullBio,
      type: member.type,
      published: member.published
    });
    setIsCreating(true);
  };

  const handleDelete = async (id) => {
    try {
      await memberService.deleteMember(id);
      setDeleteConfirmId(null);
    } catch (error) {
      console.error('Failed to delete member:', error);
    }
  };

  const togglePublish = async (member) => {
    try {
      await memberService.updateMember(member.id, { published: !member.published });
    } catch (error) {
      console.error('Failed to update member:', error);
    }
  };

  const startCreating = () => {
    setFormData(prev => ({ ...prev, type: activeTab }));
    setIsCreating(true);
  };

  return (
    <AdminLayout>
      <div className="admin-members">
        <div className="page-header">
          <div>
            <h1>Members Management</h1>
            <p>Manage board members and management team</p>
          </div>
          {!isCreating && (
            <button className="create-btn" onClick={startCreating}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add {activeTab === 'board' ? 'Board Member' : 'Team Member'}
            </button>
          )}
        </div>

        {/* Tabs */}
        {!isCreating && (
          <div className="member-tabs">
            <button
              className={`tab-btn ${activeTab === 'board' ? 'active' : ''}`}
              onClick={() => setActiveTab('board')}
            >
              Board Members
              <span className="tab-count">{boardMembers?.length || 0}</span>
            </button>
            <button
              className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
              onClick={() => setActiveTab('team')}
            >
              Management Team
              <span className="tab-count">{teamMembers?.length || 0}</span>
            </button>
          </div>
        )}

        {isCreating && (
          <div className="member-form-container glass-card">
            <h2>{editingId ? 'Edit Member' : `Add New ${activeTab === 'board' ? 'Board Member' : 'Team Member'}`}</h2>
            <form onSubmit={handleSubmit} className="member-form">
              <div className="form-group">
                <label>Profile Photo</label>
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
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                      <span>Click to upload photo</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Enter full name..."
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="email@firmhealth.org"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <input
                    type="text"
                    id="role"
                    value={formData.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                    placeholder="e.g., Chairperson, Executive Director..."
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="position">Position</label>
                  <input
                    type="text"
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleChange('position', e.target.value)}
                    placeholder="e.g., Board Chair, CEO..."
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="shortBio">Short Bio</label>
                <input
                  type="text"
                  id="shortBio"
                  value={formData.shortBio}
                  onChange={(e) => handleChange('shortBio', e.target.value)}
                  placeholder="Brief description (shown on card)..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="fullBio">Full Biography</label>
                <textarea
                  id="fullBio"
                  value={formData.fullBio}
                  onChange={(e) => handleChange('fullBio', e.target.value)}
                  placeholder="Detailed biography (shown in modal)..."
                  rows={5}
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
                  {editingId ? 'Update Member' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        )}

        {!isCreating && (
          <>
            {!members || members.length === 0 ? (
              <div className="empty-state glass-card">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                <h3>No {activeTab === 'board' ? 'board members' : 'team members'} yet</h3>
                <p>Add {activeTab === 'board' ? 'board members' : 'management team members'} to display on the website.</p>
                <button className="create-btn" onClick={startCreating}>
                  Add First Member
                </button>
              </div>
            ) : (
              <div className="members-grid">
                {members.map((member) => (
                  <div key={member.id} className="member-card glass-card">
                    <div className="member-image">
                      {member.image ? (
                        <img src={member.image} alt={member.name} />
                      ) : (
                        <div className="member-placeholder">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                          </svg>
                        </div>
                      )}
                      <span className={`publish-status ${member.published ? 'published' : 'draft'}`}>
                        {member.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <div className="member-info">
                      <h3>{member.name}</h3>
                      <p className="member-role">{member.role}</p>
                      <p className="member-position">{member.position}</p>
                      <p className="member-bio">{member.shortBio}</p>
                    </div>
                    <div className="member-actions">
                      <button onClick={() => togglePublish(member)} className="toggle-btn">
                        {member.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button onClick={() => handleEdit(member)} className="edit-btn">
                        Edit
                      </button>
                      {deleteConfirmId === member.id ? (
                        <>
                          <button onClick={() => handleDelete(member.id)} className="confirm-delete-btn">
                            Confirm
                          </button>
                          <button onClick={() => setDeleteConfirmId(null)} className="cancel-btn">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button onClick={() => setDeleteConfirmId(member.id)} className="delete-btn">
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

export default AdminMembers;
