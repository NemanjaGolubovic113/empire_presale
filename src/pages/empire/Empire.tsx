import React from "react";
import { BackgroundSection } from "./sections/BackgroundSection/BackgroundSection";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { VisionSection } from "./sections/VisionSection";
import { LeadershipSection } from "./sections/LeadershipSection";
import { DivWrapperSection } from "./sections/DivWrapperSection";
import { FooterSection } from "./sections/FooterSection";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { OverviewSection } from "./sections/OverviewSection";
import { FutureSection } from "./sections/FutureSection";
import { MembershipSection } from "./sections/MembershipSection";
import { PresaleSection } from "./sections/PresaleSection";
import { AdminSection } from "./sections/AdminSection";
import { RoadmapSection } from "./sections/RoadmapSection";

export const Empire = (): JSX.Element => {
  const walletCtx = useAnchorWallet();
  const adminAddress = import.meta.env.VITE_PRESALE_ADMIN_ADDRESS;
  // Scrolling text content for the banner
  const scrollingText =
    "POWER • CULTURE • CHAOS • EMPIRE • BLOCKCHAIN • COMMUNITY • FUTURE";
  const repeatedText = `${scrollingText} • ${scrollingText} •`;

  return (
    <div className="flex flex-col w-full items-start relative">
      <HeaderSection />

      <div className="relative w-full">
        {/* <BackgroundSection /> */}

        <section id="overview">
          <OverviewSection />
        </section>

        {/* Scrolling text banner */}
        {/* <div className="flex flex-col w-full items-start py-4 md:py-[33px] bg-[#040510] border-t border-b border-[#141625] overflow-hidden">
          <div className="flex flex-col items-start relative self-stretch w-full">
            <div className="relative w-[3482px] mt-[-1.00px] mr-[-1562.00px] [font-family:'Arial-Bold',Helvetica] font-bold text-[#a3ff12] text-xl md:text-[40px] tracking-[0] leading-[32px] md:leading-[64px]">
              {repeatedText}
            </div>
          </div>
        </div> */}
        <div className="flex flex-col w-full items-start py-4 md:py-[33px] bg-[#040510] border-t border-b border-[#141625] overflow-hidden">
          <div className="relative w-full whitespace-nowrap">
            <div className="inline-block animate-marquee [font-family:'Arial-Bold',Helvetica] font-bold text-[#a3ff12] text-xl md:text-[40px] leading-[32px] md:leading-[64px]">
              {repeatedText} {repeatedText}
            </div>
          </div>
        </div>

        <section id="vision">
          <VisionSection />
        </section>

        <section id="membership">
          <MembershipSection />
        </section>

        <DivWrapperSection />

        {/* <section id="presale">
          <PresaleSection />
        </section> */}

        <section id="roadmap">
          <RoadmapSection />
        </section>

        <section id="leadership">
          <LeadershipSection />
        </section>

        <section id="future">
          <FutureSection />
        </section>

        {/* {walletCtx?.publicKey.toBase58() === adminAddress && (
          <section id="admin">
            <AdminSection />
          </section>
        )} */}

      </div>

      <FooterSection />
    </div>
  );
};