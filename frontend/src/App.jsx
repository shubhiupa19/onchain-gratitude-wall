import { useQueryClient } from "@tanstack/react-query";
import { PostNote } from "./components/PostNote";
import { NotesFeed } from "./components/NotesFeed";
import { ConnectWallet } from "./components/ConnectWallet";
import "./App.css";

export default function App() {
  const queryClient = useQueryClient();

  const handlePosted = () => {
    queryClient.invalidateQueries({ queryKey: ["readContract"] });
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🙏</span>
            <div>
              <h1>Gratitude Wall</h1>
              <p className="tagline">Onchain · Anonymous · Base Sepolia</p>
            </div>
          </div>
          <ConnectWallet />
        </div>
      </header>

      <main className="app-main">
        <PostNote onPosted={handlePosted} />
        <NotesFeed />
      </main>

      <footer className="app-footer">
        <p>Tips go directly onchain to the poster's wallet. Built on Base Sepolia.</p>
      </footer>
    </div>
  );
}
