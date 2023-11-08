// +
import { handleKeyDown } from "@/helpers/index";
import {
	SDWrapperItem,
	SDWrapperItemLeft,
	SDTitle,
	SDSubTitle,
} from "./styles";

const RITitleWithSubtitleAndRightComponent = ({
	title = "",
	subTitle = "",
	renderRightComponent = null,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onPressWrapperItemLeft = () => {},
	optionsTagsSx: {
		wrapperItem: {},
		wrapperItemLeft: {},
		title: {},
		subTitle: {},
	},
}) => (
	<SDWrapperItem
		sx={{
			justifyContent: renderRightComponent ? "space-between" : null,
			...optionsTagsSx?.wrapperItem,
		}}
	>
		<SDWrapperItemLeft
			role="button"
			tabIndex="0"
			onClick={onPressWrapperItemLeft}
			sx={{
				...optionsTagsSx?.wrapperItem,
			}}
			onKeyDown={(event) =>
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				handleKeyDown({ event, fcClick: () => {} })
			}
		>
			<SDTitle
				sx={{
					...optionsTagsSx?.title,
				}}
			>
				{title}
			</SDTitle>
			{subTitle ? (
				<SDSubTitle
					sx={{
						...optionsTagsSx?.title,
					}}
				>
					{subTitle}
				</SDSubTitle>
			) : null}
		</SDWrapperItemLeft>
		{renderRightComponent ? renderRightComponent() : null}
	</SDWrapperItem>
);
export default RITitleWithSubtitleAndRightComponent;
