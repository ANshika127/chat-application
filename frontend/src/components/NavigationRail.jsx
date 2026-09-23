import "./NavigationRail.css";
import { Home , MessageCircle, Bell, Settings , LogOut } from "lucide-react";

function NavigationRail() {
  return (
    <aside className="navigation-rail">
      {/* User Avatar */}
      <button className="rail-avatar" aria-label="Profile">
        A
      </button>

      {/* Main Navigation */}
      <nav className="rail-navigation">
        <button className="rail-icon" aria-label="Home">
          <Home size={22}/>
        </button>

        <button
          className="rail-icon active"
          aria-label="Chats"
        >
          <MessageCircle size={22}/>
        </button>

        <button className="rail-icon" aria-label="Notifications">
          <Bell size={22}/>
        </button>

        <button className="rail-icon" aria-label="Settings">
          <Settings size={22}/>
        </button>
      </nav>

      {/* Bottom Actions */}
      <div className="rail-bottom">
        <button className="rail-icon" aria-label="Profile">
          <span className="profile-icon">A</span>
        </button>

        <button className="rail-icon" aria-label="Log out">
          <LogOut size={22}/>
        </button>
      </div>
    </aside>
  );
}

export default NavigationRail;