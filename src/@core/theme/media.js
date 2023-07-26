// APPROVED
import { createMedia } from "@artsy/fresnel";
import { breakpoints } from "@/core/theme/breakpoints/index";

const ExampleAppMedia = createMedia({
	breakpoints: breakpoints.values,
});

// Make styles for injection into the header of the page
export const mediaStyles = ExampleAppMedia.createMediaStyle();

export const { Media, MediaContextProvider } = ExampleAppMedia;
