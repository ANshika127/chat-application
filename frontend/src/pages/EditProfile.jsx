import { useState } from "react";
import "./EditProfile.css";

function EditProfile({ profile, onSave, onCancel }) {
  const [formData , setFormData] = useState({
    name: profile.name,
    username: profile.username,
    bio: profile.bio,
    phone: profile.phone,
    dob: profile.dob,
  });

  const handleChange = (event) => {
    const {name ,value} = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event)=> {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <main className="edit-profile-page">
      <form className="edit-profile-card" onSubmit={handleSubmit}>
        <header className="edit-profile-header">
          <h1>Edit profile</h1>
          <p>Update how you appear to others.</p>
        </header>

        <div className="edit-avatar-section">
          <div className="edit-profile-avatar"/>
            <button 
              type="button"
              className="change-photo-button"
              onClick={() => alert("Photo upload will be added later")}
            >
              Change photo
            </button>
        </div>

        <div className="edit-form-field">
          <label htmlFor="edit-name">Name</label>
          <input 
            id ="edit-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="edit-form-field">
          <label htmlFor="edit-username">Username</label>
          <input 
            id ="edit-username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="edit-form-field">
          <label htmlFor="edit-bio">Bio</label>
          <textarea
            id ="edit-bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="edit-form-row">
          <div className="edit-form-field">
            <label htmlFor="edit-phone">Phone</label>
            <input 
              id ="edit-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="edit-form-field">
            <label htmlFor="edit-dob">Date of birth</label>
            <input 
              id ="edit-dob"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="edit-profile-actions">
          <button
            type="button"
            className="edit-cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button 
            type="submit"
            className="edit-save-button"
          >
            Save Changes
          </button>
        </div>
      </form>
    </main>
  );
}

export default EditProfile;
