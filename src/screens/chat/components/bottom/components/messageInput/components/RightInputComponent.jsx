import { useState } from "react";
import SvgMaker from "@/components/svgMaker";

// STYLES
const classes = {
	attachAndTypeMessage: "flex h-full bg-white px-[7px]",
};

const RightInputComponent = ({
	message,
	handleSendMessage,
	forwardMessages,
}) => {
	// STATES
	const [toggleTypeMessage, setToggleTypeMessage] = useState("voice");

	// FUNCTIONS
	const stylesRightIcons = () => {
		return message || forwardMessages.length
			? {
					justifyContent: "flex-end",
					width: 40,
			  }
			: {
					justifyContent: "space-between",
					width: 80,
			  };
	};

	return (
		<>
			<div
				className={classes.attachAndTypeMessage}
				style={stylesRightIcons()}
			>
				{message || forwardMessages.length ? (
					<div onClick={handleSendMessage}>
						<SvgMaker
							name="svgs_filled_send"
							strokeFill={"#5EA7DE"}
						/>
					</div>
				) : (
					<>
						<div
							onClick={() => {
								// refBottomSheet.current?.snapToIndex(0);
							}}
						>
							<SvgMaker name="svgs_line_attach" />
						</div>
						<div
							onClick={() => {
								setToggleTypeMessage((prev) =>
									prev === "voice" ? "video" : "voice",
								);
							}}
						>
							{toggleTypeMessage === "voice" ? (
								<SvgMaker name="svgs_line_voice" />
							) : (
								<SvgMaker name="svgs_line_video_message" />
							)}
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default RightInputComponent;
