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

export const MembershipSection = (): JSX.Element => {
  // Benefits data for mapping
  const eliteBenefits = [
    "Fully paid invites to global meetups — starting in Dubai",
    "Voting power on major project decisions",
    "Priority access to all future launches and drops",
    "Elevated status within the Empire community",
  ];

  // Social icons for the NFT card
  const socialIcons = [
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 23 25" fill="none">
      <path d="M21.4504 4.47217C22.2942 4.84717 22.8567 5.64404 22.8567 6.53467C22.8567 16.9409 16.4817 22.7065 12.4504 24.394C11.8879 24.6284 11.2786 24.6284 10.7161 24.394C5.70044 22.2847 0.356689 15.8628 0.356689 6.53467C0.356689 5.64404 0.872314 4.84717 1.71606 4.47217L10.7161 0.722168C10.9973 0.628418 11.2786 0.581543 11.6067 0.581543C11.8879 0.581543 12.1692 0.628418 12.4504 0.722168L21.4504 4.47217ZM11.6067 21.4878C15.9661 19.2847 19.6692 14.1284 19.8098 7.05029L11.6067 3.62842V21.4878Z" fill="#a3ff12"/>
    </svg>,
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 24 25" fill="none">
      <path d="M16.3567 8.03467H8.05981C8.76294 3.86279 10.3567 0.909668 12.2317 0.909668C14.0598 0.909668 15.7004 3.86279 16.3567 8.03467ZM7.73169 12.5347C7.73169 11.5034 7.77856 10.519 7.87231 9.53467H16.5442C16.6379 10.519 16.6848 11.5034 16.6848 12.5347C16.6848 13.6128 16.6379 14.5972 16.5442 15.5347H7.87231C7.77856 14.5972 7.73169 13.6128 7.73169 12.5347ZM22.9192 8.03467H17.8567C17.4348 5.40967 16.6848 3.01904 15.5129 1.42529C18.8879 2.40967 21.6067 4.89404 22.9192 8.03467ZM8.90356 1.42529C7.73169 3.01904 6.98169 5.40967 6.55981 8.03467H1.49731C2.80981 4.89404 5.52856 2.40967 8.90356 1.42529ZM23.4348 9.53467C23.6692 10.519 23.8098 11.5034 23.8098 12.5347C23.8098 13.6128 23.6692 14.5972 23.4348 15.5347H18.0442C18.1379 14.5503 18.2317 13.5659 18.2317 12.5347C18.2317 11.5503 18.1379 10.519 18.0442 9.53467H23.4348ZM6.23169 12.5347C6.23169 13.5659 6.27856 14.5503 6.37231 15.5347H0.981689C0.747314 14.5972 0.606689 13.6128 0.606689 12.5347C0.606689 11.5034 0.747314 10.519 0.981689 9.53467H6.37231C6.27856 10.519 6.23169 11.5503 6.23169 12.5347ZM8.05981 17.0347H16.3567C15.7004 21.2534 14.0598 24.1597 12.2317 24.1597C10.3567 24.1597 8.76294 21.2534 8.05981 17.0347ZM15.5129 23.6909C16.6848 22.0972 17.4817 19.7065 17.8567 17.0347H22.9192C21.6067 20.2222 18.8879 22.7065 15.5129 23.6909ZM1.49731 17.0347H6.55981C6.98169 19.7065 7.73169 22.0972 8.90356 23.6909C5.52856 22.7065 2.80981 20.2222 1.49731 17.0347Z" fill="#a3ff12"/>
    </svg>,
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 25" fill="none">
      <path d="M13.9817 8.03467C14.8254 8.03467 15.3879 9.01904 14.9192 9.72217L6.66919 23.9722C6.48169 24.3472 6.10669 24.5347 5.68481 24.5347C4.98169 24.5347 4.46606 23.8784 4.60669 23.1753L6.76294 14.0347H1.23169C0.528564 14.0347 0.0129395 13.4722 0.106689 12.769L1.60669 1.51904C1.65356 0.956543 2.16919 0.534668 2.73169 0.534668H9.48169C10.1848 0.534668 10.7473 1.23779 10.5598 1.98779L8.54419 8.03467H13.9817Z" fill="#a3ff12"/>
    </svg>
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
          EMPEROR PASS
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
                    <p className="[font-family:'Arial-Narrow',Helvetica] font-normal text-white text-base tracking-[0] leading-[25.6px] whitespace-nowrap text-wrap">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emperor Access Key Card */}
          <Card className="w-[365px] sm:w-[556px] border border-solid border-[#141625] shadow-[0px_0px_30px_#a3ff12] [background:linear-gradient(143deg,rgba(7,5,18,1)_0%,rgba(4,5,16,1)_100%)] rounded-xl relative">
            <CardContent className="p-8 flex flex-col items-center">
              <div className="relative w-32 h-32 mb-12">
                <div className="absolute w-32 h-32 top-0 left-0 bg-[#a3ff12] rounded-full blur-[5px] opacity-75" />
                <div className="flex w-28 h-28 items-center justify-center absolute top-2 left-2 bg-[#040510] rounded-full
                ">
                  {/* <CrownIcon className="text-[#a3ff12] w-10 h-10" /> */}
                  <img src="/emperoraccesskey.png" alt="king" className="absolute rounded-full" />
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

              <a href="https://solsea.io/c/681d1bed633528254e17c20a" target="_blank" className="w-full">
                <Button className="w-full bg-[#a3ff12] hover:bg-[#a3ff12]/90 text-[#040510] [font-family:'Arial-Bold',Helvetica] font-bold">
                  click here to mint
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
