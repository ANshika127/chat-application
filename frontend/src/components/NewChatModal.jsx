import { useState } from "react";
import { Search, Plus, X, Section } from "lucide-react";
import "./NewChatModal.css";


const demoContacts = [
  { id: 101, name: "Abhay Mehta", username: "@abhay", avatar: "A", color: "avatar-orange" },
  { id: 102, name: "Jaini Khatkar", username: "@jaini", avatar: "J", color: "avatar-blue" },
  { id: 103, name: "Jasmine Kaur", username: "@jazz", avatar: "J", color: "avatar-purple" },
  { id: 104, name: "Mom", username: "@mom.i", avatar: "M", color: "avatar-yellow" },
  { id: 105, name: "Papa", username: "@papa", avatar: "P", color: "avatar-green" },
];


function NewChatModal({ onClose , onSelectContact }){

  const [searchQuery , setSearchQuery] = useState("");

  const filteredContacts = demoContacts.filter((contact) =>{
    const query = searchQuery.toLowerCase().trim();

    return(
      contact.name.toLowerCase().includes(query) ||
      contact.username.toLowerCase().includes(query)
    );
  });

  return(
    <div 
      className="new-chat-overlay"
      onMouseDown={(event) => {
        if(event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="new-chat-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-chat-title"
      >
        <div className="new-chat-header">
          <h2 id="new-chat-title">New chat</h2>

          <button
            type="button"
            className="new-chat-close"
            onClick={onClose}
            aria-label="Close new chat"
          >
            <X size={18}/>
          </button>
        </div>

        <div className="new-chat-search">
          <Search size={17}/>
          <input 
            type="text"
            placeholder="Search people"
            aria-label="Search people"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            autoFocus
          />
        </div>
        <div className="new-chat-people">
          {filteredContacts.length > 0 ?(
            filteredContacts.map((contact) => (
              <div className="new-chat-person" key={contact.id}>
                <div className={`new-chat-avatar ${contact.color}`}>
                  {contact.avatar}
                </div>

                <button
                  type="button"
                  className="new-chat-person-info"
                  onClick={()=> onSelectContact(contact)}
                >
                  <span>{contact.name}</span>
                  <small>{contact.username}</small>
                </button>

                <button
                  type="button"
                  className="new-chat-add"
                  aria-label={`Start chat with ${contact.name}`}
                  onClick={() => onSelectContact(contact)}
                >
                  <Plus size={17} />
                </button>
              </div>
            ))
          ) : (
            <p className="new-chat-empty">No people found</p>
          )}
        </div>
      </section>
    </div>
  );
}
export default NewChatModal;