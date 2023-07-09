export interface ColorWay {
	color: keyof ColorWays;

	card: {
		root: string;
		header: string;
		title: string;
		description: string;
		footer: string;
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
		row: string;
		oddRow: string;
	};

	form: {
		control: string;
	};
}

export interface ColorWays {
	blue: ColorWay;
	green: ColorWay;
	orange: ColorWay;
	red: ColorWay;
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
		},

		logo: "text-blue-500",

		nav: "hover:text-blue-500 hover:bg-blue-100 group-hover:text-blue-500 focus-visible:outline-blue-500",
		activeNav: "text-blue-500 hover:text-blue-700 group-hover:text-blue-700 bg-blue-100",

		actions: {
			primary: "bg-blue-600 hover:bg-blue-700 focus-visible:outline-blue-700 text-white",
			secondary:
				"border-2 enabled:hover:bg-blue-100 focus-visible:outline-blue-300 border-blue-600 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed",
		},

		table: {
			header: "bg-blue-600 text-white",
			row: "hover:bg-blue-100",
			oddRow: "bg-blue-50",
		},

		form: {
			control: "focus:ring-blue-600",
		},
	},
	green: {
		color: "green",

		card: {
			root: "shadow-green-100 divide-green-600",
			header: "border-green-600 bg-green-100",
			title: "text-green-900",
			description: "text-green-600",
			footer: "border-green-600 border-t p-3 px-6",
		},

		logo: "text-green-500",

		nav: "hover:text-green-500 hover:bg-green-100 group-hover:text-green-500 focus-visible:outline-green-500",
		activeNav: "text-green-500 hover:text-green-700 group-hover:text-green-700 bg-green-100",

		actions: {
			primary: "bg-green-600 hover:bg-green-700 focus-visible:outline-green-700 text-white",
			secondary:
				"border-2 enabled:hover:bg-green-100 focus-visible:outline-green-300 border-green-600 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed",
		},

		table: {
			header: "bg-green-600 text-white",
			row: "hover:bg-green-100",
			oddRow: "bg-green-50",
		},

		form: {
			control: "focus:ring-green-600",
		},
	},
	orange: {
		color: "orange",

		card: {
			root: "shadow-orange-100 divide-orange-600",
			header: "border-orange-600 bg-orange-100",
			title: "text-orange-900",
			description: "text-orange-600",
			footer: "border-orange-600 border-t p-3 px-6",
		},

		logo: "text-orange-500",

		nav: "hover:text-orange-500 hover:bg-orange-100 group-hover:text-orange-500 focus-visible:outline-orange-500",
		activeNav: "text-orange-500 hover:text-orange-700 group-hover:text-orange-700 bg-orange-100",

		actions: {
			primary: "bg-orange-600 hover:bg-orange-700 focus-visible:outline-orange-700 text-white",
			secondary:
				"border-2 enabled:hover:bg-orange-100 focus-visible:outline-orange-300 border-orange-600 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed",
		},

		table: {
			header: "bg-orange-600 text-white",
			row: "hover:bg-orange-100",
			oddRow: "bg-orange-50",
		},

		form: {
			control: "focus:ring-orange-600",
		},
	},
	red: {
		color: "red",

		card: {
			root: "shadow-red-100 divide-red-600",
			header: "border-red-600 bg-red-100",
			title: "text-red-900",
			description: "text-red-600",
			footer: "border-red-600 border-t p-3 px-6",
		},

		logo: "text-red-500",

		nav: "hover:text-red-500 hover:bg-red-100 group-hover:text-red-500 focus-visible:outline-red-500",
		activeNav: "text-red-500 hover:text-red-700 group-hover:text-red-700 bg-red-100",

		actions: {
			primary: "bg-red-600 hover:bg-red-700 focus-visible:outline-red-700 text-white",
			secondary:
				"border-2 enabled:hover:bg-red-100 focus-visible:outline-red-300 border-red-600 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed",
		},

		table: {
			header: "bg-red-600 text-white",
			row: "hover:bg-red-100",
			oddRow: "bg-red-50",
		},

		form: {
			control: "focus:ring-red-600",
		},
	},
};
