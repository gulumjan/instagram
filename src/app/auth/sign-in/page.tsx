import React from "react";
import { Inter, Roboto_Mono } from "next/font/google";
import LoginPage from "@/components/pages/LoginPage";
const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto_Mono({ subsets: ["latin"] });

const page = () => {
  return (
    <>
      <LoginPage />
    </>
  );
};

export default page;
