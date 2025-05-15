import { StarIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const DivWrapperSection = (): JSX.Element => {
  // Card data for mapping
  const cards = [
    {
      title: "The Empire Is Open",
      subtitle: "WE DON'T HAVE FANS",
      description: [
        "WE HAVE CITIZENS. WE'RE NOT LAUNCHING A TOKEN.",
        "WE'RE BUILDING SOMETHING BIGGER THAN HYPE. ONE",
        "COIN. ONE PEOPLE. ONE EMPIRE.",
      ],
    },
    {
      title: "Real-World Empire",
      description: [
        "From Dubai to Europe and USA— this is more than digital. It's",
        "your key to elite events, exclusive access, and real-world utility",
        "that extends beyond the blockchain.",
      ],
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

            {card.subtitle && (
              <p className="mt-4 md:mt-5 [font-family:'Arial-Narrow',Helvetica] font-normal text-gray-500 text-sm text-center tracking-[0] leading-[22.4px]">
                {card.subtitle}
              </p>
            )}

            <div className="mt-4 [font-family:'Arial-Narrow',Helvetica] font-normal text-gray-300 text-sm md:text-base text-center tracking-[0] leading-[25.6px]">
              {card.description.map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < card.description.length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>

            <div className="flex mt-8 md:mt-10 mb-8 md:mb-10 gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="text-[#ffc107] w-5 h-5 md:w-6 md:h-6" />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};