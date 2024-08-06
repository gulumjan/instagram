import React from "react";
import { Inter, Roboto_Mono } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto_Mono({ subsets: ["latin"] });

const page = () => {
  return (
    <div>
      <p className={roboto.className}>Contact</p>
    </div>
  );
};

export default page;
