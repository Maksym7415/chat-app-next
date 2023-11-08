// +
import { SDRoot, SDText } from "./styles";

const DefaultAvatar = ({
	name = "Chat",
	width,
	height,
	fontSize,
	isSquare,
}) => (
	<SDRoot
		sx={{
			borderRadius: isSquare ? 0 : "50%",
			width,
			height,
		}}
	>
		<SDText variant="span" sx={{ fontSize }}>{name}</SDText>
	</SDRoot>
);

export default DefaultAvatar;
