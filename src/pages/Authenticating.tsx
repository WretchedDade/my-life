import { useEffect, useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function Authenticating() {
	const [showSpinner, setShowSpinner] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => setShowSpinner(true), 250);
		return () => clearTimeout(timeout);
	}, []);

	if (!showSpinner) return null;

	return (
		<LoadingSpinner centered className="h-32 w-32 text-blue-700" centeringDivClassName="bg-gray-50">
			<p className="text-xl">Authenticating...</p>
		</LoadingSpinner>
	);
}
