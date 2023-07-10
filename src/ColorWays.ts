export interface ColorWays {
	blue: ColorWay;
	green: ColorWay;
	orange: ColorWay;
	red: ColorWay;
	purple: ColorWay;
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
}

export const ColorWays: ColorWays = {
	blue: {
		color: "blue",
		card: {
			root: "shadow-blue-100 divide-blue-600",
			header: "border-blue-600 bg-blue-100",
			title: "text-blue-900",
			description: "text-blue-600",
			footer: "border-blue-600 border-t p-3 px-6",
			icon: "text-blue-600 ring-blue-600",
		},
		logo: "text-blue-500",
		nav: "hover:text-blue-500 hover:bg-blue-100 group-hover:text-blue-500 focus-visible:outline-blue-500",
		activeNav: "text-blue-500 hover:text-blue-700 group-hover:text-blue-700 bg-blue-100",
		actions: {
			primary: "bg-blue-600 hover:bg-blue-700 focus-visible:outline-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed",
			secondary:
				"border-2 enabled:hover:bg-blue-100 focus-visible:outline-blue-300 border-blue-600 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed",
		},
		table: { header: "bg-blue-600 text-white", row: "", evenRow: "bg-blue-50" },
		form: { control: "focus:ring-blue-600" },
		notification: {
			root: "bg-blue-100 ring-blue-600 text-blue-600",
			dismiss: "hover:bg-blue-200 hover:text-blue-600 focus:ring-blue-600",
			title: "text-blue-900",
		},
		tag: { root: "text-blue-600 bg-blue-600/20 ring-blue-600" },
		spinner: { primary: "text-blue-600", secondary: "white" },
	},
	green: {
		color: "green",
		card: {
			root: "shadow-green-100 divide-green-600",
			header: "border-green-600 bg-green-100",
			title: "text-green-900",
			description: "text-green-600",
			footer: "border-green-600 border-t p-3 px-6",
			icon: "text-green-600 ring-green-600",
		},
		logo: "text-green-500",
		nav: "hover:text-green-500 hover:bg-green-100 group-hover:text-green-500 focus-visible:outline-green-500",
		activeNav: "text-green-500 hover:text-green-700 group-hover:text-green-700 bg-green-100",
		actions: {
			primary: "bg-green-600 hover:bg-green-700 focus-visible:outline-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed",
			secondary:
				"border-2 enabled:hover:bg-green-100 focus-visible:outline-green-300 border-green-600 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed",
		},
		table: { header: "bg-green-600 text-white", row: "", evenRow: "bg-green-50" },
		form: { control: "focus:ring-green-600" },
		notification: {
			root: "bg-green-100 ring-green-600 text-green-600",
			dismiss: "hover:bg-green-200 hover:text-green-600 focus:ring-green-600",
			title: "text-green-900",
		},
		tag: { root: "text-green-600 bg-green-600/20 ring-green-600" },
		spinner: { primary: "text-green-600", secondary: "white" },
	},
	orange: {
		color: "orange",
		card: {
			root: "shadow-orange-100 divide-orange-600",
			header: "border-orange-600 bg-orange-100",
			title: "text-orange-900",
			description: "text-orange-600",
			footer: "border-orange-600 border-t p-3 px-6",
			icon: "text-orange-600 ring-orange-600",
		},
		logo: "text-orange-500",
		nav: "hover:text-orange-500 hover:bg-orange-100 group-hover:text-orange-500 focus-visible:outline-orange-500",
		activeNav: "text-orange-500 hover:text-orange-700 group-hover:text-orange-700 bg-orange-100",
		actions: {
			primary: "bg-orange-600 hover:bg-orange-700 focus-visible:outline-orange-700 text-white disabled:opacity-50 disabled:cursor-not-allowed",
			secondary:
				"border-2 enabled:hover:bg-orange-100 focus-visible:outline-orange-300 border-orange-600 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed",
		},
		table: { header: "bg-orange-600 text-white", row: "", evenRow: "bg-orange-50" },
		form: { control: "focus:ring-orange-600" },
		notification: {
			root: "bg-orange-100 ring-orange-600 text-orange-600",
			dismiss: "hover:bg-orange-200 hover:text-orange-600 focus:ring-orange-600",
			title: "text-orange-900",
		},
		tag: { root: "text-orange-600 bg-orange-600/20 ring-orange-600" },
		spinner: { primary: "text-orange-600", secondary: "white" },
	},
	red: {
		color: "red",
		card: {
			root: "shadow-red-100 divide-red-600",
			header: "border-red-600 bg-red-100",
			title: "text-red-900",
			description: "text-red-600",
			footer: "border-red-600 border-t p-3 px-6",
			icon: "text-red-600 ring-red-600",
		},
		logo: "text-red-500",
		nav: "hover:text-red-500 hover:bg-red-100 group-hover:text-red-500 focus-visible:outline-red-500",
		activeNav: "text-red-500 hover:text-red-700 group-hover:text-red-700 bg-red-100",
		actions: {
			primary: "bg-red-600 hover:bg-red-700 focus-visible:outline-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed",
			secondary:
				"border-2 enabled:hover:bg-red-100 focus-visible:outline-red-300 border-red-600 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed",
		},
		table: { header: "bg-red-600 text-white", row: "", evenRow: "bg-red-50" },
		form: { control: "focus:ring-red-600" },
		notification: {
			root: "bg-red-100 ring-red-600 text-red-600",
			dismiss: "hover:bg-red-200 hover:text-red-600 focus:ring-red-600",
			title: "text-red-900",
		},
		tag: { root: "text-red-600 bg-red-600/20 ring-red-600" },
		spinner: { primary: "text-red-600", secondary: "white" },
	},
	purple: {
		color: "purple",
		card: {
			root: "shadow-purple-100 divide-purple-600",
			header: "border-purple-600 bg-purple-100",
			title: "text-purple-900",
			description: "text-purple-600",
			footer: "border-purple-600 border-t p-3 px-6",
			icon: "text-purple-600 ring-purple-600",
		},
		logo: "text-purple-500",
		nav: "hover:text-purple-500 hover:bg-purple-100 group-hover:text-purple-500 focus-visible:outline-purple-500",
		activeNav: "text-purple-500 hover:text-purple-700 group-hover:text-purple-700 bg-purple-100",
		actions: {
			primary: "bg-purple-600 hover:bg-purple-700 focus-visible:outline-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed",
			secondary:
				"border-2 enabled:hover:bg-purple-100 focus-visible:outline-purple-300 border-purple-600 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed",
		},
		table: { header: "bg-purple-600 text-white", row: "", evenRow: "bg-purple-50" },
		form: { control: "focus:ring-purple-600" },
		notification: {
			root: "bg-purple-100 ring-purple-600 text-purple-600",
			dismiss: "hover:bg-purple-200 hover:text-purple-600 focus:ring-purple-600",
			title: "text-purple-900",
		},
		tag: { root: "text-purple-600 bg-purple-600/20 ring-purple-600" },
		spinner: { primary: "text-purple-600", secondary: "white" },
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
