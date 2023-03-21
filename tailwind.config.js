/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
// const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./app/**/*.{js,ts,jsx,tsx}",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/aspect-ratio"),
		require("@tailwindcss/line-clamp"),
		plugin(({ addComponents, addUtilities }) => {
			addComponents({
				// ".errorText": {
				//   color: "#ed2f2f",
				//   fontSize: 12,
				// },
				// ".btn-primary": {
				//   backgroundColor: primary,
				//   color: "#fff",
				//   borderRadius: "0.65rem",
				//   transition: "background-color .3s ease-in-out",
				//   "&:hover": {
				//     backgroundColor: "#ff0009",
				//   },
				// },
				// ".text-link": {
				//   textUnderlineOffset: 4,
				//   color: "rgba(255, 255, 255, .9)",
				//   transition: "text-decoration-color .3s ease-in-out",
				//   textDecorationLine: "underline",
				//   textDecorationColor: "rgba(255, 255, 255, 0.2)",
				//   "&:hover": {
				//     textDecorationColor: "rgba(255, 255, 255, 0.9)",
				//   },
				// },
				// ".air-block": {
				//   borderRadius: theme("borderRadius.layout"),
				//   backgroundColor: theme("colors.gray.950"),
				//   color: theme("colors.white"),
				//   boxShadow: theme("boxShadow.lg"),
				// },
			});
			addUtilities({
				".errorText": {
					color: "#ed2f2f",
					fontSize: 12,
				},
				// ".text-shadow": {
				//   textShadow: "1px 1px rgba(0, 0, 0, 0.4)",
				// },
				// ".outline-border-none": {
				//   outline: "none",
				//   border: "none",
				// },
				".flex-center-center": {
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				},
				".paper-message": {
					boxSizing: "border-box",
					position: "relative",
					display: "flex",
					flexDirection: "column",
					maxWidth: "500px",
					borderRadius: "10px",
					overflow: "hidden",
				},
				// ".flex-center-between": {
				//   display: "flex",
				//   alignItems: "center",
				//   justifyContent: "space-between",
				// },
				// ".image-like-bg": {
				//   objectPosition: "center",
				//   objectFit: "cover",
				//   pointerEvents: "none",
				// },
			});
		}),
	],
};
