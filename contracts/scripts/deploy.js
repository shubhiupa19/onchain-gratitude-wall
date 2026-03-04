/**
 * Deploy GratitudeWall to Base Sepolia
 * Usage: node scripts/deploy.js
 * Requires: PRIVATE_KEY and BASE_SEPOLIA_RPC_URL in .env
 */
import { ethers } from "ethers";
import { readFileSync } from "fs";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read compiled artifact
const artifact = JSON.parse(
  readFileSync(
    join(__dirname, "../artifacts/contracts/GratitudeWall.sol/GratitudeWall.json"),
    "utf8"
  )
);

async function main() {
  const rpcUrl = process.env.BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org";
  const privateKey = process.env.PRIVATE_KEY;

  if (!privateKey) {
    console.error("ERROR: PRIVATE_KEY not set in .env");
    process.exit(1);
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  console.log("Deploying with:", wallet.address);
  const balance = await provider.getBalance(wallet.address);
  console.log("Balance:", ethers.formatEther(balance), "ETH");

  if (balance === 0n) {
    console.warn("WARNING: Wallet has 0 ETH. Get testnet ETH from https://faucet.base.org");
  }

  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
  console.log("Deploying...");
  const contract = await factory.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("\nGratitudeWall deployed to:", address);
  console.log("\nAdd to frontend/.env:");
  console.log(`VITE_CONTRACT_ADDRESS=${address}`);
  console.log(`VITE_CHAIN_ID=84532`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
