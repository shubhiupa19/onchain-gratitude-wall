import { useNotes } from "../hooks/useGratitudeWall";
import { NoteCard } from "./NoteCard";

export function NotesFeed() {
  const { data: notes, isLoading, isError, refetch } = useNotes();

  if (isLoading) {
    return (
      <div className="feed-state">
        <div className="spinner" />
        <p>Loading gratitude notes...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="feed-state">
        <p className="error">Failed to load notes.</p>
        <button className="btn-secondary" onClick={refetch}>Retry</button>
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="feed-state empty">
        <p>No notes yet. Be the first to share your gratitude!</p>
      </div>
    );
  }

  // Show newest first
  const sorted = [...notes].sort((a, b) => Number(b.timestamp) - Number(a.timestamp));

  return (
    <div className="notes-feed">
      <div className="feed-header">
        <h2>Gratitude Wall</h2>
        <span className="note-count">{notes.length} note{notes.length !== 1 ? "s" : ""}</span>
      </div>
      <div className="notes-list">
        {sorted.map((note) => (
          <NoteCard key={note.id.toString()} note={note} />
        ))}
      </div>
    </div>
  );
}
