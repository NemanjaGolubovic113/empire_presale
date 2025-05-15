import React from "react";
import { Button } from "../../../../components/ui/button";

export const FutureSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center px-4 md:px-0 py-12 md:py-24 bg-[#040510] w-full relative">
      <div className="h-[431px] [background:linear-gradient(180deg,rgba(4,5,16,0.9)_0%,rgba(4,5,16,0.7)_100%)] absolute w-full top-0 left-0" />

      <div className="relative max-w-[800px] w-full flex flex-col items-center z-10">
        <h2 className="w-full max-w-[525px] [background:linear-gradient(90deg,rgba(163,255,18,1)_0%,rgba(197,255,107,1)_50%,rgba(163,255,18,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Arial-Bold',Helvetica] font-bold text-transparent text-3xl md:text-5xl text-center tracking-[0] leading-tight md:leading-[57.6px]">
          Join The Empire Today
        </h2>

        <p className="mt-4 md:mt-6 max-w-[742px] [font-family:'Arial-Narrow',Helvetica] font-normal text-gray-300 text-lg md:text-xl text-center tracking-[0] leading-relaxed md:leading-8">
          Be part of something bigger than just another crypto project. Join a movement that&#39;s
          <br className="hidden md:block" />
          redefining the future of decentralized finance.
        </p>

        <Button className="mt-8 md:mt-10 bg-[#a3ff12] hover:bg-[#8fe00f] text-[#040510] [font-family:'Arial-Bold',Helvetica] font-bold text-base md:text-[17.6px] px-6 md:px-8 py-3 md:py-4 rounded">
          Become a Citizen
        </Button>
      </div>
    </section>
  );
};