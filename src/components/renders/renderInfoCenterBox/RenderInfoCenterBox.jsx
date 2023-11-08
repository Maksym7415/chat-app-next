import { SDBoxCenter } from "./styles";

const RenderInfoCenterBox = ({ children, optionsTagSx = {} }) => (
	<SDBoxCenter sx={optionsTagSx}>{children}</SDBoxCenter>
);

export default RenderInfoCenterBox;
