import "./ChatWorkspace.css";
import EmojiPicker from "emoji-picker-react";
import { useState, useRef, useEffect } from "react";
import { Paperclip, Smile , Send, MoreVertical, MessageCircle } from "lucide-react";



function ChatWorkspace({ chats, selectedChat, setChatData }) {
 
  const selectedChatData =chats.find(
    (chat) => chat.id === selectedChat
  );

  const [messageText , setMessageText] = useState("");
  const[showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  },[selectedChatData.messages, selectedChat]);

  const handleSend =() => {
    if (!messageText.trim()){ 
      return;
    }

    const newMessage = {
      id: Date.now(),
      type: "outgoing",
      content: messageText.trim(),
      time: new Date().toLocaleDateString([],{
        hour:"2-digit",
        minute:"2-digit"
      }),
    };

    setChatData((previousChats)=>
      previousChats.map((chat)=>
        chat.id === selectedChat
          ? {
            ...chat,
            message: newMessage.content,
            time: newMessage.time,
            messages: [...chat.messages, newMessage],
            }
          : chat
      )
    );

    
    setMessageText("");
    };

  return (
    <main className="chat-workspace">

      {/* =========================
          Chat Header
          ========================= */}

      <header className="workspace-header">

        <div className="workspace-user">
          <div className={`workspace-avatar ${selectedChatData.avatarColor}`}>
            {selectedChatData.avatar}
          </div>

          <div className="workspace-user-info">
            <h2>{selectedChatData.name}</h2>
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

        {selectedChatData.messages.length > 0 ? ( 
          selectedChatData.messages.map((message) => {
            if (message.type === "incoming-reply") {
              return (
                <div
                  className="message-row incoming"
                  key={message.id}
                >
                  <div className="message-group">

                    <div className="reply-bubble">
                      <div className="reply-author">
                        {message.replyAuthor}
                      </div>

                      <div className="reply-text">
                        {message.replyTo}
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
          })
        ):(
          <div className="empty-chat">
            <div className ="empty-chat-icon">
              <MessageCircle size={30} strokeWidth={1.8} />
              </div>
            <h3>No messages yet</h3>
            <p>
              Say hello to {selectedChatData.name} to start the conversation.
            </p>
          </div>
          )}

          <div ref= {messagesEndRef}/>

        </div>

      </section>

      {/* =========================
          Composer
          ========================= */}

      <div className="composer-area">

        <input 
          ref={fileInputRef}
          type = "file"
          hidden
          onChange={(event)=>{
            const file = event.target.files?.[0];

            if (file){
              setSelectedFile(file);
            }
          }}
        />

        {selectedFile && (
          <div className="selected-file">
            <div className="selected-file-icon">
              <Paperclip size={22}/>
            </div>

            <div className="selected-file-info">
              <span className="selected-file-name">
                {selectedFile.name}
              </span>

              <span className="selected-file-label">
                Attachment ready
              </span>
            </div>

            <button
              type="button"
              className="remove-attachment"
              aria-label="Remove attachment"
              onClick={()=>{
                setSelectedFile(null);

                if (fileInputRef.current) {
                  fileInputRef.current.value="";
                }
              }}
            >
              x
            </button>
          </div>
        )}

        {showEmojiPicker && (
          <div className="emoji-picker-container">
            <EmojiPicker
              onEmojiClick={(emojiData)=>{
                setMessageText((previous)=> previous + emojiData.emoji);
                setShowEmojiPicker(false);
              }}
            />
          </div>
        )}

        <div className="message-composer">

          <button
            className="composer-action"
            aria-label="Attach file"
            onClick={()=> fileInputRef.current?.click()}
          >
            <Paperclip size={20}/>
          </button>

          <input
            type="text"
            placeholder="Type a message..."
            aria-label="Message"
            value = {messageText}
            onChange = {(event)=> setMessageText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter"){
                event.preventDefault();
                handleSend();
              }
            }}
          />

          <button
            type ="button"
            className="composer-action"
            aria-label="Emoji"
            onClick={()=> setShowEmojiPicker((previous) => !previous)}
          >
            <Smile size={20}/>
          </button>

          <button
            className="send-button"
            aria-label="Send message"
            onClick={handleSend}
          >
            <Send size={19}/>
          </button>

        </div>

      </div>

    </main>
  );
}

export default ChatWorkspace;