import React, { useEffect, useState } from 'react';

interface PresaleProgressProps {
  percentageSold: number;
  totalRaised: number;
  tokensSold: number;
}

const PresaleProgress: React.FC<PresaleProgressProps> = ({ 
  percentageSold, 
  totalRaised, 
  tokensSold 
}) => {
  const hardcapUsd = Number(import.meta.env.VITE_PRESALE_HARDCAP_USD_AMOUNT);
  const [soldPercent, setSoldPercent] = useState(0);
  const [totalRaisedAmount, setTotalRaisedAmount] = useState(0);
  const [tokensSoldAmount, setTokensSoldAmount] = useState(0);

  useEffect(() => {
    if (percentageSold) {
      setSoldPercent(percentageSold / hardcapUsd * 100);
    }

    if (totalRaised) {
      setTotalRaisedAmount(totalRaised);
    }

    if (tokensSold) {
      setTokensSoldAmount(tokensSold);
    }

  }, [percentageSold, totalRaised, tokensSold])

  return (
    <div className="flex flex-col items-center w-full space-y-2">
      <div className="relative w-full h-8 rounded bg-white">
        <div 
            className="absolute h-full bg-gradient-to-r rounded from-white to-[#a3ff12]"
            style={{ width: `${soldPercent}%`, boxShadow: '0 2px 10.5px #f9ff38' }}
        >
            <div className="absolute inset-0 rounded bg-[#a3ff12] animate-pulse"></div>
            {soldPercent > 21 ? (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black font-bold text-sm">
                {soldPercent.toFixed(2)}% Sold
              </div>
            ) : (
              <div className="absolute right-[-85px] top-1/2 transform -translate-y-1/2 text-black font-bold text-sm">
                {soldPercent.toFixed(2)}% Sold
              </div>
            )}
            
        </div>
        
      </div>
      
      <div className="flex flex-col items-center text-center space-y-1">
        <p className="text-sm text-gray-300">USD RAISED : ${totalRaisedAmount.toLocaleString()} / ${hardcapUsd.toLocaleString()}</p>
        <p className="text-sm text-gray-300">Tokens Sold : {tokensSoldAmount.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default PresaleProgress;