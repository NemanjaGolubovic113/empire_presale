import { useState } from 'react';
import TokenomicsChart from './components/TokenomicsChart';
import TokenAllocation from './components/TokenAllocation';
import ContractInfo from './components/ContractInfo';
import { tokenomicsData } from './data/tokenomicsData';
import { Card, CardContent } from "../../../../components/ui/card";

export const TokenomicsSection = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  return (
    <section className="w-full relative">
      <div className="relative mx-auto max-w-[1200px] w-full">
        {/* Section header */}
        <div className="flex flex-col items-center mb-16">
          <h2
            className="[background:linear-gradient(90deg,rgba(163,255,18,1)_0%,rgba(197,255,107,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Arial-Bold',Helvetica] font-bold text-transparent text-[40px] text-center leading-[48px]"
            style={{
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Tokenomics
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center gap-8 mt-4 sm:mt-8">
          <div className="w-full max-w-[600px]">
            <TokenomicsChart 
              allocations={tokenomicsData.allocations}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          </div>
          
          <div className="w-full max-w-[900px] flex flex-wrap justify-center gap-4">
            {tokenomicsData.allocations.map((allocation, index) => (
              <TokenAllocation 
                key={index}
                allocation={allocation}
                isActive={activeIndex === index}
                onHover={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
        
        {/* <ContractInfo contractAddress={tokenomicsData.contractAddress} /> */}
      </div>
    </section>
  );
};
