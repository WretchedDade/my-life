import classNames from "classnames";

interface LoadingSpinnerProps {
	className?: string;

	centered?: boolean;
	centeringDivClassName?: string;
}

export function LoadingSpinner({ centered, centeringDivClassName, className, children }: React.PropsWithChildren<LoadingSpinnerProps>) {
	if (centered)
		return (
			<div className={classNames("flex h-full w-full items-center justify-center", { "flex flex-col gap-y-6": children }, centeringDivClassName)}>
				<Spinner className={className} />
				{children}
			</div>
		);

	return <Spinner className={className} />;
}

function Spinner({ className }: Pick<LoadingSpinnerProps, "className">) {
	return (
		<svg className={classNames("animate-spin", className)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
		</svg>
	);
}
