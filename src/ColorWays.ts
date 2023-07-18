export interface ColorWays {
	blue: ColorWay;
	green: ColorWay;
	orange: ColorWay;
	red: ColorWay;
	purple: ColorWay;
	slate: ColorWay;
	yellow: ColorWay;
}

export type ColorWaysKey = keyof ColorWays;

export interface ColorWay {
	color: keyof ColorWays;

	card: {
		root: string;
		header: string;
		title: string;
		description: string;
		footer: string;
		icon: string;
	};

	logo: string;

	nav: string;
	activeNav: string;

	actions: {
		primary: string;
		secondary: string;
	};

	table: {
		header: string;
		row: "";
		evenRow: string;
	};

	form: {
		control: string;
		input: string;
	};

	notification: {
		root: string;
		dismiss: string;
		title: string;
	};

	tag: {
		root: string;
	};

	spinner: {
		primary: string;
		secondary: string;
	};

	modal: {
		header: {
			root: string;
			dismiss: string;
			description: string;
		};
	};
}

export const ColorWays: ColorWays = {
	blue: {
		color: "blue",
		card: {
			root: "shadow-blue-200 divide-blue-600 dark:shadow-blue-950 dark:divide-blue-950}",
			header: "border-blue-600 bg-blue-100 dark:border-blue-950 dark:bg-blue-700",
			title: "text-blue-900",
			description: "text-blue-600",
			footer: "border-blue-600 border-t p-3 px-6",
			icon: "text-blue-600 ring-blue-600",
		},
		logo: "text-blue-500 dark:text-blue-300",
		nav: "hover:text-blue-500 hover:bg-blue-100 group-hover:text-blue-500 focus-visible:outline-blue-500 dark:hover:text-blue-600 dark:hover:bg-blue-200 dark:group-hover:text-blue-600 dark:focus-visible:outline-blue-700",
		activeNav:
			"text-blue-500 hover:text-blue-700 group-hover:text-blue-700 bg-blue-100 dark:text-blue-700 dark:hover:text-blue-600 dark:group-hover:text-blue-600 dark:bg-blue-300 dark:group-hover:bg-blue-200",
		actions: {
			primary:
				"bg-blue-600 hover:bg-blue-700 focus-visible:outline-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-900 dark:hover:bg-blue-950 dark:focus-visible:outline-blue-950 dark:text-gray-50 dark:disabled:opacity-75",
			secondary:
				"border-2 enabled:hover:bg-blue-100 focus-visible:outline-blue-300 border-blue-600 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed dark:text-blue-600 dark:enabled:hover:bg-blue-900 dark:focus-visible:outline-blue-900 dark:border-blue-900 dark:text-blue-300",
		},
		table: { header: "bg-blue-600 text-white dark:bg-blue-900 dark:text-gray-50", row: "", evenRow: "bg-blue-50" },
		form: { control: "focus:ring-blue-600", input: "ring-blue-300 focus:ring-blue-500 placeholder:text-gray-300" },
		notification: {
			root: "bg-blue-100 ring-blue-600 text-blue-600",
			dismiss: "hover:bg-blue-200 hover:text-blue-600 focus:ring-blue-600",
			title: "text-blue-900",
		},
		tag: { root: "text-blue-600 bg-blue-600/20 ring-blue-600 dark:text-blue-300 dark:bg-blue-900/20 dark:ring-blue-900" },
		spinner: { primary: "text-blue-600", secondary: "white" },
		modal: { header: { root: "bg-blue-700 text-white", dismiss: "bg-blue-700 text-blue-200 hover:text-white", description: "text-blue-200" } },
	},
	green: {
		color: "green",
		card: {
			root: "shadow-green-200 divide-green-600 dark:shadow-green-950 dark:divide-green-950}",
			header: "border-green-600 bg-green-100 dark:border-green-950 dark:bg-green-700",
			title: "text-green-900",
			description: "text-green-600",
			footer: "border-green-600 border-t p-3 px-6",
			icon: "text-green-600 ring-green-600",
		},
		logo: "text-green-500 dark:text-green-300",
		nav: "hover:text-green-500 hover:bg-green-100 group-hover:text-green-500 focus-visible:outline-green-500 dark:hover:text-green-600 dark:hover:bg-green-200 dark:group-hover:text-green-600 dark:focus-visible:outline-green-700",
		activeNav:
			"text-green-500 hover:text-green-700 group-hover:text-green-700 bg-green-100 dark:text-green-700 dark:hover:text-green-600 dark:group-hover:text-green-600 dark:bg-green-300 dark:group-hover:bg-green-200",
		actions: {
			primary:
				"bg-green-600 hover:bg-green-700 focus-visible:outline-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed dark:bg-green-900 dark:hover:bg-green-950 dark:focus-visible:outline-green-950 dark:text-gray-50 dark:disabled:opacity-75",
			secondary:
				"border-2 enabled:hover:bg-green-100 focus-visible:outline-green-300 border-green-600 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed dark:text-green-600 dark:enabled:hover:bg-green-900 dark:focus-visible:outline-green-900 dark:border-green-900 dark:text-green-300",
		},
		table: { header: "bg-green-600 text-white dark:bg-green-900 dark:text-gray-50", row: "", evenRow: "bg-green-50" },
		form: { control: "focus:ring-green-600", input: "ring-green-300 focus:ring-green-500 placeholder:text-gray-300" },
		notification: {
			root: "bg-green-100 ring-green-600 text-green-600",
			dismiss: "hover:bg-green-200 hover:text-green-600 focus:ring-green-600",
			title: "text-green-900",
		},
		tag: { root: "text-green-600 bg-green-600/20 ring-green-600 dark:text-green-300 dark:bg-green-900/20 dark:ring-green-900" },
		spinner: { primary: "text-green-600", secondary: "white" },
		modal: { header: { root: "bg-green-700 text-white", dismiss: "bg-green-700 text-green-200 hover:text-white", description: "text-green-200" } },
	},
	orange: {
		color: "orange",
		card: {
			root: "shadow-orange-200 divide-orange-600 dark:shadow-orange-950 dark:divide-orange-950}",
			header: "border-orange-600 bg-orange-100 dark:border-orange-950 dark:bg-orange-700",
			title: "text-orange-900",
			description: "text-orange-600",
			footer: "border-orange-600 border-t p-3 px-6",
			icon: "text-orange-600 ring-orange-600",
		},
		logo: "text-orange-500 dark:text-orange-300",
		nav: "hover:text-orange-500 hover:bg-orange-100 group-hover:text-orange-500 focus-visible:outline-orange-500 dark:hover:text-orange-600 dark:hover:bg-orange-200 dark:group-hover:text-orange-600 dark:focus-visible:outline-orange-700",
		activeNav:
			"text-orange-500 hover:text-orange-700 group-hover:text-orange-700 bg-orange-100 dark:text-orange-700 dark:hover:text-orange-600 dark:group-hover:text-orange-600 dark:bg-orange-300 dark:group-hover:bg-orange-200",
		actions: {
			primary:
				"bg-orange-600 hover:bg-orange-700 focus-visible:outline-orange-700 text-white disabled:opacity-50 disabled:cursor-not-allowed dark:bg-orange-900 dark:hover:bg-orange-950 dark:focus-visible:outline-orange-950 dark:text-gray-50 dark:disabled:opacity-75",
			secondary:
				"border-2 enabled:hover:bg-orange-100 focus-visible:outline-orange-300 border-orange-600 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed dark:text-orange-600 dark:enabled:hover:bg-orange-900 dark:focus-visible:outline-orange-900 dark:border-orange-900 dark:text-orange-300",
		},
		table: { header: "bg-orange-600 text-white dark:bg-orange-900 dark:text-gray-50", row: "", evenRow: "bg-orange-50" },
		form: { control: "focus:ring-orange-600", input: "ring-orange-300 focus:ring-orange-500 placeholder:text-gray-300" },
		notification: {
			root: "bg-orange-100 ring-orange-600 text-orange-600",
			dismiss: "hover:bg-orange-200 hover:text-orange-600 focus:ring-orange-600",
			title: "text-orange-900",
		},
		tag: { root: "text-orange-600 bg-orange-600/20 ring-orange-600 dark:text-orange-300 dark:bg-orange-900/20 dark:ring-orange-900" },
		spinner: { primary: "text-orange-600", secondary: "white" },
		modal: { header: { root: "bg-orange-700 text-white", dismiss: "bg-orange-700 text-orange-200 hover:text-white", description: "text-orange-200" } },
	},
	red: {
		color: "red",
		card: {
			root: "shadow-red-200 divide-red-600 dark:shadow-red-950 dark:divide-red-950}",
			header: "border-red-600 bg-red-100 dark:border-red-950 dark:bg-red-700",
			title: "text-red-900",
			description: "text-red-600",
			footer: "border-red-600 border-t p-3 px-6",
			icon: "text-red-600 ring-red-600",
		},
		logo: "text-red-500 dark:text-red-300",
		nav: "hover:text-red-500 hover:bg-red-100 group-hover:text-red-500 focus-visible:outline-red-500 dark:hover:text-red-600 dark:hover:bg-red-200 dark:group-hover:text-red-600 dark:focus-visible:outline-red-700",
		activeNav:
			"text-red-500 hover:text-red-700 group-hover:text-red-700 bg-red-100 dark:text-red-700 dark:hover:text-red-600 dark:group-hover:text-red-600 dark:bg-red-300 dark:group-hover:bg-red-200",
		actions: {
			primary:
				"bg-red-600 hover:bg-red-700 focus-visible:outline-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed dark:bg-red-900 dark:hover:bg-red-950 dark:focus-visible:outline-red-950 dark:text-gray-50 dark:disabled:opacity-75",
			secondary:
				"border-2 enabled:hover:bg-red-100 focus-visible:outline-red-300 border-red-600 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed dark:text-red-600 dark:enabled:hover:bg-red-900 dark:focus-visible:outline-red-900 dark:border-red-900 dark:text-red-300",
		},
		table: { header: "bg-red-600 text-white dark:bg-red-900 dark:text-gray-50", row: "", evenRow: "bg-red-50" },
		form: { control: "focus:ring-red-600", input: "ring-red-300 focus:ring-red-500 placeholder:text-gray-300" },
		notification: {
			root: "bg-red-100 ring-red-600 text-red-600",
			dismiss: "hover:bg-red-200 hover:text-red-600 focus:ring-red-600",
			title: "text-red-900",
		},
		tag: { root: "text-red-600 bg-red-600/20 ring-red-600 dark:text-red-300 dark:bg-red-900/20 dark:ring-red-900" },
		spinner: { primary: "text-red-600", secondary: "white" },
		modal: { header: { root: "bg-red-700 text-white", dismiss: "bg-red-700 text-red-200 hover:text-white", description: "text-red-200" } },
	},
	purple: {
		color: "purple",
		card: {
			root: "shadow-purple-200 divide-purple-600 dark:shadow-purple-950 dark:divide-purple-950}",
			header: "border-purple-600 bg-purple-100 dark:border-purple-950 dark:bg-purple-700",
			title: "text-purple-900",
			description: "text-purple-600",
			footer: "border-purple-600 border-t p-3 px-6",
			icon: "text-purple-600 ring-purple-600",
		},
		logo: "text-purple-500 dark:text-purple-300",
		nav: "hover:text-purple-500 hover:bg-purple-100 group-hover:text-purple-500 focus-visible:outline-purple-500 dark:hover:text-purple-600 dark:hover:bg-purple-200 dark:group-hover:text-purple-600 dark:focus-visible:outline-purple-700",
		activeNav:
			"text-purple-500 hover:text-purple-700 group-hover:text-purple-700 bg-purple-100 dark:text-purple-700 dark:hover:text-purple-600 dark:group-hover:text-purple-600 dark:bg-purple-300 dark:group-hover:bg-purple-200",
		actions: {
			primary:
				"bg-purple-600 hover:bg-purple-700 focus-visible:outline-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed dark:bg-purple-900 dark:hover:bg-purple-950 dark:focus-visible:outline-purple-950 dark:text-gray-50 dark:disabled:opacity-75",
			secondary:
				"border-2 enabled:hover:bg-purple-100 focus-visible:outline-purple-300 border-purple-600 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed dark:text-purple-600 dark:enabled:hover:bg-purple-900 dark:focus-visible:outline-purple-900 dark:border-purple-900 dark:text-purple-300",
		},
		table: { header: "bg-purple-600 text-white dark:bg-purple-900 dark:text-gray-50", row: "", evenRow: "bg-purple-50" },
		form: { control: "focus:ring-purple-600", input: "ring-purple-300 focus:ring-purple-500 placeholder:text-gray-300" },
		notification: {
			root: "bg-purple-100 ring-purple-600 text-purple-600",
			dismiss: "hover:bg-purple-200 hover:text-purple-600 focus:ring-purple-600",
			title: "text-purple-900",
		},
		tag: { root: "text-purple-600 bg-purple-600/20 ring-purple-600 dark:text-purple-300 dark:bg-purple-900/20 dark:ring-purple-900" },
		spinner: { primary: "text-purple-600", secondary: "white" },
		modal: { header: { root: "bg-purple-700 text-white", dismiss: "bg-purple-700 text-purple-200 hover:text-white", description: "text-purple-200" } },
	},
	slate: {
		color: "slate",
		card: {
			root: "shadow-slate-200 divide-slate-600 dark:shadow-slate-950 dark:divide-slate-950}",
			header: "border-slate-600 bg-slate-100 dark:border-slate-950 dark:bg-slate-700",
			title: "text-slate-900",
			description: "text-slate-600",
			footer: "border-slate-600 border-t p-3 px-6",
			icon: "text-slate-600 ring-slate-600",
		},
		logo: "text-slate-500 dark:text-slate-300",
		nav: "hover:text-slate-500 hover:bg-slate-100 group-hover:text-slate-500 focus-visible:outline-slate-500 dark:hover:text-slate-600 dark:hover:bg-slate-200 dark:group-hover:text-slate-600 dark:focus-visible:outline-slate-700",
		activeNav:
			"text-slate-500 hover:text-slate-700 group-hover:text-slate-700 bg-slate-100 dark:text-slate-700 dark:hover:text-slate-600 dark:group-hover:text-slate-600 dark:bg-slate-300 dark:group-hover:bg-slate-200",
		actions: {
			primary:
				"bg-slate-600 hover:bg-slate-700 focus-visible:outline-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-900 dark:hover:bg-slate-950 dark:focus-visible:outline-slate-950 dark:text-gray-50 dark:disabled:opacity-75",
			secondary:
				"border-2 enabled:hover:bg-slate-100 focus-visible:outline-slate-300 border-slate-600 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed dark:text-slate-600 dark:enabled:hover:bg-slate-900 dark:focus-visible:outline-slate-900 dark:border-slate-900 dark:text-slate-300",
		},
		table: { header: "bg-slate-600 text-white dark:bg-slate-900 dark:text-gray-50", row: "", evenRow: "bg-slate-50" },
		form: { control: "focus:ring-slate-600", input: "ring-slate-300 focus:ring-slate-500 placeholder:text-gray-300" },
		notification: {
			root: "bg-slate-100 ring-slate-600 text-slate-600",
			dismiss: "hover:bg-slate-200 hover:text-slate-600 focus:ring-slate-600",
			title: "text-slate-900",
		},
		tag: { root: "text-slate-600 bg-slate-600/20 ring-slate-600 dark:text-slate-300 dark:bg-slate-900/20 dark:ring-slate-900" },
		spinner: { primary: "text-slate-600", secondary: "white" },
		modal: { header: { root: "bg-slate-700 text-white", dismiss: "bg-slate-700 text-slate-200 hover:text-white", description: "text-slate-200" } },
	},
	yellow: {
		color: "yellow",
		card: {
			root: "shadow-yellow-200 divide-yellow-600 dark:shadow-yellow-950 dark:divide-yellow-950}",
			header: "border-yellow-600 bg-yellow-100 dark:border-yellow-950 dark:bg-yellow-700",
			title: "text-yellow-900",
			description: "text-yellow-600",
			footer: "border-yellow-600 border-t p-3 px-6",
			icon: "text-yellow-600 ring-yellow-600",
		},
		logo: "text-yellow-500 dark:text-yellow-300",
		nav: "hover:text-yellow-500 hover:bg-yellow-100 group-hover:text-yellow-500 focus-visible:outline-yellow-500 dark:hover:text-yellow-600 dark:hover:bg-yellow-200 dark:group-hover:text-yellow-600 dark:focus-visible:outline-yellow-700",
		activeNav:
			"text-yellow-500 hover:text-yellow-700 group-hover:text-yellow-700 bg-yellow-100 dark:text-yellow-700 dark:hover:text-yellow-600 dark:group-hover:text-yellow-600 dark:bg-yellow-300 dark:group-hover:bg-yellow-200",
		actions: {
			primary:
				"bg-yellow-600 hover:bg-yellow-700 focus-visible:outline-yellow-700 text-white disabled:opacity-50 disabled:cursor-not-allowed dark:bg-yellow-900 dark:hover:bg-yellow-950 dark:focus-visible:outline-yellow-950 dark:text-gray-50 dark:disabled:opacity-75",
			secondary:
				"border-2 enabled:hover:bg-yellow-100 focus-visible:outline-yellow-300 border-yellow-600 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed dark:text-yellow-600 dark:enabled:hover:bg-yellow-900 dark:focus-visible:outline-yellow-900 dark:border-yellow-900 dark:text-yellow-300",
		},
		table: { header: "bg-yellow-600 text-white dark:bg-yellow-900 dark:text-gray-50", row: "", evenRow: "bg-yellow-50" },
		form: { control: "focus:ring-yellow-600", input: "ring-yellow-300 focus:ring-yellow-500 placeholder:text-gray-300" },
		notification: {
			root: "bg-yellow-100 ring-yellow-600 text-yellow-600",
			dismiss: "hover:bg-yellow-200 hover:text-yellow-600 focus:ring-yellow-600",
			title: "text-yellow-900",
		},
		tag: { root: "text-yellow-600 bg-yellow-600/20 ring-yellow-600 dark:text-yellow-300 dark:bg-yellow-900/20 dark:ring-yellow-900" },
		spinner: { primary: "text-yellow-600", secondary: "white" },
		modal: { header: { root: "bg-yellow-700 text-white", dismiss: "bg-yellow-700 text-yellow-200 hover:text-white", description: "text-yellow-200" } },
	},
};

export function IsValidColorWay(color: string) {
	return Object.keys(ColorWays).includes(color);
}

export function GetColorWay(color: string) {
	if (IsValidColorWay(color)) {
		return ColorWays[color as keyof ColorWays];
	}

	return ColorWays.blue;
}
