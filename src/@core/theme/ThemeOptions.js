// APPROVED +
import { deepmerge } from "@mui/utils";
import { breakpoints } from "./breakpoints";
import overrides from "./overrides";
import palette from "./palette";
import shadows from "./shadows";

// Create a theme instance.
const themeOptions = (settings, overrideMode) => {
	// ** Vars
	const { skin, mode, direction, themeColor } = settings;

	const mergedThemeConfig = deepmerge({
		breakpoints,
		direction: direction || "ltr",
		components: overrides(settings),
		palette: palette(
			mode === "semi-dark" ? overrideMode : mode,
			skin,
			themeColor,
		),
		varietyBorderRadius: {
			zero: 0,
			1: "2px",
			2: "3px",
			3: "4px",
			4: "5px",
			5: "18px",
			6: "30px",
			half: "50%",
			four_1: "0 3px 3px 0",
			four_2: "5px 5px 0 0",
		},
		shadows: shadows(mode),
	});

	return deepmerge(mergedThemeConfig, {
		palette: {
			primary: {
				...(mergedThemeConfig.palette
					? mergedThemeConfig.palette[themeColor]
					: palette(
							mode === "semi-dark" ? overrideMode : mode,
							skin,
							themeColor,
					  ).primary),
			},
		},
	});
};

export default themeOptions;
