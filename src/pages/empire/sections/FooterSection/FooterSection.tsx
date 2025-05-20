import React from "react";

export const FooterSection = (): JSX.Element => {
  // Social media links data for easy mapping
  const socialLinks = [
    { name: "Twitter", href: "#" },
    { name: "Discord", href: "#" },
    { name: "Telegram", href: "#" },
  ];

  return (
    <footer className="flex flex-col items-center py-8 md:py-12 px-4 w-full bg-[#040510] border-t border-[#141625]">
      <div className="w-full max-w-[1200px] flex flex-col">
        <div className="grid gap-8 mb-8">
          {/* <div className="flex flex-col gap-4">
            <h2 className="font-bold text-xl md:text-2xl text-[#a3ff12] font-['Arial-Bold',Helvetica]">
              The Empire
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-['Arial-Narrow',Helvetica] leading-[25.6px]">
              A New Force Rises From The Blockchain. Not Just A Coin — A Culture.
              <br className="hidden md:block" />
              Not Just A Meme — A Movement.
            </p>
          </div> */}

          <div className="flex justify-start md:justify-end gap-4 md:gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-gray-300 transition-colors font-['Arial-Narrow',Helvetica] text-sm md:text-base"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-[#141625] w-full flex justify-center">
          <p className="text-gray-500 text-xs md:text-sm font-['Arial-Narrow',Helvetica] text-center">
            © All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};