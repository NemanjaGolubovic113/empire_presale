import { authService } from "../../services";
import Cookies from "js-cookie";

export const useLogin = () => {
  const login = async (walletAddr: string, ip: string) => {
    const user = await authService.login(walletAddr, ip);
    // console.log("user ==== ", user);
    if (user) {
      Cookies.set("currentUser", JSON.stringify(user));
    }
    return user;
  };

  return { login };
};
