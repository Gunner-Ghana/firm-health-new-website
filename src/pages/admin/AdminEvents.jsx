import { useState } from 'react';
import { useEvents, eventService } from '../../hooks/useEventDB';
import AdminLayout from '../../components/AdminLayout';
import './AdminEvents.css';

function AdminEvents() {
  const events = useEvents();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    type: 'screening',
    published: false
  });

  const eventTypes = [
    { value: 'screening', label: 'Health Screening', color: '#10b981' },
    { value: 'donation', label: 'Blood Donation', color: '#ef4444' },
    { value: 'workshop', label: 'Workshop', color: '#3b82f6' },
    { value: 'feeding', label: 'Feed the Aged', color: '#f59e0b' },
    { value: 'training', label: 'Training', color: '#8b5cf6' },
    { value: 'fair', label: 'Health Fair', color: '#ec4899' },
  ];

  const getEventTypeColor = (type) => {
    const eventType = eventTypes.find(t => t.value === type);
    return eventType ? eventType.color : '#10b981';
  };

  const getEventTypeLabel = (type) => {
    const eventType = eventTypes.find(t => t.value === type);
    return eventType ? eventType.label : type;
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      type: 'screening',
      published: false
    });
    setIsCreating(false);
    setEditingId(null);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await eventService.updateEvent(editingId, formData);
      } else {
        await eventService.addEvent(formData);
      }
      resetForm();
    } catch (error) {
      console.error('Failed to save event:', error);
    }
  };

  const handleEdit = (event) => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      type: event.type,
      published: event.published
    });
    setIsCreating(true);
  };

  const handleDelete = async (id) => {
    try {
      await eventService.deleteEvent(id);
      setDeleteConfirmId(null);
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  const togglePublish = async (event) => {
    try {
      await eventService.updateEvent(event.id, { published: !event.published });
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <AdminLayout>
      <div className="admin-events">
        <div className="page-header">
          <div>
            <h1>Event Management</h1>
            <p>Create and manage upcoming events</p>
          </div>
          {!isCreating && (
            <button className="create-btn" onClick={() => setIsCreating(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              New Event
            </button>
          )}
        </div>

        {isCreating && (
          <div className="event-form-container glass-card">
            <h2>{editingId ? 'Edit Event' : 'Create New Event'}</h2>
            <form onSubmit={handleSubmit} className="event-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Event Title</label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Enter event title..."
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="type">Event Type</label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                    required
                  >
                    {eventTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    type="text"
                    id="time"
                    value={formData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    placeholder="e.g., 9:00 AM - 5:00 PM"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="Enter event location..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Describe the event..."
                  rows={4}
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
                  {editingId ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        )}

        {!isCreating && (
          <>
            {!events || events.length === 0 ? (
              <div className="empty-state glass-card">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <h3>No events yet</h3>
                <p>Create your first event to display on the Events page.</p>
                <button className="create-btn" onClick={() => setIsCreating(true)}>
                  Create First Event
                </button>
              </div>
            ) : (
              <div className="events-grid">
                {events.map((event) => (
                  <div key={event.id} className="event-card glass-card">
                    <div className="event-card-header">
                      <span
                        className="event-type-badge"
                        style={{
                          backgroundColor: `${getEventTypeColor(event.type)}20`,
                          color: getEventTypeColor(event.type)
                        }}
                      >
                        {getEventTypeLabel(event.type)}
                      </span>
                      <span className={`publish-status ${event.published ? 'published' : 'draft'}`}>
                        {event.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <h3>{event.title}</h3>
                    <div className="event-details">
                      <div className="event-detail">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="event-detail">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{event.time}</span>
                      </div>
                      <div className="event-detail">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="event-description">{event.description}</p>
                    <div className="event-actions">
                      <button onClick={() => togglePublish(event)} className="toggle-btn">
                        {event.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button onClick={() => handleEdit(event)} className="edit-btn">
                        Edit
                      </button>
                      {deleteConfirmId === event.id ? (
                        <>
                          <button onClick={() => handleDelete(event.id)} className="confirm-delete-btn">
                            Confirm
                          </button>
                          <button onClick={() => setDeleteConfirmId(null)} className="cancel-btn">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button onClick={() => setDeleteConfirmId(event.id)} className="delete-btn">
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

export default AdminEvents;
