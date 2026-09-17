import "./ChatWorkspace.css";

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
          className="workspace-menu"
          aria-label="More options"
        >
          <span></span>
          <span></span>
          <span></span>
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
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="m20 11.5-7.2 7.2a5 5 0 0 1-7.1-7.1l7.1-7.1a3.5 3.5 0 1 1 5 5L10.7 16.6a2 2 0 0 1-2.8-2.8l6.4-6.4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
            <svg viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="8.5"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path
                d="M8.5 14.2a4.2 4.2 0 0 0 7 0"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
              <circle
                cx="9"
                cy="10"
                r="0.8"
                fill="currentColor"
              />
              <circle
                cx="15"
                cy="10"
                r="0.8"
                fill="currentColor"
              />
            </svg>
          </button>

          <button
            className="send-button"
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="m4 4 16 8-16 8 3.2-8L4 4Z"
                fill="currentColor"
              />
              <path
                d="M7.2 12H20"
                stroke="var(--white)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

        </div>

      </div>

    </main>
  );
}

export default ChatWorkspace;