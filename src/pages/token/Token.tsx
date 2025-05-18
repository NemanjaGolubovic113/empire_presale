import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, Transaction, PublicKey } from '@solana/web3.js'
import { NATIVE_MINT } from '@solana/spl-token'
import {
  Token,
  TokenAmount,
  TOKEN_PROGRAM_ID
} from "@raydium-io/raydium-sdk";
import { toast } from "react-toastify";
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import ProgressBar from "../../components/ui/progressbar";
import { useContract } from "../../contexts/ContractContext";
import { Header } from "../../components/Header";
import { TOKEN_DECIMALS } from "../../engine/consts";
import { send } from "../../engine/utils";
import { connection } from "../../engine/config";
import { FEE_PRE_DIV } from "../../contexts/contracts/constants";
import TokenCalculator from "../../components/ui/TokenCalculator";
import TokenPrice from "../../components/ui/TokenPrice";
import PresaleProgress from "../../components/ui/PresaleProgress";
import PaymentOptions from "../../components/ui/PaymentOptions";

const TokenIcon = () => (
  <span className="text-yellow-300 font-bold flex items-center justify-center w-6 h-6">
    $
  </span>
);
interface ContractContextType {
  isPoolCreated: (baseToken: string, quoteMint: PublicKey) => Promise<any>;
  getUserInfo: (baseToken: string) => Promise<any>;
  getBuyTx: (token: string, amount: number, infAddr: string, infBenefit: number, userBenefit: number) => Promise<any>;
  getSellTx: (token: string, amount: number) => Promise<any>;
  isPoolComplete: (baseToken: string, quoteMint: PublicKey) => Promise<boolean>;
  getClaimTx: (baseToken: string) => Promise<any>;
  getWithdraw2Tx: (baseToken: string) => Promise<any>;
  getTradingFee: () => Promise<any>;
}

export const TokenPage = (): JSX.Element => {
  const location = useLocation();
  const addr = location.pathname.split("/")[2];

  const walletCtx = useAnchorWallet();
  const { isPoolComplete: isPoolCompleted, getUserInfo, isPoolCreated, getTradingFee } = useContract() as ContractContextType;

  const [isTradeDialogOpen, setIsTradeDialogOpen] = useState(false)
  const [amount, setAmount] = useState<string | ''>('');
  const [currentCoin, setCurrentCoin] = useState('sol')
  const [isPoolComplete, setIsPoolComplete] = useState(false)
  const [created, setIsPoolCreated] = useState(null)
  const [tradingFee, setTradingFee] = useState<number | null>(null)
  const [tokenResult, setTokenResult] = useState<JSX.Element | null>(null);
  const [couponResult, setCouponResult] = useState<JSX.Element | null>(null);
  const [payAmount, setPayAmount] = useState<string>('1');
  const [receiveAmount, setReceiveAmount] = useState<string>('1.5');

  const [selectedPayment, setSelectedPayment] = useState('sol');
  
  const paymentOptions = [
    { 
      id: 'sol', 
      name: 'SOL',
      icon: <img src="/sol.png" alt="SOL" className="w-6 h-6" />
    },
    { 
      id: 'usdt', 
      name: 'USDT',
      icon: <img src="/usdt.png" alt="USDT" className="w-6 h-6" />
    },
    { 
      id: 'usdc', 
      name: 'USDC',
      icon: <img src="/usdc.png" alt="USDC" className="w-6 h-6" />
    },
    { 
      id: 'card', 
      name: 'CARD',
      icon: <img src="/card.png" alt="CARD" className="w-6 h-6" />
    }
  ];


  const handlePayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setPayAmount(value);
      if (value) {
        const amount = parseFloat(value)/* * exchangeRate*/;
        setReceiveAmount(amount.toString());
      } else {
        setReceiveAmount('');
      }
    }
  };

  const getPaymentDetails = () => {
    switch (selectedPayment) {
      case 'sol':
        return {
          symbol: 'SOL',
          exchangeRate: 13.21 // 1 SOL = 13.21 $EMP
        };
      case 'usdt':
        return {
          symbol: 'USDT',
          exchangeRate: 13.21 // Assuming same rate for demo
        };
      case 'card':
        return {
          symbol: 'USD',
          exchangeRate: 13.21 // Assuming same rate for demo
        };
      default:
        return {
          symbol: 'SOL',
          exchangeRate: 13.21
        };
    }
  };

  const payment = getPaymentDetails();


  useEffect(() => {
    if (walletCtx?.publicKey !== null) {
      checkCompleted()
    }
  }, [walletCtx])

  const checkCompleted = async () => {
    if (walletCtx?.publicKey !== null && addr !== undefined) {
      const created = await isPoolCreated(addr, NATIVE_MINT)
      setIsPoolCreated(created)
      const result = await isPoolCompleted(addr, NATIVE_MINT)
      setIsPoolComplete(result)
      const tradingFee = await getTradingFee()
      setTradingFee(Number(tradingFee) / FEE_PRE_DIV)
    }
  }

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 0) return;
    setAmount(e.target.value);
  };

  const onTrade = () => {
    if (!walletCtx) {
      toast.error('No Wallet Connected!');
      return;
    }

    if (Number(amount) == 0) {
      toast.warning('Please input amount');
      return;
    }

    let outputAmount = calculateOutputAmount(1);

    setIsTradeDialogOpen(true);
  };

  const calculateOutputAmount = (percent: number) => {
    // console.log("created === ", created);
    const outputTokenAmount = Math.trunc((Number(amount) * (Number(created.realBaseReserves) + Number(created.virtBaseReserves)) / 10 ** TOKEN_DECIMALS) / ((Number(created.virtQuoteReserves) + Number(created.realQuoteReserves)) / LAMPORTS_PER_SOL + Number(amount)));
    return outputTokenAmount * percent;
  }

  return (
    <div className="min-h-screen bg-[#100425] flex flex-col justify-center w-full">
      <div className="w-full mx-auto relative min-h-screen px-2">
        {/* Header with Logo and Connect Wallet */}
        <Header />
        {/* Background gradient */}
        <div className="fixed w-[650px] h-[650px] bottom-0 right-0 md:right-[50px] rounded-[324.87px] rotate-[-6.23deg] blur-[150px] [background:linear-gradient(133deg,rgba(220,0,211,1)_54%,rgba(12,250,245,1)_100%)] opacity-50 md:opacity-100" />

        <section className='z-10 flex flex-col sm:flex-row font-sans justify-center'>
          <div className="z-10 flex flex-col sm:max-w-sm w-full border-2 border-[#71647d] rounded-xl bg-gradient-to-b from-[#583071] to-[#3f245e]">
            <div className="flex flex-col p-4">
              <div className='flex flex-col gap-10 py-6'>
                <div className='flex flex-col gap-2 items-center'>
                  <p className='text-2xl text-white font-medium'>Emperor Presale</p>
                </div>

                <PresaleProgress
                  percentageSold={84.79}
                  totalRaised={14961994.34}
                  tokensSold={534359016.9}
                />
                
                <TokenPrice 
                  currentPrice="0.0757" 
                  nextPrice="0.0781" 
                  symbol="$EMP" 
                />
                
                <PaymentOptions 
                  options={paymentOptions} 
                  selectedOption={selectedPayment} 
                  onSelect={setSelectedPayment} 
                />
                
                {/* <TokenCalculator 
                  tokenSymbol="$EMP" 
                  paymentSymbol={payment.symbol}
                  exchangeRate={payment.exchangeRate}
                  paymentIcon='/sol.png'
                  tokenIcon={<TokenIcon />}
                /> */}

                <div className="flex flex-col w-full space-y-2">
                  <div className="flex justify-between w-full gap-3">
                    <div className="flex flex-col relative">
                      <span className="text-gray-300">{payment.symbol} you pay</span>
                      <div className="flex-1 relative">
                        <input
                          type="number"
                          value={payAmount}
                          onChange={handlePayChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-3 pr-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-400/50"
                        />
                        <div className="absolute inset-y-0 right-8 flex items-center pl-3 pointer-events-none">
                          <img src="/sol.png" alt="sol" className="rounded-full" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col relative">
                      <span className="text-gray-300">EMP you receive</span>
                      <div className="flex-1 relative">
                        <input
                          type="number"
                          value={receiveAmount}
                          readOnly
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-3 pr-3 text-white focus:outline-none"
                        />
                        <div className="absolute inset-y-0 right-8 flex items-center pl-3 pointer-events-none">
                          {<TokenIcon />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button type='button' className="bg-green-400 rounded-md py-2 text-black text-base font-bold mt-2" onClick={onTrade}>BUY</button>
              </div>
            </div>
          </div>
          <TradeDialog isTradeDialogOpen={isTradeDialogOpen} setIsTradeDialogOpen={setIsTradeDialogOpen} tokenMint={addr} ticker={'sol'} amount={amount} isBuy={true} created={created} tradingFee={tradingFee} tokenResult={tokenResult} calculateOutputAmount={calculateOutputAmount} couponResult={couponResult} setCouponResult={setCouponResult} />
        </section>

      </div>
    </div>
  );
};

function TradeDialog({ isTradeDialogOpen, setIsTradeDialogOpen, tokenMint, ticker, amount, isBuy, created, tradingFee, tokenResult, calculateOutputAmount, couponResult, setCouponResult }: { 
  isTradeDialogOpen: boolean; 
  setIsTradeDialogOpen: (value: boolean) => void; 
  tokenMint: string; 
  ticker: string; 
  amount: string; 
  isBuy: boolean; 
  created: any;
  tradingFee: number;
  tokenResult: any;
  calculateOutputAmount: (percent: number) => number;
  couponResult: any;
  setCouponResult: (result: any) => void;
}) {
  const [comment, setComment] = useState('')
  const [couponcode, setCouponCode] = useState('')
  const walletCtx = useAnchorWallet();
  const {
    isPoolCreated,
    getBuyTx,
    getSellTx,
    isPoolComplete,
    getWithdraw2Tx
  } = useContract() as ContractContextType;

  if (!created) return;

  const commentInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }
  const couponCodeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value)
  }

  const checkCouponCode = async () => {
    if (couponcode) {
    } else {
      setCouponResult(null);
    }
  }

  const onTrade = async () => {
    if (!walletCtx) {
      toast.error('No Wallet Connected!');
      return;
    }

    const isPoolCompleted = await isPoolComplete(tokenMint, NATIVE_MINT);
    if (isPoolCompleted) {
      // swap on Raydium
      const id = toast.loading(`Trading '${ticker}'...`);

      try {
        let inputTokenAmount;
        let outputToken;

        if (isBuy) {
          inputTokenAmount = new TokenAmount(Token.WSOL, BigInt(Math.trunc(Number(amount) * LAMPORTS_PER_SOL)));
          outputToken = new Token(TOKEN_PROGRAM_ID, tokenMint, TOKEN_DECIMALS);
        }
        else {
          inputTokenAmount = new TokenAmount(new Token(TOKEN_PROGRAM_ID, tokenMint, TOKEN_DECIMALS),
            BigInt(Math.trunc(Number(amount) * (10 ** TOKEN_DECIMALS))));
          outputToken = Token.WSOL;
        }


        toast.success('Swap complete!');

        // await trade(tokenMint, isBuy,
        //   isBuy ? 0 : Number(amount), // To do - cryptoprince
        //   isBuy ? Number(amount) : 0, // To do - cryptoprince
        //   txHashes[0], 
        //   comment.current.value
        // );

        setIsTradeDialogOpen(false);
      } catch (err) {
        console.error(err);
        toast.dismiss(id);
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error('An unknown error occurred.');
        }
      }

      return;
    }

    // const created = await isPoolCreated(tokenMint, NATIVE_MINT);
    if (!created) {
      toast.error(`Pool not created for token '${tokenMint}'`);
      return;
    }

    let infAddr = null;
    let infBenefit = 0;
    let userBenefit = 0;
    if (couponcode) {
    }

    const id = toast.loading(`Trading ${ticker}...`);

    try {
      let tx = null;

      if (isBuy)
        tx = new Transaction().add(await getBuyTx(tokenMint, Number(amount), infAddr, infBenefit, userBenefit));
      else
        tx = new Transaction().add(await getSellTx(tokenMint, Number(amount)));
      
      // console.log("Trade tx on BUY ::: ", await connection.simulateTransaction(tx));
      // const txHash = import.meta.env.VITE_PUBLIC_IS_MAINNET === "true" ? await jitoSend(connection, tx, walletCtx, parseFloat(Config.JITO_FEE)) : await send(connection, walletCtx, tx);
      const txHash = await send(connection, walletCtx, tx);
      toast.dismiss(id);
      if (txHash === "") {
        toast.error('Trade failed!');
        return;
      }

      let tokenAmount = 0
      await connection.getTransaction(txHash!).then((res) => {
        // console.log("Rider result", res)
        if (isBuy) {
          if (res && res.meta && res.meta.postTokenBalances && res.meta.preTokenBalances) {
            const postAmount = res.meta.postTokenBalances[1]?.uiTokenAmount?.uiAmount || 0;
            const preAmount = res.meta.preTokenBalances[1]?.uiTokenAmount?.uiAmount || 0;
            tokenAmount = preAmount - postAmount;
          }
        } else {
          if (res && res.meta && res.meta.postBalances && res.meta.preBalances) {
            tokenAmount = (res.meta.postBalances[0] - res.meta.preBalances[0]) / LAMPORTS_PER_SOL;
          }
        }
      });

      // console.log('tokenAmount:', tokenAmount, ", amount:", amount);
      toast.success('Trade complete!');

      // await trade(tokenMint, isBuy,
      //   isBuy ? Math.abs(Number(tokenAmount)) : Number(amount), // To do - cryptoprince
      //   isBuy ? Number(amount) : Math.abs(Number(tokenAmount)), // To do - cryptoprince
      //   txHash!,
      //   comment ? comment : '',
      //   infAddr,
      //   couponcode ? couponcode : ''
      // );

      setIsTradeDialogOpen(false);
    } catch (err) {
      console.error(err);
      toast.dismiss(id);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('An unknown error occurred.');
      }
    }
  };

  return (
    <Transition appear show={isTradeDialogOpen}>
      <Dialog as="div" className='relative z-30 focus:outline-none' onClose={() => setIsTradeDialogOpen(false)}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 backdrop-blur-sm" style={{backgroundColor: 'rgba(38, 38, 52, 0.8)'}}>
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <div className="p-[1px] relative w-full max-w-xl bg-gradient-to-b from-[#DC00D3] to-[#0CFAF5] rounded-xl">
                <DialogPanel className="flex flex-col gap-10 p-10 w-full max-w-xl rounded-xl bg-[#262634] border-none backdrop-blur-2xl">
                  <div className='flex flex-col gap-6'>
                    {tokenResult}
                    <div className="flex flex-col gap-2">
                      <p className='text-2xl font-bold text-white'>Add a comment(Optional)</p>
                      <textarea
                        value={comment}
                        className="w-full h-[120px] rounded-md px-4 py-4 border border-[#7F678D] text-white text-base resize-none"
                        placeholder='Comment'
                        style={{backgroundColor: 'rgba(134, 139, 147, 0.35)'}}
                        onChange={commentInputChange}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className='text-2xl font-bold text-white'>Coupon code(Optional)</p>
                      <div className="flex gap-2">
                        <input
                          value={couponcode}
                          className="w-full h-9 px-4 border rounded-md border-[#7F678D] text-white text-base resize-none"
                          placeholder='code'
                          style={{backgroundColor: 'rgba(134, 139, 147, 0.35)'}}
                          onChange={couponCodeInputChange}
                        />
                        <button type="button" className="bg-green-400 rounded-md px-2 w-[100px] text-base text-black font-bold" onClick={() => {checkCouponCode()}}>Check</button>
                      </div>
                      {couponResult}
                    </div>
                    <p className='text-xl text-white'>
                      {isBuy ? (`Buy '${ticker}' with ${amount} SOL`) : (`Sell ${amount} '${ticker}'`)}
                    </p>
                  </div>
                  <div className='flex flex-col gap-3 items-center'>
                    <button type='button' className='bg-green-400 rounded-md w-full h-[50px] text-xl text-black font-bold' onClick={onTrade}>Place Trade</button>
                    <button type='button' className='rounded-md h-[50px] text-xl text-white hover:font-bold' onClick={() => setIsTradeDialogOpen(false)}>[Cancel]</button>
                  </div>
                </DialogPanel>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
