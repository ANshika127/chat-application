import NavigationRail from "../components/NavigationRail";
import "./AppShell.css";

function AppShell() {
  return (
    <div className="app-shell">
      <NavigationRail/>

      <aside className="chat-sidebar">
        Chats
      </aside>

      <main className="chat-workspace">
        Chat Workspace
      </main>
    </div>
  );
}

export default AppShell;