/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-mixed-spaces-and-tabs */

import React, { useMemo } from "react";
import { Location, useLocation } from "react-router-dom";

import { AccountActivity, BloodPressure, Budget, Home, KeywordConfig, UnpaidBills } from "../../pages";

export function useNavigation() {
	const location = useLocation();
	return useMemo(() => BuildNavigation(location), [location]);
}

interface NavigationItem {
	name: string;
	href: string;
	current: boolean;
	element: React.ReactElement;
}

interface NavigationItemWithChildren {
	name: string;
	current: boolean;
	children: NavigationItem[];
}

export function hasChildren(item: NavigationItem | NavigationItemWithChildren): item is NavigationItemWithChildren {
	return (item as NavigationItemWithChildren).children !== undefined;
}

const routes = {
	home: "/",
	bloodPressure: "/blood-pressure",
	financials: {
		budget: "/financials/budget",
		unpaidBills: "/financials/unpaid-bills",
		accountActivity: "/financials/account-activity",
	},
	configuration: {
		keywords: "/config/keywords",
	},
};

function BuildNavigation(location: Location): (NavigationItem | NavigationItemWithChildren)[] {
	if (import.meta.env.DEV && import.meta.env.VITE_DEMO_MODE) {
		return [
			{
				name: "Home",
				href: routes.home,
				current: location.pathname === routes.home,

				element: <Home />,
			},
		];
	}

	return [
		{
			name: "Dashboard",
			href: routes.home,
			current: location.pathname === routes.home,

			element: <Home />,
		},
		{
			name: "Financials",
			current: Object.values(routes.financials).includes(location.pathname),

			children: [
				{
					name: "Unpaid Bills",
					href: routes.financials.unpaidBills,
					current: location.pathname === routes.financials.unpaidBills,

					element: <UnpaidBills />,
				},
				{
					name: "Planned Budget",
					href: routes.financials.budget,
					current: location.pathname === routes.financials.budget,

					element: <Budget />,
				},
				{
					name: "Account Activity",
					href: routes.financials.accountActivity,
					current: location.pathname === routes.financials.accountActivity,

					element: <AccountActivity />,
				},
			],
		},
		{
			name: "Configuration",
			current: Object.values(routes.configuration).includes(location.pathname),

			children: [
				{
					name: "Keywords",
					href: routes.configuration.keywords,
					current: location.pathname === routes.configuration.keywords,

					element: <KeywordConfig />,
				},
			],
		},
		{
			name: "Blood Pressure",
			href: routes.bloodPressure,
			current: location.pathname === routes.bloodPressure,

			element: <BloodPressure />,
		},
	];
}
