import { IconButton } from "@mui/material";
import SvgMaker from "@/components/svgMaker";

// STYLES
const classes = {
  emojis: "flex h-full  pl-[13px]",
};

const LeftInputComponent = () => {
  return (
    <>
      <IconButton
        aria-label="emojis"
        className={classes.emojis}
        disabled={true}
      >
        <SvgMaker name="svgs_line_emoji" />
      </IconButton>
    </>
  );
};

export default LeftInputComponent;
