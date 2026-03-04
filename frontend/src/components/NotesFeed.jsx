import { useNotes } from "../hooks/useGratitudeWall";
import { NoteCard } from "./NoteCard";

export function NotesFeed() {
  const { data: notes, isLoading, isError, refetch } = useNotes();

  if (isLoading) {
    return (
      <div className="feed-state">
        <div className="spinner" />
        <p>Loading notes...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="feed-state">
        <p className="error">Failed to load notes.</p>
        <button className="btn-secondary" style={{ marginTop: "1rem" }} onClick={refetch}>
          Retry
        </button>
      </div>
    );
  }

  const sorted = notes
    ? [...notes].sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
    : [];

  return (
    <div className="notes-feed">
      <div className="feed-header">
        <span className="feed-title">The wall</span>
        {sorted.length > 0 && (
          <span className="note-count">
            {sorted.length} {sorted.length === 1 ? "note" : "notes"}
          </span>
        )}
      </div>
      {sorted.length === 0 ? (
        <div className="feed-state">
          <p>No notes yet. Be the first.</p>
        </div>
      ) : (
        <div className="notes-list">
          {sorted.map((note, i) => (
            <NoteCard key={note.id.toString()} note={note} index={sorted.length - 1 - i} />
          ))}
        </div>
      )}
    </div>
  );
}
