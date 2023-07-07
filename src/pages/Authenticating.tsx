import { LoadingSpinner } from "../components/LoadingSpinner";

export function Authenticating() {
	return (
		<LoadingSpinner centered className="h-32 w-32 text-blue-700" centeringDivClassName="bg-gray-50">
			<p className="text-xl">Authenticating...</p>
		</LoadingSpinner>
	);
}
