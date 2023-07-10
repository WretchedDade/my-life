import fs from "fs";

import resolveConfig from "tailwindcss/resolveConfig.js";
import { Config } from "tailwindcss/types/config";
import tailwindConfig from "../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig as unknown as Config);

if (fullConfig?.theme?.colors) {
	const colors = ["blue", "green", "orange", "red", "purple"];

	fs.writeFileSync(
		"./src/ColorWays.ts",
		`
		export interface ColorWays {
			${getColorWaysType(colors)}
		}
		
		export type ColorWaysKey = keyof ColorWays;
		
		export interface ColorWay ${getColorWayType()}

		export const ColorWays: ColorWays = ${JSON.stringify(getColorWays(colors))};

		export function IsValidColorWay(color: string) {
			return Object.keys(ColorWays).includes(color);
		}
		
		export function GetColorWay(color: string) {
			if (IsValidColorWay(color)) {
				return ColorWays[color as keyof ColorWays];
			}
		
			return ColorWays.${colors[0]};
		}
		`,
	);
}

function getColorWaysType(colors: string[]) {
	return colors.map((color) => `${color}: ColorWay`).join(",");
}

function getColorWays(colors: string[]) {
	return Object.fromEntries(colors.map((color) => [color, getColorWay(color)]));
}

function getColorWay(color: string) {
	return {
		color: `${color}`,

		card: {
			root: `shadow-${color}-100 divide-${color}-600`,
			header: `border-${color}-600 bg-${color}-100`,
			title: `text-${color}-900`,
			description: `text-${color}-600`,
			footer: `border-${color}-600 border-t p-3 px-6`,
			icon: `text-${color}-600 ring-${color}-600`,
		},

		logo: `text-${color}-500`,

		nav: `hover:text-${color}-500 hover:bg-${color}-100 group-hover:text-${color}-500 focus-visible:outline-${color}-500`,
		activeNav: `text-${color}-500 hover:text-${color}-700 group-hover:text-${color}-700 bg-${color}-100`,

		actions: {
			primary: `bg-${color}-600 hover:bg-${color}-700 focus-visible:outline-${color}-700 text-white disabled:opacity-50 disabled:cursor-not-allowed`,
			secondary: `border-2 enabled:hover:bg-${color}-100 focus-visible:outline-${color}-300 border-${color}-600 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed`,
		},

		table: {
			header: `bg-${color}-600 text-white`,
			row: "",
			evenRow: `bg-${color}-50`,
		},

		form: {
			control: `focus:ring-${color}-600`,
		},

		notification: {
			root: `bg-${color}-100 ring-${color}-600 text-${color}-600`,
			dismiss: `hover:bg-${color}-200 hover:text-${color}-600 focus:ring-${color}-600`,
			title: `text-${color}-900`,
		},

		tag: {
			root: `text-${color}-600 bg-${color}-600/20 ring-${color}-600`,
		},

		spinner: {
			primary: `text-${color}-600`,
			secondary: `white`,
		},
	};
}

function getColorWayType() {
	return `{
		color: keyof ColorWays,

		card: {
			root: string,
			header: string,
			title: string,
			description: string,
			footer: string,
			icon: string,
		},

		logo: string,

		nav: string,
		activeNav: string,

		actions: {
			primary: string,
			secondary: string,
		},

		table: {
			header: string,
			row: "",
			evenRow: string,
		},

		form: {
			control: string,
		},

		notification: {
			root: string,
			dismiss: string,
			title: string,
		},

		tag: {
			root: string,
		},

		spinner: {
			primary: string,
			secondary: string,
		}
	}`;
}