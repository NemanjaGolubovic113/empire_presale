import React, { createContext, useEffect, useState, useContext } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import {
    contract_getMainStateInfo,
    contract_getUserInfo,
    contract_isInitialized, 
    contract_initMainState, 
    contract_isPoolCreated, 
    contract_createPoolTx, 
    contract_buyTx, 
    contract_sellTx, 
    contract_updateMainStateInfo, 
    contract_isPoolComplete,
    contract_claimTx,
    contract_withdraw2Tx,

    contract_createPresale
} from './contracts';


interface ContractContextType {
    getTradingFee: () => Promise<any>;
    getOwnerAddress: () => Promise<string | null>;
    getMainStateInfo: () => Promise<any>;
    getUserInfo: (baseToken: string) => Promise<any>;
    isContractInitialized: () => Promise<any>;
    initializeContract: () => Promise<void>;
    getCreatePoolTx: (baseToken: string, baseAmount: number, quoteMint: PublicKey, quoteAmount: number, liveTime: number, initSolVer: number, hardcap: number, tokenPer: number, tokenLiqPer: number, utility: boolean) => Promise<any>;
    isPoolCreated: (baseToken: string, quoteMint: PublicKey) => Promise<any>;
    getBuyTx: (token: string, amount: number, infAddr: string, infBenefit: number, userBenefit: number) => Promise<any>;
    getSellTx: (token: string, amount: number) => Promise<any>;
    updateMainStateInfo: (owner: string, feeRecipient: string, tradingFee: number) => Promise<void>;
    isPoolComplete: (baseToken: string, quoteMint: PublicKey) => Promise<boolean>;
    getClaimTx: (baseToken: string) => Promise<any>;
    getWithdraw2Tx: (baseToken: string) => Promise<any>;

    createPresale: (
        hardcapAmount: number,
        pricePerToken: number,
        pricePerTokenNext: number,
        startTime: number,
        endTime: number,
        claimTime: number
    ) => Promise<any>;
}

export const ContractContext = createContext<ContractContextType | null>(null);

const ContractContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [txLoading, setTxLoading] = useState(false);

    const walletCtx = useAnchorWallet();

    useEffect(() => {
    }, []);

    const getTradingFee = async (): Promise<any> => {
        const mainStateInfo = await contract_getMainStateInfo(walletCtx);
        if (!mainStateInfo) return 0;
        return mainStateInfo.tradingFee;
    };

    const getOwnerAddress = async (): Promise<string | null> => {
        const mainStateInfo = await contract_getMainStateInfo(walletCtx);
        if (!mainStateInfo) return null;
        return mainStateInfo.owner as string;
    };

    const getMainStateInfo = async () => {
        return await contract_getMainStateInfo(walletCtx);
    };

    const getUserInfo = async (baseToken: string) => {
        return await contract_getUserInfo(walletCtx, baseToken);
    };

    const isContractInitialized = async (): Promise<any> => {
        return await contract_isInitialized(walletCtx);
    };

    const initializeContract = async () => {
        setTxLoading(true);

        try {
            await contract_initMainState(walletCtx);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }

        setTxLoading(false);
    };

    const isPoolCreated = async (baseToken: string, quoteMint: PublicKey) => {
        return await contract_isPoolCreated(walletCtx, baseToken, quoteMint);
    };

    const getCreatePoolTx = async (baseToken: string, baseAmount: number, quoteMint: PublicKey, quoteAmount: number, liveTime: number, initSolVer: number, hardcap: number, tokenPer: number, tokenLiqPer: number, utility: boolean) => {
        let tx = null;

        // console.log("getCreatePoolTx", "baseToken = ", baseToken, "baseAmount = ", baseAmount, "quoteMint = ", quoteMint.toBase58(), "quoteAmount = ", quoteAmount, "liveTime = ", liveTime);

        setTxLoading(true);

        try {
            tx = await contract_createPoolTx(walletCtx, baseToken, baseAmount, quoteMint, quoteAmount, liveTime, initSolVer, hardcap, tokenPer, tokenLiqPer, utility);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }

        setTxLoading(false);

        return tx;
    };

    const getBuyTx = async (token: string, amount: number, infAddr: string, infBenefit: number, userBenefit: number) => {
        let tx = null;

        setTxLoading(true);

        try {
            tx = await contract_buyTx(walletCtx, token, amount, infAddr, infBenefit, userBenefit);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }

        setTxLoading(false);

        return tx;
    };

    const getSellTx = async (token: string, amount: number) => {
        let tx = null;

        setTxLoading(true);

        try {
            tx = await contract_sellTx(walletCtx, token, amount);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }

        setTxLoading(false);

        return tx;
    };

    const updateMainStateInfo = async (owner: string, feeRecipient: string, tradingFee: number) => {
        setTxLoading(true);

        try {
            await contract_updateMainStateInfo(walletCtx, owner, feeRecipient, tradingFee);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }

        setTxLoading(false);
    };

    const isPoolComplete = async (baseToken: string, quoteMint: PublicKey): Promise<boolean> => {
        return await contract_isPoolComplete(walletCtx, baseToken, quoteMint) as boolean;
    };

    const getClaimTx = async (token: string) => {
        let tx = null;
        setTxLoading(true);
        try {
            tx = await contract_claimTx(walletCtx, token);
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error(String(error));
            }
            
        }
        setTxLoading(true);
        return tx;
    }

    const getWithdraw2Tx = async (baseToken: string) => {
        let tx = null;

        setTxLoading(true);

        try {
            tx = await contract_withdraw2Tx(walletCtx, baseToken);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(String(err));
            }
        }

        setTxLoading(false);

        return tx;
    }




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

    const context = {
        getTradingFee,
        getOwnerAddress, 
        getMainStateInfo,
        getUserInfo,
        isContractInitialized, 
        initializeContract, 
        getCreatePoolTx, 
        isPoolCreated, 
        getBuyTx, 
        getSellTx, 
        updateMainStateInfo, 
        isPoolComplete,
        getClaimTx,
        getWithdraw2Tx,


        createPresale
    };

    return <ContractContext.Provider value={context}>{children}</ContractContext.Provider>
};

export const useContract = () => {
    const contractManager = useContext(ContractContext);
    return contractManager || [{}, async () => {}];
};

export default ContractContextProvider;
