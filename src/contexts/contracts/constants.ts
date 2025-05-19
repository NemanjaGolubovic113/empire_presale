
import { PublicKey } from '@solana/web3.js';

export const PRESALE_PROGRAM_ID = new PublicKey(import.meta.env.VITE_PRESALE_PROGRAM_ID!);
export const USER_INFO_SEED = import.meta.env.VITE_USER_INFO_SEED!;
export const VAULT_SEED = import.meta.env.VITE_VAULT_SEED!;

export const PRESALE_SEED = import.meta.env.VITE_PRESALE_SEED!;
export const PRESALE_ID = import.meta.env.VITE_PRESALE_ID!;
export const USDT_ADDRESS = import.meta.env.VITE_USDT_ADDRESS!;
export const USDC_ADDRESS = import.meta.env.VITE_USDC_ADDRESS!;
export const TOKEN_MINT_ADDRESS = import.meta.env.VITE_TOKEN_MINT_ADDRESS!;
export const PRESALE_ADMIN_ADDRESS = import.meta.env.VITE_PRESALE_ADMIN_ADDRESS!;
export const PRESALE_VAULT_ADDRESS = import.meta.env.VITE_PRESALE_VAULT_ADDRESS!;