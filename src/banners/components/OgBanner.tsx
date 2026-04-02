import React from "react";
import { malvinasMapDataUrlOg } from "../../assets/malvinasMapDataUrl.js";
import { argentineFlagStripesBackground } from "../flagStripesBackground.js";

export function OgBanner() {
  return (
    <div
      tw="w-full h-full flex flex-row items-center justify-between px-10 py-8"
      style={{ background: argentineFlagStripesBackground }}
    >
      <div tw="flex-1 flex flex-col justify-center items-end pr-5 min-w-0 max-w-[22rem]">
        <div tw="text-[3.25rem] font-black text-[#203b5e] leading-none text-right">
          Islas Malvinas
        </div>
        <div tw="text-[2.35rem] font-bold text-[#203b5e] mt-5 leading-none text-right opacity-95">
          Argentinas
        </div>
      </div>
      <div tw="shrink-0 flex items-center justify-center px-4">
        <img
          src={malvinasMapDataUrlOg}
          alt=""
          tw="object-contain"
          width={280}
          height={174}
        />
      </div>
      <div tw="flex-1 flex flex-col justify-center items-start pl-5 min-w-0 max-w-[24rem]">
        <div tw="text-[1.2rem] font-semibold text-[#2c3e50] leading-snug flex flex-col text-left">
          <span>Soberanía nacional — territorio argentino.</span>
          <span tw="mt-2">Reclamo pacífico permanente.</span>
        </div>
      </div>
    </div>
  );
}
