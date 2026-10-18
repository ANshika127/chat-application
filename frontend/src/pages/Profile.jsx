import { useState, useCallback } from "react";
import { Pencil , LogOut } from "lucide-react";
import EditProfile from "./EditProfile";
import ConfirmationDialog from "../components/ConfirmationDialog";
import "./Profile.css";


const initialProfile = {
    name: "Anshika Sharma",
    username: "anshi.codes",
    email: "anshi@example.com",
    phone: "+91 98765 43210",
    dob: "2007-03-14",
    bio: "UI designer",
};

function formatDate(date){
  if (!date) return "";

  const parsedDate = new Date (`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())){
    return date;
  }

  return parsedDate.toLocaleDateString("en-GB",{
    day: "2-digit",
    month:"short",
    year:"numeric",
  });
}

function Profile( {onLogout} ){
  const [profile, setProfile ] = useState(initialProfile);
  const[isEditing, setIsEditing] = useState(false);
  const[showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogoutCancel = () =>{
    setShowLogoutDialog(false);
  };


  const handleSave = (updatedProfile) =>{
    setProfile((previous) => ({
      ...previous,
      ...updatedProfile,
    }));
    setIsEditing(false);
  };

  if(isEditing) {
    return (
      <EditProfile
        profile={profile}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />
    );
  }
 
  return (
    <main className="profile-page">
      <section className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar" aria-label="Profile Avatar"/>
          <div className="profile-identity">
            <h2>{profile.name}</h2>
            <p>@{profile.username}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="profile-detail-row">
            <span>Email</span>
            <span>{profile.email}</span>
          </div>

          <div className="profile-detail-row">
            <span>Phone</span>
            <span>{profile.phone}</span>
          </div>

          <div className="profile-detail-row">
            <span>Date of Birth</span>
            <span>{formatDate(profile.dob)}</span>
          </div>

          <div className="profile-detail-row">
            <span>Bio</span>
            <span>{profile.bio}</span>
          </div> 
        </div>

        <div className="profile-actions">
          <button 
            className="profile-button"
            onClick={()=> setIsEditing(true)}
          >
            <Pencil size={16}/>
            Edit profile
          </button>

          <button
            className="profile-button logout"
            onClick={() => setShowLogoutDialog(true)}
          >
            <LogOut size={16}/>
            Log out
          </button>
        </div>
      </section>
      {showLogoutDialog && (
        <ConfirmationDialog 
          title= "Log out of ChatApp?"
          description= "You'll need to log in again with your email and password to access your conversations."
          cancelLabel="Cancel"
          confirmLabel="Log out"
          danger={true}
          onCancel = {handleLogoutCancel}
          onConfirm={()=>{
            setShowLogoutDialog(false);
            onLogout();
          }}
        />
      )}

    </main>
    
  );
}

export default Profile;

