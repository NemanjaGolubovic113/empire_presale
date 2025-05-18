import { TOKEN_DECIMALS } from "./consts";
import { connection } from "./config";
import { Keypair, 
    SystemProgram, 
    PublicKey, 
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, 
    MINT_SIZE, 
    AuthorityType, 
    getMinimumBalanceForRentExemptMint, 
    createInitializeMintInstruction, 
    getAssociatedTokenAddress, 
    createAssociatedTokenAccountInstruction, 
    createMintToInstruction, 
    createSetAuthorityInstruction
} from "@solana/spl-token";
import { 
    PROGRAM_ID, 
} from "@metaplex-foundation/mpl-token-metadata";
import { AnchorWallet, WalletContextState } from "@solana/wallet-adapter-react";


const createMint = async(mintAuthority: PublicKey, freezeAuthority: PublicKey | null, decimals: number) => {
    const keypair = Keypair.generate();
    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    const ixs = [
        SystemProgram.createAccount({
            fromPubkey: mintAuthority, 
            newAccountPubkey: keypair.publicKey, 
            space: MINT_SIZE, 
            lamports, 
            programId: TOKEN_PROGRAM_ID
        }), 
        createInitializeMintInstruction(
            keypair.publicKey, 
            decimals, 
            mintAuthority, 
            freezeAuthority, 
            TOKEN_PROGRAM_ID
        )
    ];

    return { keypair, ixs };
};

const mintToken = async(mint: PublicKey, mintAuthority: PublicKey, mintAmount: bigint, decimals: number) => {
    // console.log(`Minting tokens with mint ${mint} amount ${mintAmount}...`);

    const tokenAta = await getAssociatedTokenAddress(mint, mintAuthority);

    let ixs = [
        createAssociatedTokenAccountInstruction(mintAuthority, 
            tokenAta, 
            mintAuthority, 
            mint
        ), 
        createMintToInstruction(mint, 
            tokenAta, 
            mintAuthority, 
            mintAmount * BigInt(10 ** decimals)
        )
    ];

    return ixs;
}


const revokeMintAuthority = async(mint: PublicKey, mintAuthority: PublicKey) => {
    // console.log(`Revoking mintAuthority of token ${mint}...`);

    const ix = createSetAuthorityInstruction(mint, 
        mintAuthority, 
        AuthorityType.MintTokens, 
        null
    );

    return ix;
};
