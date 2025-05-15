import { ApiV3PoolInfoStandardItemCpmm, CpmmKeys, CpmmRpcData, CurveCalculator } from '@raydium-io/raydium-sdk-v2'
import { initSdk } from './configv2'
import BN from 'bn.js'
import { isValidCpmm } from './utils'
import { NATIVE_MINT } from '@solana/spl-token'
import { printSimulateInfo } from './util'
import { PublicKey, Connection } from '@solana/web3.js'
import { AnchorWallet } from '@solana/wallet-adapter-react'
import { send } from './utils'

// const IS_MAINNET = import.meta.env.VITE_PUBLIC_IS_MAINNET || "";
// const isMainNet = IS_MAINNET === "true";

export const swapOnRaydium = async (connection: Connection, wallet: AnchorWallet, poolId: string, inputMint: string, inputAmount: BN, slippage: number) => {
  const raydium = await initSdk({ owner: wallet.publicKey, connection: connection })

  // SOL - USDC pool
//   const poolId = '7JuwJuNU88gurFnyWeiyGKbFmExMWcmRZntn9imEzdny'
//   const inputAmount = new BN(100)
//   const inputMint = NATIVE_MINT.toBase58()

  let poolInfo: ApiV3PoolInfoStandardItemCpmm
  let poolKeys: CpmmKeys | undefined
  let rpcData: CpmmRpcData

  if (raydium.cluster === 'mainnet') {
    // note: api doesn't support get devnet pool info, so in devnet else we go rpc method
    // if you wish to get pool info from rpc, also can modify logic to go rpc method directly
    const data = await raydium.api.fetchPoolById({ ids: poolId })
    poolInfo = data[0] as ApiV3PoolInfoStandardItemCpmm
    if (!isValidCpmm(poolInfo.programId)) throw new Error('target pool is not CPMM pool')
    rpcData = await raydium.cpmm.getRpcPoolInfo(poolInfo.id, true)
  } else {
    const data = await raydium.cpmm.getPoolInfoFromRpc(poolId)
    poolInfo = data.poolInfo
    poolKeys = data.poolKeys
    rpcData = data.rpcData
  }

  if (inputMint !== poolInfo.mintA.address && inputMint !== poolInfo.mintB.address)
    throw new Error('input mint does not match pool')

  const baseIn = inputMint === poolInfo.mintA.address

  // swap pool mintA for mintB
  const swapResult = CurveCalculator.swap(
    inputAmount,
    baseIn ? rpcData.baseReserve : rpcData.quoteReserve,
    baseIn ? rpcData.quoteReserve : rpcData.baseReserve,
    rpcData.configInfo!.tradeFeeRate
  )

  /**
   * swapResult.sourceAmountSwapped -> input amount
   * swapResult.destinationAmountSwapped -> output amount
   * swapResult.tradeFee -> this swap fee, charge input mint
   */

  const { execute, transaction, extInfo } = await raydium.cpmm.swap({
    poolInfo,
    poolKeys,
    inputAmount,
    swapResult,
    slippage: slippage, // range: 1 ~ 0.0001, means 100% ~ 0.01%
    baseIn,
    // optional: set up priority fee here
    // computeBudgetConfig: {
    //   units: 600000,
    //   microLamports: 4659150,
    // },

    // optional: add transfer sol to tip account instruction. e.g sent tip to jito
    // txTipConfig: {
    //   address: new PublicKey('96gYZGLnJYVFmbjzopPSU6QiEV5fGqZNyN9nmNhvrZU5'),
    //   amount: new BN(10000000), // 0.01 sol
    // },
  })

  // printSimulateInfo()
  // don't want to wait confirm, set sendAndConfirm to false or don't pass any params to execute
//   const { txId } = await execute({ sendAndConfirm: true })
  const txId = await send(connection, wallet, transaction)
//   console.log('swap on Raydium', extInfo)
  // console.log(`swapped: ${poolInfo.mintA.symbol} to ${poolInfo.mintB.symbol}:`, {
  //   txId: `https://explorer.solana.com/tx/${txId}`,
  // })
  return txId
//   process.exit() // if you don't want to end up node execution, comment this line
}

/** uncomment code below to execute */
// swap()