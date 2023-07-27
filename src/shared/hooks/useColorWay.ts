import { useContext } from "react";

import { ColorWays, ColorWaysKey } from "../../ColorWays";
import { ColorWayContext } from "../ColorWayContext";

export function useColorWay(color?: ColorWaysKey) {
	const { colorWay } = useContext(ColorWayContext);

	if (color) return ColorWays[color];

	return colorWay;
}
