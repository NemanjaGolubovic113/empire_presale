import React from 'react';

interface TokenPriceProps {
  currentPrice: number;
  nextPrice: number;
  symbol: string;
}

const TokenPrice: React.FC<TokenPriceProps> = ({ currentPrice, nextPrice, symbol }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-full py-3 px-4 rounded-lg border-2 border-[#71647d] bg-[#331f47]">
      <div className="flex items-center space-x-2">
        <span className="text-white font-medium">1 {symbol} = </span>
        <span className="text-green-400 font-semibold">${currentPrice}</span>
      </div>
      <div className="flex items-center">
        <span className="text-yellow-400 font-medium">Next Price: ${nextPrice}</span>
      </div>
    </div>
  );
};

export default TokenPrice;