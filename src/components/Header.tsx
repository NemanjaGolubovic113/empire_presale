import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { useLogin } from "../hooks/auth/useLogin";
import { useLogout } from "../hooks/auth/useLogout";
import useIsMounted from "./useIsMounted";
import { useContract } from "../contexts/ContractContext";

export const Header = () => {
  const navigate = useNavigate();
  const wallet = useAnchorWallet();
  const { login } = useLogin();
  const { logout } = useLogout();

  const mounted = useIsMounted();
  // @ts-ignore
  const { getOwnerAddress } = useContract();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const div1Ref = useRef<HTMLDivElement | null>(null);
  const div2Ref = useRef<HTMLDivElement | null>(null);
  const [lastTokenInfo, setLastTokenInfo] = useState(null);
  const [lastTradeInfo, setLastTradeInfo] = useState(null);
  const [contractOwnerAddress, setContractOwnerAddress] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInfluencer, setIsInfluencer] = useState(false);

  const adminAddress = import.meta.env.VITE_ADMIN_ADDRESS;
  
  const baseURL = import.meta.env.VITE_PUBLIC_SOCKET_URL;

  useEffect(() => {
    const checkLogin = async () => {
      // console.log("login ::::: ")
      try {
        if (wallet?.publicKey?.toBase58()) {
          const ipaddress = await getClientIp();
          login(wallet?.publicKey.toBase58(), ipaddress);
        }
        if (!wallet) logout();
      } catch (error) {
        console.error("Error during checkLogin:", error);
      }
    }

    const initialize = async () => {
      // console.log("INITIALIZE ::::: ")
      try {
        if (wallet?.publicKey?.toBase58()) {
          const contractOwner = await getOwnerAddress();
          if (contractOwner) {
            setContractOwnerAddress(contractOwner.toBase58());
          }
        }
      } catch (error) {
        console.error("Error during initialization:", error);
      }
    }

    checkLogin();
    initialize();
  }, [wallet]);

  const getClientIp = async() => {
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      // console.log('Client IP:', data.ip);
      return data.ip;
    } catch (err) {
      console.error('Failed to get IP address:', err);
      return null;
    }
  }

  // const getCheckoutStatus = () => {
  //   if (div1Ref.current) {
  //     if (div1Ref.current.classList.contains("animate-shake") === true)
  //       div1Ref.current.classList.remove("animate-shake");
  //     else div1Ref.current.classList.add("animate-shake");

  //     if (div2Ref.current && div2Ref.current.classList.contains("animate-shake") === true)
  //       div2Ref.current.classList.remove("animate-shake");
  //     else if (div2Ref.current) div2Ref.current.classList.add("animate-shake");
  //   }
  // };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 sm:mb-8 md:mb-12 px-4 md:px-[58px] pt-4 md:pt-7 gap-4">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <img
          className="h-[80px] sm:h-[100px] md:h-[114px] object-contain cursor-pointer"
          alt="Logo"
          src="/logo.svg"
          onClick={() => navigate("/board")}
        />
        
      </div>
      <div className="text-white text-lg sm:text-xl font-medium flex">
        {/* [Connect Wallet] */}
        {mounted && <WalletMultiButton style={{backgroundColor: 'transparent'}} />}
        {(wallet?.publicKey !== null && wallet?.publicKey !== undefined) && (
          <UserCircleIcon className="size-12 fill-white" />
        )}
      </div>
    </div>
  );
};