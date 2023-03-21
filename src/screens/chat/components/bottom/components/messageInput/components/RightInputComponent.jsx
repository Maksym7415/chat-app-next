import { useState } from "react";
import SvgMaker from "@/components/svgMaker";
import { handleKeyDown } from "@/helpers/index";

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
	const stylesRightIcons = () =>
		message || forwardMessages.length
			? {
					justifyContent: "flex-end",
					width: 40,
			  }
			: {
					justifyContent: "space-between",
					width: 80,
			  };

	return (
		<>
			<div
				className={classes.attachAndTypeMessage}
				style={stylesRightIcons()}
			>
				{message || forwardMessages.length ? (
					<div
						role="button"
						tabIndex="0"
						onClick={handleSendMessage}
						onKeyDown={(event) =>
							// eslint-disable-next-line @typescript-eslint/no-empty-function
							handleKeyDown({ event, fcClick: () => {} })
						}
					>
						<SvgMaker
							name="svgs_filled_send"
							strokeFill="#5EA7DE"
						/>
					</div>
				) : (
					<>
						<div
							role="button"
							tabIndex="0"
							onClick={() => {
								// refBottomSheet.current?.snapToIndex(0);
							}}
							onKeyDown={(event) =>
								// eslint-disable-next-line @typescript-eslint/no-empty-function
								handleKeyDown({ event, fcClick: () => {} })
							}
						>
							<SvgMaker name="svgs_line_attach" />
						</div>
						<div
							role="button"
							tabIndex="0"
							onClick={() => {
								setToggleTypeMessage((prev) =>
									prev === "voice" ? "video" : "voice",
								);
							}}
							onKeyDown={(event) =>
								// eslint-disable-next-line @typescript-eslint/no-empty-function
								handleKeyDown({ event, fcClick: () => {} })
							}
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
