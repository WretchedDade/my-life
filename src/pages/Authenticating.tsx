import { useEffect, useState } from "react";
import { LoadingSpinner } from "../shared/components";

export function Authenticating() {
	const [showSpinner, setShowSpinner] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => setShowSpinner(true), 250);
		return () => clearTimeout(timeout);
	}, []);

	if (!showSpinner) return null;

	return (
		<LoadingSpinner centered className="h-32 w-32" centeringDivClassName="bg-gray-50">
			<p className="text-xl">Authenticating...</p>
		</LoadingSpinner>
	);
}
