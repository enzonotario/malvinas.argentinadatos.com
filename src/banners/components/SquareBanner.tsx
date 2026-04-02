import React from "react";
import { malvinasMapDataUrlOg } from "../../assets/malvinasMapDataUrl.js";
import { argentineFlagStripesBackground } from "../flagStripesBackground.js";

export function SquareBanner() {
  return (
    <div
      tw="relative w-full h-full"
      style={{ background: argentineFlagStripesBackground }}
    >
      <div
        tw="absolute left-0 right-0 flex flex-col items-center justify-end text-center px-10 pb-3"
        style={{ top: "0%", height: "30%" }}
      >
        <div tw="text-[3.75rem] font-black text-[#203b5e] leading-none">
          Islas Malvinas
        </div>
        <div tw="text-[2.75rem] font-bold text-[#203b5e] mt-5 leading-none opacity-95">
          Argentinas
        </div>
      </div>
      <div
        tw="absolute left-0 right-0 flex items-center justify-center px-10"
        style={{ top: "30%", height: "40%" }}
      >
        <img
          src={malvinasMapDataUrlOg}
          alt=""
          tw="object-contain max-w-full max-h-full"
          width={420}
          height={261}
        />
      </div>
      <div
        tw="absolute left-0 right-0 flex flex-col items-center justify-start text-center px-10 pt-3 max-w-full"
        style={{ top: "70%", height: "30%" }}
      >
        <div tw="text-[1.45rem] font-semibold text-[#2c3e50] leading-snug flex flex-col max-w-[52rem]">
          <span>Soberanía nacional — territorio argentino.</span>
          <span tw="mt-3">Reclamo pacífico permanente.</span>
        </div>
      </div>
    </div>
  );
}
