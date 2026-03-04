// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract GratitudeWall {
    struct Note {
        uint256 id;
        address poster;
        string message;
        uint256 timestamp;
        uint256 totalTips;
        uint256 tipCount;
    }

    Note[] private notes;
    uint256 private nextId;

    event NotePosted(uint256 indexed noteId, address indexed poster, string message, uint256 timestamp);
    event NoteTipped(uint256 indexed noteId, address indexed tipper, address indexed poster, uint256 amount);

    /// @notice Post a gratitude note onchain
    function postNote(string calldata _message) external {
        require(bytes(_message).length > 0, "Empty note");
        require(bytes(_message).length <= 500, "Note too long");

        uint256 id = nextId++;
        notes.push(Note({
            id: id,
            poster: msg.sender,
            message: _message,
            timestamp: block.timestamp,
            totalTips: 0,
            tipCount: 0
        }));

        emit NotePosted(id, msg.sender, _message, block.timestamp);
    }

    /// @notice Tip a note — ETH goes directly to poster
    function tipNote(uint256 _noteId) external payable {
        require(msg.value > 0, "Must send ETH");
        require(_noteId < notes.length, "Note does not exist");

        Note storage note = notes[_noteId];
        require(note.poster != msg.sender, "Cannot tip your own note");

        note.totalTips += msg.value;
        note.tipCount += 1;

        (bool sent, ) = note.poster.call{value: msg.value}("");
        require(sent, "ETH transfer failed");

        emit NoteTipped(_noteId, msg.sender, note.poster, msg.value);
    }

    /// @notice Returns all notes
    function getNotes() external view returns (Note[] memory) {
        return notes;
    }

    /// @notice Returns a single note
    function getNote(uint256 _noteId) external view returns (Note memory) {
        require(_noteId < notes.length, "Note does not exist");
        return notes[_noteId];
    }

    /// @notice Total number of notes
    function noteCount() external view returns (uint256) {
        return notes.length;
    }
}
