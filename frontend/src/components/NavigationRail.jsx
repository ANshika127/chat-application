import { useState } from "react";
import "./NavigationRail.css";
import { Home , MessageCircle, Bell, Settings , LogOut } from "lucide-react";
import ConfirmationDialog from "./ConfirmationDialog";

function NavigationRail({ activeView , setActiveView, onLogout }) {

  const [ showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogoutCancel = () => {
    setShowLogoutDialog(false);
    
  };

  return (
    <aside className="navigation-rail">
      {/* User Avatar */}
      <button 
        className="rail-avatar" 
        aria-label="Profile"
        onClick={()=> setActiveView("profile")}
      >
        A
      </button>

      {/* Main Navigation */}
      <nav className="rail-navigation">
        <button 
          className="rail-icon" 
          aria-label="Home"
          onClick={()=> setActiveView("chats")}
        >
          <Home size={22}/>
        </button>

        <button
          className={`rail-icon ${activeView === "chats" ? "active": ""}`}
          aria-label="Chats"
          onClick={()=> setActiveView("chats")}
        >
          <MessageCircle size={22}/>
        </button>

        <button 
          className="rail-icon" 
          aria-label="Notifications"
        >
          <Bell size={22}/>
        </button>

        <button 
          className={`rail-icon ${activeView === "settings" ? "active" : ""}`}
          aria-label="Settings"
          onClick={()=> setActiveView("settings")}
        >
          <Settings size={22}/>
        </button>
      </nav>

      {/* Bottom Actions */}
      <div className="rail-bottom">
        <button 
          className={`rail-icon ${activeView === "profile" ? "active" : ""}`}
          aria-label="Profile"
          onClick={()=> setActiveView("profile")}
        >
          <span className="profile-icon">A</span>
        </button>

        <button 
          className="rail-icon" 
          aria-label="Log out"
          onClick={() => setShowLogoutDialog(true)}
        >
          <LogOut size={22}/>
        </button>
      </div>

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
    </aside>
  );
}

export default NavigationRail;