"use client";
import { FC, ReactNode, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGetUserQuery, useRefreshTokenMutation } from "@/redux/api/auth";

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
  const { status } = useGetUserQuery();
  const [refreshToken] = useRefreshTokenMutation();
  const pathname = usePathname();
  const router = useRouter();

  const handleRefreshToken = useCallback(async () => {
    const localStorageData = JSON.parse(
      String(localStorage.getItem("tokens")) || ""
    );
    if (!localStorageData) {
      localStorage.removeItem("tokens");
      return;
    }

    const { accessTokenExpiration, refreshToken } = localStorageData;
    console.log(localStorageData);

    if (accessTokenExpiration < new Date().getTime()) {
      const { data, error } = await refreshToken({ refreshToken });
      console.log(data);
      console.log(error);
      localStorage.setItem("tokens", JSON.stringify(data));
    } else {
      console.log("Токен живой!");
    }
  }, [refreshToken]);

  const handleNavigation = useCallback(async () => {
    if (status === "rejected") {
      await handleRefreshToken();
    }

    switch (pathname) {
      case "/auth/sign-in":
      case "/auth/sign-up":
      case "/auth/reset-password":
      case "/auth/forgot":
        if (status === "fulfilled") {
          router.push("/");
        }
        break;
      case "/":
      case "/post":
      case "/profile":
        if (status === "rejected") {
          router.push("/auth/sign-in");
        }
        break;
      default:
        break;
    }
  }, [status, pathname, router, handleRefreshToken]);

  useEffect(() => {
    handleNavigation();
  }, [handleNavigation]);

  return <>{children}</>;
};
