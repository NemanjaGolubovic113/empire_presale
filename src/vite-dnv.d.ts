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
    readonly VITE_PRESALE_SEED: string;
    readonly VITE_PRESALE_ID: number;
    readonly VITE_USDT_ADDRESS: string;
    readonly VITE_USDC_ADDRESS: string;
    readonly VITE_TOKEN_MINT_ADDRESS: string;
    readonly VITE_PRESALE_ADMIN_ADDRESS: string;
    readonly VITE_PRESALE_VAULT_ADDRESS: string;
    readonly VITE_PRESALE_HARDCAP: number;
    readonly VITE_PRESALE_PRICE_PER_TOKEN: number;
    readonly VITE_PRESALE_PRICE_PER_TOKEN_NEXT: number;
    readonly VITE_PRESALE_STARTTIME: number;
    readonly VITE_PRESALE_ENDTIME: number;
    readonly VITE_PRESALE_CLAIMTIME: number;
    readonly VITE_PRESALE_HARDCAP_UPDATE: number;
    readonly VITE_PRESALE_PRICE_PER_TOKEN_UPDATE: number;
    readonly VITE_PRESALE_PRICE_PER_TOKEN_NEXT_UPDATE: number;
    readonly VITE_PRESALE_STARTTIME_UPDATE: number;
    readonly VITE_PRESALE_ENDTIME_UPDATE: number;
    readonly VITE_PRESALE_CLAIMTIME_UPDATE: number;
    readonly VITE_DEPOSIT_TOKEN_AMOUNT: number;
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}