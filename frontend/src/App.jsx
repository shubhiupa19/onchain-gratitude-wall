import { useQueryClient } from "@tanstack/react-query";
import { PostNote } from "./components/PostNote";
import { NotesFeed } from "./components/NotesFeed";
import { ConnectWallet } from "./components/ConnectWallet";
import "./App.css";

function WallMark() {
  return (
    <svg
      className="logo-mark"
      width="22"
      height="18"
      viewBox="0 0 22 18"
      fill="none"
      aria-hidden="true"
    >
      <rect x="0" y="0" width="9" height="4.5" rx="1" fill="currentColor" />
      <rect x="11" y="0" width="11" height="4.5" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="0" y="6.75" width="13" height="4.5" rx="1" fill="currentColor" opacity="0.75" />
      <rect x="15" y="6.75" width="7" height="4.5" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="0" y="13.5" width="5" height="4.5" rx="1" fill="currentColor" opacity="0.45" />
      <rect x="7" y="13.5" width="15" height="4.5" rx="1" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

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
            <WallMark />
            <span className="logo-text">Gratitude Wall</span>
          </div>
          <ConnectWallet />
        </div>
      </header>

      <main className="app-main">
        <PostNote onPosted={handlePosted} />
        <NotesFeed />
      </main>

      <footer className="app-footer">
        Tips transfer directly to the poster's wallet. Permanent on Base Sepolia.
      </footer>
    </div>
  );
}
