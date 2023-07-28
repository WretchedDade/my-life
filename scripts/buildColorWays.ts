import fs from "fs";

import resolveConfig from "tailwindcss/resolveConfig.js";
import { Config } from "tailwindcss/types/config";
import tailwindConfig from "../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig as unknown as Config);

if (fullConfig?.theme?.colors) {
	const colors = ["blue", "green", "orange", "red", "purple", "slate", "yellow", "sky"];

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

		text: {
			accent: `text-${color}-600 dark:text-${color}-300`,
		},

		card: {
			root: `shadow-${color}-200 divide-${color}-600 dark:shadow-${color}-950 dark:divide-${color}-950}`,
			bordered: `border-2 border-${color}-600 dark:border-${color}-900`,
			header: `border-${color}-600 bg-${color}-200 dark:border-${color}-950 dark:bg-${color}-800`,
			title: `text-${color}-900`,
			description: `text-${color}-600`,
			footer: `border-${color}-600 border-t p-3 px-6`,
			icon: `text-${color}-600 ring-${color}-600`,
		},

		logo: `text-${color}-500 dark:text-${color}-300`,

		navigation: {
			item:
				/* Base */ `group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700 ` +
				/* Color Specific */ `hover:text-${color}-700 hover:bg-${color}-100 group-hover:text-${color}-500 focus-visible:outline-${color}-500 ` +
				/* Dark Mode */ `dark:text-gray-50 dark:hover:bg-${color}-900 dark:group-hover:text-${color}-600 dark:focus-visible:outline-${color}-700`,

			childItem: `border-l-2 border-${color}-50 pl-8 rounded-none dark:border-${color}-800 dark:hover:border-${color}-900 dark:border-l-4`,

			openItem: `bg-${color}-100 rounded-t-md rounded-b-none dark:bg-${color}-900 `,
			openItemBody: `bg-${color}-50 dark:bg-${color}-800`,

			activeRootItem: `text-${color}-900 border-b-2 rounded-b-none border-${color}-700 pb-1 bg-${color}-50 dark:bg-${color}-900 dark:border-${color}-800`,
			activeChildItem: `text-${color}-900 border-${color}-700 bg-${color}-50 dark:bg-${color}-800 dark:border-${color}-950 dark:hover:border-${color}-950`,
		},

		actions: {
			primary:
				`bg-${color}-600 hover:bg-${color}-700 focus-visible:outline-${color}-700 text-white disabled:opacity-50 disabled:cursor-not-allowed ` +
				`dark:bg-${color}-900 dark:hover:bg-${color}-950 dark:focus-visible:outline-${color}-950 dark:text-gray-50 dark:disabled:opacity-75`,

			secondary:
				`border enabled:hover:bg-${color}-200 focus-visible:outline-${color}-900 border-${color}-600 text-${color}-900 disabled:opacity-50 disabled:cursor-not-allowed dark:text-${color}-600 ` +
				`dark:enabled:hover:bg-${color}-900 dark:focus-visible:outline-${color}-900 dark:border-${color}-900 dark:text-${color}-300`,
		},

		textAction: {
			root: `border-b border-transparent hover:border-${color}-600`,
			active: `border-${color}-600 text-${color}-600`,
		},

		table: {
			header: `bg-${color}-600 text-white dark:bg-${color}-700 dark:text-gray-50`,
			evenRow: `bg-${color}-50 dark:bg-zinc-800`,
			bordered: `border-x border-${color}-600 dark:border-${color}-700`,
			special: `font-bold border-l-8 text-${color}-700 dark:text-gray-50`,
			summaryRow: `bg-${color}-200 text-gray-900 dark:bg-${color}-700 dark:text-gray-50`,
		},

		form: {
			control: `focus:ring-${color}-600`,

			input: `bg-white text-gray-900 ring-gray-300 focus:ring-${color}-600`,

			autoComplete: {
				options: `bg-white ring-black`,

				option: `text-gray-900`,
				activeOption: `bg-${color}-600 text-white`,

				optionIcon: `text-${color}-600`,
				activeOptionIcon: `text-white`,

				secondaryText: `text-gray-500`,
				activeSecondaryText: `text-${color}-200`,
			},
		},

		notification: {
			root: `bg-${color}-100 ring-${color}-700 text-${color}-600 shadow-${color}-700`,
			dismiss: `text-${color}-700 hover:bg-${color}-200 hover:text-${color}-600 focus:ring-${color}-600`,
			title: `text-${color}-900`,
		},

		tag: {
			normal: `text-${color}-600 bg-${color}-600/20 ring-${color}-600 dark:text-${color}-300 dark:bg-${color}-900/20 dark:ring-${color}-900`,
			solid: `bg-${color}-500 text-white ring-${color}-700 ring-2 dark:bg-${color}-700/50 dark:text-gray-50`,
			dimSolid: `bg-${color}-500/50 text-${color}-900 ring-${color}-700/50 ring-2 dark:bg-${color}-700/50 dark:text-gray-200`,
		},

		spinner: {
			primary: `text-${color}-600 dark:text-${color}-300`,
			secondary: `white`,
		},

		modal: {
			header: {
				root: `bg-${color}-700 text-white`,
				dismiss: `bg-${color}-700 text-${color}-200 hover:text-white`,
				description: `text-${color}-200`,
			},
		},
	};
}

function getColorWayType() {
	return `{
		color: keyof ColorWays,

		text: {
			accent: string,
		}

		card: {
			root: string,
			bordered: string,
			header: string,
			title: string,
			description: string,
			footer: string,
			icon: string,
		},

		logo: string,

		navigation: {
			item: string,
			childItem: string,
			openItem: string,
			openItemBody: string,
			activeRootItem: string,
			activeChildItem: string,
		}

		actions: {
			primary: string,
			secondary: string
		},

		textAction:{
			root: string,
			active: string,
		},

		table: {
			header: string,
			evenRow: string,
			bordered: string,
			special: string,
			summaryRow: string,
		},

		form: {
			control: string,
			input: string,

			autoComplete: {
				options: string,

				option: string,
				activeOption: string,

				optionIcon: string,
				activeOptionIcon: string,

				secondaryText: string,
				activeSecondaryText: string
			},
		},

		notification: {
			root: string,
			dismiss: string,
			title: string,
		},

		tag: {
			normal: string;
			solid: string;
			dimSolid: string;
		},

		spinner: {
			primary: string,
			secondary: string,
		},

		modal: {
			header: {
				root: string,
				dismiss: string,
				description: string,
			},
		}
	}`;
}
