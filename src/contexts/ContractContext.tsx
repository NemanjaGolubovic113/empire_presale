import React, { createContext, useEffect, useState, useContext } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import {
    contract_getPoolStateInfo,
    contract_getUserInfo,

    contract_createPresale,
    contract_updatePresale,
    contract_depositToken,
    contract_buySol,
    contract_buyUsdc,
    contract_buyUsdt,
    contract_claimToken,
    contract_withdrawToken,
    contract_withdrawSol,
    contract_withdrawUsdt,
    contract_withdrawUsdc
} from './contracts';


interface ContractContextType {
    getPresaleInfo: () => Promise<any>;
    getUserInfo: (baseToken: string) => Promise<any>;

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
    withdrawSol: () => Promise<any>;
    withdrawUsdt: () => Promise<any>;
    withdrawUsdc: () => Promise<any>;
}

export const ContractContext = createContext<ContractContextType | null>(null);

const ContractContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [txLoading, setTxLoading] = useState(false);

    const walletCtx = useAnchorWallet();


    const getPresaleInfo = async () => {
        return await contract_getPoolStateInfo(walletCtx);
    };

    const getUserInfo = async (baseToken: string) => {
        return await contract_getUserInfo(walletCtx, baseToken);
    };






    const createPresale = async (
        hardcapAmount: number,
        pricePerToken: number,
        pricePerTokenNext: number,
        startTime: number,
        endTime: number,
        claimTime: number
    ) => {
        try {
            await contract_createPresale(
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
    };

    const updatePresale = async (
        pricePerToken: number,
        pricePerTokenNext: number,
        hardcapAmount: number,
        startTime: number,
        endTime: number,
        claimTime: number
    ) => {
        try {
            await contract_updatePresale(
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
    };

    const depositToken = async (amount: number) => {
        try {
            await contract_depositToken(walletCtx, amount);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }
    };

    const buySol = async (amount: number) => {
        try {
            await contract_buySol(walletCtx, amount);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }
    };

    const buyUsdc = async (amount: number) => {
        try {
            await contract_buyUsdc(walletCtx, amount);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }
    };

    const buyUsdt = async (amount: number) => {
        try {
            await contract_buyUsdt(walletCtx, amount);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }
    };

    const claimToken = async () => {
        try {
            await contract_claimToken(walletCtx);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }
    };

    const withdrawToken = async () => {
        try {
            await contract_withdrawToken(walletCtx);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }
    };

    const withdrawSol = async () => {
        try {
            await contract_withdrawSol(walletCtx);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }
    };

    const withdrawUsdt = async () => {
        try {
            await contract_withdrawUsdt(walletCtx);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }
    };

    const withdrawUsdc = async () => {
        try {
            await contract_withdrawUsdc(walletCtx);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }
    };

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
        withdrawToken,
        withdrawSol,
        withdrawUsdt,
        withdrawUsdc,
    };

    return <ContractContext.Provider value={context}>{children}</ContractContext.Provider>
};

export const useContract = () => {
    const contractManager = useContext(ContractContext);
    return contractManager || [{}, async () => {}];
};

export default ContractContextProvider;
