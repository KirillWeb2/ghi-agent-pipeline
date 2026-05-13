import { useState } from 'react';
import './ProfilePage.css';

const mockUser = {
  id: 1,
  name: 'John Doe',
  description: 'Full-stack developer passionate about building web apps',
  email: 'john.doe@example.com',
  city: 'San Francisco, CA',
  registrationDate: '2024-01-15',
  avatar: 'https://via.placeholder.com/150?text=JD',
};

export default function Profile() {
  const [profileData, setProfileData] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(mockUser);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.description || formData.description.trim().length < 5) {
      errors.description = 'Description must be at least 5 characters';
    }

    if (!formData.city || formData.city.trim().length < 2) {
      errors.city = 'City must be at least 2 characters';
    }

    return errors;
  };

  const handleEditClick = () => {
    setFormData(profileData);
    setFormErrors({});
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(profileData);
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSave = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setProfileData(formData);
      setIsEditing(false);
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <main className="profile-main">
      <div className="profile-container">
        <h1>My Profile</h1>

        {!isEditing ? (
          <>
            <section className="profile-header">
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="profile-avatar"
              />
              <div className="profile-header-info">
                <h2>{profileData.name}</h2>
                <p className="profile-description">{profileData.description}</p>
              </div>
            </section>

            <section className="profile-details">
              <h2>Account Information</h2>
              <div className="profile-details-grid">
                <div className="profile-field">
                  <label>Email</label>
                  <p>{profileData.email}</p>
                </div>
                <div className="profile-field">
                  <label>City</label>
                  <p>{profileData.city}</p>
                </div>
                <div className="profile-field">
                  <label>Member Since</label>
                  <p>{new Date(profileData.registrationDate).toLocaleDateString()}</p>
                </div>
                <div className="profile-field">
                  <label>User ID</label>
                  <p>#{profileData.id}</p>
                </div>
              </div>
            </section>

            <div className="profile-actions">
              <button
                className="btn btn-primary"
                onClick={handleEditClick}
              >
                Edit Profile
              </button>
            </div>
          </>
        ) : (
          <>
            <section className="profile-edit-form">
              <h2>Edit Profile</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={formErrors.name ? 'input-error' : ''}
                  />
                  {formErrors.name && (
                    <span className="error-message">{formErrors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={formErrors.email ? 'input-error' : ''}
                  />
                  {formErrors.email && (
                    <span className="error-message">{formErrors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="description">About You</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={formErrors.description ? 'input-error' : ''}
                    rows="4"
                  />
                  {formErrors.description && (
                    <span className="error-message">{formErrors.description}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={formErrors.city ? 'input-error' : ''}
                  />
                  {formErrors.city && (
                    <span className="error-message">{formErrors.city}</span>
                  )}
                </div>
              </form>
            </section>

            <div className="profile-actions">
              <button
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save Changes
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
