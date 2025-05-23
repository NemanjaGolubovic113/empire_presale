import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ContractInfoProps {
  contractAddress: string;
}

const ContractInfo: React.FC<ContractInfoProps> = ({ contractAddress }) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="flex flex-col items-center mt-4 sm:mt-8 md:mt-12 mb-4 sm:mb-6">
      <div className="flex items-center space-x-2 p-2 sm:p-3 bg-purple-900 bg-opacity-20 rounded-lg cursor-pointer hover:bg-opacity-30 transition-all" onClick={copyToClipboard}>
        <span className="text-purple-300 text-xs sm:text-sm md:text-base font-mono break-all">{contractAddress}</span>
        <button className="text-purple-400 hover:text-white transition-colors flex-shrink-0">
          {copied ? 
            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-400" /> : 
            <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          }
        </button>
      </div>
      <div className="text-[10px] sm:text-xs text-purple-400 mt-1 sm:mt-2">
        {copied ? 'Copied to clipboard!' : 'Click to copy contract address'}
      </div>
    </div>
  );
};

export default ContractInfo;