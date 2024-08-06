"use client";
import Image from "next/image";
import React, { useState } from "react";

const HomePages = () => {
  //   const [count, setCount] = useState<number>(0);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {/* <button
        style={{ padding: "12px 28px" }}
        onClick={() => setCount(count + 1)}
      >
        +
      </button>
      <h5 style={{ fontSize: "27px" }}>{count}</h5>
      <button
        style={{ padding: "12px 28px" }}
        onClick={() => setCount(count > 0 ? count - 1 : count)}
      >
        -
      </button> */}

      <Image
        width={1000}
        height={1000}
        alt="photo"
        src="https://st2.depositphotos.com/1388768/45745/i/450/depositphotos_457457574-stock-photo-consultant-presenting-tag-cloud-information.jpg"
      />
    </div>
  );
};

export default HomePages;
