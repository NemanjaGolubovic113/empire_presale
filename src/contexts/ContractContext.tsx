import React, { createContext, useEffect, useState, useContext } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import {
    contract_getPresaleInfo,
    contract_getUserInfo,

    contract_createPresale,
    contract_updatePresale,
    contract_depositToken,
    contract_buySol,
    contract_buyUsdc,
    contract_buyUsdt,
    contract_claimToken,
    contract_withdrawToken
} from './contracts';


interface ContractContextType {
    getPresaleInfo: () => Promise<any>;
    getUserInfo: () => Promise<any>;

    createPresale: (
        hardcapAmount: number,
        pricePerToken: number,
        pricePerTokenNext: number,
        startTime: number,
        endTime: number,
        claimTime: number
    ) => Promise<any>;
    updatePresale: (
        pricePerToken: number,
        pricePerTokenNext: number,
        hardcapAmount: number,
        startTime: number,
        endTime: number,
        claimTime: number
    ) => Promise<any>;
    depositToken: (amount: number) => Promise<any>;
    buySol: (amount: number) => Promise<any>;
    buyUsdc: (amount: number) => Promise<any>;
    buyUsdt: (amount: number) => Promise<any>;
    claimToken: () => Promise<any>;
    withdrawToken: () => Promise<any>;
}

export const ContractContext = createContext<ContractContextType | null>(null);

const ContractContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [txLoading, setTxLoading] = useState(false);

    const walletCtx = useAnchorWallet();


    const getPresaleInfo = async () => {
        return await contract_getPresaleInfo(walletCtx);
    };

    const getUserInfo = async () => {
        return await contract_getUserInfo(walletCtx);
    };

    const createPresale = async (
        hardcapAmount: number,
        pricePerToken: number,
        pricePerTokenNext: number,
        startTime: number,
        endTime: number,
        claimTime: number
    ) => {
        let tx = null;
        try {
            tx = await contract_createPresale(
                walletCtx,
                hardcapAmount,
                pricePerToken,
                pricePerTokenNext,
                startTime,
                endTime,
                claimTime
            );
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }
        return tx;
    };

    const updatePresale = async (
        pricePerToken: number,
        pricePerTokenNext: number,
        hardcapAmount: number,
        startTime: number,
        endTime: number,
        claimTime: number
    ) => {
        let tx = null;
        try {
            tx = await contract_updatePresale(
                walletCtx,
                pricePerToken,
                pricePerTokenNext,
                hardcapAmount,
                startTime,
                endTime,
                claimTime
            );
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }
        return tx;
    };

    const depositToken = async (amount: number) => {
        let tx = null;
        try {
            tx = await contract_depositToken(walletCtx, amount);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }
        return tx;
    };

    const buySol = async (amount: number) => {
        let tx = null;
        try {
            tx = await contract_buySol(walletCtx, amount);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }
        return tx;
    };

    const buyUsdc = async (amount: number) => {
        let tx = null;
        try {
            tx = await contract_buyUsdc(walletCtx, amount);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }
        return tx;
    };

    const buyUsdt = async (amount: number) => {
        let tx = null;
        try {
            tx = await contract_buyUsdt(walletCtx, amount);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }
        return tx;
    };

    const claimToken = async () => {
        let tx = null;
        try {
            tx = await contract_claimToken(walletCtx);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }
        return tx;
    };

    const withdrawToken = async () => {
        let tx = null;
        try {
            tx = await contract_withdrawToken(walletCtx);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }
        return tx;
    };

    // const withdrawSol = async () => {
    //     let tx = null;
    //     try {
    //         tx = await contract_withdrawSol(walletCtx);
    //     } catch (err) {
    //         console.error(err);
    //         if (err instanceof Error) {
    //             throw new Error(err.message);
    //         } else {
    //             throw new Error(String(err));
    //         }
    //     }
    //     return tx;
    // };

    // const withdrawUsdt = async () => {
    //     let tx = null;
    //     try {
    //         tx = await contract_withdrawUsdt(walletCtx);
    //     } catch (err) {
    //         console.error(err);
    //         if (err instanceof Error) {
    //             throw new Error(err.message);
    //         } else {
    //             throw new Error(String(err));
    //         }
    //     }
    //     return tx;
    // };

    // const withdrawUsdc = async () => {
    //     let tx = null;
    //     try {
    //         tx = await contract_withdrawUsdc(walletCtx);
    //     } catch (err) {
    //         console.error(err);
    //         if (err instanceof Error) {
    //             throw new Error(err.message);
    //         } else {
    //             throw new Error(String(err));
    //         }
    //     }
    //     return tx;
    // };

    const context = {
        getPresaleInfo,
        getUserInfo,


        createPresale,
        updatePresale,
        depositToken,
        buySol,
        buyUsdc,
        buyUsdt,
        claimToken,
        withdrawToken
    };

    return <ContractContext.Provider value={context}>{children}</ContractContext.Provider>
};

export const useContract = () => {
    const contractManager = useContext(ContractContext);
    return contractManager || [{}, async () => {}];
};

export default ContractContextProvider;
