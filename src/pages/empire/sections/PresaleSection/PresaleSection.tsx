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

export const PresaleSection = (): JSX.Element => {
  // Benefits data for mapping
  const eliteBenefits = [
    "Free access to 1,700+ airport lounges worldwide",
    "Fully paid invites to global meetups — starting in Dubai",
    "Voting power on major project decisions",
    "Priority access to all future launches and drops",
    "Elevated status within the Empire community",
  ];

  // Social icons for the NFT card
  const socialIcons = [
    <div className="text-[#a3ff12]">
      <img src="exclusiveaccess.svg" alt="exclusiveaccess" width={16} height={16} />
    </div>,
    <img src="globalcommunity.svg" alt="globalcommunity" width={16} height={16} />,
    <img src="realworldutility.svg" alt="realworldutility" width={16} height={16} />
  ];

  return (
    <section className="flex flex-col items-center py-24 w-full [background:linear-gradient(180deg,rgba(4,5,16,1)_0%,rgba(7,5,18,1)_100%)]">
      <div className="relative max-w-[1200px] w-full">
        <h2
          className="w-80 mx-auto [background:linear-gradient(90deg,rgba(163,255,18,1)_0%,rgba(197,255,107,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Arial-Bold',Helvetica] font-bold text-transparent text-[40px] text-center tracking-[0] leading-[48px] whitespace-nowrap"
          style={{
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Presale Live
        </h2>

        <div className="flex flex-col max-w-[800px] w-full mx-auto mt-16">
          <p className="w-fit mx-auto [font-family:'Arial-Narrow',Helvetica] font-normal text-gray-400 text-[17.6px] text-center tracking-[0] leading-[28.2px]">
            Only 50 emperor pass NFTs will exist. Each pass grants exclusive benefits and privileges within The Empire.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-16">
          {/* Elite Benefits Card */}
          <Card className="w-[556px] border border-solid border-[#141625] shadow-[0px_10px_30px_#00000080] [background:linear-gradient(90deg,rgba(7,5,18,1)_0%,rgba(4,5,16,1)_100%)] rounded-xl">
            <CardContent className="p-[33px] flex flex-col gap-[23.9px]">
              <h3 className="[font-family:'Arial-Bold',Helvetica] font-bold text-[#a3ff12] text-2xl tracking-[0] leading-[28.8px] whitespace-nowrap">
                Elite Benefits
              </h3>

              <div className="flex flex-col gap-[15.5px]">
                {eliteBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <img src="/king.svg" alt="king" height={16} width={16} />
                    <p className="[font-family:'Arial-Narrow',Helvetica] font-normal text-white text-base tracking-[0] leading-[25.6px] whitespace-nowrap">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emperor Access Key Card */}
          <Card className="w-[556px] border border-solid border-[#141625] shadow-[0px_0px_30px_#a3ff12] [background:linear-gradient(143deg,rgba(7,5,18,1)_0%,rgba(4,5,16,1)_100%)] rounded-xl relative">
            <CardContent className="p-8 flex flex-col items-center">
              <div className="relative w-24 h-24 mb-12">
                <div className="absolute w-24 h-24 top-0 left-0 bg-[#a3ff12] rounded-[48px] blur-[5px] opacity-75" />
                <div className="flex w-20 h-20 items-center justify-center absolute top-2 left-2 bg-[#040510] rounded-[40px]">
                  <CrownIcon className="text-[#a3ff12] w-10 h-10" />
                </div>
              </div>

              <h3 className="[font-family:'Arial-Bold',Helvetica] font-bold text-[#a3ff12] text-[28px] text-center tracking-[0] leading-[33.6px] whitespace-nowrap mb-4">
                EMPEROR ACCESS KEY
              </h3>

              <p className="[font-family:'Arial-Narrow',Helvetica] font-normal text-gray-300 text-base text-center tracking-[0] leading-[25.6px] mb-8">
                This NFT certifies the holder as a permanent member of Emperor Elite Circle. Full access to private events, alpha intel, and exclusive drops.
              </p>

              <div className="flex gap-4 mb-8">
                {socialIcons.map((icon, index) => (
                  <div
                    key={index}
                    className="flex w-10 h-10 items-center justify-center bg-[#141625] rounded-[20px]"
                  >
                    {icon}
                  </div>
                ))}
              </div>

              <p className="mb-8 text-center">
                <span className="font-bold text-[#a3ff12] [font-family:'Arial-Bold',Helvetica]">
                  Only 50 NFTs
                </span>
                <span className="[font-family:'Arial-Regular',Helvetica] text-gray-500">
                  {" "}
                  will ever exist
                </span>
              </p>

              <Button className="w-full bg-[#a3ff12] hover:bg-[#a3ff12]/90 text-[#040510] [font-family:'Arial-Bold',Helvetica] font-bold">
                click here to mint
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
