export interface ColorWays {
	blue: ColorWay;
	green: ColorWay;
	orange: ColorWay;
	red: ColorWay;
	purple: ColorWay;
	slate: ColorWay;
	yellow: ColorWay;
	sky: ColorWay;
}

export type ColorWaysKey = keyof ColorWays;

export interface ColorWay {
	color: keyof ColorWays;

	card: {
		root: string;
		bordered: string;
		header: string;
		title: string;
		description: string;
		footer: string;
		icon: string;
	};

	logo: string;

	navigation: {
		item: string;
		childItem: string;
		openItem: string;
		openItemBody: string;
		activeRootItem: string;
		activeChildItem: string;
	};

	actions: {
		primary: string;
		secondary: string;
	};

	textAction: {
		root: string;
		active: string;
	};

	table: {
		header: string;
		evenRow: string;
		bordered: string;
		special: string;
		summaryRow: string;
	};

	form: {
		control: string;
		input: string;

		autoComplete: {
			options: string;

			option: string;
			activeOption: string;

			optionIcon: string;
			activeOptionIcon: string;

			secondaryText: string;
			activeSecondaryText: string;
		};
	};

	notification: {
		root: string;
		dismiss: string;
		title: string;
	};

	tag: {
		normal: string;
		solid: string;
		dimSolid: string;
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
			bordered: "border-2 border-blue-600 dark:border-blue-900",
			header: "border-blue-600 bg-blue-200 dark:border-blue-950 dark:bg-blue-800",
			title: "text-blue-900",
			description: "text-blue-600",
			footer: "border-blue-600 border-t p-3 px-6",
			icon: "text-blue-600 ring-blue-600",
		},
		logo: "text-blue-500 dark:text-blue-300",
		navigation: {
			item: "group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700 hover:text-blue-700 hover:bg-blue-100 group-hover:text-blue-500 focus-visible:outline-blue-500 dark:text-gray-50 dark:hover:bg-blue-900 dark:group-hover:text-blue-600 dark:focus-visible:outline-blue-700",
			childItem: "border-l-2 border-blue-50 pl-8 rounded-none dark:border-blue-800 dark:hover:border-blue-900 dark:border-l-4",
			openItem: "bg-blue-100 rounded-t-md rounded-b-none dark:bg-blue-900 ",
			openItemBody: "bg-blue-50 dark:bg-blue-800",
			activeRootItem: "text-blue-900 border-b-2 rounded-b-none border-blue-700 pb-1 bg-blue-50 dark:bg-blue-900 dark:border-blue-800",
			activeChildItem: "text-blue-900 border-blue-700 bg-blue-50 dark:bg-blue-800 dark:border-blue-950 dark:hover:border-blue-950",
		},
		actions: {
			primary:
				"bg-blue-600 hover:bg-blue-700 focus-visible:outline-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-900 dark:hover:bg-blue-950 dark:focus-visible:outline-blue-950 dark:text-gray-50 dark:disabled:opacity-75",
			secondary:
				"border enabled:hover:bg-blue-200 focus-visible:outline-blue-900 border-blue-600 text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed dark:text-blue-600 dark:enabled:hover:bg-blue-900 dark:focus-visible:outline-blue-900 dark:border-blue-900 dark:text-blue-300",
		},
		textAction: { root: "border-b border-transparent hover:border-blue-600 text-blue-600", active: "border-blue-600" },
		table: {
			header: "bg-blue-600 text-white dark:bg-blue-700 dark:text-gray-50",
			evenRow: "bg-blue-50 dark:bg-zinc-800",
			bordered: "border-x border-blue-600 dark:border-blue-700",
			special: "font-bold border-l-8 text-blue-700 dark:text-gray-50",
			summaryRow: "bg-blue-200 text-gray-900 dark:bg-blue-700 dark:text-gray-50",
		},
		form: {
			control: "focus:ring-blue-600",
			input: "bg-white text-gray-900 ring-gray-300 focus:ring-blue-600",
			autoComplete: {
				options: "bg-white ring-black",
				option: "text-gray-900",
				activeOption: "bg-blue-600 text-white",
				optionIcon: "text-blue-600",
				activeOptionIcon: "text-white",
				secondaryText: "text-gray-500",
				activeSecondaryText: "text-blue-200",
			},
		},
		notification: {
			root: "bg-blue-100 ring-blue-700 text-blue-600 shadow-blue-700",
			dismiss: "text-blue-700 hover:bg-blue-200 hover:text-blue-600 focus:ring-blue-600",
			title: "text-blue-900",
		},
		tag: {
			normal: "text-blue-600 bg-blue-600/20 ring-blue-600 dark:text-blue-300 dark:bg-blue-900/20 dark:ring-blue-900",
			solid: "bg-blue-500 text-white ring-blue-700 ring-2 dark:bg-blue-700/50 dark:text-gray-50",
			dimSolid: "bg-blue-500/50 text-blue-900 ring-blue-700/50 ring-2 dark:bg-blue-700/50 dark:text-gray-200",
		},
		spinner: { primary: "text-blue-600 dark:text-blue-300", secondary: "white" },
		modal: { header: { root: "bg-blue-700 text-white", dismiss: "bg-blue-700 text-blue-200 hover:text-white", description: "text-blue-200" } },
	},
	green: {
		color: "green",
		card: {
			root: "shadow-green-200 divide-green-600 dark:shadow-green-950 dark:divide-green-950}",
			bordered: "border-2 border-green-600 dark:border-green-900",
			header: "border-green-600 bg-green-200 dark:border-green-950 dark:bg-green-800",
			title: "text-green-900",
			description: "text-green-600",
			footer: "border-green-600 border-t p-3 px-6",
			icon: "text-green-600 ring-green-600",
		},
		logo: "text-green-500 dark:text-green-300",
		navigation: {
			item: "group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700 hover:text-green-700 hover:bg-green-100 group-hover:text-green-500 focus-visible:outline-green-500 dark:text-gray-50 dark:hover:bg-green-900 dark:group-hover:text-green-600 dark:focus-visible:outline-green-700",
			childItem: "border-l-2 border-green-50 pl-8 rounded-none dark:border-green-800 dark:hover:border-green-900 dark:border-l-4",
			openItem: "bg-green-100 rounded-t-md rounded-b-none dark:bg-green-900 ",
			openItemBody: "bg-green-50 dark:bg-green-800",
			activeRootItem: "text-green-900 border-b-2 rounded-b-none border-green-700 pb-1 bg-green-50 dark:bg-green-900 dark:border-green-800",
			activeChildItem: "text-green-900 border-green-700 bg-green-50 dark:bg-green-800 dark:border-green-950 dark:hover:border-green-950",
		},
		actions: {
			primary:
				"bg-green-600 hover:bg-green-700 focus-visible:outline-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed dark:bg-green-900 dark:hover:bg-green-950 dark:focus-visible:outline-green-950 dark:text-gray-50 dark:disabled:opacity-75",
			secondary:
				"border enabled:hover:bg-green-200 focus-visible:outline-green-900 border-green-600 text-green-900 disabled:opacity-50 disabled:cursor-not-allowed dark:text-green-600 dark:enabled:hover:bg-green-900 dark:focus-visible:outline-green-900 dark:border-green-900 dark:text-green-300",
		},
		textAction: { root: "border-b border-transparent hover:border-green-600 text-green-600", active: "border-green-600" },
		table: {
			header: "bg-green-600 text-white dark:bg-green-700 dark:text-gray-50",
			evenRow: "bg-green-50 dark:bg-zinc-800",
			bordered: "border-x border-green-600 dark:border-green-700",
			special: "font-bold border-l-8 text-green-700 dark:text-gray-50",
			summaryRow: "bg-green-200 text-gray-900 dark:bg-green-700 dark:text-gray-50",
		},
		form: {
			control: "focus:ring-green-600",
			input: "bg-white text-gray-900 ring-gray-300 focus:ring-green-600",
			autoComplete: {
				options: "bg-white ring-black",
				option: "text-gray-900",
				activeOption: "bg-green-600 text-white",
				optionIcon: "text-green-600",
				activeOptionIcon: "text-white",
				secondaryText: "text-gray-500",
				activeSecondaryText: "text-green-200",
			},
		},
		notification: {
			root: "bg-green-100 ring-green-700 text-green-600 shadow-green-700",
			dismiss: "text-green-700 hover:bg-green-200 hover:text-green-600 focus:ring-green-600",
			title: "text-green-900",
		},
		tag: {
			normal: "text-green-600 bg-green-600/20 ring-green-600 dark:text-green-300 dark:bg-green-900/20 dark:ring-green-900",
			solid: "bg-green-500 text-white ring-green-700 ring-2 dark:bg-green-700/50 dark:text-gray-50",
			dimSolid: "bg-green-500/50 text-green-900 ring-green-700/50 ring-2 dark:bg-green-700/50 dark:text-gray-200",
		},
		spinner: { primary: "text-green-600 dark:text-green-300", secondary: "white" },
		modal: { header: { root: "bg-green-700 text-white", dismiss: "bg-green-700 text-green-200 hover:text-white", description: "text-green-200" } },
	},
	orange: {
		color: "orange",
		card: {
			root: "shadow-orange-200 divide-orange-600 dark:shadow-orange-950 dark:divide-orange-950}",
			bordered: "border-2 border-orange-600 dark:border-orange-900",
			header: "border-orange-600 bg-orange-200 dark:border-orange-950 dark:bg-orange-800",
			title: "text-orange-900",
			description: "text-orange-600",
			footer: "border-orange-600 border-t p-3 px-6",
			icon: "text-orange-600 ring-orange-600",
		},
		logo: "text-orange-500 dark:text-orange-300",
		navigation: {
			item: "group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700 hover:text-orange-700 hover:bg-orange-100 group-hover:text-orange-500 focus-visible:outline-orange-500 dark:text-gray-50 dark:hover:bg-orange-900 dark:group-hover:text-orange-600 dark:focus-visible:outline-orange-700",
			childItem: "border-l-2 border-orange-50 pl-8 rounded-none dark:border-orange-800 dark:hover:border-orange-900 dark:border-l-4",
			openItem: "bg-orange-100 rounded-t-md rounded-b-none dark:bg-orange-900 ",
			openItemBody: "bg-orange-50 dark:bg-orange-800",
			activeRootItem: "text-orange-900 border-b-2 rounded-b-none border-orange-700 pb-1 bg-orange-50 dark:bg-orange-900 dark:border-orange-800",
			activeChildItem: "text-orange-900 border-orange-700 bg-orange-50 dark:bg-orange-800 dark:border-orange-950 dark:hover:border-orange-950",
		},
		actions: {
			primary:
				"bg-orange-600 hover:bg-orange-700 focus-visible:outline-orange-700 text-white disabled:opacity-50 disabled:cursor-not-allowed dark:bg-orange-900 dark:hover:bg-orange-950 dark:focus-visible:outline-orange-950 dark:text-gray-50 dark:disabled:opacity-75",
			secondary:
				"border enabled:hover:bg-orange-200 focus-visible:outline-orange-900 border-orange-600 text-orange-900 disabled:opacity-50 disabled:cursor-not-allowed dark:text-orange-600 dark:enabled:hover:bg-orange-900 dark:focus-visible:outline-orange-900 dark:border-orange-900 dark:text-orange-300",
		},
		textAction: { root: "border-b border-transparent hover:border-orange-600 text-orange-600", active: "border-orange-600" },
		table: {
			header: "bg-orange-600 text-white dark:bg-orange-700 dark:text-gray-50",
			evenRow: "bg-orange-50 dark:bg-zinc-800",
			bordered: "border-x border-orange-600 dark:border-orange-700",
			special: "font-bold border-l-8 text-orange-700 dark:text-gray-50",
			summaryRow: "bg-orange-200 text-gray-900 dark:bg-orange-700 dark:text-gray-50",
		},
		form: {
			control: "focus:ring-orange-600",
			input: "bg-white text-gray-900 ring-gray-300 focus:ring-orange-600",
			autoComplete: {
				options: "bg-white ring-black",
				option: "text-gray-900",
				activeOption: "bg-orange-600 text-white",
				optionIcon: "text-orange-600",
				activeOptionIcon: "text-white",
				secondaryText: "text-gray-500",
				activeSecondaryText: "text-orange-200",
			},
		},
		notification: {
			root: "bg-orange-100 ring-orange-700 text-orange-600 shadow-orange-700",
			dismiss: "text-orange-700 hover:bg-orange-200 hover:text-orange-600 focus:ring-orange-600",
			title: "text-orange-900",
		},
		tag: {
			normal: "text-orange-600 bg-orange-600/20 ring-orange-600 dark:text-orange-300 dark:bg-orange-900/20 dark:ring-orange-900",
			solid: "bg-orange-500 text-white ring-orange-700 ring-2 dark:bg-orange-700/50 dark:text-gray-50",
			dimSolid: "bg-orange-500/50 text-orange-900 ring-orange-700/50 ring-2 dark:bg-orange-700/50 dark:text-gray-200",
		},
		spinner: { primary: "text-orange-600 dark:text-orange-300", secondary: "white" },
		modal: { header: { root: "bg-orange-700 text-white", dismiss: "bg-orange-700 text-orange-200 hover:text-white", description: "text-orange-200" } },
	},
	red: {
		color: "red",
		card: {
			root: "shadow-red-200 divide-red-600 dark:shadow-red-950 dark:divide-red-950}",
			bordered: "border-2 border-red-600 dark:border-red-900",
			header: "border-red-600 bg-red-200 dark:border-red-950 dark:bg-red-800",
			title: "text-red-900",
			description: "text-red-600",
			footer: "border-red-600 border-t p-3 px-6",
			icon: "text-red-600 ring-red-600",
		},
		logo: "text-red-500 dark:text-red-300",
		navigation: {
			item: "group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700 hover:text-red-700 hover:bg-red-100 group-hover:text-red-500 focus-visible:outline-red-500 dark:text-gray-50 dark:hover:bg-red-900 dark:group-hover:text-red-600 dark:focus-visible:outline-red-700",
			childItem: "border-l-2 border-red-50 pl-8 rounded-none dark:border-red-800 dark:hover:border-red-900 dark:border-l-4",
			openItem: "bg-red-100 rounded-t-md rounded-b-none dark:bg-red-900 ",
			openItemBody: "bg-red-50 dark:bg-red-800",
			activeRootItem: "text-red-900 border-b-2 rounded-b-none border-red-700 pb-1 bg-red-50 dark:bg-red-900 dark:border-red-800",
			activeChildItem: "text-red-900 border-red-700 bg-red-50 dark:bg-red-800 dark:border-red-950 dark:hover:border-red-950",
		},
		actions: {
			primary:
				"bg-red-600 hover:bg-red-700 focus-visible:outline-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed dark:bg-red-900 dark:hover:bg-red-950 dark:focus-visible:outline-red-950 dark:text-gray-50 dark:disabled:opacity-75",
			secondary:
				"border enabled:hover:bg-red-200 focus-visible:outline-red-900 border-red-600 text-red-900 disabled:opacity-50 disabled:cursor-not-allowed dark:text-red-600 dark:enabled:hover:bg-red-900 dark:focus-visible:outline-red-900 dark:border-red-900 dark:text-red-300",
		},
		textAction: { root: "border-b border-transparent hover:border-red-600 text-red-600", active: "border-red-600" },
		table: {
			header: "bg-red-600 text-white dark:bg-red-700 dark:text-gray-50",
			evenRow: "bg-red-50 dark:bg-zinc-800",
			bordered: "border-x border-red-600 dark:border-red-700",
			special: "font-bold border-l-8 text-red-700 dark:text-gray-50",
			summaryRow: "bg-red-200 text-gray-900 dark:bg-red-700 dark:text-gray-50",
		},
		form: {
			control: "focus:ring-red-600",
			input: "bg-white text-gray-900 ring-gray-300 focus:ring-red-600",
			autoComplete: {
				options: "bg-white ring-black",
				option: "text-gray-900",
				activeOption: "bg-red-600 text-white",
				optionIcon: "text-red-600",
				activeOptionIcon: "text-white",
				secondaryText: "text-gray-500",
				activeSecondaryText: "text-red-200",
			},
		},
		notification: {
			root: "bg-red-100 ring-red-700 text-red-600 shadow-red-700",
			dismiss: "text-red-700 hover:bg-red-200 hover:text-red-600 focus:ring-red-600",
			title: "text-red-900",
		},
		tag: {
			normal: "text-red-600 bg-red-600/20 ring-red-600 dark:text-red-300 dark:bg-red-900/20 dark:ring-red-900",
			solid: "bg-red-500 text-white ring-red-700 ring-2 dark:bg-red-700/50 dark:text-gray-50",
			dimSolid: "bg-red-500/50 text-red-900 ring-red-700/50 ring-2 dark:bg-red-700/50 dark:text-gray-200",
		},
		spinner: { primary: "text-red-600 dark:text-red-300", secondary: "white" },
		modal: { header: { root: "bg-red-700 text-white", dismiss: "bg-red-700 text-red-200 hover:text-white", description: "text-red-200" } },
	},
	purple: {
		color: "purple",
		card: {
			root: "shadow-purple-200 divide-purple-600 dark:shadow-purple-950 dark:divide-purple-950}",
			bordered: "border-2 border-purple-600 dark:border-purple-900",
			header: "border-purple-600 bg-purple-200 dark:border-purple-950 dark:bg-purple-800",
			title: "text-purple-900",
			description: "text-purple-600",
			footer: "border-purple-600 border-t p-3 px-6",
			icon: "text-purple-600 ring-purple-600",
		},
		logo: "text-purple-500 dark:text-purple-300",
		navigation: {
			item: "group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700 hover:text-purple-700 hover:bg-purple-100 group-hover:text-purple-500 focus-visible:outline-purple-500 dark:text-gray-50 dark:hover:bg-purple-900 dark:group-hover:text-purple-600 dark:focus-visible:outline-purple-700",
			childItem: "border-l-2 border-purple-50 pl-8 rounded-none dark:border-purple-800 dark:hover:border-purple-900 dark:border-l-4",
			openItem: "bg-purple-100 rounded-t-md rounded-b-none dark:bg-purple-900 ",
			openItemBody: "bg-purple-50 dark:bg-purple-800",
			activeRootItem: "text-purple-900 border-b-2 rounded-b-none border-purple-700 pb-1 bg-purple-50 dark:bg-purple-900 dark:border-purple-800",
			activeChildItem: "text-purple-900 border-purple-700 bg-purple-50 dark:bg-purple-800 dark:border-purple-950 dark:hover:border-purple-950",
		},
		actions: {
			primary:
				"bg-purple-600 hover:bg-purple-700 focus-visible:outline-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed dark:bg-purple-900 dark:hover:bg-purple-950 dark:focus-visible:outline-purple-950 dark:text-gray-50 dark:disabled:opacity-75",
			secondary:
				"border enabled:hover:bg-purple-200 focus-visible:outline-purple-900 border-purple-600 text-purple-900 disabled:opacity-50 disabled:cursor-not-allowed dark:text-purple-600 dark:enabled:hover:bg-purple-900 dark:focus-visible:outline-purple-900 dark:border-purple-900 dark:text-purple-300",
		},
		textAction: { root: "border-b border-transparent hover:border-purple-600 text-purple-600", active: "border-purple-600" },
		table: {
			header: "bg-purple-600 text-white dark:bg-purple-700 dark:text-gray-50",
			evenRow: "bg-purple-50 dark:bg-zinc-800",
			bordered: "border-x border-purple-600 dark:border-purple-700",
			special: "font-bold border-l-8 text-purple-700 dark:text-gray-50",
			summaryRow: "bg-purple-200 text-gray-900 dark:bg-purple-700 dark:text-gray-50",
		},
		form: {
			control: "focus:ring-purple-600",
			input: "bg-white text-gray-900 ring-gray-300 focus:ring-purple-600",
			autoComplete: {
				options: "bg-white ring-black",
				option: "text-gray-900",
				activeOption: "bg-purple-600 text-white",
				optionIcon: "text-purple-600",
				activeOptionIcon: "text-white",
				secondaryText: "text-gray-500",
				activeSecondaryText: "text-purple-200",
			},
		},
		notification: {
			root: "bg-purple-100 ring-purple-700 text-purple-600 shadow-purple-700",
			dismiss: "text-purple-700 hover:bg-purple-200 hover:text-purple-600 focus:ring-purple-600",
			title: "text-purple-900",
		},
		tag: {
			normal: "text-purple-600 bg-purple-600/20 ring-purple-600 dark:text-purple-300 dark:bg-purple-900/20 dark:ring-purple-900",
			solid: "bg-purple-500 text-white ring-purple-700 ring-2 dark:bg-purple-700/50 dark:text-gray-50",
			dimSolid: "bg-purple-500/50 text-purple-900 ring-purple-700/50 ring-2 dark:bg-purple-700/50 dark:text-gray-200",
		},
		spinner: { primary: "text-purple-600 dark:text-purple-300", secondary: "white" },
		modal: { header: { root: "bg-purple-700 text-white", dismiss: "bg-purple-700 text-purple-200 hover:text-white", description: "text-purple-200" } },
	},
	slate: {
		color: "slate",
		card: {
			root: "shadow-slate-200 divide-slate-600 dark:shadow-slate-950 dark:divide-slate-950}",
			bordered: "border-2 border-slate-600 dark:border-slate-900",
			header: "border-slate-600 bg-slate-200 dark:border-slate-950 dark:bg-slate-800",
			title: "text-slate-900",
			description: "text-slate-600",
			footer: "border-slate-600 border-t p-3 px-6",
			icon: "text-slate-600 ring-slate-600",
		},
		logo: "text-slate-500 dark:text-slate-300",
		navigation: {
			item: "group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700 hover:text-slate-700 hover:bg-slate-100 group-hover:text-slate-500 focus-visible:outline-slate-500 dark:text-gray-50 dark:hover:bg-slate-900 dark:group-hover:text-slate-600 dark:focus-visible:outline-slate-700",
			childItem: "border-l-2 border-slate-50 pl-8 rounded-none dark:border-slate-800 dark:hover:border-slate-900 dark:border-l-4",
			openItem: "bg-slate-100 rounded-t-md rounded-b-none dark:bg-slate-900 ",
			openItemBody: "bg-slate-50 dark:bg-slate-800",
			activeRootItem: "text-slate-900 border-b-2 rounded-b-none border-slate-700 pb-1 bg-slate-50 dark:bg-slate-900 dark:border-slate-800",
			activeChildItem: "text-slate-900 border-slate-700 bg-slate-50 dark:bg-slate-800 dark:border-slate-950 dark:hover:border-slate-950",
		},
		actions: {
			primary:
				"bg-slate-600 hover:bg-slate-700 focus-visible:outline-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-900 dark:hover:bg-slate-950 dark:focus-visible:outline-slate-950 dark:text-gray-50 dark:disabled:opacity-75",
			secondary:
				"border enabled:hover:bg-slate-200 focus-visible:outline-slate-900 border-slate-600 text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed dark:text-slate-600 dark:enabled:hover:bg-slate-900 dark:focus-visible:outline-slate-900 dark:border-slate-900 dark:text-slate-300",
		},
		textAction: { root: "border-b border-transparent hover:border-slate-600 text-slate-600", active: "border-slate-600" },
		table: {
			header: "bg-slate-600 text-white dark:bg-slate-700 dark:text-gray-50",
			evenRow: "bg-slate-50 dark:bg-zinc-800",
			bordered: "border-x border-slate-600 dark:border-slate-700",
			special: "font-bold border-l-8 text-slate-700 dark:text-gray-50",
			summaryRow: "bg-slate-200 text-gray-900 dark:bg-slate-700 dark:text-gray-50",
		},
		form: {
			control: "focus:ring-slate-600",
			input: "bg-white text-gray-900 ring-gray-300 focus:ring-slate-600",
			autoComplete: {
				options: "bg-white ring-black",
				option: "text-gray-900",
				activeOption: "bg-slate-600 text-white",
				optionIcon: "text-slate-600",
				activeOptionIcon: "text-white",
				secondaryText: "text-gray-500",
				activeSecondaryText: "text-slate-200",
			},
		},
		notification: {
			root: "bg-slate-100 ring-slate-700 text-slate-600 shadow-slate-700",
			dismiss: "text-slate-700 hover:bg-slate-200 hover:text-slate-600 focus:ring-slate-600",
			title: "text-slate-900",
		},
		tag: {
			normal: "text-slate-600 bg-slate-600/20 ring-slate-600 dark:text-slate-300 dark:bg-slate-900/20 dark:ring-slate-900",
			solid: "bg-slate-500 text-white ring-slate-700 ring-2 dark:bg-slate-700/50 dark:text-gray-50",
			dimSolid: "bg-slate-500/50 text-slate-900 ring-slate-700/50 ring-2 dark:bg-slate-700/50 dark:text-gray-200",
		},
		spinner: { primary: "text-slate-600 dark:text-slate-300", secondary: "white" },
		modal: { header: { root: "bg-slate-700 text-white", dismiss: "bg-slate-700 text-slate-200 hover:text-white", description: "text-slate-200" } },
	},
	yellow: {
		color: "yellow",
		card: {
			root: "shadow-yellow-200 divide-yellow-600 dark:shadow-yellow-950 dark:divide-yellow-950}",
			bordered: "border-2 border-yellow-600 dark:border-yellow-900",
			header: "border-yellow-600 bg-yellow-200 dark:border-yellow-950 dark:bg-yellow-800",
			title: "text-yellow-900",
			description: "text-yellow-600",
			footer: "border-yellow-600 border-t p-3 px-6",
			icon: "text-yellow-600 ring-yellow-600",
		},
		logo: "text-yellow-500 dark:text-yellow-300",
		navigation: {
			item: "group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700 hover:text-yellow-700 hover:bg-yellow-100 group-hover:text-yellow-500 focus-visible:outline-yellow-500 dark:text-gray-50 dark:hover:bg-yellow-900 dark:group-hover:text-yellow-600 dark:focus-visible:outline-yellow-700",
			childItem: "border-l-2 border-yellow-50 pl-8 rounded-none dark:border-yellow-800 dark:hover:border-yellow-900 dark:border-l-4",
			openItem: "bg-yellow-100 rounded-t-md rounded-b-none dark:bg-yellow-900 ",
			openItemBody: "bg-yellow-50 dark:bg-yellow-800",
			activeRootItem: "text-yellow-900 border-b-2 rounded-b-none border-yellow-700 pb-1 bg-yellow-50 dark:bg-yellow-900 dark:border-yellow-800",
			activeChildItem: "text-yellow-900 border-yellow-700 bg-yellow-50 dark:bg-yellow-800 dark:border-yellow-950 dark:hover:border-yellow-950",
		},
		actions: {
			primary:
				"bg-yellow-600 hover:bg-yellow-700 focus-visible:outline-yellow-700 text-white disabled:opacity-50 disabled:cursor-not-allowed dark:bg-yellow-900 dark:hover:bg-yellow-950 dark:focus-visible:outline-yellow-950 dark:text-gray-50 dark:disabled:opacity-75",
			secondary:
				"border enabled:hover:bg-yellow-200 focus-visible:outline-yellow-900 border-yellow-600 text-yellow-900 disabled:opacity-50 disabled:cursor-not-allowed dark:text-yellow-600 dark:enabled:hover:bg-yellow-900 dark:focus-visible:outline-yellow-900 dark:border-yellow-900 dark:text-yellow-300",
		},
		textAction: { root: "border-b border-transparent hover:border-yellow-600 text-yellow-600", active: "border-yellow-600" },
		table: {
			header: "bg-yellow-600 text-white dark:bg-yellow-700 dark:text-gray-50",
			evenRow: "bg-yellow-50 dark:bg-zinc-800",
			bordered: "border-x border-yellow-600 dark:border-yellow-700",
			special: "font-bold border-l-8 text-yellow-700 dark:text-gray-50",
			summaryRow: "bg-yellow-200 text-gray-900 dark:bg-yellow-700 dark:text-gray-50",
		},
		form: {
			control: "focus:ring-yellow-600",
			input: "bg-white text-gray-900 ring-gray-300 focus:ring-yellow-600",
			autoComplete: {
				options: "bg-white ring-black",
				option: "text-gray-900",
				activeOption: "bg-yellow-600 text-white",
				optionIcon: "text-yellow-600",
				activeOptionIcon: "text-white",
				secondaryText: "text-gray-500",
				activeSecondaryText: "text-yellow-200",
			},
		},
		notification: {
			root: "bg-yellow-100 ring-yellow-700 text-yellow-600 shadow-yellow-700",
			dismiss: "text-yellow-700 hover:bg-yellow-200 hover:text-yellow-600 focus:ring-yellow-600",
			title: "text-yellow-900",
		},
		tag: {
			normal: "text-yellow-600 bg-yellow-600/20 ring-yellow-600 dark:text-yellow-300 dark:bg-yellow-900/20 dark:ring-yellow-900",
			solid: "bg-yellow-500 text-white ring-yellow-700 ring-2 dark:bg-yellow-700/50 dark:text-gray-50",
			dimSolid: "bg-yellow-500/50 text-yellow-900 ring-yellow-700/50 ring-2 dark:bg-yellow-700/50 dark:text-gray-200",
		},
		spinner: { primary: "text-yellow-600 dark:text-yellow-300", secondary: "white" },
		modal: { header: { root: "bg-yellow-700 text-white", dismiss: "bg-yellow-700 text-yellow-200 hover:text-white", description: "text-yellow-200" } },
	},
	sky: {
		color: "sky",
		card: {
			root: "shadow-sky-200 divide-sky-600 dark:shadow-sky-950 dark:divide-sky-950}",
			bordered: "border-2 border-sky-600 dark:border-sky-900",
			header: "border-sky-600 bg-sky-200 dark:border-sky-950 dark:bg-sky-800",
			title: "text-sky-900",
			description: "text-sky-600",
			footer: "border-sky-600 border-t p-3 px-6",
			icon: "text-sky-600 ring-sky-600",
		},
		logo: "text-sky-500 dark:text-sky-300",
		navigation: {
			item: "group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700 hover:text-sky-700 hover:bg-sky-100 group-hover:text-sky-500 focus-visible:outline-sky-500 dark:text-gray-50 dark:hover:bg-sky-900 dark:group-hover:text-sky-600 dark:focus-visible:outline-sky-700",
			childItem: "border-l-2 border-sky-50 pl-8 rounded-none dark:border-sky-800 dark:hover:border-sky-900 dark:border-l-4",
			openItem: "bg-sky-100 rounded-t-md rounded-b-none dark:bg-sky-900 ",
			openItemBody: "bg-sky-50 dark:bg-sky-800",
			activeRootItem: "text-sky-900 border-b-2 rounded-b-none border-sky-700 pb-1 bg-sky-50 dark:bg-sky-900 dark:border-sky-800",
			activeChildItem: "text-sky-900 border-sky-700 bg-sky-50 dark:bg-sky-800 dark:border-sky-950 dark:hover:border-sky-950",
		},
		actions: {
			primary:
				"bg-sky-600 hover:bg-sky-700 focus-visible:outline-sky-700 text-white disabled:opacity-50 disabled:cursor-not-allowed dark:bg-sky-900 dark:hover:bg-sky-950 dark:focus-visible:outline-sky-950 dark:text-gray-50 dark:disabled:opacity-75",
			secondary:
				"border enabled:hover:bg-sky-200 focus-visible:outline-sky-900 border-sky-600 text-sky-900 disabled:opacity-50 disabled:cursor-not-allowed dark:text-sky-600 dark:enabled:hover:bg-sky-900 dark:focus-visible:outline-sky-900 dark:border-sky-900 dark:text-sky-300",
		},
		textAction: { root: "border-b border-transparent hover:border-sky-600 text-sky-600", active: "border-sky-600" },
		table: {
			header: "bg-sky-600 text-white dark:bg-sky-700 dark:text-gray-50",
			evenRow: "bg-sky-50 dark:bg-zinc-800",
			bordered: "border-x border-sky-600 dark:border-sky-700",
			special: "font-bold border-l-8 text-sky-700 dark:text-gray-50",
			summaryRow: "bg-sky-200 text-gray-900 dark:bg-sky-700 dark:text-gray-50",
		},
		form: {
			control: "focus:ring-sky-600",
			input: "bg-white text-gray-900 ring-gray-300 focus:ring-sky-600",
			autoComplete: {
				options: "bg-white ring-black",
				option: "text-gray-900",
				activeOption: "bg-sky-600 text-white",
				optionIcon: "text-sky-600",
				activeOptionIcon: "text-white",
				secondaryText: "text-gray-500",
				activeSecondaryText: "text-sky-200",
			},
		},
		notification: {
			root: "bg-sky-100 ring-sky-700 text-sky-600 shadow-sky-700",
			dismiss: "text-sky-700 hover:bg-sky-200 hover:text-sky-600 focus:ring-sky-600",
			title: "text-sky-900",
		},
		tag: {
			normal: "text-sky-600 bg-sky-600/20 ring-sky-600 dark:text-sky-300 dark:bg-sky-900/20 dark:ring-sky-900",
			solid: "bg-sky-500 text-white ring-sky-700 ring-2 dark:bg-sky-700/50 dark:text-gray-50",
			dimSolid: "bg-sky-500/50 text-sky-900 ring-sky-700/50 ring-2 dark:bg-sky-700/50 dark:text-gray-200",
		},
		spinner: { primary: "text-sky-600 dark:text-sky-300", secondary: "white" },
		modal: { header: { root: "bg-sky-700 text-white", dismiss: "bg-sky-700 text-sky-200 hover:text-white", description: "text-sky-200" } },
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
