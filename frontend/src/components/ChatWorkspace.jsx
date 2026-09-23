import "./ChatWorkspace.css";
import { Paperclip, Smile , Send, MoreVertical } from "lucide-react";

const messages = [
  {
    id: 1,
    type: "incoming",
    content: "Hey! How are you?",
    time: "9:14 AM",
  },
  {
    id: 2,
    type: "outgoing",
    content: "I'm good! What about you?",
    time: "9:15 AM",
  },
  {
    id: 3,
    type: "incoming",
    content: "Doing well 😊",
    time: "9:16 AM",
  },
  {
    id: 4,
    type: "incoming-reply",
    replyTo: "Doing well 😊",
    content: "Abhay\nDoing well 😊",
    time: "9:16 AM",
  },
  {
    id: 5,
    type: "outgoing",
    content: "Nice!",
    time: "9:16 AM",
  },
];

function ChatWorkspace() {
  return (
    <main className="chat-workspace">

      {/* =========================
          Chat Header
          ========================= */}

      <header className="workspace-header">

        <div className="workspace-user">
          <div className="workspace-avatar">
            A
          </div>

          <div className="workspace-user-info">
            <h2>Abhay</h2>
            <span>Conversation</span>
          </div>
        </div>

        <button
          className="workspace-menu" aria-label="More options">
          <MoreVertical size={20}/>
        </button>

      </header>

      {/* =========================
          Messages
          ========================= */}

      <section className="messages-area">

        <div className="date-divider">
          <span>Today</span>
        </div>

        <div className="messages-list">

          {messages.map((message) => {
            if (message.type === "incoming-reply") {
              return (
                <div
                  className="message-row incoming"
                  key={message.id}
                >
                  <div className="message-group">

                    <div className="reply-bubble">
                      <div className="reply-author">
                        Abhay
                      </div>

                      <div className="reply-text">
                        Doing well 😊
                      </div>
                    </div>

                    <div className="message-time">
                      {message.time}
                    </div>

                  </div>
                </div>
              );
            }

            return (
              <div
                className={`message-row ${message.type}`}
                key={message.id}
              >
                <div className="message-group">

                  <div className="message-bubble">
                    {message.content}
                  </div>

                  <div className="message-time">
                    {message.time}
                  </div>

                </div>
              </div>
            );
          })}

        </div>

      </section>

      {/* =========================
          Composer
          ========================= */}

      <div className="composer-area">

        <div className="message-composer">

          <button
            className="composer-action"
            aria-label="Attach file"
          >
            <Paperclip size={20}/>
          </button>

          <input
            type="text"
            placeholder="Type a message..."
            aria-label="Message"
          />

          <button
            className="composer-action"
            aria-label="Emoji"
          >
            <Smile size={20}/>
          </button>

          <button
            className="send-button"
            aria-label="Send message"
          >
            <Send size={19}/>
          </button>

        </div>

      </div>

    </main>
  );
}

export default ChatWorkspace;