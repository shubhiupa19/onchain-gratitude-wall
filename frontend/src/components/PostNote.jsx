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
      <div className="post-note-header">
        <p className="post-note-label">Write a note</p>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What are you grateful for today?"
          maxLength={500}
          rows={4}
          disabled={!isConnected || isLoading}
        />
        <div className="post-note-actions">
          <div className="post-note-meta">
            <span className="anon-badge">
              {isConnected
                ? "Your wallet is recorded onchain but never displayed."
                : "Connect your wallet to post."}
            </span>
            <span className={`char-count ${remaining < 50 ? "warn" : ""}`}>
              {remaining} characters remaining
            </span>
          </div>
          <button
            type="submit"
            disabled={!isConnected || !message.trim() || isLoading}
            className="btn-primary"
          >
            {isPending
              ? "Confirm in wallet..."
              : isConfirming
              ? "Posting..."
              : "Post anonymously"}
          </button>
        </div>
        {(error || isSuccess) && (
          <div className="post-feedback">
            {error && (
              <p className="error">{error.shortMessage || "Transaction failed."}</p>
            )}
            {isSuccess && <p className="success">Posted onchain.</p>}
          </div>
        )}
      </form>
    </div>
  );
}
