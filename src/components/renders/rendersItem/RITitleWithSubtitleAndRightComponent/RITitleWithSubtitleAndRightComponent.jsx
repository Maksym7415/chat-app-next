import { handleKeyDown } from "@/helpers/index";

// STYLES
const classes = {
	title: "font-normal text-[15px] text-[#202020] m-0",
	subTitle: "font-normal text-[12px] text-[#83868B] mt-[6px]",
	wrapperItem: "py-[12px] px-[10px] pointer-events-none flex items-center",
	wrapperItemLeft: "",
};

const RITitleWithSubtitleAndRightComponent = ({
	title = "",
	subTitle = "",
	renderRightComponent = null,
	onPressWrapperItemLeft = () => {},
	styles = {
		wrapperItem: {},
		wrapperItemLeft: {},
		title: {},
		subTitle: {},
	},
}) => (
	<div
		className={classes.wrapperItem}
		style={{
			justifyContent: renderRightComponent ? "space-between" : null,
			...styles.wrapperItem,
		}}
	>
		<div
			role="button"
			tabIndex="0"
			onClick={onPressWrapperItemLeft}
			className={classes.wrapperItemLeft}
			style={{
				...styles.wrapperItemLeft,
			}}
			onKeyDown={(event) =>
				handleKeyDown({ event, fcClick: () => {} })
			}
		>
			<p
				className={classes.title}
				style={{
					...styles.title,
				}}
			>
				{title}
			</p>
			{subTitle ? (
				<p
					className={classes.subTitle}
					style={{
						...styles.subTitle,
					}}
				>
					{subTitle}
				</p>
			) : null}
		</div>
		{renderRightComponent ? renderRightComponent() : null}
	</div>
);
export default RITitleWithSubtitleAndRightComponent;
