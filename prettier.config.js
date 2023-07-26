/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/** @type {import('prettier').Config} */
module.exports = {
	tabWidth: 4,
	singleQuote: false,
	jsxSingleQuote: false,
	arrowParens: "always",
	useTabs: true,
	printWidth: 80,
	trailingComma: "all",
	semi: true,
	bracketSameLine: false,
	singleAttributePerLine: true,
	importOrder: [
		"<THIRD_PARTY_MODULES>",
		"^../(.*)",
		"^./(.*)",
		"(.scss)$",
		"^@/store/(.*)$",
		"^@/core/(.*)$",
		"^@/pages/(.*)$",
		"^@/screens/(.*)$",
		"^@/components/(.*)$",
		"^@/hooks/(.*)$",
		"^@/helpers/(.*)$",
		"^@/providers/(.*)$",
		"^@/styles/(.*)$",
	],
	importOrderSortSpecifiers: true,
	// "importOrderSeparation": true,
};
