"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Inter } from "next/font/google";
import { SessionProvider } from "@/providers/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <SessionProvider>{children}</SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
