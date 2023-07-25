import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/utils/styles.ts"],
	darkMode: "class",
	theme: {
		extend: {},
	},
	plugins: [typography, forms],
};
