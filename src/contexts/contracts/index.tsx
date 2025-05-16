
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
    FEE_PRE_DIV,
    PRESALE_ID,
    USDC_ADDRESS,
    USDT_ADDRESS
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


export const contract_getMainStateInfo = async (walletCtx: AnchorWallet | undefined) => {
    if (!walletCtx) {
        return null
        // throw new WalletNotConnectedError();
    }

    const mainStateKey = await Keys.getMainStateKey();

    if (!(mainStateKey instanceof PublicKey)) {
        return null
        // throw new Error("Invalid mainStateKey: must be a PublicKey");
    }
    const mainStateInfo = await connection.getAccountInfo(mainStateKey);
    const program = getProgram(walletCtx);
    if (!mainStateInfo || !program) {
        return null;
    }
    
    // mainStateInfo = await program.account.mainState.fetch(mainStateKey);
    return await program.account.mainState.fetch(mainStateKey);
};

export const contract_getUserInfo = async (walletCtx: AnchorWallet | undefined, baseToken: string) => {
    if (!walletCtx) {
        return null
        // throw new WalletNotConnectedError();
    }

    const buyer = walletCtx.publicKey;
    const baseMint = new PublicKey(baseToken);
    const quoteMint = new PublicKey(NATIVE_MINT);
    if (!baseMint || !quoteMint)
        throw new Error("Invalid token");

    const poolStateKey = await Keys.getPoolStateKey(baseMint, quoteMint);
    if (!(poolStateKey instanceof PublicKey)) {
        throw new Error("Invalid poolStateKey: must be a PublicKey");
    }

    const userInfoKey = await Keys.getUserInfoKey(poolStateKey, buyer);
    if (!(userInfoKey instanceof PublicKey)) {
        throw new Error("Invalid userInfoKey: must be a PublicKey");
    }
    // console.log("userInfoKey = ", userInfoKey.toBase58());

    const userInfo = await connection.getAccountInfo(userInfoKey);
    const program = getProgram(walletCtx);
    if (!userInfo || !program) {
        return null;
    }
    
    return await program.account.userInfo.fetch(userInfoKey);
};

export const contract_isInitialized = async (walletCtx: AnchorWallet | undefined) => {
    const mainStateInfo = await contract_getMainStateInfo(walletCtx);
    return mainStateInfo?.initialized;
};

export const contract_initMainState = async (walletCtx: AnchorWallet | undefined) => {
    if (!walletCtx)
        throw new WalletNotConnectedError();

    const program = getProgram(walletCtx);
    const mainStateKey = await Keys.getMainStateKey();
    if (!(mainStateKey instanceof PublicKey) || !program) {
        throw new Error("Invalid mainStateKey or Program: must be a PublicKey");
    }

    const quoteMint = new PublicKey(NATIVE_MINT);
    const feeRecipient = new PublicKey('D6vcy9sgxHovwoowqgwEZYe6YWuScQHe8Dr6DYHfxtFX');

    
    const feeQuoteAta = getAssociatedTokenAddressSync(quoteMint, feeRecipient);

    // console.log("  mainStateKey = ", mainStateKey.toBase58(), ", quoteMint = ", quoteMint.toBase58(), ", owner = ", walletCtx.publicKey.toBase58());
    // console.log("  feeQuoteAta = ", feeQuoteAta.toBase58(),  ", mainStateInfo.feeRecipient = ", feeRecipient.toBase58());

    const tx = new Transaction().add(
        await program.methods
            .initMainState()
            .accounts({
                mainState: mainStateKey,/* quoteMint,*/
                owner: walletCtx.publicKey,
                /*feeRecipient: feeRecipient, feeQuoteAta,*/
                systemProgram: SystemProgram.programId,
                /*tokenProgram: TOKEN_PROGRAM_ID, 
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID*/
    
            })
            .instruction()
    );

    const txHash = await send(connection, walletCtx, tx);
    // console.log('  initMainState txHash:', txHash);
};

export const contract_isPoolCreated = async (walletCtx: AnchorWallet | undefined, baseToken: string, quoteMint: PublicKey) => {
    if (!walletCtx) {
        console.error("Invalid wallet");
        return false
        // throw new WalletNotConnectedError();
    }

    try {
        const baseMint = new PublicKey(baseToken);
        const poolStateKey = await Keys.getPoolStateKey(baseMint, quoteMint);

        const program = getProgram(walletCtx);
        if (!(poolStateKey instanceof PublicKey) || !program) {
            console.error("Invalid poolStateKey or Program: must be a PublicKey");
            return false
        }
        const poolStateInfo = await program.account.poolState.fetch(poolStateKey);

        return poolStateInfo;
    } catch (err) {
        console.error(err);
        return false;
    }
};

export const contract_createPoolTx = async (walletCtx: AnchorWallet | undefined, baseToken: string, baseAmount: number, quoteMint: PublicKey, quoteAmount: number, liveTime: number, initSolVer: number, hardcap: number, tokenPer: number, tokenLiqPer: number, utility: boolean) => {
    if (!walletCtx) {
        console.error("Invalid wallet");
        return null
        // throw new WalletNotConnectedError();
    }

    const creator = walletCtx.publicKey;
    const program = getProgram(walletCtx);
    const mainStateKey = await Keys.getMainStateKey();
    
    if (!(mainStateKey instanceof PublicKey) || !program) {
        console.error("Invalid mainStateKey or Program: must be a PublicKey");
        return null
    }

    const baseMint = new PublicKey(baseToken);
    if (!baseMint || !quoteMint)
        throw new Error("Invalid token");
    
    const baseMintDecimals = TOKEN_DECIMALS;
    const quoteMintDecimals = 9;
    const baseBalance = new BN(Math.floor(baseAmount * (10 ** baseMintDecimals)));
    const quoteBalance = new BN(Math.floor(quoteAmount * (10 ** quoteMintDecimals)));
    const creatorBaseAta = getAssociatedTokenAddressSync(baseMint, creator);
    const creatorQuoteAta = getAssociatedTokenAddressSync(quoteMint, creator);
    const poolStateKey = await Keys.getPoolStateKey(baseMint, quoteMint);
    if (!(poolStateKey instanceof PublicKey)) {
        console.error("Invalid poolStateKey: must be a PublicKey");
        return null
    }

    const vaultKey = await Keys.getVaultKey(poolStateKey);
    if (!(vaultKey instanceof PublicKey)) {
        throw new Error("Invalid vaultKey: must be a PublicKey");
    }

    const reserverBaseAta = getAssociatedTokenAddressSync(baseMint, poolStateKey, true);
    const reserverQuoteAta = getAssociatedTokenAddressSync(quoteMint, poolStateKey, true);
    const endTime = new BN(Math.floor(Date.now() / 1000) + liveTime);
    // console.log("utility : ", utility, ", initSolVer: ", initSolVer, ", hardcap: ", hardcap, ", tokenPer : ", tokenPer);
    const initSolVerAmount = new BN(Math.floor(initSolVer * (10 ** quoteMintDecimals)));
    // console.log("initSolVerAmount = ", initSolVerAmount, ", val = ", initSolVerAmount.toNumber());
    const realSolThresholdAmount = new BN(Math.floor(hardcap * (10 ** quoteMintDecimals)));
    // console.log("realSolThresholdAmount = ", realSolThresholdAmount, ", val = ", realSolThresholdAmount.toNumber());
    const tokenPerVal = new BN(Math.floor(tokenPer * (10 ** baseMintDecimals)));
    // console.log("tokenPerVal : ", tokenPerVal.toNumber(), ", baseAmount = ", baseBalance.toNumber());
    const tokenLiqPerVal = new BN(Math.floor(tokenLiqPer * (10 ** baseMintDecimals)));
    const ix = await program.methods
        .createPool({ baseAmount: baseBalance, quoteAmount: quoteBalance, endTime: endTime, utility: utility, virtSolInitReserve: initSolVerAmount, realSolThreshold: realSolThresholdAmount, tokenPercentSellThresold: tokenPerVal, tokenPercentLiqThresold: tokenLiqPerVal })
        .accounts({
            creator, 
            mainState: mainStateKey, 
            poolState: poolStateKey, 
            vault: vaultKey,
            baseMint, 
            creatorBaseAta,
            reserverBaseAta,
            systemProgram: SystemProgram.programId, 
            tokenProgram: TOKEN_PROGRAM_ID, 
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
        })
        // .preInstructions([web3.ComputeBudgetProgram.setComputeUnitLimit({ units: 300_000 })]);
        .instruction();

    const newTx = new Transaction();
    newTx.add(ix);
    // console.log ("simulation::: \n", connection.simulateTransaction(newTx));

    return ix;
};

export const contract_buyTx = async (walletCtx: AnchorWallet | undefined, baseToken: string, solAmount: number, infAddr: string, infBenefit: number, userBenefit: number) => {
    if (!walletCtx) {
        console.error("Invalid wallet");
        throw new WalletNotConnectedError();
    }
    // console.log("contract_buyTx ::: ", "walletCtx = ", walletCtx.publicKey.toBase58(), "baseToken = ", baseToken, "solAmount = ", solAmount);

    const buyer = walletCtx.publicKey;
    const program = getProgram(walletCtx);
    // console.log("contract_buyTx ::: ", "program = ", program);
    const mainStateKey = await Keys.getMainStateKey();
    if (!(mainStateKey instanceof PublicKey) || !program) {
        throw new Error("Invalid mainStateKey or Program: must be a PublicKey");
    }
    // console.log("contract_buyTx ::: ", "mainStateKey = ", mainStateKey.toBase58());
    const mainStateInfo = await program.account.mainState.fetch(mainStateKey);
    if (!mainStateInfo) {
        throw new Error("Failed to fetch mainState!");
    }
    // console.log("contract_buyTx ::: ", "mainStateInfo = ", mainStateInfo);

    const baseMint = new PublicKey(baseToken);
    const quoteMint = new PublicKey(NATIVE_MINT);
    if (!baseMint || !quoteMint)
        throw new Error("Invalid token");

    // console.log("contract_buyTx ::: ", "baseMint = ", baseMint.toBase58(), "quoteMint = ", quoteMint.toBase58());

    const poolStateKey = await Keys.getPoolStateKey(baseMint, quoteMint);
    if (!(poolStateKey instanceof PublicKey)) {
        throw new Error("Invalid poolStateKey: must be a PublicKey");
    }

    const vaultKey = await Keys.getVaultKey(poolStateKey);
    if (!(vaultKey instanceof PublicKey)) {
        throw new Error("Invalid vaultKey: must be a PublicKey");
    }

    // console.log("contract_buyTx ::: ", "poolStateKey = ", poolStateKey.toBase58());

    const userInfoKey = await Keys.getUserInfoKey(poolStateKey, buyer);
    if (!(userInfoKey instanceof PublicKey)) {
        throw new Error("Invalid userInfoKey: must be a PublicKey");
    }
    // console.log("contract_buyTx ::: ", "userInfoKey = ", userInfoKey.toBase58());

    let influencer = null;
    if (infAddr) influencer = new PublicKey(infAddr);
    
    const quoteMintDecimals = 9;
    const balance = new BN(Math.floor(solAmount * (10 ** quoteMintDecimals)));
    const buyerBaseAta = getAssociatedTokenAddressSync(baseMint, buyer);
    const buyerQuoteAta = getAssociatedTokenAddressSync(quoteMint, buyer);
    const reserverBaseAta = getAssociatedTokenAddressSync(baseMint, poolStateKey, true);
    const reserverQuoteAta = getAssociatedTokenAddressSync(quoteMint, poolStateKey, true);
    // @ts-ignore
    const feeQuoteAta = getAssociatedTokenAddressSync(quoteMint, mainStateInfo.feeRecipient);
    // console.log("---------------- feequoteAta = ", feeQuoteAta.toBase58(), ", quoteMint = ", quoteMint.toBase58(), ", mainStateInfo.feeRecipient = ", mainStateInfo.feeRecipient.toBase58());

    // console.log("contract_buyTx ::: ", "balance = ", balance.toString(), "buyerBaseAta = ", buyerBaseAta.toBase58(), "buyerQuoteAta = ", buyerQuoteAta.toBase58(), "reserverBaseAta = ", reserverBaseAta.toBase58(), "reserverQuoteAta = ", reserverQuoteAta.toBase58(), "feeQuoteAta = ", feeQuoteAta.toBase58());
    // console.log("contract_buyTx ::: ", "quoteMint = ", quoteMint.toBase58(), ", baseMint = ", baseMint.toBase58(), ", feeRecipient = ", mainStateInfo.feeRecipient.toBase58());
    
    const ix = await program.methods
        .buy({amount: balance, cpn: influencer ? true : false, infbene: new BN(infBenefit), userbene: new BN(userBenefit)})
        .accounts({
            baseMint,
            // @ts-ignore
            inf: influencer ? influencer : mainStateInfo.feeRecipient,
            buyer, buyerBaseAta,/* buyerQuoteAta, */
            mainState: mainStateKey, 
            poolState: poolStateKey,
            vault: vaultKey,
            userInfo: userInfoKey,
            // @ts-ignore
            feeRecipient: mainStateInfo.feeRecipient,/* feeQuoteAta, */
            reserverBaseAta,/* reserverQuoteAta, */
            systemProgram: SystemProgram.programId, 
            tokenProgram: TOKEN_PROGRAM_ID, 
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
        })
        // .preInstructions([web3.ComputeBudgetProgram.setComputeUnitLimit({ units: 300_000 })]);
        .instruction();

    return ix;
};

export const contract_sellTx = async (walletCtx: AnchorWallet | undefined, baseToken: string, sellAmount: number) => {
    if (!walletCtx) {
        console.error("Invalid wallet");
        throw new WalletNotConnectedError();
    }

    const seller = walletCtx.publicKey;
    const program = getProgram(walletCtx);
    const mainStateKey = await Keys.getMainStateKey();
    if (!(mainStateKey instanceof PublicKey) || !program) {
        throw new Error("Invalid mainStateKey or Program: must be a PublicKey");
    }
    const mainStateInfo = await program.account.mainState.fetch(mainStateKey);
    if (!mainStateInfo) {
        throw new Error("Failed to fetch mainState!");
    }

    const baseMint = new PublicKey(baseToken);
    const quoteMint = new PublicKey(NATIVE_MINT);
    if (!baseMint || !quoteMint) {
        throw new Error("Invalid token");
    }
    const poolStateKey = await Keys.getPoolStateKey(baseMint, quoteMint);
    if (!(poolStateKey instanceof PublicKey)) {
        throw new Error("Invalid poolStateKey: must be a PublicKey");
    }
    
    const baseMintDecimals = TOKEN_DECIMALS;
    const sellBalance = new BN(Math.floor(sellAmount * (10 ** baseMintDecimals)));
    const sellerBaseAta = getAssociatedTokenAddressSync(baseMint, seller);
    const sellerQuoteAta = getAssociatedTokenAddressSync(quoteMint, seller);
    const reserverBaseAta = getAssociatedTokenAddressSync(baseMint, poolStateKey, true);
    const reserverQuoteAta = getAssociatedTokenAddressSync(quoteMint, poolStateKey, true);
    // @ts-ignore
    const feeQuoteAta = getAssociatedTokenAddressSync(quoteMint, mainStateInfo.feeRecipient);
    
    const ix = await program.methods
        .sell(sellBalance)
        .accounts({
            mainState: mainStateKey,
            poolState: poolStateKey,
            baseMint, quoteMint,
            seller, sellerBaseAta, sellerQuoteAta,
            reserverBaseAta, reserverQuoteAta,
            // @ts-ignore
            feeRecipient: mainStateInfo.feeRecipient, feeQuoteAta, 
            systemProgram: SystemProgram.programId, 
            tokenProgram: TOKEN_PROGRAM_ID, 
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
        })
        // .preInstructions([web3.ComputeBudgetProgram.setComputeUnitLimit({ units: 300_000 })]);
        .instruction();

    return ix;
};

export const contract_updateMainStateInfo = async (walletCtx: AnchorWallet | undefined, owner: string, feeRecipient: string, tradingFee: number) => {
    if (!walletCtx) throw new WalletNotConnectedError();

    let newTradingFee = null;
    
    const newOwner = new PublicKey(owner);
    if (!newOwner) throw new Error('Invalid owner address!');
    
    const newFeeRecipient = new PublicKey(feeRecipient);
    if (!newFeeRecipient) throw new Error('Invalid fee recipient address!');
    
    const tmpFee = Math.trunc(tradingFee * FEE_PRE_DIV);
    newTradingFee = new BN(tmpFee);

    const program = getProgram(walletCtx);
    const mainStateKey = await Keys.getMainStateKey();
    if (!(mainStateKey instanceof PublicKey) || !program) {
        throw new Error("Invalid mainStateKey or Program: must be a PublicKey");
    }
    const tx = new Transaction().add(
        await program.methods.updateMainState({
            tradingFee: newTradingFee
        })
        .accounts({
            owner: walletCtx.publicKey, 
            mainState: mainStateKey,
            feeRecipient: newFeeRecipient, 
            newOwner,
            systemProgram: SystemProgram.programId,
        })
        .instruction()
    );

    const txHash = await send(connection, walletCtx, tx);
    // console.log('  updateMainState txHash:', txHash);
};

export const contract_isPoolComplete = async (walletCtx: AnchorWallet | undefined, baseToken: string, quoteMint: PublicKey) => {
    if (!walletCtx) {
        console.error("Invalid wallet");
        return false;
    }

    const baseMint = new PublicKey(baseToken);
    if (!baseMint || !quoteMint) {
        console.error("Invalid token");
        return false;
    }
    const poolStateKey = await Keys.getPoolStateKey(baseMint, quoteMint);
    const program = getProgram(walletCtx);
    if (!(poolStateKey instanceof PublicKey) || !program) {
        console.error("Invalid poolStateKey or Program: must be a PublicKey");
        return false
    }
    const poolStateInfo = await program.account.poolState.fetch(poolStateKey);

    return poolStateInfo?.complete;
};

export const contract_claimTx = async (walletCtx: AnchorWallet | undefined, baseToken: string) => {
    if (!walletCtx) {
        console.error("Invalid wallet");
        throw new WalletNotConnectedError();
    }

    const buyer = walletCtx.publicKey;
    const program = getProgram(walletCtx);

    const mainStateKey = await Keys.getMainStateKey();
    if (!(mainStateKey instanceof PublicKey) || !program) {
        throw new Error("Invalid mainStateKey or Program: must be a PublicKey");
    }

    const mainStateInfo = await program.account.mainState.fetch(mainStateKey);
    if (!mainStateInfo) {
        throw new Error("Failed to fetch mainState!");
    }

    const baseMint = new PublicKey(baseToken);
    const quoteMint = new PublicKey(NATIVE_MINT);
    if (!baseMint || !quoteMint)
        throw new Error("Invalid token");

    const poolStateKey = await Keys.getPoolStateKey(baseMint, quoteMint);
    if (!(poolStateKey instanceof PublicKey)) {
        throw new Error("Invalid poolStateKey: must be a PublicKey");
    }

    const vaultKey = await Keys.getVaultKey(poolStateKey);
    if (!(vaultKey instanceof PublicKey)) {
        throw new Error("Invalid vaultKey: must be a PublicKey");
    }

    const userInfoKey = await Keys.getUserInfoKey(poolStateKey, buyer);
    if (!(userInfoKey instanceof PublicKey)) {
        throw new Error("Invalid userInfoKey: must be a PublicKey");
    }
    // console.log("userInfoKey = ", userInfoKey.toBase58());
    const userInfo = await program.account.userInfo.fetch(userInfoKey);
    if (!userInfo) {
        throw new Error("Failed to fetch userInfo!");
    }
    // console.log("userInfo = ", userInfo);
    // console.log("contract_ClaimTx ::: ", "buyer = ", buyer.toBase58(), "baseMint = ", baseMint.toBase58(), "quoteMint = ", quoteMint.toBase58(), "poolStateKey = ", poolStateKey.toBase58(), "userInfoKey = ", userInfoKey.toBase58(), "mainStateInfo = ", mainStateInfo);
    // console.log("contract_ClaimTx ::: ", "vaultKey = ", vaultKey.toBase58())
    
    const ix = await program.methods
        .claim()
        .accounts({
            buyer,
            mainState: mainStateKey, 
            poolState: poolStateKey,
            vault: vaultKey,
            baseMint,
            userInfo: userInfoKey,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId
        })
        // .preInstructions([web3.ComputeBudgetProgram.setComputeUnitLimit({ units: 300_000 })]);
        .instruction();

    // console.log("contract_ClaimTx ::: ", "ix = ", ix);
    return ix;
};

export const contract_withdraw2Tx = async (walletCtx: AnchorWallet | undefined, baseToken: string) => {
    if (!walletCtx) {
        console.error("Invalid wallet");
        throw new WalletNotConnectedError();
    }

    const admin = walletCtx.publicKey;
    const program = getProgram(walletCtx);
    const mainStateKey = await Keys.getMainStateKey();
    if (!(mainStateKey instanceof PublicKey) || !program) {
        throw new Error("Invalid mainStateKey or Program: must be a PublicKey");
    }
    const mainStateInfo = await program.account.mainState.fetch(mainStateKey);
    if (!mainStateInfo) {
        throw new Error("Failed to fetch mainState!");
    }

    const owner = mainStateInfo.owner;

    const baseMint = new PublicKey(baseToken);
    const quoteMint = new PublicKey(NATIVE_MINT);
    if (!baseMint || !quoteMint) {
        throw new Error("Invalid token");
    }

    const poolStateKey = await Keys.getPoolStateKey(baseMint, quoteMint);
    if (!(poolStateKey instanceof PublicKey)) {
        throw new Error("Invalid poolStateKey: must be a PublicKey");
    }
    const poolStateInfo = await program.account.poolState.fetch(poolStateKey);
    if (!poolStateInfo)
        throw new Error("Failed to fetch poolState!");
    
    const reserverBaseAta = getAssociatedTokenAddressSync(baseMint, poolStateKey, true);
    const reserverQuoteAta = getAssociatedTokenAddressSync(quoteMint, poolStateKey, true);
    const adminBaseAta = getAssociatedTokenAddressSync(baseMint, admin);
    const adminQuoteAta = getAssociatedTokenAddressSync(quoteMint, admin);
    
    const ix = await program.methods
        .withdraw()
        .accounts({
            admin,
            mainState: mainStateKey, 
            poolState: poolStateKey, 
            baseMint,
            reserverBaseAta, reserverQuoteAta, 
            adminBaseAta, adminQuoteAta, 
            systemProgram: SystemProgram.programId, 
            tokenProgram: TOKEN_PROGRAM_ID, 
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
        })
        // .preInstructions([web3.ComputeBudgetProgram.setComputeUnitLimit({ units: 300_000 })]);
        .instruction();

    return ix;
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
    
    const presaleInfoKey = await Keys.getPresaleInfoKey(walletCtx.publicKey);
    if (!(presaleInfoKey instanceof PublicKey) || !program) {
        throw new Error("Invalid presaleInfoKey or Program: must be a PublicKey");
    }

    const vaultKey = await Keys.getVaultKey(presaleInfoKey);
    if (!(vaultKey instanceof PublicKey)) {
        throw new Error("Invalid vaultKey: must be a PublicKey");
    }
    
    const ix = await program.methods
        .createPresale({
            hardcapAmount: new BN(hardcapAmount),
            pricePerToken: new BN(pricePerToken),
            pricePerTokenNext: new BN(pricePerTokenNext),
            startTime: new BN(startTime),
            endTime: new BN(endTime),
            claimTime: new BN(claimTime),
            identifier: new BN(Number(PRESALE_ID))
        })
        .accounts({
            presaleInfo: presaleInfoKey,
            authority: walletCtx.publicKey,
            usdtMint: new PublicKey(USDT_ADDRESS),
            usdcMint: new PublicKey(USDC_ADDRESS),
            vault: vaultKey,
            systemProgram: SystemProgram.programId
        })
        .instruction();

    return ix;
};
