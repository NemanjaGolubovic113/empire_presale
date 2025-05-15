import { Connection, 
    clusterApiUrl
} from "@solana/web3.js";
import { 
    TxVersion, 
    MAINNET_PROGRAM_ID,
    DEVNET_PROGRAM_ID, 
    LOOKUP_TABLE_CACHE,
} from "@raydium-io/raydium-sdk";

const IS_MAINNET = import.meta.env.VITE_PUBLIC_IS_MAINNET || "";

const isMainNet = IS_MAINNET === "true";

export const networkUrl = !isMainNet 
    ? import.meta.env.VITE_RPC_DEVNET
    : import.meta.env.VITE_RPC_MAINNET;

export const PROGRAMIDS = isMainNet ? MAINNET_PROGRAM_ID : DEVNET_PROGRAM_ID;
export const BUNDLR_URL = isMainNet ? "https://node1.bundlr.network" : "https://devnet.bundlr.network";
export const addLookupTableInfo = isMainNet ? LOOKUP_TABLE_CACHE : undefined;
export const connection = new Connection(networkUrl, "confirmed");
export const makeTxVersion = TxVersion.V0; // LEGACY
export const Config = {
    BLOCK_ENGINE_URL: "tokyo.mainnet.block-engine.jito.wtf",
    // BLOCK_ENGINE_URL: 'amsterdam.mainnet.block-engine.jito.wtf',
    JITO_FEE: "0.005"
}