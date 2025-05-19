import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, Transaction } from '@solana/web3.js'
import { toast } from "react-toastify";
import { useContract } from "../../../../contexts/ContractContext";
import { TOKEN_DECIMALS } from "../../../../engine/consts";
import { send, fetchSOLPrice } from "../../../../engine/utils";
import { connection } from "../../../../engine/config";
import TokenPrice from "../../../../components/ui/TokenPrice";
import PresaleProgress from "../../../../components/ui/PresaleProgress";
import PaymentOptions from "../../../../components/ui/PaymentOptions";

const TokenIcon = () => (
  <span className="text-yellow-300 font-bold flex items-center justify-center w-6 h-6">
    $
  </span>
);
interface ContractContextType {
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
  getPresaleInfo: () => Promise<any>;
  getUserInfo: () => Promise<any>;
}

export const PresaleSection = (): JSX.Element => {
  const adminAddress = import.meta.env.VITE_PRESALE_ADMIN_ADDRESS;
  const currentPrice = import.meta.env.VITE_PRESALE_PRICE_PER_TOKEN;
  const nextPrice = import.meta.env.VITE_PRESALE_PRICE_PER_TOKEN_NEXT;

  const walletCtx = useAnchorWallet();
  const { buySol, buyUsdc, buyUsdt, createPresale, updatePresale, depositToken, claimToken, withdrawToken, getPresaleInfo, getUserInfo } = useContract() as ContractContextType;

  const [amount, setAmount] = useState<string | ''>('');
  const [payAmount, setPayAmount] = useState<string>('1');
  const [receiveAmount, setReceiveAmount] = useState<string>('1.5');
  const [depositTokenAmount, setDepositTokenAmount] = useState<string>('0');

  const [selectedPayment, setSelectedPayment] = useState('sol');
  const [presaleInfo, setPresaleInfo] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [claimEnable, setClaimEnable] = useState(false);
  const [buyTokenAmount, setBuyTokenAmount] = useState(0);
  
  const paymentOptions = [
    { 
      id: 'sol', 
      name: 'SOL',
      icon: <img src="/sol.png" alt="SOL" className="w-6 h-6 rounded-full" />
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

  useEffect(() => {
    const fetchPresaleInfo = async () => {
      if (walletCtx?.publicKey !== null) {
        const presaleInfo = await getPresaleInfo();
        // console.log("presaleInfo::::", "deposit = ", Number(presaleInfo.depositTokenAmount), "hardcap = ", Number(presaleInfo.hardcapAmount), "sol = ", Number(presaleInfo.solAmount));
        // console.log("presaleInfo::::", "sold = ", Number(presaleInfo.soldTokenAmount), "total = ", Number(presaleInfo.totalAmount), "usdc = ", Number(presaleInfo.usdcAmount));
        // console.log("usdt = ", Number(presaleInfo.usdtAmount));
        // console.log("presaleInfo :::: ", presaleInfo);

        if (!presaleInfo) {
          setPresaleInfo(null);
        } else {
          setPresaleInfo(presaleInfo);
          const now = Date.now() / 1000;
          if (now > presaleInfo.claimTime) {
            setClaimEnable(true);
          } else {
            setClaimEnable(false);
          }
        }

        const userInfo = await getUserInfo();
        if (userInfo) {
          // console.log("userInfo ==== ", Number(userInfo.buyTokenAmount), ", ", Number(userInfo.claimAmount))
          setUserInfo(userInfo);
          const buyAnount = Number(userInfo?.buyTokenAmount) / 10 ** TOKEN_DECIMALS;
          setBuyTokenAmount(buyAnount);
        } else {
          setUserInfo(null);
        }
      }
    }
    fetchPresaleInfo();

  }, [walletCtx])

  const handlePayChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setPayAmount(value);
      if (value) {
        if (selectedPayment === 'usdt' || selectedPayment === 'usdc') {
          const amount = parseFloat(value) / currentPrice;
          setReceiveAmount(amount.toString());
        } else if (selectedPayment === 'sol') {
          const solPrice = await fetchSOLPrice();
          const amount = parseFloat(value) * solPrice / currentPrice;
          setReceiveAmount(amount.toString());
        }
      } else {
        setReceiveAmount('');
      }
    }
  };

  const onSelectPayment = async (id: string) => {
    setSelectedPayment(id);
    if (payAmount) {
      if (id === 'usdt' || id === 'usdc') {
        const amount = parseFloat(payAmount) / currentPrice;
        setReceiveAmount(amount.toString());
      } else if (id === 'sol') {
        const solPrice = await fetchSOLPrice();
        const amount = parseFloat(payAmount) * solPrice / currentPrice;
        setReceiveAmount(amount.toString());
      }
    } else {
      setReceiveAmount('');
    }
  }

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

  const handleDepositTokenAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setDepositTokenAmount(value);
    }
  };

  const payment = getPaymentDetails();



  const onTrade = async () => {
    console.log("selectedPayment = ", selectedPayment, ", payAmount = ", payAmount)
    if (!walletCtx) {
      toast.error('No Wallet Connected!');
      return;
    }

    if (parseFloat(amount) === 0) {
      toast.warning('Please input amount');
      return;
    }

    const id = toast.loading(`Buying EMP...`);
    try {
      if (selectedPayment === 'sol') {
        let tx = new Transaction().add(await buySol(parseFloat(payAmount) * LAMPORTS_PER_SOL));
        const txHash = await send(connection, walletCtx, tx);
        toast.dismiss(id);
        if (txHash === "") {
          toast.error('Create failed!');
          return;
        }
        toast.success('Success!');
      } else if (selectedPayment === 'usdt') {
        let tx = new Transaction().add(await buyUsdt(Number(payAmount) * 10 ** TOKEN_DECIMALS));
        const txHash = await send(connection, walletCtx, tx);
        toast.dismiss(id);
        if (txHash === "") {
          toast.error('Create failed!');
          return;
        }
        toast.success('Success!');
      } else if (selectedPayment === 'usdc') {
        let tx = new Transaction().add(await buyUsdc(Number(payAmount) * 10 ** TOKEN_DECIMALS));
        const txHash = await send(connection, walletCtx, tx);
        toast.dismiss(id);
        if (txHash === "") {
          toast.error('Create failed!');
          return;
        }
        toast.success('Success!');
      } else if (selectedPayment === 'card') {
        toast.dismiss(id);
        toast.success('Success!');
      }
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

  const onCreatePresale = async () => {
    console.log("selectedPayment = ", selectedPayment, ", payAmount = ", payAmount)
    if (!walletCtx) {
      toast.error('No Wallet Connected!');
      return;
    }

    if (walletCtx.publicKey.toBase58() !== adminAddress) {
      toast.error('No admin wallet!');
      return;
    }

    const hardcap = Number(import.meta.env.VITE_PRESALE_HARDCAP);
    const ppt = Number(import.meta.env.VITE_PRESALE_PRICE_PER_TOKEN);
    const pptn = Number(import.meta.env.VITE_PRESALE_PRICE_PER_TOKEN_NEXT);
    const starttime = Number(import.meta.env.VITE_PRESALE_STARTTIME);
    const endtime = Number(import.meta.env.VITE_PRESALE_ENDTIME);
    const claimtime = Number(import.meta.env.VITE_PRESALE_CLAIMTIME);

    const id = toast.loading(`Creating Presale ...`);
    try {
      let tx = null;
      console.log(hardcap, ppt, pptn, starttime, endtime, claimtime)
      tx = new Transaction().add(await createPresale(hardcap, ppt, pptn, starttime, endtime, claimtime));
      // console.log("transaction ==== ", await connection.simulateTransaction(tx))
      
      const txHash = await send(connection, walletCtx, tx);
      toast.dismiss(id);
      if (txHash === "") {
        toast.error('Create failed!');
        return;
      }
      toast.success('Success!');
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

  const onUpdatePresale = async () => {
    console.log("selectedPayment = ", selectedPayment, ", payAmount = ", payAmount)
    if (!walletCtx) {
      toast.error('No Wallet Connected!');
      return;
    }

    if (walletCtx.publicKey.toBase58() !== adminAddress) {
      toast.error('No admin wallet!');
      return;
    }

    const uhardcap = import.meta.env.VITE_PRESALE_HARDCAP_UPDATE;
    const uppt = import.meta.env.VITE_PRESALE_PRICE_PER_TOKEN_UPDATE;
    const upptn = import.meta.env.VITE_PRESALE_PRICE_PER_TOKEN_NEXT_UPDATE;
    const ustarttime = import.meta.env.VITE_PRESALE_STARTTIME_UPDATE;
    const uendtime = import.meta.env.VITE_PRESALE_ENDTIME_UPDATE;
    const uclaimtime = import.meta.env.VITE_PRESALE_CLAIMTIME_UPDATE;

    const id = toast.loading(`Updating Presale ...`);
    try {
      let tx = null;
      tx = new Transaction().add(await updatePresale(uppt, upptn, uhardcap, ustarttime, uendtime, uclaimtime));
      const txHash = await send(connection, walletCtx, tx);
      toast.dismiss(id);
      if (txHash === "") {
        toast.error('Update failed!');
        return;
      }
      toast.success('Success!');
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

  const onDepositToken = async () => {
    if (!walletCtx) {
      toast.error('No Wallet Connected!');
      return;
    }

    if (walletCtx.publicKey.toBase58() !== adminAddress) {
      toast.error('No admin wallet!');
      return;
    }

    const tokenamount = import.meta.env.VITE_DEPOSIT_TOKEN_AMOUNT;

    const id = toast.loading(`Depositing tokens ...`);
    try {
      let tx = new Transaction().add(await depositToken(Number(depositTokenAmount)));
      const txHash = await send(connection, walletCtx, tx);
      toast.dismiss(id);
      if (txHash === "") {
        toast.error('Deposit failed!');
        return;
      }
      toast.success('Success!');
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

  const onClaimToken = async () => {
    if (!walletCtx) {
      toast.error('No Wallet Connected!');
      return;
    }

    const id = toast.loading(`Claiming tokens ...`);
    try {
      let tx = new Transaction().add(await claimToken());
      const txHash = await send(connection, walletCtx, tx);
      toast.dismiss(id);
      if (txHash === "") {
        toast.error('Claim failed!');
        return;
      }
      toast.success('Success!');
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

  const onWithdrawToken = async () => {
    if (!walletCtx) {
      toast.error('No Wallet Connected!');
      return;
    }

    if (walletCtx.publicKey.toBase58() !== adminAddress) {
      toast.error('No admin wallet!');
      return;
    }

    const id = toast.loading(`Withdrawing tokens ...`);
    try {
      let tx = new Transaction().add(await withdrawToken());
      const txHash = await send(connection, walletCtx, tx);
      toast.dismiss(id);
      if (txHash === "") {
        toast.error('Withdraw Token failed!');
        return;
      }
      toast.success('Success!');
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
    <section className="flex flex-col items-center py-24 w-full">
      <div className="relative max-w-[1200px] w-full">
        <div className="flex flex-wrap justify-center gap-8 mt-16">
          {/* Emperor Access Key Card */}
          <Card className="w-[365px] sm:w-[556px] border border-solid border-[#141625] shadow-[0px_0px_30px_#a3ff12] [background:linear-gradient(143deg,rgba(7,5,18,1)_0%,rgba(4,5,16,1)_100%)] rounded-xl relative">
            <CardContent className="p-8 flex flex-col items-center">
              <h2
                className="w-80 mx-auto [background:linear-gradient(90deg,rgba(163,255,18,1)_0%,rgba(197,255,107,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Arial-Bold',Helvetica] font-bold text-transparent text-[40px] text-center tracking-[0] leading-[48px] whitespace-nowrap"
                style={{
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Presale Live
              </h2>
              <div className='flex flex-col gap-10 py-6 w-full'>
                <PresaleProgress
                  percentageSold={presaleInfo?.totalAmount / LAMPORTS_PER_SOL}
                  totalRaised={presaleInfo?.totalAmount / LAMPORTS_PER_SOL}
                  tokensSold={Number(presaleInfo?.soldTokenAmount) / 10 ** TOKEN_DECIMALS}
                />
                
                {claimEnable === false ? (
                  <>
                    <TokenPrice 
                      currentPrice={currentPrice}
                      nextPrice={nextPrice}
                      symbol="$EMP" 
                    />
                    
                    <PaymentOptions 
                      options={paymentOptions} 
                      selectedOption={selectedPayment} 
                      // onSelect={setSelectedPayment} 
                      onSelect={onSelectPayment} 
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
                              <img src={`/${selectedPayment}.png`} alt="sol" className="rounded-full" />
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

                    <button type='button' className="bg-[#a3ff12] hover:bg-[#a3ff12]/90 text-[#040510] [font-family:'Arial-Bold',Helvetica] rounded-md py-2 text-base font-bold mt-2" onClick={onTrade}>BUY</button>
                  </>

                ) : (
                  <button className="w-full bg-[#a3ff12] hover:bg-[#8fe00f] text-[#040510] [font-family:'Arial-Bold',Helvetica] font-bold text-base md:text-[17.6px] px-6 md:px-8 py-2 rounded" onClick={onClaimToken}>
                    Claim Token
                  </button>
                )}
                
                <div className="text-white">
                  Your Token Amount: {buyTokenAmount.toFixed(3)} EMP
                </div>

                {walletCtx?.publicKey.toBase58() === adminAddress && (
                  <>
                    <div className="flex justify-between w-full gap-3 mt-8 md:mt-10">
                      <Button
                        className="w-full bg-[#a3ff12] hover:bg-[#8fe00f] text-[#040510] [font-family:'Arial-Bold',Helvetica] font-bold text-base md:text-[17.6px] px-6 md:px-8 py-3 md:py-4 rounded"
                        onClick={onCreatePresale}
                      >
                        Create Presale
                      </Button>
              
                      <Button
                        className="w-full bg-[#a3ff12] hover:bg-[#8fe00f] text-[#040510] [font-family:'Arial-Bold',Helvetica] font-bold text-base md:text-[17.6px] px-6 md:px-8 py-3 md:py-4 rounded"
                        onClick={onUpdatePresale}
                      >
                        Update Presale
                      </Button>
                    </div>
                    
                    <div className="flex justify-between w-full gap-3">
                      <input
                        type="number"
                        value={depositTokenAmount}
                        onChange={handleDepositTokenAmountChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded pl-3 pr-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-400/50"
                      />
                      <Button
                        className="w-full bg-[#a3ff12] hover:bg-[#8fe00f] text-[#040510] [font-family:'Arial-Bold',Helvetica] font-bold text-base md:text-[17.6px] px-6 md:px-8 py-3 md:py-4 rounded"
                        onClick={onDepositToken}
                      >
                        Deposit Token
                      </Button>
                    </div>
                    

                    {/* <div className="w-full gap-2"> */}
                    <Button
                      className="bg-[#a3ff12] hover:bg-[#8fe00f] text-[#040510] [font-family:'Arial-Bold',Helvetica] font-bold text-base md:text-[17.6px] px-6 md:px-8 py-3 md:py-4 rounded"
                      onClick={onWithdrawToken}
                    >
                      Withdraw Token
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
