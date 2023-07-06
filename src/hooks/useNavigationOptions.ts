import { useMemo } from "react";
import { useLocation, Location } from "react-router-dom";
import { HomeIcon, BanknotesIcon } from "@heroicons/react/24/outline";

export function useNavigationOptions() {
	const location = useLocation();
	return useMemo(() => BuildNavigationOptions(location), [location]);
}

function BuildNavigationOptions(location: Location) {
	return [
		{ name: "Home", href: "/", icon: HomeIcon, current: location.pathname === "/" },
		{ name: "Bills", href: "/bills", icon: BanknotesIcon, current: location.pathname === "/bills" },
	];
}
