import { useState } from "react";
import { MessageCircle, Search , Plus  } from "lucide-react";
import NewChatModal from "./NewChatModal";
import "./ChatSidebar.css";

function ChatSidebar({ chats , selectedChat , setSelectedChat, onNewChat }) {

  const [searchQuery, setSearchQuery] = useState("");
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);

  const filteredChats = chats.filter((chat)=>{
    const query = searchQuery.toLowerCase().trim();

    return (
      chat.name.toLowerCase().includes(query) || 
      (chat.message || "").toLowerCase().includes(query)
    );
  });

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
            onClick= {() => setIsNewChatOpen(true)}
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
            value={searchQuery}
            onChange={(event)=> setSearchQuery(event.target.value)}
          />
        </div>

      </div>

      {/* Chat List */}
      <div className="chat-list">

        <div className="chat-list-heading">
          Chats
        </div>

        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
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
          ))
        ) : (
          <div className="no-search-results">
            No conversations found
          </div>
        )}
      </div>

      {isNewChatOpen && (
        <NewChatModal
        onClose ={()=> setIsNewChatOpen(false)}
        onSelectContact={(contact)=>{
          onNewChat(contact);
          setIsNewChatOpen(false);
        }}
        />
      )}
      
    </aside>
  );
}

export default ChatSidebar;