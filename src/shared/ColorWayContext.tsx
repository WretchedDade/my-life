import { PropsWithChildren, createContext } from "react";

import { ColorWay, ColorWays } from "../ColorWays";

interface ColorWayContext {
	colorWay: ColorWay;
}

export const ColorWayContext = createContext<ColorWayContext>({
	colorWay: ColorWays.slate,
});

export function ColorWayContextProvider({ children }: PropsWithChildren<object>) {
	return <ColorWayContext.Provider value={{ colorWay: ColorWays.sky }}>{children}</ColorWayContext.Provider>;
}
