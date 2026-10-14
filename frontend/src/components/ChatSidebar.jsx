import "./ChatSidebar.css";
import { MessageCircle, Search , Plus  } from "lucide-react";



function ChatSidebar({ chats , selectedChat , setSelectedChat }) {
  return (
    <aside className="chat-sidebar">

      {/* Header */}
      <div className="sidebar-header">

        <div className="sidebar-title-row">

          <div className="chatapp-brand">
            <div className="chatapp-logo">
              <MessageCircle size={20}/>
            </div>

            <h1>ChatApp</h1>
          </div>

          <button
            className="new-chat-button"
            aria-label="New chat"
          >
            <Plus size={18}/>
          </button>

        </div>

        {/* Search */}
        <div className="search-box">
          <Search size={18}/>

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
            className={`chat-list-item ${chat.id === selectedChat ? "active" : "" }`}
            onClick={()=> setSelectedChat(chat.id)}
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