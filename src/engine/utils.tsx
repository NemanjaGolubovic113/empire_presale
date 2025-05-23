import {
    PublicKey,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    SystemProgram,
    ComputeBudgetProgram,
    VersionedTransaction,
    TransactionMessage,
    Connection
} from '@solana/web3.js';
import {
    TOKEN_PROGRAM_ID,
    SPL_ACCOUNT_LAYOUT,
    InstructionType,
    InnerSimpleV0Transaction
} from '@raydium-io/raydium-sdk';
import * as anchor from '@project-serum/anchor';
import { connection, Config } from "../engine/config";
import {
    getComputeBudgetConfigHigh,
    getOptimalPriceAndBudget
} from './fee'

import axios from "axios";
import base58 from 'bs58';
import { AnchorWallet, WalletContextState } from '@solana/wallet-adapter-react';
import { CREATE_CPMM_POOL_PROGRAM, DEV_CREATE_CPMM_POOL_PROGRAM } from '@raydium-io/raydium-sdk-v2'

const VALID_PROGRAM_ID = new Set([CREATE_CPMM_POOL_PROGRAM.toBase58(), DEV_CREATE_CPMM_POOL_PROGRAM.toBase58()])

export const isValidCpmm = (id: string) => VALID_PROGRAM_ID.has(id)

const jitotipAccounts = [
    '3AVi9Tg9Uo68tJfuvoKvqKNWKkC5wPdSSdeBnizKZ6jT', // Jitotip 8
    'DfXygSm4jCyNCybVYYK6DwvWqjKee8pbDmJGcLWNDXjh', // Jitotip 5
    'Cw8CFyM9FkoMi7K7Crf6HNQqf4uEMzpKw6QNghXLvLkY', // Jitotip 3
    'ADaUMid9yfUytqMBgopwjb2DTLSokTSzL1zt6iGPaS49', // Jitotip 4
    'DttWaMuVvTiduZRnguLF7jNxTgiMBZ1hyAumKUiL2KRL', // Jitotip 7
    'ADuUkR4vqLUMWXxW9gh6D6L8pMSawimctcNZ5pGwDcEt', // Jitotip 6
    '96gYZGLnJYVFmbjzopPSU6QiEV5fGqZNyN9nmNhvrZU5', // Jitotip 1
    'HFqU5x63VTqvQss8hp11i4wVV8bD44PvwucfZ2bU7gRe', // Jitotip 2
]

const JITO_TIMEOUT = 150000;

export async function sleep(ms: number | undefined) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export async function getWalletTokenAccounts(connection: Connection, wallet: PublicKey) {
    const walletTokenAccount = await connection.getTokenAccountsByOwner(wallet, {
        programId: TOKEN_PROGRAM_ID
    });
    return walletTokenAccount.value.map((i) => ({
        pubkey: i.pubkey,
        programId: i.account.owner,
        accountInfo: SPL_ACCOUNT_LAYOUT.decode(i.account.data),
    }));
};


export const prioritizeIxs = async (connection: Connection, ixs: any[], feePayer: PublicKey) => {
    try {
        let transaction = new Transaction();

        // const {units, microLamports} = await getComputeBudgetConfigHigh();
        // console.log('units:', units);
        // console.log('microLamports:', microLamports);

        transaction.add(...ixs);
        transaction.recentBlockhash = (await connection.getLatestBlockhash("finalized")).blockhash;
        transaction.feePayer = feePayer;
        const [priorityFee, computeUnits] = await getOptimalPriceAndBudget(transaction, connection);
        // console.log('computeUnits:', computeUnits);
        // console.log('priorityFee:', priorityFee);

        // build new tx
        let allIxs = [];

        const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
            units: computeUnits /* units */
        });
        const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
            microLamports: priorityFee /* microLamports */
        });

        allIxs.push(modifyComputeUnits);
        allIxs.push(addPriorityFee);
        allIxs.push(...ixs);

        return allIxs;
    } catch (e) {
        console.error(e);
        return ixs;
    }
};

export const prioritizeTx = async (tx: InnerSimpleV0Transaction) => {
    try {
        let modifyComputeUnits;
        let addPriorityFee;
        let allIxTypes = [];
        let allIxs = [];

        const config = await getComputeBudgetConfigHigh();
        if (!config) {
            throw new Error("Failed to retrieve compute budget configuration.");
        }
        const { units, microLamports } = config;
        // console.log('units:', units);
        // console.log('microLamports:', microLamports);

        modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
            units: units * 2
        });

        addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
            microLamports: microLamports
        });

        allIxTypes.push(InstructionType.setComputeUnitLimit);
        allIxs.push(modifyComputeUnits);

        allIxTypes.push(InstructionType.setComputeUnitPrice);
        allIxs.push(addPriorityFee);

        allIxTypes.push(...tx.instructionTypes);
        allIxs.push(...tx.instructions);

        return {
            instructionTypes: allIxTypes,
            instructions: allIxs,
            signers: [] as PublicKey[],
            lookupTableAddress: {}
        };
    } catch (e) {
        console.error(e);
        return {
            instructionTypes: tx.instructionTypes,
            instructions: tx.instructions,
            signers: [],
            lookupTableAddress: {}
        };
    }
};

const getProvider = () => {
    if ('phantom' in window) {
        // @ts-ignore
        const provider = window.phantom?.solana;
    
        if (provider?.isPhantom) {
            return provider;
        }
    }
  
    window.open('https://phantom.app/', '_blank');
};

export const sendTransaction = async (connection: Connection, walletCtx: AnchorWallet, transaction: Transaction | VersionedTransaction) => {
    if (walletCtx.publicKey === null || walletCtx.signTransaction === undefined)
        throw new Error("Invalid wallet!");

    try {
        if (transaction instanceof Transaction) {
            transaction.feePayer = walletCtx.publicKey;
        }
        if (transaction instanceof Transaction) {
            console.log('Transaction +++ 111:', await connection.simulateTransaction(transaction));
        } else if (transaction instanceof VersionedTransaction) {
            console.log('Transaction: +++ 222', await connection.simulateTransaction(transaction));
        }

        const signedTx = await walletCtx.signTransaction(transaction);
        const rawTx = signedTx.serialize();

        // console.log('Sending transaction...');
        const txHash = await connection.sendRawTransaction(rawTx, {
            skipPreflight: false,
            maxRetries: 15
        });
        return txHash;
    } catch (err) {
        console.error('sendTransaction err:', err);
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

export const send = async (connection: Connection, walletCtx: AnchorWallet, transaction: Transaction | VersionedTransaction) => {
    if ((transaction instanceof Transaction)) {
        // if (import.meta.env.VITE_PUBLIC_IS_MAINNET === "true") {
        //     const newIxs = await prioritizeIxs(connection, transaction.instructions, walletCtx.publicKey);
        //     const tx = new Transaction();
        //     tx.add(...newIxs);
        //     transaction = tx;
        //     console.log('simulate transaction on send :', await connection.simulateTransaction(transaction));
        // }

        transaction.recentBlockhash = (await connection.getLatestBlockhash("finalized")).blockhash;
        
    }

    // if (transaction instanceof Transaction) {
    //     console.log('transaction on send 1:', await connection.simulateTransaction(transaction));
    // } else if (transaction instanceof VersionedTransaction) {
    //     console.log('transaction on send 2:', await connection.simulateTransaction(transaction));
    // }

    try {
        const txHash = await sendTransaction(connection, walletCtx, transaction);
        if (txHash === null) {
            console.error('Transaction failed');
            return;
        }

        // console.log('Confirming transaction...');
        let res = await connection.confirmTransaction(txHash);
        if (res.value.err)
            console.error('Transaction failed');
        // else
        //     console.log('Transaction confirmed');
        return txHash;
    } catch (err) {
        console.error('send err:', err);
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

export async function jitoSendBunleByApi(transactions: any[]) {
    try {
        if (transactions.length === 0)
            return;

        let bundleIds: any[] = [];
        const rawTransactions = transactions.map(item => base58.encode(item.serialize()));

        const { data } = await axios.post(`https://${Config.BLOCK_ENGINE_URL}/api/v1/bundles`,
            {
                jsonrpc: "2.0",
                id: 1,
                method: "sendBundle",
                params: [
                    rawTransactions
                ],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (data) {
            // console.log(data);
            bundleIds = [
                ...bundleIds,
                data.result,
            ];
        }

        // console.log("Checking bundle's status...", bundleIds);
        const sentTime = Date.now();
        while (Date.now() - sentTime < JITO_TIMEOUT) {
            try {
                const { data } = await axios.post(`https://${Config.BLOCK_ENGINE_URL}/api/v1/bundles`,
                    {
                        jsonrpc: "2.0",
                        id: 1,
                        method: "getBundleStatuses",
                        params: [
                            bundleIds
                        ],
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (data) {
                    const bundleStatuses: any[] = data.result.value;
                    // console.log("Bundle Statuses:", bundleStatuses);
                    let success = true;
                    for (let i = 0; i < bundleIds.length; i++) {
                        const matched = bundleStatuses.find(item => item && item.bundle_id === bundleIds[i]);
                        if (!matched || matched.confirmation_status !== "finalized") {
                            success = false;
                            break;
                        }
                    }

                    if (success)
                        return true;
                }
            }
            catch (err) {
                console.log(err);
            }

            await sleep(1000);
        }
    }
    catch (err) {
        console.log(err);
    }
    return false;
}

export async function jitoSend(
    connection: Connection,
    tx: Transaction | VersionedTransaction,
    signer: AnchorWallet,
    tip: number,
) {

    const tipAccount = new PublicKey(jitotipAccounts[0]);
    const tipInstruction = SystemProgram.transfer({
        fromPubkey: signer.publicKey,
        toPubkey: tipAccount,
        lamports: Math.max(Math.floor(tip * LAMPORTS_PER_SOL), 5001),
    })

    if (tx instanceof Transaction) {
        tx.recentBlockhash = (await connection.getLatestBlockhash("finalized")).blockhash;
        tx.feePayer = signer.publicKey;
        tx.add(tipInstruction)
    }
    // if (tx instanceof Transaction) {
    //     console.log("+++++ tx =1111===", await connection.simulateTransaction(tx));
    // } else if (tx instanceof VersionedTransaction) {
    //     console.log("+++++ tx ====", await connection.simulateTransaction(tx));
    // }

    const signedTrx = await signer.signTransaction(tx);
    await jitoSendBunleByApi([signedTrx])

    // console.log("signedTrx", signedTrx)

    const signature = 'signature' in signedTrx.signatures[0] ? signedTrx.signatures[0].signature : signedTrx.signatures[0];
    if (!signature) {
        throw new Error("Signature is null or undefined");
    }
    return base58.encode(signature);
}

export function getPassedTime (timestamp: number) {
    let data = timestamp * 1000;
    if (timestamp < 0) {
        data = Math.abs(timestamp) * 1000;
    }
    let ret = '';

    const date = Number((data / 86400000).toString().split(".")[0]);
    if (date) {
        ret += date + 'd';
    }

    const hours = Number(((data - date * 86400000) / 3600000).toString().split(".")[0]);
    if (hours) {
        ret += ' ' + hours + 'h';
    }

    const minutes = Number(((data - date * 86400000 - hours * 3600000) / 60000).toString().split(".")[0]);
    if (minutes) {
        ret += ' ' + minutes + 'm';
    }

    const seconds = Number(((data - date * 86400000 - hours * 3600000 - minutes * 60000) / 1000).toString().split(".")[0]);
    if (seconds) {
        ret += ' ' + seconds + 's';
    }

    return ret;
}

export async function fetchSOLPrice () {
    while (true) {
        try {
            const response = await axios.get('https://api.coinbase.com/v2/prices/SOL-USD/spot');
            const newSolPrice = Number(response.data.data.amount);
            return newSolPrice;
        } catch (err) {
            console.error('Error fetching SOL price:', err);
            await sleep(100);
        }
    }
};