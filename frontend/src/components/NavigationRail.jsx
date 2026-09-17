import "./NavigationRail.css";

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
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M4 11.5 12 4l8 7.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 10v9h12v-9"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          className="rail-icon active"
          aria-label="Chats"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M21 11.5a8.5 8.5 0 1 1-3.6-6.9L21 4l-1 3.6a8.4 8.4 0 0 1 1 3.9Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button className="rail-icon" aria-label="Notifications">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M10 20a2 2 0 0 0 4 0"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <button className="rail-icon" aria-label="Settings">
          <svg viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="3"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-1c.6.5 1.3.9 2 1.2L10 21h4l.5-2.6c.7-.3 1.4-.7 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </nav>

      {/* Bottom Actions */}
      <div className="rail-bottom">
        <button className="rail-icon" aria-label="Profile">
          <span className="profile-icon">A</span>
        </button>

        <button className="rail-icon" aria-label="Log out">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="m16 17 5-5-5-5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 12H9"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </aside>
  );
}

export default NavigationRail;