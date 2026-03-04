export const GRATITUDE_WALL_ABI = [
  {
    "inputs": [{ "internalType": "string", "name": "_message", "type": "string" }],
    "name": "postNote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_noteId", "type": "uint256" }],
    "name": "tipNote",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getNotes",
    "outputs": [
      {
        "components": [
          { "internalType": "uint256", "name": "id", "type": "uint256" },
          { "internalType": "address", "name": "poster", "type": "address" },
          { "internalType": "string", "name": "message", "type": "string" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
          { "internalType": "uint256", "name": "totalTips", "type": "uint256" },
          { "internalType": "uint256", "name": "tipCount", "type": "uint256" }
        ],
        "internalType": "struct GratitudeWall.Note[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_noteId", "type": "uint256" }],
    "name": "getNote",
    "outputs": [
      {
        "components": [
          { "internalType": "uint256", "name": "id", "type": "uint256" },
          { "internalType": "address", "name": "poster", "type": "address" },
          { "internalType": "string", "name": "message", "type": "string" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
          { "internalType": "uint256", "name": "totalTips", "type": "uint256" },
          { "internalType": "uint256", "name": "tipCount", "type": "uint256" }
        ],
        "internalType": "struct GratitudeWall.Note",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "noteCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "noteId", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "poster", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "message", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "NotePosted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "noteId", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "tipper", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "poster", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "NoteTipped",
    "type": "event"
  }
];
