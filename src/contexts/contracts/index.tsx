
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
// import { web3 } from '@coral-xyz/anchor'
import * as anchor from '@project-serum/anchor';
import { LAMPORTS_PER_SOL, PublicKey, 
    SystemProgram, 
    Transaction
} from '@solana/web3.js';
import { NATIVE_MINT, 
    TOKEN_PROGRAM_ID, 
    ASSOCIATED_TOKEN_PROGRAM_ID, 
    getMint, 
    getAssociatedTokenAddressSync
} from '@solana/spl-token';
import BN from 'bn.js';

import { PRESALE_PROGRAM_ID, 
    PRESALE_ID,
    USDC_ADDRESS,
    USDT_ADDRESS,
    TOKEN_MINT_ADDRESS,
    PRESALE_ADMIN_ADDRESS,
    PRESALE_VAULT_ADDRESS
} from './constants';
import { IDL } from './idl';
import * as Keys from './keys';
import { connection } from '../../engine/config';
import { send } from "../../engine/utils";
import { TOKEN_DECIMALS } from "../../engine/consts";
import { AnchorWallet } from "@solana/wallet-adapter-react";


const getProgram = (wallet: AnchorWallet | undefined) => {
    if (!wallet) {
        // throw new WalletNotConnectedError();
        return null
    }
    const provider = new anchor.AnchorProvider(
        connection, 
        wallet, 
        anchor.AnchorProvider.defaultOptions()
    );

    const program = new anchor.Program(IDL, PRESALE_PROGRAM_ID, provider);
    return program;
};


export const contract_getPresaleInfo = async (walletCtx: AnchorWallet | undefined) => {
    if (!walletCtx) {
        return null
        // throw new WalletNotConnectedError();
    }

    const program = getProgram(walletCtx);
    
    const presaleAdminKey = new PublicKey(PRESALE_ADMIN_ADDRESS);
    const presaleInfoKey = await Keys.getPresaleInfoKey(presaleAdminKey);
    if (!(presaleInfoKey instanceof PublicKey) || !program) {
        throw new Error("Invalid presaleInfoKey or Program: must be a PublicKey");
    }

    // const presaleInfo = await connection.getAccountInfo(presaleInfoKey);
    // mainStateInfo = await program.account.mainState.fetch(mainStateKey);
    return await program.account.presaleInfo.fetch(presaleInfoKey);
};

export const contract_getUserInfo = async (walletCtx: AnchorWallet) => {
    if (!walletCtx) {
        return null
    }

    const program = getProgram(walletCtx);
    const presaleAdminKey = new PublicKey(PRESALE_ADMIN_ADDRESS)
    const userInfoKey = await Keys.getUserInfoKey(presaleAdminKey, walletCtx.publicKey);
    if (!(userInfoKey instanceof PublicKey) || !program) {
        throw new Error("Invalid userInfoKey or Program: must be a PublicKey");
    }

    // const userInfo = await connection.getAccountInfo(userInfoKey);
    
    return await program.account.userInfo.fetch(userInfoKey);
};

export const contract_createPresale = async (
    walletCtx: AnchorWallet,
    hardcapAmount: number,
    pricePerToken: number,
    pricePerTokenNext: number,
    startTime: number,
    endTime: number,
    claimTime: number,
) => {
    if (!walletCtx) {
        console.error("Invalid wallet");
        throw new WalletNotConnectedError();
    }

    const program = getProgram(walletCtx);
    const presaleAdminKey = new PublicKey(PRESALE_ADMIN_ADDRESS);
    
    const presaleInfoKey = await Keys.getPresaleInfoKey(presaleAdminKey);
    if (!(presaleInfoKey instanceof PublicKey) || !program) {
        throw new Error("Invalid presaleInfoKey or Program: must be a PublicKey");
    }

    const vaultKey = new PublicKey(PRESALE_VAULT_ADDRESS)
    const usdtMint = new PublicKey(USDT_ADDRESS);
    const usdtVault = getAssociatedTokenAddressSync(usdtMint, vaultKey)

    const usdcMint = new PublicKey(USDC_ADDRESS);
    const usdcVault = getAssociatedTokenAddressSync(usdcMint, vaultKey)
    
    const ix = await program.methods
        .createPresale(
            new BN(hardcapAmount * 10 ** 9),
            new BN(pricePerToken * 10 ** 9),
            new BN(pricePerTokenNext * 10 ** 9),
            new BN(startTime),
            new BN(endTime),
            new BN(claimTime),
            new BN(Number(PRESALE_ID))
        )
        .accounts({
             presaleInfo: presaleInfoKey,
             authority: walletCtx.publicKey,
             usdtMint: new PublicKey(USDT_ADDRESS),
             usdcMint: new PublicKey(USDC_ADDRESS),
             vault: new PublicKey(PRESALE_VAULT_ADDRESS),
             usdcVault, usdtVault,
             systemProgram: SystemProgram.programId,
             tokenProgram: TOKEN_PROGRAM_ID, 
             associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
        })
        .instruction();

    return ix;
};

export const contract_updatePresale = async (
    walletCtx: AnchorWallet,
    pricePerToken: number,
    pricePerTokenNext: number,
    hardcapAmount: number,
    startTime: number,
    endTime: number,
    claimTime: number,
) => {
    if (!walletCtx) {
        console.error("Invalid wallet");
        throw new WalletNotConnectedError();
    }

    const program = getProgram(walletCtx);
    const presaleAdminKey = new PublicKey(PRESALE_ADMIN_ADDRESS);
    
    const presaleInfoKey = await Keys.getPresaleInfoKey(presaleAdminKey);
    if (!(presaleInfoKey instanceof PublicKey) || !program) {
        throw new Error("Invalid presaleInfoKey or Program: must be a PublicKey");
    }

    const ix = await program.methods
        .updatePresale(
            new BN(pricePerToken),
            new BN(pricePerTokenNext),
            new BN(hardcapAmount),
            new BN(startTime),
            new BN(endTime),
            new BN(claimTime),
            new BN(Number(PRESALE_ID))
        )
        .accounts({
            presaleInfo: presaleInfoKey,
            authority: walletCtx.publicKey,
            usdtMint: new PublicKey(USDT_ADDRESS),
            usdcMint: new PublicKey(USDC_ADDRESS),
            systemProgram: SystemProgram.programId
        })
        .instruction();

    return ix;
};

export const contract_depositToken = async (
    walletCtx: AnchorWallet,
    amount: number,
) => {
    if (!walletCtx) {
        console.error("Invalid wallet");
        throw new WalletNotConnectedError();
    }

    const program = getProgram(walletCtx);
    const presaleAdminKey = new PublicKey(PRESALE_ADMIN_ADDRESS);
    
    const presaleInfoKey = await Keys.getPresaleInfoKey(presaleAdminKey);
    if (!(presaleInfoKey instanceof PublicKey) || !program) {
        throw new Error("Invalid presaleInfoKey or Program: must be a PublicKey");
    }

    const fromAssociatedTokenAccount =
        await anchor.utils.token.associatedAddress({
            mint: new PublicKey(TOKEN_MINT_ADDRESS),
            owner: walletCtx.publicKey,
        });
    const toAssociatedTokenAccount =
        await anchor.utils.token.associatedAddress({
            mint: new PublicKey(TOKEN_MINT_ADDRESS),
            owner: presaleInfoKey,
        });

    const ix = await program.methods
        .depositToken(
            new BN(amount * 10 ** TOKEN_DECIMALS),
            new BN(Number(PRESALE_ID))
        )
        .accounts({
            mintAccount: new PublicKey(TOKEN_MINT_ADDRESS),
            fromAssociatedTokenAccount,
            fromAuthority: walletCtx.publicKey,
            toAssociatedTokenAccount,
            presaleInfo: presaleInfoKey,
            payer: walletCtx.publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID, 
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
        })
        .instruction();

    return ix;
};

export const contract_buySol = async (
    walletCtx: AnchorWallet,
    amount: number,
) => {
    if (!walletCtx) {
        console.error("Invalid wallet");
        throw new WalletNotConnectedError();
    }

    const program = getProgram(walletCtx);
    const presaleAdminKey = new PublicKey(PRESALE_ADMIN_ADDRESS)

    const presaleInfoKey = await Keys.getPresaleInfoKey(presaleAdminKey);
    if (!(presaleInfoKey instanceof PublicKey) || !program) {
        throw new Error("Invalid presaleInfoKey or Program: must be a PublicKey");
    }

    const userInfoKey = await Keys.getUserInfoKey(presaleAdminKey, walletCtx.publicKey);
    if (!(userInfoKey instanceof PublicKey) || !program) {
        throw new Error("Invalid userInfoKey or Program: must be a PublicKey");
    }

    const mintKey = new PublicKey(TOKEN_MINT_ADDRESS)
    const buyerTokenAccount = getAssociatedTokenAddressSync(mintKey, walletCtx.publicKey);
    const presaleTokenAccount = getAssociatedTokenAddressSync(mintKey, presaleInfoKey, true);

    const solUsdPriceFeedAccount =new PublicKey("7UVimffxr9ow1uXYxsr4LHAcV58mLzhmwaeKvJ1pjLiE")
    const ix = await program.methods
        .buySol(
            new BN(amount),
            new BN(Number(PRESALE_ID))
        )
        .accounts({
            presaleInfo: presaleInfoKey,
            mintAccount: mintKey,
            buyerTokenAccount,
            presaleTokenAccount,
            priceUpdate: solUsdPriceFeedAccount,
            presaleAuthority: presaleAdminKey,
            userInfo: userInfoKey,
            vault: new PublicKey(PRESALE_VAULT_ADDRESS),
            buyer: walletCtx.publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID, 
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
        })
        .instruction();

    return ix;
};

export const contract_buyUsdc = async (
    walletCtx: AnchorWallet,
    amount: number,
) => {
    if (!walletCtx) {
        console.error("Invalid wallet");
        throw new WalletNotConnectedError();
    }

    const program = getProgram(walletCtx);
    const presaleAdminKey = new PublicKey(PRESALE_ADMIN_ADDRESS)
    
    const presaleInfoKey = await Keys.getPresaleInfoKey(presaleAdminKey);
    if (!(presaleInfoKey instanceof PublicKey) || !program) {
        throw new Error("Invalid presaleInfoKey or Program: must be a PublicKey");
    }

    const userInfoKey = await Keys.getUserInfoKey(presaleAdminKey, walletCtx.publicKey);
    if (!(userInfoKey instanceof PublicKey) || !program) {
        throw new Error("Invalid userInfoKey or Program: must be a PublicKey");
    }

    const mintKey = new PublicKey(TOKEN_MINT_ADDRESS)
    const buyerTokenAccount = getAssociatedTokenAddressSync(mintKey, walletCtx.publicKey);
    const presaleTokenAccount = getAssociatedTokenAddressSync(mintKey, presaleInfoKey, true);

    const usdcMint = new PublicKey(USDC_ADDRESS);
    const usdcAssociatedTokenAccount = getAssociatedTokenAddressSync(usdcMint, walletCtx.publicKey);
    const usdcVault = getAssociatedTokenAddressSync(usdcMint, new PublicKey(PRESALE_VAULT_ADDRESS), true);

    const ix = await program.methods
        .buyUsdc(
            new BN(amount),
            new BN(Number(PRESALE_ID))
        )
        .accounts({
            presaleInfo: presaleInfoKey,
            mintAccount: mintKey,
            buyerTokenAccount,
            presaleTokenAccount,
            usdcMint,
            presaleAuthority: presaleAdminKey,
            userInfo: userInfoKey,
            usdcAssociatedTokenAccount,
            usdcVault,
            buyer: walletCtx.publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID, 
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
        })
        .instruction();

    return ix;
};

export const contract_buyUsdt = async (
    walletCtx: AnchorWallet,
    amount: number,
) => {
    if (!walletCtx) {
        console.error("Invalid wallet");
        throw new WalletNotConnectedError();
    }

    const program = getProgram(walletCtx);
    const presaleAdminKey = new PublicKey(PRESALE_ADMIN_ADDRESS)
    
    const presaleInfoKey = await Keys.getPresaleInfoKey(presaleAdminKey);
    if (!(presaleInfoKey instanceof PublicKey) || !program) {
        throw new Error("Invalid presaleInfoKey or Program: must be a PublicKey");
    }

    const userInfoKey = await Keys.getUserInfoKey(presaleAdminKey, walletCtx.publicKey);
    if (!(userInfoKey instanceof PublicKey) || !program) {
        throw new Error("Invalid userInfoKey or Program: must be a PublicKey");
    }

    const mintKey = new PublicKey(TOKEN_MINT_ADDRESS)
    const buyerTokenAccount = getAssociatedTokenAddressSync(mintKey, walletCtx.publicKey);
    const presaleTokenAccount = getAssociatedTokenAddressSync(mintKey, presaleInfoKey, true);

    const usdtMint = new PublicKey(USDT_ADDRESS);
    
    const usdtAssociatedTokenAccount = getAssociatedTokenAddressSync(usdtMint, walletCtx.publicKey);
    const usdtVault = getAssociatedTokenAddressSync(usdtMint, new PublicKey(PRESALE_VAULT_ADDRESS));

    const ix = await program.methods
        .buyUsdt(
            new BN(amount),
            new BN(Number(PRESALE_ID))
        )
        .accounts({
            presaleInfo: presaleInfoKey,
            mintAccount: mintKey,
            buyerTokenAccount,
            presaleTokenAccount,
            usdtMint,
            presaleAuthority: presaleAdminKey,
            userInfo: userInfoKey,
            usdtAssociatedTokenAccount,
            usdtVault,
            buyer: walletCtx.publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID, 
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
        })
        .instruction();

    return ix;
};

export const contract_claimToken = async (
    walletCtx: AnchorWallet,
) => {
    if (!walletCtx) {
        console.error("Invalid wallet");
        throw new WalletNotConnectedError();
    }

    const program = getProgram(walletCtx);
    const presaleAdminKey = new PublicKey(PRESALE_ADMIN_ADDRESS)
    
    const presaleInfoKey = await Keys.getPresaleInfoKey(presaleAdminKey);
    if (!(presaleInfoKey instanceof PublicKey) || !program) {
        throw new Error("Invalid presaleInfoKey or Program: must be a PublicKey");
    }

    const userInfoKey = await Keys.getUserInfoKey(presaleAdminKey, walletCtx.publicKey);
    if (!(userInfoKey instanceof PublicKey) || !program) {
        throw new Error("Invalid userInfoKey or Program: must be a PublicKey");
    }

    const mintKey = new PublicKey(TOKEN_MINT_ADDRESS)
    const buyerTokenAccount = getAssociatedTokenAddressSync(mintKey, walletCtx.publicKey);
    const presaleTokenAccount = getAssociatedTokenAddressSync(mintKey, presaleInfoKey, true);

    const ix = await program.methods
        .claimToken(
            new BN(Number(PRESALE_ID))
        )
        .accounts({
            mintAccount: mintKey,
            buyerTokenAccount,
            presaleTokenAccount,
            userInfo: userInfoKey,
            presaleInfo: presaleInfoKey,
            presaleAuthority: presaleAdminKey,
            buyer: walletCtx.publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID, 
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
        })
        .instruction();

    return ix;
};

export const contract_withdrawToken = async (
    walletCtx: AnchorWallet,
) => {
    if (!walletCtx) {
        console.error("Invalid wallet");
        throw new WalletNotConnectedError();
    }

    const program = getProgram(walletCtx);
    const presaleAdminKey = new PublicKey(PRESALE_ADMIN_ADDRESS)
    
    const presaleInfoKey = await Keys.getPresaleInfoKey(presaleAdminKey);
    if (!(presaleInfoKey instanceof PublicKey) || !program) {
        throw new Error("Invalid presaleInfoKey or Program: must be a PublicKey");
    }

    const userInfoKey = await Keys.getUserInfoKey(presaleAdminKey, walletCtx.publicKey);
    if (!(userInfoKey instanceof PublicKey) || !program) {
        throw new Error("Invalid userInfoKey or Program: must be a PublicKey");
    }

    const mintKey = new PublicKey(TOKEN_MINT_ADDRESS)
    const buyerPresaleTokenAssociatedTokenAccount = getAssociatedTokenAddressSync(mintKey, walletCtx.publicKey);
    const presalePresaleTokenAssociatedTokenAccount = getAssociatedTokenAddressSync(mintKey, presaleInfoKey, true);

    const ix = await program.methods
        .withdrawToken(
            new BN(Number(PRESALE_ID))
        )
        .accounts({
            presaleTokenMintAccount: mintKey,
            buyerPresaleTokenAssociatedTokenAccount,
            presalePresaleTokenAssociatedTokenAccount,
            presaleInfo: presaleInfoKey,
            presaleAuthority: presaleAdminKey,
            buyer: walletCtx.publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID, 
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
        })
        .instruction();

    return ix;
};
