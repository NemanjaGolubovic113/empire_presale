import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { PresaleSection } from "../PresaleSection";

export const OverviewSection = (): JSX.Element => {
  return (
    <div className="flex pt-0 relative items-center justify-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-[url(..//section.png)] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(4,5,16,0.3)] to-[rgba(4,5,16,0.6)]" />
      {/* <section className="relative w-full py-6 flex items-center justify-center px-4 md:px-0">

        <Card className="relative max-w-[800px] border-none bg-transparent">
          <CardContent className="flex flex-col items-center justify-center p-0">
            <div className="w-[72px] h-16 text-[#a3ff12] text-[64px] text-center leading-[64px] font-normal tracking-[0] whitespace-nowrap mb-11">
              <img src="/emperorcoin .webp" alt="king" />
            </div>

            <h1
              className="w-full max-w-[738px] mb-6 text-4xl md:text-[64px] text-center font-bold leading-tight md:leading-[76.8px] tracking-[0] px-4 md:px-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(163,255,18,1) 0%, rgba(197,255,107,1) 50%, rgba(163,255,18,1) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "'Arial-Bold', Helvetica",
              }}
            >
              Welcome To The Empire
            </h1>

            <p
              className="max-w-[444px] mb-12 md:mb-[119px] font-normal text-lg md:text-2xl text-center leading-relaxed md:leading-[38.4px] text-gray-300 px-4 md:px-0"
              style={{ fontFamily: "'Arial-Narrow', Helvetica" }}
            >
              A New Force Rises From The Blockchain.
              <br />
              Not Just A Coin — A Culture.
              <br />
              Not Just A Meme — A Movement.
            </p>

            <Button
              className="bg-[#a3ff12] hover:bg-[#8fe00f] text-[#040510] px-6 md:px-8 py-3 md:py-4 rounded text-base md:text-[17.6px]"
              style={{ fontFamily: "'Arial-Bold', Helvetica" }}
            >
              <span className="font-bold">Explore More</span>
            </Button>
          </CardContent>
        </Card>
      </section> */}
      <PresaleSection />
    </div>
    
  );
};