import React from "react";
import { svgs } from "./svgs";

// need ts

function SvgMaker({
  name,
  fill,
  width,
  height,
  strokeFill,
  strokeWidth,
  style,
}: any) {
  const SVG = svgs[name];

  return (
    <SVG
      fill={fill}
      width={width}
      height={height}
      strokeFill={strokeFill}
      strokeWidth={strokeWidth}
      style={style}
    />
  );
}

export default SvgMaker;
