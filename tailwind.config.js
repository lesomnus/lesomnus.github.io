/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		// Or if using `src` directory:
		"./data/**/*.mdx",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./mdx-components.tsx",
	],
	theme: {
		extend: {},
	},
	plugins: [],
}

