
import { MARKET_STATE_LAYOUT_V3, 
    Percent, 
    Liquidity, 
    buildSimpleTransaction,
    TokenAmount,
    Token
} from "@raydium-io/raydium-sdk";

import {
    connection, 
    PROGRAMIDS, 
    makeTxVersion, 
    addLookupTableInfo
} from "./config";
import {
    getWalletTokenAccounts, 
    prioritizeTx, 
    send
} from "./utils";
import { AnchorWallet } from "@solana/wallet-adapter-react";


export const swap = async (walletCtx: AnchorWallet, inputTokenAmount: TokenAmount, outputToken: Token, marketId: any, isBuy: boolean) => {
    const baseToken = isBuy ? outputToken : inputTokenAmount.token;
    const quoteToken = isBuy ? inputTokenAmount.token : outputToken;
    const walletTokenAccounts = await getWalletTokenAccounts(connection, walletCtx.publicKey);

    const slippage = new Percent(1, 100);

    // const [{ publicKey: marketId, marketAccount }] = await Market.findAccountsByMints(connection, baseToken.mint, quoteToken.mint, PROGRAMIDS.OPENBOOK_MARKET);
    // console.log("  marketId:", marketId);
    // console.log("  marketAccount:", marketAccount);
    const marketAccount = await connection.getAccountInfo(marketId);
    if (marketAccount === null) throw new Error('get market info error');
    const marketInfo = MARKET_STATE_LAYOUT_V3.decode(marketAccount.data);

    let poolKeys = Liquidity.getAssociatedPoolKeys({
        version: 4,
        marketVersion: 3,
        baseMint: baseToken.mint,
        quoteMint: quoteToken.mint,
        baseDecimals: baseToken.decimals,
        quoteDecimals: quoteToken.decimals,
        marketId,
        programId: PROGRAMIDS.AmmV4,
        marketProgramId: PROGRAMIDS.OPENBOOK_MARKET,
    });
    // console.log("  poolKeys:", poolKeys);

    let poolKeys2 = {
        ...poolKeys, 
        marketBaseVault: marketInfo.baseVault,
        marketQuoteVault: marketInfo.quoteVault,
        marketBids: marketInfo.bids,
        marketAsks: marketInfo.asks,
        marketEventQueue: marketInfo.eventQueue,
    };
    // console.log("  poolKeys2:", poolKeys2);

    // -------- step 1: compute amount out --------
    const { amountOut, minAmountOut } = Liquidity.computeAmountOut({
        poolKeys: poolKeys2,
        poolInfo: await Liquidity.fetchInfo({ connection, poolKeys: poolKeys2 }),
        amountIn: inputTokenAmount,
        currencyOut: outputToken,
        slippage,
    });
    // console.log('  amountOut:', amountOut.toFixed(), '  minAmountOut:', minAmountOut.toFixed());

    // -------- step 2: create instructions by SDK function --------
    const { innerTransactions } = await Liquidity.makeSwapInstructionSimple({
        connection,
        poolKeys: poolKeys2,
        userKeys: {
            tokenAccounts: walletTokenAccounts,
            owner: walletCtx.publicKey,
        },
        amountIn: inputTokenAmount,
        amountOut: minAmountOut,
        fixedSide: 'in',
        makeTxVersion,
    });
    // console.log('innerTransactions:', innerTransactions);

    let newInnerTxs = [];
	for (const innerTx of innerTransactions) {
		const newInnerTx = await prioritizeTx(innerTx);
		newInnerTxs.push(newInnerTx);
		// console.log('newInnerTx:', newInnerTx);
	}

    const transactions = await buildSimpleTransaction({
        connection,
        makeTxVersion,
        payer: walletCtx.publicKey,
        innerTransactions: newInnerTxs,
        addLookupTableInfo,
    });

    let txhashes = [];
    for (const tx of transactions) {
        const txhash = await send(connection, walletCtx, tx);
        if (txhash === "") {
            console.error('failed to swap');
            return txhashes;
        }

        txhashes.push(txhash);
    }

    // console.log('  swapped txns:', txhashes);
    return txhashes;
}
