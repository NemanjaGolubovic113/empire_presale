import { PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, 
    ASSOCIATED_TOKEN_PROGRAM_ID
} from '@solana/spl-token';
import { PRESALE_PROGRAM_ID, 
    USER_INFO_SEED,
    VAULT_SEED,
    PRESALE_SEED,
    PRESALE_ID
} from './constants';


const asyncGetPda = async (seeds: Array<Buffer | Uint8Array>, programId: PublicKey) => {
    const [pubKey, bump] = PublicKey.findProgramAddressSync(seeds, programId);
    return [pubKey, bump];
    
};

// export const getUserInfoKey = async (poolKey: PublicKey, buyerKey: PublicKey) => {
//     const [userInfoKey] = await asyncGetPda(
//         [
//             Buffer.from(USER_INFO_SEED),
//             poolKey.toBuffer(),
//             buyerKey.toBuffer(),
//         ],
//         PRESALE_PROGRAM_ID
//     );
//     return userInfoKey;
// }

// export const getVaultKey = async (poolKey: PublicKey) => {
//     const [userInfoKey] = await asyncGetPda(
//         [
//             Buffer.from(VAULT_SEED),
//             poolKey.toBuffer(),
//         ],
//         PRESALE_PROGRAM_ID
//     );
//     return userInfoKey;
// }

export const getAssociatedTokenAccountKey = async (ownerPubkey: PublicKey, tokenMint: PublicKey) => {
    let associatedTokenAccountKey = PublicKey.findProgramAddressSync(
        [
            ownerPubkey.toBuffer(), 
            TOKEN_PROGRAM_ID.toBuffer(), 
            tokenMint.toBuffer()
        ], 
        ASSOCIATED_TOKEN_PROGRAM_ID
    )[0];
    return associatedTokenAccountKey;
};

export const getPresaleInfoKey = async (wallet: PublicKey) => {
    const [presaleInfoKey] = await asyncGetPda(
        [
            Buffer.from(PRESALE_SEED),
            wallet.toBuffer(),
            new Uint8Array([Number(PRESALE_ID)]),
        ],
        PRESALE_PROGRAM_ID
    );
    return presaleInfoKey;
}

export const getVaultKey = async (presaleInfoKey: PublicKey) => {
    const [userInfoKey] = await asyncGetPda(
        [
            Buffer.from(VAULT_SEED),
            presaleInfoKey.toBuffer(),
            // new Uint8Array([Number(PRESALE_ID)]),
        ],
        PRESALE_PROGRAM_ID
    );
    return userInfoKey;
}

export const getUserInfoKey = async (presaleAdmin: PublicKey, buyerKey: PublicKey) => {
    const [userInfoKey] = await asyncGetPda(
        [
            Buffer.from(USER_INFO_SEED),
            presaleAdmin.toBuffer(),
            buyerKey.toBuffer(),
            new Uint8Array([Number(PRESALE_ID)]),
        ],
        PRESALE_PROGRAM_ID
    );
    return userInfoKey;
}
