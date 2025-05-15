import {
  CheckIcon,
  CrownIcon,
  Share2Icon,
  StarIcon,
  ZapIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const VisionSection = (): JSX.Element => {
  // Benefits data for mapping
  const eliteBenefits = [
    "Free access to 1,700+ airport lounges worldwide",
    "Fully paid invites to global meetups — starting in Dubai",
    "Voting power on major project decisions",
    "Priority access to all future launches and drops",
    "Elevated status within the Empire community",
  ];

  // Social icons for the NFT card
  const socialIcons = [Share2Icon, ZapIcon, StarIcon];

  // Feature cards data
  const featureCards = [
    {
      icon: <CheckIcon className="text-[#a3ff12] w-6 h-6" />,
      title: "Elite\nNetworking",
      titleMultiline: true,
      description: [
        "Connect with industry leaders,",
        "innovators, and visionaries at",
        "exclusive events.",
      ],
    },
    {
      icon: <ZapIcon className="text-[#a3ff12] w-6 h-6" />,
      title: "Alpha Intel",
      titleMultiline: false,
      description: [
        "Gain access to exclusive market",
        "insights and cutting-edge",
        "investment strategies.",
      ],
    },
    {
      icon: <StarIcon className="text-[#a3ff12] w-6 h-6" />,
      title: "Real-World\nUtility",
      titleMultiline: true,
      description: [
        "Unlock unparalleled access to",
        "luxury experiences and premium",
        "services worldwide.",
      ],
    },
    {
      icon: <CrownIcon className="text-[#a3ff12] w-6 h-6" />,
      title: "Empire\nGovernance",
      titleMultiline: true,
      description: [
        "Shape the future of The Empire",
        "through voting rights on key",
        "project decisions.",
      ],
    },
  ];

  return (
    <section className="flex flex-col items-center py-12 md:py-24 w-full [background:linear-gradient(180deg,rgba(7,5,18,1)_0%,rgba(4,5,16,1)_100%)]">
      <div className="flex flex-col w-full items-start absolute top-0 left-0 opacity-10">
        <div className="flex flex-col w-full h-[841.05px] items-start relative">
          <img
            className="relative w-5 h-5"
            alt="Component"
            src="/component-3.svg"
          />
        </div>
      </div>

      <div className="relative max-w-[1200px] w-full px-4 md:px-0">
        <h2 className="w-full mx-auto [background:linear-gradient(90deg,rgba(163,255,18,1)_0%,rgba(197,255,107,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Arial-Bold',Helvetica] font-bold text-transparent text-3xl md:text-[40px] text-center tracking-[0] leading-tight md:leading-[48px]">
          Power. Culture. Chaos.
        </h2>

        <div className="flex flex-col max-w-[800px] w-full mx-auto mt-8 md:mt-16">
          <p className="w-fit mx-auto [font-family:'Arial-Narrow',Helvetica] font-normal text-gray-400 text-base md:text-[17.6px] text-center tracking-[0] leading-relaxed md:leading-[28.2px] px-4 md:px-0">
            BORN FROM THE SPIRIT OF ANCIENT EMPIRES AND FORGED IN THE FIRE OF
            WEB3, THIS PROJECT ISN&#39;T ABOUT CHARTS — IT&#39;S ABOUT BUILDING A
            THRONE. WE&#39;RE UNITING MEME ENERGY, REAL-WORLD ACCESS, AND
            UNSTOPPABLE COMMUNITY.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 md:mt-16">
          {/* Feature cards */}
          {featureCards.map((card, index) => (
            <Card
              key={index}
              className="w-full h-auto md:h-[292px] rounded-xl overflow-hidden border border-solid border-[#141625] shadow-[0px_10px_30px_#00000080] [background:linear-gradient(130deg,rgba(7,5,18,1)_0%,rgba(4,5,16,1)_100%)]"
            >
              <CardContent className="p-6 md:p-0 h-full relative">
                <div className="flex w-12 md:w-16 h-12 md:h-16 items-center justify-center md:absolute md:top-[33px] md:left-[33px] rounded-xl [background:linear-gradient(135deg,rgba(163,255,18,1)_0%,rgba(134,204,15,1)_100%)]">
                  {card.icon}
                </div>

                <div
                  className={`mt-4 md:mt-0 md:absolute ${
                    card.titleMultiline ? "md:top-[121px]" : "md:top-[120px]"
                  } md:left-[33px] [font-family:'Arial-Bold',Helvetica] font-bold text-white text-lg md:text-xl tracking-[0] leading-6`}
                >
                  {card.title.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < card.title.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>

                <div
                  className={`mt-2 md:mt-0 md:absolute ${
                    card.titleMultiline ? "md:top-[180px]" : "md:top-[155px]"
                  } md:left-[33px] [font-family:'Arial-Narrow',Helvetica] font-normal text-gray-400 text-sm md:text-base tracking-[0] leading-relaxed md:leading-[25.6px]`}
                >
                  {card.description.map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < card.description.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};