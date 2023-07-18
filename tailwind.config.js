/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/utils/styles.ts"],
	darkMode: "class",
	theme: {
		extend: {},
	},
	plugins: ["@tailwindcss/typography", "@tailwindcss/forms"],
};
