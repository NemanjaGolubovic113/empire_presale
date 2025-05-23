import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { PresaleSection } from "../PresaleSection";

export const OverviewSection = (): JSX.Element => {
  return (
    <div className="pt-[90px] lg:pt-30 relative items-center justify-center">
      {/* Background image with overlay */}
      <div className="w-full h-fit justify-items-center">
        <img src="/section.png" />
      </div>
      {/* <div className="bg-[url(..//section.png)] bg-cover bg-center" /> */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-[rgba(4,5,16,0.3)] to-[rgba(4,5,16,0.6)]" /> */}
      <section className="relative w-full pt-6 flex items-center justify-center px-4 md:px-0">
        <Card className="relative max-w-[800px] border-none bg-transparent">
          <CardContent className="flex flex-col items-center justify-center p-0">
            <h1
              className="w-full max-w-[738px] mb-6 text-4xl md:text-[64px] text-center font-bold leading-tight md:leading-[76.8px] tracking-[0] px-4 md:px-0 "
              style={{
                background:
                  "linear-gradient(90deg, rgba(163,255,18,1) 0%, rgba(197,255,107,1) 50%, rgba(163,255,18,1) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "'Arial-Bold', Helvetica",
              }}
            >
              Welcome to the Empire
            </h1>

            <p
              className="w-full mb-12 md:mb-[59px] font-normal text-lg md:text-2xl text-center leading-relaxed md:leading-[38.4px] text-gray-300 px-4 md:px-0"
              style={{ fontFamily: "'Arial-Narrow', Helvetica" }}
            >
              A new force rises from the blockchain.
              <br />
              Not just a coin — a culture. Not just a meme — a movement.
            </p>
          </CardContent>
        </Card>
      </section>
      <PresaleSection />
    </div>
    
  );
};