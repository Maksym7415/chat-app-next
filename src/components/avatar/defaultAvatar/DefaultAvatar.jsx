import { SDRoot, SDText } from "./styles";

const DefaultAvatar = ({
	name = "Chat",
	width,
	height,
	fontSize,
	isSquare,
}) => (
	<SDRoot
		style={{
			borderRadius: isSquare ? 0 : "50%",
			width,
			height,
		}}
	>
		<SDText variant="span" style={{ fontSize }}>{name}</SDText>
	</SDRoot>
);

export default DefaultAvatar;
