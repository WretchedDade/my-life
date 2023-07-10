import { useMediaQuery } from "react-responsive";
import resolveConfig from "tailwindcss/resolveConfig";
import { Config, ScreensConfig } from "tailwindcss/types/config";

import { useMemo } from "react";
import tailwindConfig from "../../tailwind.config"; // Your tailwind config

const fullConfig = resolveConfig(tailwindConfig as unknown as Config);

const breakpoints = fullConfig?.theme?.screens || {
	xs: "480px",
	sm: "640px",
	md: "768px",
	lg: "1024px",
	xl: "1280px",
};

type BreakpointKey = keyof ScreensConfig;

type KeyAbove<TBreakpointKey extends string> = `isAbove${Capitalize<TBreakpointKey>}`;
type KeyBelow<TBreakpointKey extends string> = `isBelow${Capitalize<TBreakpointKey>}`;
type TailwindBreakpoint<TBreakpointKey extends string> = Record<TBreakpointKey, number> & Record<KeyAbove<TBreakpointKey> | KeyBelow<TBreakpointKey>, boolean>;

/**
 * @desc The 'useBreakpoint()' hook is used to get the current
 *       screen breakpoint based on the TailwindCSS config.
 *
 * @usage
 *    import { useBreakpoint } from "@/hooks/useBreakpoint";
 *
 *    const { isAboveSm, isBelowSm, sm } = useBreakpoint("sm");
 *    console.log({ isAboveSm, isBelowSm, sm });
 *
 *    const { isAboveMd } = useBreakpoint("md");
 *    const { isAboveLg } = useBreakpoint("lg");
 *    const { isAbove2Xl } = useBreakpoint("2xl");
 *    console.log({ isAboveMd, isAboveLg, isAbove2Xl });
 *
 * @see https://stackoverflow.com/a/71098593/6543935
 * @requirements npm install react-responsive
 */
export function useTailwindBreakpoint<TBreakpointKey extends string>(breakpointKey: TBreakpointKey) {
	const breakpointValue = breakpoints[breakpointKey as BreakpointKey];

	const mediaQueryResult = useMediaQuery({
		query: `(max-width: ${breakpointValue})`,
	});

	const capitalizedKey = breakpointKey[0].toUpperCase() + breakpointKey.substring(1);

	return useMemo(
		() =>
			({
				[breakpointKey]: Number(String(breakpointValue).replace(/[^0-9]/g, "")),
				[`isAbove${capitalizedKey}`]: !mediaQueryResult,
				[`isBelow${capitalizedKey}`]: mediaQueryResult,
			} as TailwindBreakpoint<TBreakpointKey>),
		[breakpointValue, mediaQueryResult, capitalizedKey, breakpointKey],
	);
}
