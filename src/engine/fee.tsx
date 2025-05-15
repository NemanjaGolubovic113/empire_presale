import {
    Transaction, 
    ComputeBudgetProgram,
    Connection
} from '@solana/web3.js';
import axios from "axios";
import bs58 from "bs58";
import { networkUrl } from "./config";


export async function getPriorityFeeEstimateForTransaction(tx: Transaction) {
    try {
        const endpoint = networkUrl;
        const jsonPayload = {
            jsonrpc: '2.0',
            id: '1',
            method: 'getPriorityFeeEstimate',
            params: [
                {
                    transaction: bs58.encode(tx.serialize({ verifySignatures: false, requireAllSignatures: false })), // Pass the serialized transaction in Base58
                    options: { includeAllPriorityFeeLevels: true },
                },
            ]
        }
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonPayload)
        }).then(res => res.json());

        //const highFee = res.result.priorityFeeLevels.high as number;
        const veryHighFee = res.result.priorityFeeLevels.veryHigh;
        const finalFee = Math.min(Math.floor((veryHighFee * 2)), 20_000_000);
        return finalFee;
    } catch (e) {
        console.log(e);
        return 1_000_000;
    }
}

export async function getPriorityFeeEstimateForTransactionQuicknode() {
    try {
        const endpoint = networkUrl;
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "jsonrpc": "2.0",
        "id": 1,
        "method": "qn_estimatePriorityFees",
        "params": {
            "last_n_blocks": 100,
            "account": "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4",
            "api_version": 2
        }
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: 'follow' as RequestRedirect
        };

        const res = await fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            const extremeFee = result.result.per_compute_unit.extreme as number;
            const finalFee = Math.min(Math.floor((extremeFee * 2)), 20_000_000);
            return finalFee;
        })
        .catch((error) => {
            console.error(error);
            return 1_000_000;
        })

        return res;

    } catch (e) {
        console.log(e);
        return 1_000_000;
    }
}

export async function getComputeUnitsForTransaction(tx: Transaction, connection: Connection, priorityFee: number) {
    try {
        const newTx = new Transaction();
        newTx.add(ComputeBudgetProgram.setComputeUnitPrice({ microLamports: priorityFee }));
        newTx.add(ComputeBudgetProgram.setComputeUnitLimit({ units: 1_400_000 }));
        newTx.add(...tx.instructions);
        newTx.recentBlockhash = tx.recentBlockhash;
        newTx.lastValidBlockHeight = tx.lastValidBlockHeight;
        newTx.feePayer = tx.feePayer;

        const simulation = await connection.simulateTransaction(newTx);
        if (simulation.value.err) {
            return 0;
        }

        return simulation.value.unitsConsumed ?? 200_000;
    } catch (e) {
        console.log(e);
        return 0
    }
}

export async function getOptimalPriceAndBudget(hydratedTransaction: Transaction, connection: Connection) {
    const priorityFee = await getPriorityFeeEstimateForTransactionQuicknode();
    const computeUnits = await getComputeUnitsForTransaction(hydratedTransaction, connection, priorityFee);
    return [priorityFee, computeUnits];
}


export async function getComputeBudgetConfigHigh() {
    const response = await axios.get('https://solanacompass.com/api/fees');
    const json = response.data;
    const { avg } = json?.[15] ?? {};
    // console.log('avg:', avg);
    if (!avg) return undefined; // fetch error
    return {
      units: 100_000,
      microLamports: Math.max(Math.ceil((avg * 1_000_000) / 100_000), 25000)
    };
}
