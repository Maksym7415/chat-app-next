import { svgs } from "./svgs";

function SvgMaker({
  name,
  fill,
  width,
  height,
  strokeFill,
  strokeWidth,
  style,
}) {
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
