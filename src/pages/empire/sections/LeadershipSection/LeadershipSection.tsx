import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const LeadershipSection = (): JSX.Element => {
  const founders = [
    {
      name: "Alexander Crown",
      role: "Visionary & Strategist",
      bio: "Former hedge fund manager with 10+ years in traditional finance before pivoting to crypto in 2016.",
      image: "/alexander-crown.png",
    },
    {
      name: "Marcus Imperium",
      role: "Technical Architect",
      bio: "Blockchain developer since 2015. Contributed to multiple top 50 cryptocurrency projects.",
      image: "/marcus-imperium.png",
    },
  ];

  return (
    <section className="w-full py-24 [background:linear-gradient(180deg,rgba(4,5,16,1)_0%,rgba(7,5,18,1)_100%)] relative">
      {/* Background decoration */}
      <div className="absolute inset-0 w-full opacity-10">
        <div className="relative w-full h-full">
          <img
            className="absolute w-5 h-5 top-0 left-0"
            alt="Component"
            src="/component-3.svg"
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-[1200px] w-full">
        {/* Section header */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="[background:linear-gradient(90deg,rgba(163,255,18,1)_0%,rgba(197,255,107,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Arial-Bold',Helvetica] font-bold text-transparent text-[40px] text-center leading-[48px]">
            THE FOUNDERS
          </h2>
          <p className="mt-4 [font-family:'Arial-Narrow',Helvetica] font-normal text-gray-400 text-[17.6px] text-center leading-[28.2px] max-w-[655px]">
            Meet the visionaries behind The Empire, building the future of
            decentralized finance.
          </p>
        </div>

        {/* Founders cards */}
        <div className="flex flex-wrap justify-center gap-6">
          {founders.map((founder, index) => (
            <Card
              key={index}
              className="w-[540px] h-[711px] rounded-xl overflow-hidden border border-solid border-[#141625] shadow-[0px_10px_30px_#00000080] [background:linear-gradient(120deg,rgba(7,5,18,1)_0%,rgba(4,5,16,1)_100%)]"
            >
              <CardContent className="p-0 h-full relative">
                <div className="relative w-full h-[550px]">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${founder.image})` }}
                  />
                  <div className="absolute w-full h-[275px] bottom-0 left-0 [background:linear-gradient(0deg,rgba(4,5,16,1)_0%,rgba(0,0,0,0)_100%)]" />
                </div>

                <div className="p-6">
                  <h3 className="[font-family:'Arial-Bold',Helvetica] font-bold text-white text-xl leading-6">
                    {founder.name}
                  </h3>
                  <p className="mt-2 [font-family:'Arial-Narrow',Helvetica] font-normal text-[#a3ff12] text-sm leading-[22.4px]">
                    {founder.role}
                  </p>
                  <p className="mt-4 [font-family:'Arial-Narrow',Helvetica] font-normal text-gray-400 text-sm leading-[22.4px]">
                    {founder.bio}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
