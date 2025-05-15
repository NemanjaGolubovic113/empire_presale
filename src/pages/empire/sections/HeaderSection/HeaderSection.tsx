import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../../../components/ui/sheet";

export const HeaderSection = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  // Navigation items data with corresponding section IDs
  const navigationItems = [
    { label: "Overview", href: "#overview" },
    { label: "Vision", href: "#vision" },
    { label: "Membership", href: "#membership" },
    { label: "Leadership", href: "#leadership" },
    { label: "Future", href: "#future" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <header className="flex justify-center w-full py-4 md:py-6 fixed top-0 left-0 bg-[#040510]/80 backdrop-blur-sm z-50">
      <div className="flex max-w-[1200px] w-full items-center justify-between px-4 md:px-5">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-[#a3ff12] text-xl md:text-2xl leading-6 [font-family:'Font_Awesome_5_Free-Solid',Helvetica] font-normal">
            <img src="/king.svg" alt="king" height={24} width={24} />
          </div>
          <div className="[font-family:'Arial-Bold',Helvetica] font-bold text-white text-lg md:text-xl leading-8">
            The Empire
          </div>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex gap-8">
            {navigationItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="[font-family:'Arial-Narrow',Helvetica] font-normal text-gray-300 hover:text-white text-base leading-[25.6px] cursor-pointer"
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-[#040510] border-l border-[#141625]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-4 mt-8">
                {navigationItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-gray-300 hover:text-white px-4 py-2 text-lg cursor-pointer"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Connect Wallet Button */}
        <Button
          variant="outline"
          className="hidden md:flex px-[17px] py-[9px] border border-solid border-[#a3ff12] rounded [font-family:'Arial-Bold',Helvetica] font-bold text-[#a3ff12] text-[13.3px]"
        >
          Connect Wallet
        </Button>
      </div>
    </header>
  );
};