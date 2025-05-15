import * as anchor from "@project-serum/anchor";
export const IDL: anchor.Idl = {
  "version": "0.1.0",
  "name": "expirepresale",
  "instructions": [
    {
      "name": "initMainState",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateMainState",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeRecipient",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "newOwner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "UpdateMainStateInput"
          }
        }
      ]
    },
    {
      "name": "createPool",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "creatorBaseAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserverBaseAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "CreatePoolInput"
          }
        }
      ]
    },
    {
      "name": "buy",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "inf",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeRecipient",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "buyerBaseAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserverBaseAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "BuyInput"
          }
        }
      ]
    },
    {
      "name": "claim",
      "accounts": [
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mainState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserverBaseAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminBaseAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "MainState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initialized",
            "type": "bool"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "feeRecipient",
            "type": "publicKey"
          },
          {
            "name": "initVirtQuoteReserves",
            "type": "u64"
          },
          {
            "name": "tradingFee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "PoolState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "konst",
            "type": "u128"
          },
          {
            "name": "baseMint",
            "type": "publicKey"
          },
          {
            "name": "virtBaseReserves",
            "type": "u64"
          },
          {
            "name": "realBaseReserves",
            "type": "u64"
          },
          {
            "name": "virtQuoteReserves",
            "type": "u64"
          },
          {
            "name": "realQuoteReserves",
            "type": "u64"
          },
          {
            "name": "totalTokenSupply",
            "type": "u64"
          },
          {
            "name": "complete",
            "type": "bool"
          },
          {
            "name": "endTime",
            "type": "i64"
          },
          {
            "name": "utility",
            "type": "bool"
          },
          {
            "name": "realSolThreshold",
            "type": "u64"
          },
          {
            "name": "realUtilityTeamBaseReserves",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UserInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "buyQuoteAmount",
            "type": "u64"
          },
          {
            "name": "buyQuoteFeeAmount",
            "type": "u64"
          },
          {
            "name": "buyTokenAmount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "UpdateMainStateInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tradingFee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "BuyInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "cpn",
            "type": "bool"
          },
          {
            "name": "infbene",
            "type": "u64"
          },
          {
            "name": "userbene",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "CreatePoolInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "baseAmount",
            "type": "u64"
          },
          {
            "name": "quoteAmount",
            "type": "u64"
          },
          {
            "name": "endTime",
            "type": "i64"
          },
          {
            "name": "utility",
            "type": "bool"
          },
          {
            "name": "virtSolInitReserve",
            "type": "u64"
          },
          {
            "name": "realSolThreshold",
            "type": "u64"
          },
          {
            "name": "tokenPercentSellThresold",
            "type": "u64"
          },
          {
            "name": "tokenPercentLiqThresold",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "CreateEvent",
      "fields": [
        {
          "name": "creator",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "baseMint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "baseReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "quoteReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "timestamp",
          "type": "i64",
          "index": false
        },
        {
          "name": "totalTokenSupply",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "TradeEvent",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "baseMint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "solAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "tokenAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "baseReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "quoteReserves",
          "type": "u64",
          "index": false
        },
        {
          "name": "isBuy",
          "type": "bool",
          "index": false
        },
        {
          "name": "timestamp",
          "type": "i64",
          "index": false
        },
        {
          "name": "infbene",
          "type": "u64",
          "index": false
        },
        {
          "name": "pfee",
          "type": "u64",
          "index": false
        },
        {
          "name": "inf",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "CompleteEvent",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "baseMint",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "timestamp",
          "type": "i64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Uninitialized",
      "msg": "Uninitialized"
    },
    {
      "code": 6001,
      "name": "AlreadyInitialized",
      "msg": "AlreadyInitialized"
    },
    {
      "code": 6002,
      "name": "Unauthorised",
      "msg": "Unauthorised"
    },
    {
      "code": 6003,
      "name": "InsufficientFund",
      "msg": "Insufficient fund"
    },
    {
      "code": 6004,
      "name": "UnknownToken",
      "msg": "One token should be Sol"
    },
    {
      "code": 6005,
      "name": "BondingCurveIncomplete",
      "msg": "BondingCurve incomplete"
    },
    {
      "code": 6006,
      "name": "BondingCurveComplete",
      "msg": "BondingCurve complete"
    },
    {
      "code": 6007,
      "name": "BondingCurveExpired",
      "msg": "BondingCurve expired"
    },
    {
      "code": 6008,
      "name": "ExceedMaxBuyAmount",
      "msg": "Exceed max buy amount"
    },
    {
      "code": 6009,
      "name": "NoAdmin",
      "msg": "No admin"
    },
    {
      "code": 6010,
      "name": "NoMemeCoin",
      "msg": "No meme coin"
    }
  ],
  "metadata": {
    "address": "8j8xK5B6fQZkP4esSe7KZG1LnTfGxuBuVKUXiedgEpWz"
  }
};
