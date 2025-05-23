import React from 'react';
import { TokenAllocation as TokenAllocationType } from '../types';

interface TokenAllocationProps {
  allocation: TokenAllocationType;
  isActive: boolean;
  onHover: () => void;
}

const TokenAllocation: React.FC<TokenAllocationProps> = ({ 
  allocation, 
  isActive,
  onHover
}) => {
  return (
    <div 
      className={`flex items-center gap-4 text-sm sm:text-base p-2 rounded-lg transition-all duration-300 ${
        isActive ? 'bg-opacity-20 bg-purple-900 scale-105' : 'hover:bg-opacity-10 hover:bg-purple-800'
      }`}
      onMouseEnter={onHover}
      style={{
        textShadow: isActive ? `0 0 10px ${allocation.color}` : 'none'
      }}
    >
      <div className="flex items-center gap-2">
        <div 
          className={`w-3 h-3 rounded-full transition-transform duration-300 ${
            isActive ? 'scale-125' : ''
          }`}
          style={{ 
            backgroundColor: allocation.color,
            boxShadow: isActive ? `0 0 10px ${allocation.color}` : 'none'
          }}
        />
        <span className="text-white whitespace-nowrap font-medium">{allocation.name}</span>
      </div>
    </div>
  );
};

export default TokenAllocation;