import { useState } from "react";

import ChatSidebar from "../components/ChatSidebar";
import ChatWorkspace from "../components/ChatWorkspace";
import NavigationRail from "../components/NavigationRail";
import Profile from "../components/Profile";

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
  const [ selectedChat, setSelectedChat] = useState(1);
  const [chatData, setChatData]= useState(chats);
  const [activeView, setActiveView] =useState("chats");

  const handleSelectedChat = (chatId) =>{
    setSelectedChat(chatId);

    setChatData((previousChats)=>
      previousChats.map((chat)=>
        chat.id === chatId ? {...chat, unread: 0 } : chat
      )
    );
  }

  return (
    <div className={`app-shell ${activeView === "profile" ? "profile-active" : ""}`}>
      <NavigationRail
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {activeView === "profile" ? (
        <Profile/>
      ) : (
        <>
          <ChatSidebar
            chats={chatData}
            selectedChat={selectedChat}
            setSelectedChat={handleSelectedChat}
          />

          <ChatWorkspace
            chats={chatData}
            selectedChat={selectedChat}
            setChatData={setChatData}
          />
        </>
      )}
    </div>
  );
}

export default AppShell;