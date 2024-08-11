"use client";
import { FC, ReactNode, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGetUserQuery, useRefreshTokenMutation } from "@/redux/api/auth";

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
  const {
    data: user,
    error: userError,
    status,
    isLoading,
    isError,
  } = useGetUserQuery([]);
  const [refreshToken] = useRefreshTokenMutation();
  const pathname = usePathname();
  const router = useRouter();

  const handleRefreshToken = useCallback(async () => {
    const tokens = localStorage.getItem("tokens");
    if (!tokens) {
      localStorage.removeItem("tokens");
      return;
    }

    let localStorageData;
    try {
      localStorageData = JSON.parse(tokens);
    } catch (error) {
      console.error("Failed to parse tokens:", error);
      localStorage.removeItem("tokens");
      return;
    }

    const { accessTokenExpiration, refreshToken: storedRefreshToken } =
      localStorageData || {};
    if (accessTokenExpiration && accessTokenExpiration < new Date().getTime()) {
      const { data, error } = await refreshToken({
        refreshToken: storedRefreshToken,
      });
      if (data) {
        localStorage.setItem("tokens", JSON.stringify(data));
      } else {
        console.error("Failed to refresh token:", error);
        localStorage.removeItem("tokens");
      }
    } else {
      console.log("Token is still valid.");
    }
  }, [refreshToken]);

  const handleNavigation = useCallback(async () => {
    if (isError) {
      console.error("Failed to fetch user data:", userError);
      await handleRefreshToken();
    }

    if (!isLoading) {
      switch (pathname) {
        case "/auth/sign-in":
        case "/auth/sign-up":
        case "/auth/reset-password":
        case "/auth/forgot":
          if (status === "fulfilled" && user) {
            router.push("/");
          }
          break;
        case "/":
        case "/post":
        case "/profile":
          if (isError) {
            router.push("/auth/sign-in");
          }
          break;
        default:
          break;
      }
    }
  }, [
    status,
    isLoading,
    isError,
    user,
    pathname,
    router,
    handleRefreshToken,
    userError,
  ]);

  useEffect(() => {
    handleNavigation();
  }, [handleNavigation]);

  return <>{children}</>;
};
