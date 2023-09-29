"use client";
import React, { useEffect } from "react";

export default function LoadForm() {
  useEffect(() => {
    const script = document.createElement("script");

    script.async = true;
    script.dataset.uid = "4044f8b644";
    script.src = "https://web3deals-2.ck.page/4044f8b644/index.js";

    document.body.appendChild(script);
  }, []); // The empty array means this useEffect will run once when the component mounts, and the return function will run when it unmounts.

  return null; // or return some JSX if needed
}
