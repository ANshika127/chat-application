import { useState, useEffect} from "react";
import { apiRequest } from "../services/api";

import ChatSidebar from "../components/ChatSidebar";
import ChatWorkspace from "../components/ChatWorkspace";
import NavigationRail from "../components/NavigationRail";
import Profile from "../pages/Profile";
import SettingsPage from "../pages/Settings"
import Login from "../pages/Login";
import Register from "../pages/Register";

import "./AppShell.css";


const chats = [
  {
    id: 1,
    name: "Abhay",
    message: "Nice!",
    time: "9:16 AM",
    unread: 0,
    avatar: "A",
    avatarColor: "avatar-orange",

    messages: [
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
        replyAuthor:"Abhay",
        content: "Doing well 😊",
        time: "9:16 AM",
      },
      {
        id: 5,
        type: "outgoing",
        content: "Nice!",
        time: "9:16 AM",
      },
    ],
  },
  {
    id: 2,
    name: "Jaini",
    message: "See you tomorrow then",
    time: "Yesterday",
    unread: 2,
    avatar: "J",
    avatarColor: "avatar-blue",
    messages: [
      {
        id: 1,
        type: "incoming",
        content: "Hey, Are you free tomorrow?",
        time: "8:04 AM",
      },
      {
        id: 2,
        type: "outgoing",
        content: "Yeah, I think so.",
        time: "8:32 PM",
      },
      {
        id: 3,
        type: "incoming",
        content: "See you tomorrow then 😊",
        time: "8:33 PM",
      },
    ],
  },
  {
    id: 3,
    name: "Jasmine",
    message: "No messages yet",
    time: "",
    unread: 0,
    avatar: "J",
    avatarColor: "avatar-purple",
    messages: [],
  },
  {
    id: 4,
    name: "Mom",
    message: "Call me when free",
    time: "Mon",
    unread: 1,
    avatar: "M",
    avatarColor: "avatar-yellow",
    messages: [],
  },
  {
    id: 5,
    name: "Papa",
    message: "OK, sounds good",
    time: "Mon",
    unread: 0,
    avatar: "P",
    avatarColor: "avatar-green",
    messages: [],
  },
];


function AppShell() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatData, setChatData]= useState([]);
  const [activeView, setActiveView] =useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState("login");
  const [authToken, setAuthToken] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(()=>{
    if(!authToken){
      setChatData([]);
      return;
    }

    fetchChats().catch((error)=>{
      console.error("couldnt load chats:",error);
    });
  },[authToken])

  const fetchChats = async () => {
  const data = await apiRequest("/chats", {
    token: authToken,
  });
  const formattedChats = await Promise.all(
    data.chats.map(async (chat)=>{
      const name= chat.other_user.name || chat.other_user.username;

      let latestMessage = "";
      let latestTime ="";
      
      try{
        const messageData = await apiRequest(`/chats/${chat.chat_id}/messages?limit=1`,{
          token: authToken
        });

        const messages = messageData.messages || [];
        const latest = messages[messages.length -1];

        if(latest){
          latestMessage = latest.content;
          latestTime= latest.sent_at 
            ? new Date(latest.sent_at).toLocaleTimeString([],{
              hour: "2-digit",
              minute:"2-digit",
            })
            : "";
        }
      } catch(error) {
        console.error(
          `Could not laod preview for chat ${chat.chat_id}:`,
          error
        );
      }
        return {
        id: chat.chat_id,
        contactId: chat.other_user.user_id,
        name,
        message: latestMessage || "No messages yet.",
        time: latestTime,
        unread: 0,
        avatar: name.charAt(0).toUpperCase(),
        avatarColor: "avatar-olive",
        messages: [],
      };
    })
  );
  setChatData(formattedChats);
};

  const handleNewChat =  async (contact) =>{
    try{
      const result = await apiRequest("/chats",{
        method: "POST",
        token: authToken,
        body: {
          user_id: contact.id,
        },
      });

      await fetchChats();
      
      setSelectedChat(result.chat_id);
      setActiveView("chats");
    } catch (error){
      console.error("Couldnt create chat:",error);
    }
  };

    const handleSelectedChat = (chatId) =>{
    setSelectedChat(chatId);
    setActiveView("chats");

    setChatData((previousChats)=>
      previousChats.map((chat)=>
        chat.id === chatId ? {...chat, unread: 0 } : chat
      )
    );
  }

  const handleLogin = (loginData)=>{
    setAuthToken(loginData.access_token);
    setCurrentUserId(loginData.user_id);
    setIsAuthenticated(true);
    setSelectedChat(null);
    setActiveView("home");
  };

  const handleRegister = () =>{
    setAuthView("login")
  };

  const handleLogout= () =>{
    setIsAuthenticated(false);
    setAuthView("login");
    setActiveView("chats");
  };

  return (
    <>
      {!isAuthenticated ? (
        authView === "register" ? (
          <Register
            onRegister={handleRegister}
            onOpenLogin={() => setAuthView("login")}
          />
        ): (
          <Login
            onLogin={handleLogin}
            onOpenRegister={() => setAuthView("register")}
          />
        )
      ) : (
        <div 
          className={`app-shell ${
            activeView === "profile" 
              ? "profile-active"
              : activeView === "settings"
                ? "settings-active" 
                : ""
            }`}
          >
            <NavigationRail
              activeView={activeView}
              setActiveView={setActiveView}
              onLogout={handleLogout}
              onHomeClick={()=> {
                setSelectedChat(null);
                setActiveView("home");
              }}
            />

            {activeView === "profile" ? (
              <Profile onLogout ={handleLogout} />
            ) : activeView === "settings" ? (
              <SettingsPage 
                onOpenProfile={()=> setActiveView("profile")}
                onLogout={handleLogout}
              />  
            ) : (
              <>
                <ChatSidebar
                  chats={chatData}
                  selectedChat={selectedChat}
                  setSelectedChat={handleSelectedChat}
                  onNewChat={handleNewChat}
                  authToken={authToken}
                />

                <ChatWorkspace
                  chats={chatData}
                  selectedChat={selectedChat}
                  setChatData={setChatData}
                  authToken={authToken}
                  currentUserId={currentUserId}
                />
              </>
            )}
          </div>
      )}    
    </>   
  );
}

export default AppShell;