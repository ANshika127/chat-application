import { useState, useEffect } from "react";
import { Search, Plus, X } from "lucide-react";
import { apiRequest } from "../services/api";
import "./NewChatModal.css";

function NewChatModal({ onClose , onSelectContact, authToken }){

  const [searchQuery , setSearchQuery] = useState("");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading]= useState(true);
  const [contactsError, setContactsError] = useState("");

  const filteredContacts = contacts.filter((contact) =>{
    const query = searchQuery.toLowerCase().trim();

    return(
      contact.name.toLowerCase().includes(query) ||
      contact.username.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    if(!authToken){
      setLoading(false);
      return;
    }
    const fetchContacts = async () =>{
      try{
        setContactsError("");

        const data = await apiRequest("/users",{
          token: authToken,
        });

        setContacts(
          data.users.map((user) =>({
            id: user.user_id,
            name: user.name || user.username,
            username: `@${user.username}`,
            avatar:(user.name || user.username)
              .charAt(0)
              .toUpperCase(),
            color: "avatar-olive",
          }))
        );
      } catch (error){
        setContactsError(
          error.message || "Couldnt load users."
        );
      }finally{
        setLoading(false);
      }
    };
    fetchContacts();
  },[authToken]);

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
          {loading ? (
            <p className="new-chat-empty">Loading People...</p>
          ):contactsError ? (
            <p className="new-chat-empty">{contactsError}</p>
          ): filteredContacts.length > 0 ? (
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