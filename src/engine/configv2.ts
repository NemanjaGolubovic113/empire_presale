import { Raydium, TxVersion, parseTokenAccountResp } from '@raydium-io/raydium-sdk-v2'
import { Connection, Keypair, clusterApiUrl, PublicKey } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token'
import bs58 from 'bs58'
import { AnchorWallet } from '@solana/wallet-adapter-react'

// export const owner: Keypair = Keypair.fromSecretKey(bs58.decode('<YOUR_WALLET_SECRET_KEY>'))
// export const connection = new Connection('<YOUR_RPC_URL>') //<YOUR_RPC_URL>
// export const connection = new Connection(clusterApiUrl('devnet')) //<YOUR_RPC_URL>
const IS_MAINNET = import.meta.env.VITE_PUBLIC_IS_MAINNET || "";
const isMainNet = IS_MAINNET === "true";

export const txVersion = TxVersion.V0 // or TxVersion.LEGACY
const cluster = isMainNet ? 'mainnet' : 'devnet' // 'mainnet' | 'devnet'

let raydium: Raydium | undefined
export const initSdk = async (params?: { loadToken?: boolean, owner?: PublicKey, connection?: Connection }) => {
  if (raydium) return raydium
  if (params.connection.rpcEndpoint === clusterApiUrl(isMainNet ? 'mainnet-beta' : 'devnet'))
    console.warn('using free rpc node might cause unexpected error, strongly suggest uses paid rpc node')
  // console.log(`connect to rpc ${params.connection.rpcEndpoint} in ${cluster}`)
  raydium = await Raydium.load({
    owner: params.owner,
    connection: params.connection,
    cluster,
    disableFeatureCheck: true,
    disableLoadToken: !params?.loadToken,
    blockhashCommitment: 'finalized',
    // urlConfigs: {
    //   BASE_HOST: '<API_HOST>', // api url configs, currently api doesn't support devnet
    // },
  })

  /**
   * By default: sdk will automatically fetch token account data when need it or any sol balace changed.
   * if you want to handle token account by yourself, set token account data after init sdk
   * code below shows how to do it.
   * note: after call raydium.account.updateTokenAccount, raydium will not automatically fetch token account
   */

  /*  
  raydium.account.updateTokenAccount(await fetchTokenAccountData())
  connection.onAccountChange(owner.publicKey, async () => {
    raydium!.account.updateTokenAccount(await fetchTokenAccountData())
  })
  */

  return raydium
}

export const fetchTokenAccountData = async (owner: AnchorWallet, connection: Connection) => {
  const solAccountResp = await connection.getAccountInfo(owner.publicKey)
  const tokenAccountResp = await connection.getTokenAccountsByOwner(owner.publicKey, { programId: TOKEN_PROGRAM_ID })
  const token2022Req = await connection.getTokenAccountsByOwner(owner.publicKey, { programId: TOKEN_2022_PROGRAM_ID })
  const tokenAccountData = parseTokenAccountResp({
    owner: owner.publicKey,
    solAccountResp,
    tokenAccountResp: {
      context: tokenAccountResp.context,
      value: [...tokenAccountResp.value, ...token2022Req.value],
    },
  })
  return tokenAccountData
}
