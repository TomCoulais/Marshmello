/** @type {import('prettier').Config} */
export default {
	trailingComma: 'all',
	semi: false,
	singleQuote: false,
	useTabs: false,
	quoteProps: 'consistent',
	bracketSpacing: false,
	arrowParens: 'always',
	printWidth: 100,
	plugins: ['prettier-plugin-packagejson'],
};
