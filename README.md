# Gratitude Wall

An onchain space to share what you're grateful for and tip notes that resonate with you.

Notes are posted anonymously — wallet addresses are recorded on the blockchain but never shown in the UI. Tips are sent peer-to-peer directly to the original poster, with no platform fee.

Built on Base Sepolia testnet.

---

## How it works

- Connect a wallet
- Write a note and post it onchain via `postNote(string)`
- Browse the feed and send 0.001 ETH to notes you appreciate via `tipNote(uint)`
- Tips transfer directly to the poster's wallet

---

## Stack

| Layer | Technology |
|---|---|
| Smart contract | Solidity 0.8.24, Hardhat 3 |
| Network | Base Sepolia (chainId 84532) |
| Frontend | React, Vite |
| Onchain reads/writes | wagmi v2, viem |
| Wallet connection | wagmi injected connector |
| Hosting | Vercel |

---

## Project structure

```
onchain-gratitude-wall/
├── contracts/
│   ├── contracts/GratitudeWall.sol   # Core contract
│   ├── scripts/deploy.js             # Deploy script (ethers v6)
│   ├── test/GratitudeWall.test.js    # Unit tests
│   └── hardhat.config.js
└── frontend/
    ├── src/
    │   ├── abi/GratitudeWall.js      # Contract ABI
    │   ├── hooks/useGratitudeWall.js # postNote, tipNote, useNotes hooks
    │   ├── components/
    │   │   ├── ConnectWallet.jsx
    │   │   ├── PostNote.jsx
    │   │   ├── NoteCard.jsx
    │   │   └── NotesFeed.jsx
    │   └── wagmiConfig.js
    └── vercel.json
```

---

## Running locally

**Contract**

```bash
cd contracts
cp .env.example .env       # add PRIVATE_KEY and BASE_SEPOLIA_RPC_URL
npm install
npx hardhat compile
node scripts/deploy.js     # prints contract address
```

**Frontend**

```bash
cd frontend
cp .env.example .env       # add VITE_CONTRACT_ADDRESS and VITE_WALLETCONNECT_PROJECT_ID
npm install
npm run dev
```

---

## Contract

Deployed to Base Sepolia: `0xF89a49980560c3A0c82a00E9996a4A22f6DbaD44`

View on Basescan: https://sepolia.basescan.org/address/0xF89a49980560c3A0c82a00E9996a4A22f6DbaD44

---

## Environment variables

**contracts/.env**
```
PRIVATE_KEY=
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
BASESCAN_API_KEY=
```

**frontend/.env**
```
VITE_CONTRACT_ADDRESS=
VITE_CHAIN_ID=84532
VITE_WALLETCONNECT_PROJECT_ID=
```
