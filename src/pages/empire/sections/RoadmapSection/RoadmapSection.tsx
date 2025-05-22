import React from "react";
import { Check, Circle } from 'lucide-react';

import { Card, CardContent } from "../../../../components/ui/card";

export const RoadmapSection = (): JSX.Element => {
  const founders = [
    {
      name: "Founder",
      x: "(@cryptomilad_)",
      xlink: "https://x.com/cryptomilad_?s=09",
      bio: "A seasoned crypto trader since 2014, Milad brings over a decade of experience in trading and market strategy. His deep understanding of market cycles, risk management, and blockchain innovation drives the vision of the project forward.",
      image: "/marcus-imperium.png",
    },
    {
      name: "Co-Founder",
      x: "(@thee7mod)",
      xlink: "https://x.com/Thee7mod?s=09",
      bio: "A strategic force behind the scenes, T7 complements the team with strong expertise in community building, project coordination, and early-stage venture support. As co-founder, T7 plays a key role in growth, partnerships, and ensuring the project stays grounded in its mission.",
      image: "/alexander-crown.png",
    },
  ];

  return (
    <section className="w-full [background:linear-gradient(180deg,rgba(4,5,16,1)_0%,rgba(7,5,18,1)_100%)] relative">
      {/* Background decoration */}
      {/* <div className="absolute inset-0 w-full opacity-10">
        <div className="relative w-full h-full">
          <img
            className="absolute w-5 h-5 top-0 left-0"
            alt="Component"
            src="/component-3.svg"
          />
        </div>
      </div> */}

      <div className="relative mx-auto max-w-[1200px] w-full">
        {/* Section header */}
        <div className="flex flex-col items-center mb-16">
          <h2
            className="[background:linear-gradient(90deg,rgba(163,255,18,1)_0%,rgba(197,255,107,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Arial-Bold',Helvetica] font-bold text-transparent text-[40px] text-center leading-[48px]"
            style={{
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Roadmap (2025-2026)
          </h2>
        </div>

        {/* Founders cards */}
        <div className="w-full">
          <div className="flex flex-wrap gap-6 justify-center pt-[15px]">
            <div className="flex text-left lg:ml-[1/6] lg:flex-none lg:basis-1/4">
              <div className="">
                <h3 className="[font-family:'Arial-Bold',Helvetica] font-bold text-white text-xl leading-6">
                  Q2 2025 - The Token Awakens
                </h3>
              </div>
            </div>
            <div className="hidden lg:block lg:flex-none lg:w-1/5">
              <div className="h-full relative mr-[15px]">
                <div className="flex-1 text-blackest text-center text-[14px] font-normal h-8 w-8 leading-8 rounded-full block mx-auto z-20 relative justify-items-center">
                  <Circle className="bg-[#a3ff12] rounded-full" />
                </div>
                <div className="absolute top-0 left-1/2 w-[2px] h-[calc(100%+15px)] bg-[#a3ff12] -translate-x-1/2 z-[1]" />
              </div>
            </div>
            <div className="flex-none w-full px-5 lg:px-0 lg:w-5/12 [font-family:'Arial-Narrow',Helvetica] font-normal text-base tracking-[0] leading-[25.6px] whitespace-nowrap text-wrap">
              <div className="pb-[60px]">
                <ul className="content-list">
                  <li className="space-y-2">
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        $IMPERIUM token minted on Solana
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Token claim portal opens for Emperor NFT holders
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Presale launched for early backers
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        CoinGecko & CoinMarketCap listing submissions
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        First airdrop + community reward campaign
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Strategic influencer marketing & social raids
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Begin private list for real-life Emperor club
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 justify-center pt-[15px]">
            <div className="flex text-left lg:ml-[1/6] lg:flex-none lg:basis-1/4">
              <div className="">
                <h3 className="[font-family:'Arial-Bold',Helvetica] font-bold text-white text-xl leading-6">
                  Q3 2025 - Establishing the Throne
                </h3>
              </div>
            </div>
            <div className="hidden lg:block lg:flex-none lg:w-1/5">
              <div className="h-full relative mr-[15px]">
                <div className="flex-1 text-blackest text-center text-[14px] font-normal h-8 w-8 leading-8 rounded-full block mx-auto z-20 relative justify-items-center">
                  <Circle className="bg-[#a3ff12] rounded-full" />
                </div>
                <div className="absolute top-0 left-1/2 w-[2px] h-[calc(100%+15px)] bg-[#a3ff12] -translate-x-1/2 z-[1]" />
              </div>
            </div>
            <div className="flex-none w-full px-5 lg:px-0 lg:w-5/12 [font-family:'Arial-Narrow',Helvetica] font-normal text-base tracking-[0] leading-[25.6px] whitespace-nowrap text-wrap">
              <div className="pb-[60px]">
                <ul className="content-list">
                  <li className="space-y-2">
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Public DEX launch of $IMPERIUM
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Emperor NFT utility unlocked (access, voting, merch)
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        First exclusive Emperor-only governance vote
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Launch of premium merch store (only payable in $IMPERIUM)
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Begin identity development of Club of Emperors - a real-life private network
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Community expansion via curated Twitter Spaces, AMAs, and meme campaigns
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 justify-center pt-[15px]">
            <div className="flex text-left lg:ml-[1/6] lg:flex-none lg:basis-1/4">
              <div className="">
                <h3 className="[font-family:'Arial-Bold',Helvetica] font-bold text-white text-xl leading-6">
                  Q4 2025 - The Council Assembles
                </h3>
              </div>
            </div>
            <div className="hidden lg:block lg:flex-none lg:w-1/5">
              <div className="h-full relative mr-[15px]">
                <div className="flex-1 text-blackest text-center text-[14px] font-normal h-8 w-8 leading-8 rounded-full block mx-auto z-20 relative justify-items-center">
                  <Circle className="bg-[#a3ff12] rounded-full" />
                </div>
                <div className="absolute top-0 left-1/2 w-[2px] h-[calc(100%+15px)] bg-[#a3ff12] -translate-x-1/2 z-[1]" />
              </div>
            </div>
            <div className="flex-none w-full px-5 lg:px-0 lg:w-5/12 [font-family:'Arial-Narrow',Helvetica] font-normal text-base tracking-[0] leading-[25.6px] whitespace-nowrap text-wrap">
              <div className="pb-[60px]">
                <ul className="content-list">
                  <li className="space-y-2">
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        DUBAI: First Emperor Holder Meetup (Q4 2025 or early Q1 2026)
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Founding members of Club of Emperors invited
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        NFT staking goes live for exclusive ranks or perks
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Lore Drop: "The Rise of the Imperium" releases - a cinematic brand history
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Formation of global chapters for Club of Emperors begins (VIP lounges, partner venues)
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        GameFi design quietly begins - to serve the community, not distract it
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 justify-center pt-[15px]">
            <div className="flex text-left lg:ml-[1/6] lg:flex-none lg:basis-1/4">
              <div className="">
                <h3 className="[font-family:'Arial-Bold',Helvetica] font-bold text-white text-xl leading-6">
                  Q1 2026 - Rise of the Real-World Empire
                </h3>
              </div>
            </div>
            <div className="hidden lg:block lg:flex-none lg:w-1/5">
              <div className="h-full relative mr-[15px]">
                <div className="flex-1 text-blackest text-center text-[14px] font-normal h-8 w-8 leading-8 rounded-full block mx-auto z-20 relative justify-items-center">
                  <Circle className="bg-[#a3ff12] rounded-full" />
                </div>
                <div className="absolute top-0 left-1/2 w-[2px] h-[calc(100%+15px)] bg-[#a3ff12] -translate-x-1/2 z-[1]" />
              </div>
            </div>
            <div className="flex-none w-full px-5 lg:px-0 lg:w-5/12 [font-family:'Arial-Narrow',Helvetica] font-normal text-base tracking-[0] leading-[25.6px] whitespace-nowrap text-wrap">
              <div className="pb-[60px]">
                <ul className="content-list">
                  <li className="space-y-2">
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Private club onboarding opens (based on NFT ranks & holdings)
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Monthly IRL activations: branded meetups, partner events, networking
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Whitelist-only merch drops & real-world collectibles
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Cross-brand collabs with luxury/lifestyle names
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Launch of Emperor Registry - holder verification for access to elite experiences
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Global city scouting for Club chapter hubs: Dubai, London, NYC, Tokyo
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 justify-center pt-[15px]">
            <div className="flex text-left lg:ml-[1/6] lg:flex-none lg:basis-1/4">
              <div className="">
                <h3 className="[font-family:'Arial-Bold',Helvetica] font-bold text-white text-xl leading-6">
                  Q2 - Q3 2026 - The Empire Expands
                </h3>
              </div>
            </div>
            <div className="hidden lg:block lg:flex-none lg:w-1/5">
              <div className="h-full relative mr-[15px]">
                <div className="flex-1 text-blackest text-center text-[14px] font-normal h-8 w-8 leading-8 rounded-full block mx-auto z-20 relative justify-items-center">
                  <Circle className="bg-[#a3ff12] rounded-full" />
                </div>
                <div className="absolute top-0 left-1/2 w-[2px] h-[calc(100%+15px)] bg-[#a3ff12] -translate-x-1/2 z-[1]" />
              </div>
            </div>
            <div className="flex-none w-full px-5 lg:px-0 lg:w-5/12 [font-family:'Arial-Narrow',Helvetica] font-normal text-base tracking-[0] leading-[25.6px] whitespace-nowrap text-wrap">
              <div className="pb-[60px]">
                <ul className="content-list">
                  <li className="space-y-2">
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        $IMPERIUM used to access private events, auctions, and closed lounges
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Partnership with premium hospitality & event brands
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Begin token-gated RSVP system for experiences, drops, and high-end utility
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Exclusive events in global locations (Europe/Asia)
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Announcement of Emperor Passport - NFT that gives IRL access worldwide
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Private networking platform soft launch for holders only
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        GameFi teaser released as a bonus ecosystem (not primary focus)
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Emperor Coin will bridge blockchain with real-life experiences - delivering unforgettable events and unstoppable crypto-powered connections. Expect the unexpected.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 justify-center pt-[15px]">
            <div className="flex text-left lg:ml-[1/6] lg:flex-none lg:basis-1/4">
              <div className="">
                <h3 className="[font-family:'Arial-Bold',Helvetica] font-bold text-white text-xl leading-6">
                  Q4 2026 - Emperor's Arena + Club Solidifies
                </h3>
              </div>
            </div>
            <div className="hidden lg:block lg:flex-none lg:w-1/5">
              <div className="h-full relative mr-[15px]">
                <div className="flex-1 text-blackest text-center text-[14px] font-normal h-8 w-8 leading-8 rounded-full block mx-auto z-20 relative justify-items-center">
                  <Circle className="bg-[#a3ff12] rounded-full" />
                </div>
                <div className="absolute top-0 left-1/2 w-[2px] h-[calc(100%-60px)] bg-[#a3ff12] -translate-x-1/2 z-[1]" />
              </div>
            </div>
            <div className="flex-none w-full px-5 lg:px-0 lg:w-5/12 [font-family:'Arial-Narrow',Helvetica] font-normal text-base tracking-[0] leading-[25.6px] whitespace-nowrap text-wrap">
              <div className="pb-[60px]">
                <ul className="content-list">
                  <li className="space-y-2">
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Launch of Emperor's Arena - fun, token-rewarding game for the culture
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Community tournaments (prizes in $IMPERIUM + IRL perks)
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Limited open-access to the game, but ranked matches exclusive to holders
                      </p>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-4">
                        <img src="/king.svg" alt="king" height={16} width={16} />
                        <p className="text-gray-400">
                          Launch of Club of Emperors full network:
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 pl-8">
                          • Verified member registry
                        </p>
                        <p className="text-gray-400 pl-8">
                          • Event calendar
                        </p>
                        <p className="text-gray-400 pl-8">
                          • Real-life benefits dashboard
                        </p>
                        <p className="text-gray-400 pl-8">
                          • Elite location access
                        </p>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className="text-gray-400">
                        Release of Empire Status Cards (physical & NFT ID for members)
                      </p>
                    </div>
                    <div className="flex items-baseline gap-4">
                      <img src="/king.svg" alt="king" height={16} width={16} />
                      <p className=" text-gray-400">
                        Begin roadmap toward IRL real estate, lounges, and retreats for emperors
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
