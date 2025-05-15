
import { PublicKey } from '@solana/web3.js';

export const FEE_PRE_DIV = import.meta.env.VITE_FEE_PRE_DIV!;

export const PRESALE_PROGRAM_ID = new PublicKey(import.meta.env.VITE_PRESALE_PROGRAM_ID!);
export const MAINSTATE_PREFIX_SEED = import.meta.env.VITE_MAINSTATE_PREFIX_SEED!;
export const POOLSTATE_PREFIX_SEED = import.meta.env.VITE_POOLSTATE_PREFIX_SEED!;
export const USER_INFO_SEED = import.meta.env.VITE_USER_INFO_SEED!;
export const VAULT_SEED = import.meta.env.VITE_VAULT_SEED!;
