module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"airbnb",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/jsx-runtime",
		"prettier",
	],
	parser: "@typescript-eslint/parser",
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "prettier"],
	rules: {
		"default-param-last": "off", // This rule enforces default parameters to be the last of parameters. - https://github.com/standard/standard/issues/1414
		"import/prefer-default-export": "off", // In exporting files, this rule checks if there is default export or not. - https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/prefer-default-export.md
		"react/prop-types": "off", // Disallow missing props validation in a React component definition - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prop-types.md
		"react/jsx-props-no-spreading": "off", // Disallow JSX prop spreading - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
		"import/no-unresolved": "off", // - https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md
		"import/extensions": "off", // - https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
		"react/function-component-definition": [
			2,
			{
				namedComponents: ["arrow-function", "function-declaration"],
				unnamedComponents: "arrow-function",
			},
		], // Enforce a specific function type for function components - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
		"react/jsx-no-useless-fragment": "off", // Disallow unnecessary fragments  - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
		"no-lonely-if": "off", // Disallow if statements as the only statement in if blocks without else - https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-lonely-if.md
		"arrow-body-style": ["error", "as-needed"], // Require braces around arrow function bodies - https://eslint.org/docs/latest/rules/arrow-body-style
		"no-restricted-exports": "off", // Disallow specified names in exports - https://eslint.org/docs/latest/rules/no-restricted-exports -- i use index files
		"react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }], // Disallow file extensions that may contain JSX - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
		"no-unused-expressions": "off", // Disallow unused expressions - https://eslint.org/docs/latest/rules/no-unused-expressions
		"no-console": "off", // Disallow the use of console - https://eslint.org/docs/latest/rules/no-console#rule-details
		"no-plusplus": "off", // Disallow the unary operators ++ and -- - https://eslint.org/docs/latest/rules/no-plusplus#rule-details
		"react/no-unstable-nested-components": [
			"off",
			{
				allowAsProps: true,
			},
		], // Prevent the creation of unstable components within components - https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unstable-nested-components.md
		"prefer-promise-reject-errors": "off", // Require the use of Error objects as rejection reasons Promise - https://eslint.org/docs/latest/rules/prefer-promise-reject-errors
	},
};
