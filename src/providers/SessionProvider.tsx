import { FC, ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRefreshAccesTokenMutation } from "@/redux/api/auth";

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const [refreshAccesToken] = useRefreshAccesTokenMutation();

  const checkAccessToken = async () => {
    const tokens = JSON.parse(localStorage.getItem("tokens")!);
    if (!tokens) return;

    const { accessTokenExpiration, refreshToken } = tokens;
    if (accessTokenExpiration <= Date.now()) {
      console.log("Токен истек!");
      try {
        const { data } = await refreshAccesToken({ refreshToken });
        localStorage.setItem("tokens", JSON.stringify({ ...tokens, ...data }));
        window.location.reload();
      } catch (error) {
        console.error("Ошибка обновления токена", error);
        localStorage.removeItem("tokens");
        window.location.href = "/auth/sign-in";
      }
    } else {
      console.log("Токен живой! 💖");
    }
  };

  useEffect(() => {
    checkAccessToken();
  }, [pathname]);

  return <>{children}</>;
};

export default SessionProvider;
