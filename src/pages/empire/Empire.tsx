import React from "react";
import { BackgroundSection } from "./sections/BackgroundSection/BackgroundSection";
import { ContainerWrapperSection } from "./sections/CointainerWrapperSection";
import { DivSection } from "./sections/DivSection";
import { DivWrapperSection } from "./sections/DivWrapperSection";
import { FooterSection } from "./sections/FooterSection";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { Section } from "./sections/Section";
import { SectionComponentNode } from "./sections/SectionComponentNode";
import { SectionWrapper } from "./sections/SectionWrapper";

export const Empire = (): JSX.Element => {
  // Scrolling text content for the banner
  const scrollingText =
    "POWER • CULTURE • CHAOS • EMPIRE • BLOCKCHAIN • COMMUNITY • FUTURE";
  const repeatedText = `${scrollingText} • ${scrollingText} •`;

  return (
    <div className="flex flex-col w-full items-start relative">
      <HeaderSection />

      <div className="relative w-full">
        <BackgroundSection />

        <section id="home">
          <Section />
        </section>

        {/* Scrolling text banner */}
        <div className="flex flex-col w-full items-start py-4 md:py-[33px] bg-[#040510] border-t border-b border-[#141625] overflow-hidden">
          <div className="flex flex-col items-start relative self-stretch w-full">
            <div className="relative w-[3482px] mt-[-1.00px] mr-[-1562.00px] [font-family:'Arial-Bold',Helvetica] font-bold text-[#a3ff12] text-xl md:text-[40px] tracking-[0] leading-[32px] md:leading-[64px]">
              {repeatedText}
            </div>
          </div>
        </div>

        <section id="manifesto">
          <ContainerWrapperSection />
        </section>

        <section id="emperor-pass">
          <SectionWrapper />
        </section>

        <DivWrapperSection />

        <section id="founders">
          <DivSection />
        </section>

        <section id="roadmap">
          <SectionComponentNode />
        </section>
      </div>

      <FooterSection />
    </div>
  );
};