# Gratitude Wall

A full-stack Web3 application where users connect their wallet, post anonymous gratitude notes permanently on the blockchain, and tip notes they resonate with. Tips transfer peer-to-peer directly to the original poster's wallet — no platform fee, no intermediary.

Live: https://onchain-gratitude-wall.vercel.app
Contract: https://sepolia.basescan.org/address/0xF89a49980560c3A0c82a00E9996a4A22f6DbaD44

---

## What I built

- Wrote and deployed a Solidity smart contract to Base Sepolia with two core functions: `postNote` (stores a note onchain with a timestamp and poster address) and `tipNote` (sends ETH directly to the poster using a low-level `call`, with reentrancy protection via checks-effects-interactions)
- Built a React frontend that reads contract state and writes transactions using wagmi v2 hooks and viem
- Implemented wallet connection via MetaMask's injected provider
- Notes display anonymously in the UI — the poster's address is recorded onchain but never shown
- Feed auto-refreshes every 5 seconds to reflect new posts and tip totals without a page reload
- Deployed the frontend to Vercel with environment-based contract address configuration

---

## Skills demonstrated

**Smart contract development**
- Solidity 0.8.24 — structs, mappings, events, payable functions, direct ETH transfer via `call`
- Hardhat 3 — local compilation, testnet deployment, unit testing with Mocha/Chai
- Gas-conscious design: `calldata` for string args, no unnecessary storage reads

**Web3 frontend**
- wagmi v2 — `useReadContract`, `useWriteContract`, `useWaitForTransactionReceipt`
- viem — ABI encoding, ETH formatting, type-safe contract interaction
- Transaction lifecycle handling — pending, confirming, and confirmed states in the UI

**Frontend**
- React with custom hooks abstracting all contract interaction
- Vite for builds
- Responsive CSS with no component library

**Deployment**
- Deployed contract to Base Sepolia testnet using ethers v6
- Hosted frontend on Vercel with CI/CD from GitHub

---

## Stack

| | Technology |
|---|---|
| Smart contract | Solidity 0.8.24 |
| Development environment | Hardhat 3 |
| Network | Base Sepolia (L2, chainId 84532) |
| Frontend | React, Vite |
| Onchain interaction | wagmi v2, viem |
| Hosting | Vercel |

---

## Running locally

**Contract**

```bash
cd contracts
cp .env.example .env       # add PRIVATE_KEY and BASE_SEPOLIA_RPC_URL
npm install
npx hardhat compile
node scripts/deploy.js
```

**Frontend**

```bash
cd frontend
cp .env.example .env       # add VITE_CONTRACT_ADDRESS
npm install
npm run dev
```

---

## Project structure

```
onchain-gratitude-wall/
├── contracts/
│   ├── contracts/GratitudeWall.sol   # Core contract
│   ├── scripts/deploy.js             # Deployment script (ethers v6)
│   ├── test/GratitudeWall.test.js    # Unit tests
│   └── hardhat.config.js
└── frontend/
    ├── src/
    │   ├── abi/GratitudeWall.js      # Contract ABI
    │   ├── hooks/useGratitudeWall.js # useNotes, usePostNote, useTipNote
    │   ├── components/
    │   │   ├── ConnectWallet.jsx
    │   │   ├── PostNote.jsx
    │   │   ├── NoteCard.jsx
    │   │   └── NotesFeed.jsx
    │   └── wagmiConfig.js
    └── vercel.json
```
