import { XIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "../../../../components/ui/sheet";

export const BackgroundSection = (): JSX.Element => {
  // Navigation menu items data
  const menuItems = [
    { text: "Home", href: "#" },
    { text: "Manifesto", href: "#" },
    { text: "Emperor Pass", href: "#" },
    { text: "Founders", href: "#" },
    { text: "Roadmap", href: "#" },
  ];

  return (
    <Sheet defaultOpen>
      <SheetContent
        side="right"
        className="w-full max-w-[1920px] p-0 bg-[#040510f2] backdrop-blur-[5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(5px)_brightness(100%)] border-none"
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex flex-col items-center justify-center min-h-screen py-[391.52px]">
          <nav className="relative w-[152.06px]">
            <ul className="space-y-[31px]">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-col w-[152px] items-center"
                >
                  <a
                    href={item.href}
                    className="[font-family:'Arial-Narrow',Helvetica] font-normal text-white text-2xl text-center leading-[38.4px] tracking-[0] whitespace-nowrap"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
              <li className="pt-[35px]">
                <Button
                  variant="outline"
                  className="h-auto px-[28.14px] py-[9px] border border-solid border-[#a3ff12] rounded bg-transparent"
                >
                  <span className="[font-family:'Arial-Bold',Helvetica] font-bold text-[#a3ff12] text-[13.3px] text-center leading-[normal] tracking-[0] whitespace-nowrap">
                    Connect Wallet
                  </span>
                </Button>
              </li>
            </ul>
          </nav>

          <button className="absolute w-[18px] top-4 right-8 text-white text-2xl text-center leading-6 [font-family:'Font_Awesome_5_Free-Solid',Helvetica] font-normal tracking-[0] whitespace-nowrap">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};