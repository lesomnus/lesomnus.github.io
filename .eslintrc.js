/** @type {import('eslint').Linter.Config} */
module.exports = {
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json'],
	},
	plugins: [
		'@typescript-eslint',
	],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:@typescript-eslint/strict',
		'next/core-web-vitals',
	],
	rules: {
		'semi': ['warn', 'never'],
		'comma-dangle': ['warn', 'always-multiline'],
		'quotes': ['warn', 'single'],
		'object-curly-spacing': ['warn', 'always'],
		'block-spacing': ['warn', 'always'],
		'comma-spacing': ['warn', { 'before': false, 'after': true }],
		'arrow-spacing': ['warn', { 'before': true, 'after': true }],
		'no-sequences': 'off',

		'@typescript-eslint/indent': ['warn', 'tab'],
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-floating-promises': 'off',
		'@typescript-eslint/no-unnecessary-condition': ['warn', {
			allowConstantLoopConditions: true,
		}],
		'@typescript-eslint/no-misused-promises': ['error', {
			checksVoidReturn: false,
		}],
	},
}
