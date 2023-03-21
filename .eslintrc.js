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
		// "no-use-before-define": "off",
		"import/prefer-default-export": "off", // In exporting files, this rule checks if there is default export or not. - https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/prefer-default-export.md
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

		"react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
		// "no-plusplus": ["error", { allowForLoopAfterthoughts: false }],
		"no-unused-expressions": "off",
		"no-console": "off",
		"no-plusplus": "off",
		"react/no-unstable-nested-components": [
			"off",
			{
				allowAsProps: true,
			},
		], // Заборонити створення нестабільних компонентів усередині компонентів ( react/no-unstable-nested-components) - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unstable-nested-components.md
		"prefer-promise-reject-errors": "off", // Вимагати використання об’єктів Error як причин відхилення Promise (prefer-promise-reject-errors) - https://eslint.org/docs/latest/rules/prefer-promise-reject-errors
		"no-param-reassign": [2, { props: false }],
	},
};
