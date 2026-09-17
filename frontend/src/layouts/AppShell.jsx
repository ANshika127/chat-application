import "./AppShell.css";

function AppShell() {
  return (
    <div className="app-shell">
      <aside className="navigation-rail">
        Navigation
      </aside>

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