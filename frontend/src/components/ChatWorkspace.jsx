import { useState, useRef, useEffect } from "react";
import { Paperclip, Smile , Send, MoreVertical, MessageCircle, MoveDownRight,Reply, Pencil,Trash2 } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import ConfirmationDialog from "./ConfirmationDialog";
import "./ChatWorkspace.css";


function ChatWorkspace({ chats, selectedChat, setChatData }) {
 
  const selectedChatData =chats.find(
    (chat) => chat.id === selectedChat
  );

  const [messageText , setMessageText] = useState("");
  const[showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const[activeMessageMenu , setActiveMessageMenu] = useState(null);
  const[replyingTo, setReplyingTo] = useState(null);
  const[editingMessage, setEditingMessage] = useState(null);
  const[messageToDelete, setMessageToDelete] = useState(null);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const messageActionRefs = useRef({});


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  },[selectedChatData.messages, selectedChat]);

  
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (activeMessageMenu === null) return;

      const openMenuElement =
        messageActionRefs.current[activeMessageMenu];

      if (
        openMenuElement &&
        !openMenuElement.contains(event.target)
      ) {
        setActiveMessageMenu(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [activeMessageMenu]);

  
  useEffect(() => {
    setMessageText("");
    setReplyingTo(null);
    setEditingMessage(null);
    setSelectedFile(null);
    setShowEmojiPicker(false);
    setActiveMessageMenu(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [selectedChat]);


  const handleSend =() => {
    if (!messageText.trim()){ 
      return;
    }
    const trimmedText = messageText.trim();

    if (editingMessage) {
      setChatData((previousChats)=>
        previousChats.map((chat) =>{
          if (chat.id !== selectedChat){
            return chat;
          }
          
          const updatedMessages = chat.messages.map((message)=>
            message.id === editingMessage.id ? {...message, content: trimmedText} : message
          );

          const latestMessage = updatedMessages[updatedMessages.length - 1];
          return {
            ...chat,
            messages: updatedMessages,
            message:latestMessage?.content ?? "",
          };
        })
      );
      setEditingMessage(null);
      setMessageText("");
      return;
    }

//Normal send message
    const newMessage = {
      id: Date.now(),
      type: "outgoing",
      content: trimmedText,
      time: new Date().toLocaleTimeString([],{
        hour:"2-digit",
        minute:"2-digit"
      }),
      replyTo: replyingTo 
        ? {
            id: replyingTo.id,
            content: replyingTo.content,
            author:
              replyingTo.type === "outgoing" ? "You" : selectedChatData.name,
        }
        :null,
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
    setReplyingTo(null);
  };

  if (!selectedChatData) {
  return (
    <main className="chat-workspace">
      <div className="empty-chat">
        <h3>Select a conversation</h3>
        <p>Choose a chat to start messaging.</p>
      </div>
    </main>
  );
}

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
              <div className={`message-row ${message.type}`}
                key={message.id}
              >
                <div className="message-group">

                  <div className="message-bubble">
                    {message.replyTo && (
                      <div className="message-reply-quote">
                        <div className="message-reply-author">
                          {message.replyTo.content}
                        </div>
                      </div>
                    )}

                    <div className="message-content">
                      {message.content}
                    </div>
                  </div>

                  <div
                    className="message-actions-wrapper"
                    ref={(element) => {
                      if (element) {
                        messageActionRefs.current[message.id] = element;
                      } else {
                        delete messageActionRefs.current[message.id];
                      }
                    }}
                  >
                    <button
                      type="button"
                      className="message-menu-trigger"
                      aria-label="Message actions"
                      onClick={()=>
                        setActiveMessageMenu(
                          activeMessageMenu === message.id? null : message.id
                        )
                      }
                    >
                      <MoreVertical size ={16}/>
                    </button>

              
                    {activeMessageMenu === message.id && (
                      <div className="message-actions-menu">
                        <button
                          onClick={()=>{
                            setReplyingTo(message);
                            setActiveMessageMenu(null);
                          }}
                        >
                          Reply
                        </button>

                        {message.type === "outgoing" &&(
                          <>
                          <button
                            type="button"
                            onClick={()=>{
                              setEditingMessage(message);
                              setMessageText(message.content);
                              setActiveMessageMenu(null);
                            }}
                          >
                            <Pencil size={15} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={()=>{
                              setMessageToDelete(message);
                              setActiveMessageMenu(null);
                            }}
                            >
                              <Trash2 size={15}/>
                              Delete
                          </button>
                          </>
                        )}
                      </div>
                    )}
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

        {replyingTo && (
          <div className="reply-preview">
            <div className="reply-preview-content">
              <span className="reply-preview-label">
                Replying to {replyingTo.type === "outgoing" ? "yourself" : selectedChatData.name}
              </span>

              <span className="reply-preview-text">
                {replyingTo.content}
              </span>
            </div>

            <button
              type="button"
              className="reply-preview-cancel"
              aria-label="Cancel reply"
              onClick={()=> setReplyingTo(null)}
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


        {editingMessage && (
          <div className="editing-message-banner">
            <div className="editing-message-info">
              <Pencil size={17}/>
              <div className="editing-message-text">
                <span className="editing-message-title">
                  Editing Message
                </span>

                <span className="editing-message-preview">
                  {editingMessage.content}
                </span>

              </div>
            </div>

            <button 
              type="button"
              className="cancel-edit-button"
              aria-label="Cancel editing"
              onClick={()=>{
                setEditingMessage(null);
                setMessageText("");
              }}
            >
              x
            </button>
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
        {messageToDelete && (
          <ConfirmationDialog
            title="Delete message?"
            description="Are you sure you want to delete this message? This action cannot be undone."
            confirmLabel="Delete"
            cancelLabel="Cancel"
            danger={true}
            onCancel={() => setMessageToDelete(null)}
            onConfirm={() => {
              const messageId = messageToDelete.id;

              setChatData((previousChats) =>
                previousChats.map((chat) => {
                  if (chat.id !== selectedChat) return chat;

                  const updatedMessages = chat.messages.filter(
                    (item) => item.id !== messageId
                  );

                  const latestMessage =
                    updatedMessages[updatedMessages.length - 1];

                  return {
                    ...chat,
                    messages: updatedMessages,
                    message: latestMessage?.content ?? "No messages yet",
                    time: latestMessage?.time ?? "",
                  };
                })
              );

              if (editingMessage?.id === messageId) {
                setEditingMessage(null);
                setMessageText("");
              }

              if (replyingTo?.id === messageId) {
                setReplyingTo(null);
              }

              setMessageToDelete(null);
            }}
          />
      )}
    </main>
  );
}

export default ChatWorkspace;