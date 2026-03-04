import { useAccount } from "wagmi";
import { formatEther } from "viem";
import { useTipNote } from "../hooks/useGratitudeWall";

function timeAgo(timestamp) {
  const seconds = Math.floor(Date.now() / 1000 - Number(timestamp));
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function NoteCard({ note, index }) {
  const { address, isConnected } = useAccount();
  const { tipNote, isPending, isConfirming, isSuccess, error } = useTipNote(note.id);

  const isOwn = address?.toLowerCase() === note.poster?.toLowerCase();
  const isLoading = isPending || isConfirming;

  const tipEth = parseFloat(formatEther(note.totalTips));
  const hasTips = tipEth > 0;
  const tipLabel = hasTips
    ? `${tipEth.toFixed(4)} ETH · ${note.tipCount} tip${note.tipCount > 1 ? "s" : ""}`
    : "No tips";

  return (
    <div className={`note-card ${isOwn ? "own-note" : ""}`}>
      <span className="note-index">{String(index + 1).padStart(2, "0")}</span>
      <div className="note-body">
        <p className="note-message">{note.message}</p>
        <div className="note-footer">
          <div className="note-meta">
            <span className="time-ago">{timeAgo(note.timestamp)}</span>
            <span className="note-meta-sep" />
            <span className={`tip-total ${hasTips ? "has-tips" : ""}`}>
              {tipLabel}
            </span>
          </div>
          <button
            className={`btn-tip ${isSuccess ? "tipped" : ""}`}
            onClick={tipNote}
            disabled={!isConnected || isOwn || isLoading}
            title={isOwn ? "Cannot tip your own note" : "Send 0.001 ETH"}
          >
            {isPending
              ? "Confirm..."
              : isConfirming
              ? "Sending..."
              : isSuccess
              ? "Sent"
              : "Send 0.001 ETH"}
          </button>
        </div>
        {error && (
          <p className="error small">{error.shortMessage || "Tip failed."}</p>
        )}
      </div>
    </div>
  );
}
