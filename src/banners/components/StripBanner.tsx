import React from "react";
import { malvinasMapDataUrl } from "../../assets/malvinasMapDataUrl.js";

export function StripBanner() {
  return (
    <div tw="w-full h-full flex flex-col">
      <div tw="w-full flex flex-row items-center bg-[#75AADB]" style={{ height: 90 }}>
        <div tw="flex items-center justify-center shrink-0 pl-3 pr-1" style={{ height: 90 }}>
          <img
            src={malvinasMapDataUrl}
            alt=""
            tw="object-contain"
            width={126}
            height={78}
          />
        </div>
        <div tw="flex-1 flex flex-col justify-center pr-4 pl-2 min-w-0">
          <div tw="text-white font-semibold leading-snug" style={{ fontSize: 15 }}>
            Las Islas Malvinas son parte indivisible de la República Argentina.
            Reafirmamos soberanía nacional.
          </div>
          <div tw="text-white leading-snug mt-1 opacity-95" style={{ fontSize: 13 }}>
            Territorio argentino; reclamo pacífico permanente ante la comunidad
            internacional.
          </div>
        </div>
      </div>
      <div
        tw="w-full flex items-center justify-center bg-white"
        style={{ height: 40 }}
      >
        <span tw="text-black font-bold" style={{ fontSize: 22 }}>
          Islas Malvinas Argentinas
        </span>
      </div>
    </div>
  );
}
