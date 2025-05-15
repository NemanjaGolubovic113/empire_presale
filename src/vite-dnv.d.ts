/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PUBLIC_IS_MAINNET: string;
    readonly VITE_FEE_PRE_DIV: number;
    readonly VITE_PRESALE_PROGRAM_ID: string;
    readonly VITE_MAINSTATE_PREFIX_SEED: string;
    readonly VITE_POOLSTATE_PREFIX_SEED: string;
    readonly VITE_USER_INFO_SEED: string;
    readonly VITE_VAULT_SEED: string;
    readonly VITE_TOKEN_DECIMALS: number;
    readonly VITE_RPC_MAINNET: string;
    readonly VITE_RPC_DEVNET: string;
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}