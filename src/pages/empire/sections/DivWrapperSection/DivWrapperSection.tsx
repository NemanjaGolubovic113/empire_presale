import { StarIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const DivWrapperSection = (): JSX.Element => {
  // Card data for mapping
  const cards = [
    {
      title: "The Empire Is Open",
      description: "We don't have fans - we have citizens. Join the creators, traders, and believers building something bigger than hype.",
    },
    {
      title: "Real-World Empire",
      description: "From Dubai to Europe and Asia - this is more than digital. It’s your key to elite events, crypto culture, and lifelong access.",
    },
  ];

  return (
    <section className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 py-12 md:py-24 [background:linear-gradient(180deg,rgba(7,5,18,1)_0%,rgba(4,5,16,1)_100%)] w-full px-4 md:px-0">
      {cards.map((card, index) => (
        <Card
          key={index}
          className="w-full md:w-[556px] rounded-xl overflow-hidden border border-solid border-[#141625] shadow-[0px_10px_30px_#00000080] [background:linear-gradient(165deg,rgba(7,5,18,1)_0%,rgba(4,5,16,1)_100%)]"
        >
          <CardContent className="p-8 md:p-0 flex flex-col items-center">
            <h2 className="mt-6 md:mt-10 [font-family:'Arial-BoldItalicMT',Helvetica] font-bold italic text-[#a3ff12] text-2xl md:text-[28px] text-center tracking-[0] leading-[33.6px]">
              {card.title}
            </h2>

            <div className="mt-4 [font-family:'Arial-Narrow',Helvetica] font-normal text-gray-300 text-sm md:text-base text-center tracking-[0] leading-[25.6px]">
              {card.description}
            </div>

            <div className="flex mt-8 md:mt-10 mb-8 md:mb-10 gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="text-[#ffc107] w-5 h-5 md:w-6 md:h-6 fill-current" />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};