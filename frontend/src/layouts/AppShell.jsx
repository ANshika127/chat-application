import ChatSidebar from "../components/ChatSidebar";
import NavigationRail from "../components/NavigationRail";
import "./AppShell.css";

function AppShell() {
  return (
    <div className="app-shell">
      <NavigationRail/>

      <ChatSidebar/>

      <main className="chat-workspace">
        Chat Workspace
      </main>
    </div>
  );
}

export default AppShell;