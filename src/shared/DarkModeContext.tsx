import { useMediaQuery } from "react-responsive";

import { PropsWithChildren, createContext, useCallback, useEffect, useState } from "react";

interface DarkModeContext {
	isDarkMode: boolean;
	toggleDarkMode: () => void;
}

export const DarkModeContext = createContext<DarkModeContext>({
	isDarkMode: false,
	toggleDarkMode: () => undefined,
});

const isDarkModeLocalStorage = localStorage.getItem("isDarkMode");

export function DarkModeContextProvider({ children }: PropsWithChildren<object>) {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

	const prefersDarkMode = useMediaQuery({
		query: "(prefers-color-scheme: dark)",
	});

	useEffect(() => {
		if (isDarkModeLocalStorage == null) setIsDarkMode(prefersDarkMode);
		else setIsDarkMode(JSON.parse(isDarkModeLocalStorage));
	}, [prefersDarkMode, setIsDarkMode]);

	useEffect(() => {
		// if (isDarkMode) {
		// 	document.documentElement.classList.add("dark");
		// } else {
		// 	document.documentElement.classList.remove("dark");
		// }

		localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
	}, [isDarkMode]);

	const toggleDarkMode = useCallback(() => setIsDarkMode((current) => !current), [setIsDarkMode]);

	return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
}
