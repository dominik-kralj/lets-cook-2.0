import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import { defineConfig, globalIgnores } from "eslint/config"
import noComments from "eslint-plugin-no-comments"

export default defineConfig([
	globalIgnores(["dist"]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
		],
		plugins: {
			"no-comments": noComments,
		},
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		rules: {
			"no-comments/disallowComments": "error",
			"max-params": ["error", 2],
			"max-lines-per-function": [
				"error",
				{ max: 50, skipBlankLines: true, skipComments: true },
			],
			"max-lines": [
				"error",
				{ max: 250, skipBlankLines: true, skipComments: true },
			],
			"@typescript-eslint/no-magic-numbers": [
				"error",
				{
					ignore: [-1, 0, 1],
					ignoreArrayIndexes: true,
					ignoreDefaultValues: true,
					ignoreClassFieldInitialValues: true,
					ignoreEnums: true,
					ignoreNumericLiteralTypes: true,
					ignoreReadonlyClassProperties: true,
					ignoreTypeIndexes: true,
				},
			],
		},
	},
	{
		files: ["src/shared/components/ui/**/*.{ts,tsx}", "src/shared/components/theme-provider.tsx"],
		rules: {
			"no-comments/disallowComments": "off",
			"max-lines": "off",
			"max-lines-per-function": "off",
			"max-params": "off",
			"@typescript-eslint/no-magic-numbers": "off",
			"react-refresh/only-export-components": "off",
		},
	},
])
