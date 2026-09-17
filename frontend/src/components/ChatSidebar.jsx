import "./ChatSidebar.css";

const chats = [
  {
    id: 1,
    name: "Abhay",
    message: "Nice!",
    time: "9:16 AM",
    unread: 0,
    avatar: "A",
    avatarColor: "avatar-orange",
    active: true,
  },
  {
    id: 2,
    name: "Jaini",
    message: "See you tomorrow then",
    time: "Yesterday",
    unread: 2,
    avatar: "J",
    avatarColor: "avatar-blue",
    active: false,
  },
  {
    id: 3,
    name: "Jasmine",
    message: "No messages yet",
    time: "",
    unread: 0,
    avatar: "J",
    avatarColor: "avatar-purple",
    active: false,
  },
  {
    id: 4,
    name: "Mom",
    message: "Call me when free",
    time: "Mon",
    unread: 1,
    avatar: "M",
    avatarColor: "avatar-yellow",
    active: false,
  },
  {
    id: 5,
    name: "Papa",
    message: "OK, sounds good",
    time: "Mon",
    unread: 0,
    avatar: "P",
    avatarColor: "avatar-green",
    active: false,
  },
];

function ChatSidebar() {
  return (
    <aside className="chat-sidebar">

      {/* Header */}
      <div className="sidebar-header">

        <div className="sidebar-title-row">

          <div className="chatapp-brand">
            <div className="chatapp-logo">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 5.5A3.5 3.5 0 0 1 8.5 2H16a3.5 3.5 0 0 1 3.5 3.5v6A3.5 3.5 0 0 1 16 15h-5.5L6 19v-4.5A3.5 3.5 0 0 1 2.5 11V5.5A3.5 3.5 0 0 1 5 5.5Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h1>ChatApp</h1>
          </div>

          <button
            className="new-chat-button"
            aria-label="New chat"
          >
            +
          </button>

        </div>

        {/* Search */}
        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none">
            <circle
              cx="11"
              cy="11"
              r="6.5"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="m16 16 4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>

          <input
            type="text"
            placeholder="Search conversations"
            aria-label="Search conversations"
          />
        </div>

      </div>

      {/* Chat List */}
      <div className="chat-list">

        <div className="chat-list-heading">
          Chats
        </div>

        {chats.map((chat) => (
          <button
            key={chat.id}
            className={`chat-list-item ${
              chat.active ? "active" : ""
            }`}
          >

            <div className={`chat-avatar ${chat.avatarColor}`}>
              {chat.avatar}
            </div>

            <div className="chat-preview">

              <div className="chat-name-row">
                <span className="chat-name">
                  {chat.name}
                </span>

                {chat.time && (
                  <span className="chat-time">
                    {chat.time}
                  </span>
                )}
              </div>

              <div className="chat-message-row">

                <span className="last-message">
                  {chat.message}
                </span>

                {chat.unread > 0 && (
                  <span className="unread-badge">
                    {chat.unread}
                  </span>
                )}

              </div>

            </div>

          </button>
        ))}

      </div>

    </aside>
  );
}

export default ChatSidebar;