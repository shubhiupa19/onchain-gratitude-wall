import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { usePostNote } from "../hooks/useGratitudeWall";

export function PostNote({ onPosted }) {
  const { isConnected } = useAccount();
  const [message, setMessage] = useState("");
  const { postNote, isPending, isConfirming, isSuccess, error } = usePostNote();

  useEffect(() => {
    if (isSuccess) {
      setMessage("");
      onPosted?.();
    }
  }, [isSuccess, onPosted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    postNote(message.trim());
  };

  const remaining = 500 - message.length;
  const isLoading = isPending || isConfirming;

  return (
    <div className="post-note-card">
      <h2>Share Your Gratitude</h2>
      <p className="subtitle">
        Posted anonymously — your wallet is recorded onchain but never shown.
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What are you grateful for today?"
          maxLength={500}
          rows={4}
          disabled={!isConnected || isLoading}
        />
        <div className="form-footer">
          <span className={`char-count ${remaining < 50 ? "warn" : ""}`}>
            {remaining} characters remaining
          </span>
          <button
            type="submit"
            disabled={!isConnected || !message.trim() || isLoading}
            className="btn-primary"
          >
            {isPending
              ? "Confirm in wallet..."
              : isConfirming
              ? "Posting onchain..."
              : "Post Anonymously"}
          </button>
        </div>
        {!isConnected && (
          <p className="hint">Connect your wallet to post a note.</p>
        )}
        {error && (
          <p className="error">
            {error.shortMessage || error.message || "Transaction failed"}
          </p>
        )}
        {isSuccess && <p className="success">Gratitude posted onchain!</p>}
      </form>
    </div>
  );
}
