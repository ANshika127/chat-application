import { useState } from "react";
import { UserRound, ChevronRight, Sun, Moon,Bell, Volume2, Shield, LogOut } from "lucide-react";
import ConfirmationDialog from "../components/ConfirmationDialog";
import "./Settings.css";

function Settings({ onOpenProfile, onLogout }){
  const[ theme, setTheme] = useState("light");
  const[messageNotifications, setMessageNotifications] = useState(true);
  const[soundEnabled, setSoundEnabled] = useState(true);
  const[showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogoutCancel=() =>{
    setShowLogoutDialog(false);
  };

  const handleLogoutConfirm = () =>{
    setShowLogoutDialog(false);
    onLogout();
    
  };

  return (
    <main className="settings-page">
      <header className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account and perferences.</p>
      </header>

      <div className="settings-content">
        <section className="settings-section">
          <h2>Account</h2>

          <button
            type="button"
            className="settings-card settings-account-card"
            onClick={ onOpenProfile }
          >
            <div className="settings-row-info">
              <h3>Anshika Sharma</h3>
              <p>@anshi.codes</p>
            </div>
            <ChevronRight size={20} />
          </button>
        </section>

        <section className="settings-section">
          <h2>Appearence</h2>

          <div className="settings-card">
            <div className="settings-row">
              <div className="settings-icon">
                <Moon size={19} />
              </div>

              <div className="settings-row-info">
                <h3>Theme</h3>
                <p>Choose how ChatApp looks</p>
              </div>
            </div>

            <div className="settings-theme-options">
              <button
                type="button"
                className={`settings-theme-option ${
                  theme === "light" ? "selected" :""
                }`}
                aria-pressed={theme === "light"}
                onClick={() => setTheme("light")}
              >
                <Sun size={17} />
                Light
              </button>

              <button 
                type="button"
                className={`settings-theme-option ${
                  theme === "dark" ? "selected" : ""
                }`}
                aria-pressed = {theme === "dark"}
                onClick={()=> setTheme("dark")}
              >
                <Moon size={17} />
                Dark
              </button>
            </div>
          </div>
        </section>

        <section className="settings-section">
          <h2>Notification</h2> 
          <div className="settings-card">
            <div className="settings-row">
              <div className="settings-icon">
                <Bell size={19} />
              </div>

              <div className="settings-row-info">
                <h3>Message notifications</h3>
                <p>Get Notified about new messages.</p>
              </div>

              <button
                type="button"
                role="switch"
                aria-label="Message notifications"
                aria-checked={messageNotifications}
                className={`settings-switch ${messageNotifications ? "enabled" : ""}`}
                onClick={()=>
                  setMessageNotifications((previous)=> !previous)
                }
              >
                <span/>
              </button>
            </div>

            <div className="settings-divider"/>
            <div className="settings-row"> 
              <div className="settings-icon">
                <Volume2 size={19} />
              </div>

              <div className="settings-row-info">
                <h3>Sound</h3>
                <p>Play a sound for notification.</p>
              </div>

              <button 
                type="button"
                role="switch"
                aria-label="Notification sound"
                aria-checked={soundEnabled}
                className={`settings-switch ${
                  soundEnabled ? "enabled" : ""
                }`}
                onClick={()=> setSoundEnabled((previous)=> !previous)}
              >
                <span/>
              </button>
            </div>
          </div>
        </section>

      {/* Privacy */}
        <section className="settings-section">
          <h2>Privacy</h2>

          <button
            type="button"
            className="settings-card settings-privacy-button"
            onClick={() => alert("Blocked users will be implemented later.")}
          >
            <div className="settings-icon">
              <Shield size={19} />
            </div>

            <div className="settings-row-info">
              <h3>Blocked users</h3>
              <p>Manage people you've blocked.</p>
            </div>

            <ChevronRight size={20} />
          </button>
        </section>

        {/* Logout */}
        <section className="settings-section settings-logout-section">
          <button
            type="button"
            className="settings-logout-button"
            onClick={() => {
              setShowLogoutDialog(true);
            }}
          >
            <LogOut size={18} />
            Log out
          </button>
        </section>
      </div>

       {showLogoutDialog && (
        <ConfirmationDialog
          title="Log out of ChatApp?"
          description="You'll need to log in again with your email and password to access your conversations."
          cancelLabel="Cancel"
          confirmLabel="Log out"
          danger={true}
          onCancel={handleLogoutCancel}
          onConfirm={handleLogoutConfirm}
        />
      )}
    </main>
  );
}
export default Settings;