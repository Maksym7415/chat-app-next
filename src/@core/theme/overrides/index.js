// ** Overrides Imports
import MuiAvatar from "./avatars";
import MuiBadge from "./badge";
import MuiButton from "./button";
import MuiCard from "./card";
import MuiChip from "./chip";
import MuiContainer from "./container";
import MuiControls from "./controls";
import MuiIconButton from "./iconBtn";
import MuiInput from "./input";
import MuiPaper from "./paper";
import MuiPopover from "./popover";
import MuiSelect from "./select";
import MuiSwitch from "./switcher";
import MuiTable from "./table";
import MuiTypography from "./typography";

const Overrides = () => {
	const chip = MuiChip();
	const input = MuiInput();
	const avatars = MuiAvatar();
	const button = MuiButton();
	const badge = MuiBadge();
	const iconButton = MuiIconButton();
	const card = MuiCard();
	const switcher = MuiSwitch();
	const controls = MuiControls();
	const popover = MuiPopover();
	const container = MuiContainer();
	const tables = MuiTable();

	return Object.assign(
		chip,
		input,
		button,
		badge,
		iconButton,
		card,
		switcher,
		controls,
		MuiTypography,
		popover,
		MuiPaper,
		container,
		avatars,
		tables,
		MuiSelect,
	);
};

export default Overrides;
