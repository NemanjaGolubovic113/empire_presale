import React from 'react';

interface PaymentOption {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface PaymentOptionsProps {
  options: PaymentOption[];
  selectedOption: string;
  onSelect: (id: string) => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ 
  options, 
  selectedOption, 
  onSelect 
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 w-full gap-2">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 w-full
            ${selectedOption === option.id 
              ? 'bg-gradient-to-br from-yellow-900/60 to-yellow-700/40 border border-yellow-400/30' 
              : 'bg-gray-800/60 border border-gray-700 hover:bg-gray-700/50'
            }`}
        >
          <span className={`${selectedOption === option.id ? 'text-yellow-300' : 'text-gray-300'}`}>
            {option.icon}
          </span>
          <span className={`font-medium ${selectedOption === option.id ? 'text-yellow-300' : 'text-gray-300'}`}>
            {option.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default PaymentOptions;