import React, { useState, useEffect } from 'react';
import { Feather as Ethereum } from 'lucide-react';

interface TokenCalculatorProps {
  tokenSymbol: string;
  paymentSymbol: string;
  exchangeRate: number;
  paymentIcon: React.ReactNode;
  tokenIcon: React.ReactNode;
}

const TokenCalculator: React.FC<TokenCalculatorProps> = ({
  tokenSymbol,
  paymentSymbol,
  exchangeRate,
  paymentIcon,
  tokenIcon
}) => {
  const [payAmount, setPayAmount] = useState<string>('1');
  const [receiveAmount, setReceiveAmount] = useState<string>((1 * exchangeRate).toString());

  useEffect(() => {
    if (payAmount) {
      const amount = parseFloat(payAmount) * exchangeRate;
      setReceiveAmount(amount.toString());
    }
  }, [payAmount, exchangeRate]);

  const handlePayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setPayAmount(value);
      if (value) {
        const amount = parseFloat(value) * exchangeRate;
        setReceiveAmount(amount.toString());
      } else {
        setReceiveAmount('');
      }
    }
  };

  return (
    <div className="flex flex-col w-full space-y-2">
      <div className="flex justify-between items-center w-full">
        <span className="text-gray-300">{paymentSymbol} you pay</span>
        <span className="text-gray-300">{tokenSymbol} you receive</span>
      </div>
      
      <div className="flex justify-between w-full gap-3">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {paymentIcon}
          </div>
          <input
            type="text"
            value={payAmount}
            onChange={handlePayChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-3 text-white focus:outline-none focus:ring-1 focus:ring-yellow-400/50"
          />
        </div>
        
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {tokenIcon}
          </div>
          <input
            type="text"
            value={receiveAmount}
            readOnly
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-3 text-white focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default TokenCalculator;