import { faHeartPulse, faIgloo, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";
import { Location, useLocation } from "react-router-dom";
import { ColorWay, ColorWays } from "../ColorWays";

export function useNavigationOptions() {
	const location = useLocation();
	return useMemo(() => BuildNavigationOptions(location), [location]);
}

interface NavigationOption {
	name: string;
	href: string;
	icon: typeof faIgloo;
	current: boolean;
	colorWay: ColorWay;
}

function BuildNavigationOptions(location: Location): NavigationOption[] {
	return [
		{
			name: "Home",
			href: "/",
			icon: faIgloo,
			current: location.pathname === "/",

			colorWay: ColorWays.blue,
		},
		{
			name: "Unpaid Bills",
			href: "/bills/unpaid",
			icon: faMoneyBillWave,
			current: location.pathname === "/bills/unpaid",

			colorWay: ColorWays.green,
		},
		{
			name: "Blood Pressure",
			href: "/bloodpressure",
			icon: faHeartPulse,
			current: location.pathname === "/bloodpressure",

			colorWay: ColorWays.red,
		},
	];
}
