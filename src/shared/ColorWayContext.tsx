import { PropsWithChildren, createContext, useContext } from "react";

import { ColorWay, ColorWays, ColorWaysKey } from "../ColorWays";

interface ColorWayContext {
	colorWay: ColorWay;
}

export const ColorWayContext = createContext<ColorWayContext>({
	colorWay: ColorWays.slate,
});

export function ColorWayContextProvider({ children }: PropsWithChildren<object>) {
	return <ColorWayContext.Provider value={{ colorWay: ColorWays.sky }}>{children}</ColorWayContext.Provider>;
}

export function useColorWay(color?: ColorWaysKey) {
	const { colorWay } = useContext(ColorWayContext);

	if (color) return ColorWays[color];

	return colorWay;
}
