import ChatSidebar from "../components/ChatSidebar";
import ChatWorkspace from "../components/ChatWorkspace";
import NavigationRail from "../components/NavigationRail";
import "./AppShell.css";

function AppShell() {
  return (
    <div className="app-shell">
      <NavigationRail/>

      <ChatSidebar/>

      <ChatWorkspace/>
    </div>
  );
}

export default AppShell;