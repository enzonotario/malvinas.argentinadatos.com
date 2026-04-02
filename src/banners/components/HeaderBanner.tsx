import React from "react";
import { malvinasMapDataUrl } from "../../assets/malvinasMapDataUrl.js";

export function HeaderBanner() {
  return (
    <div tw="w-full h-full flex flex-row items-stretch">
      <div tw="w-[400px] flex items-center justify-center bg-[#75AADB] shrink-0 pl-6 pr-4">
        <img
          src={malvinasMapDataUrl}
          alt=""
          tw="object-contain"
          width={360}
          height={224}
        />
      </div>
      <div tw="flex-1 flex flex-col justify-center px-14 min-w-0 bg-white">
        <div tw="text-[3.75rem] font-black text-[#2B4C7E] leading-tight">
          Islas Malvinas
        </div>
        <div tw="text-[2.25rem] font-bold text-[#75AADB] mt-4 leading-tight">
          Argentinas
        </div>
        <div tw="text-[1.35rem] font-semibold text-[#4A5568] mt-6 leading-snug max-w-[52rem]">
          Soberanía nacional — territorio indivisible de la República Argentina.
        </div>
      </div>
      <div tw="w-20 shrink-0 bg-[#75AADB]" />
    </div>
  );
}
