module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["airbnb", "plugin:@typescript-eslint/recommended", "prettier"],
	parser: "@typescript-eslint/parser",
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "prettier"],
	rules: {
		"no-use-before-define": "off",
		"import/prefer-default-export": "off",
		"react/react-in-jsx-scope": "off",
		"react/prop-types": "off",
		"react/jsx-props-no-spreading": "off",
		"no-undef": "off",
		"import/no-unresolved": "off",
		"import/extensions": "off",
		"jsx-a11y/anchor-is-valid": "off",
		"react/function-component-definition": [
			2,
			{
				namedComponents: ["arrow-function", "function-declaration"],
				unnamedComponents: "arrow-function",
			},
		],
		"react/jsx-no-useless-fragment": "off",
		"no-lonely-if": "off",
		"arrow-body-style": ["error", "as-needed"],
		"no-restricted-exports": "off",
		"no-param-reassign": [
			"error",
			{
				props: true,
				ignorePropertyModificationsFor: ["state"],
			},
		],
		"react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
		"no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
	},
};
