import classNames from "classnames";

interface HomeCardProps<TElement extends React.ElementType> {
	as?: TElement;
	title: string;
	className?: string;

	footer?: React.ComponentType;
}

export function DashboardCard<TElement extends React.ElementType>({
	as,
	title,
	className,
	children,

	footer: Footer,

	...asProps
}: React.PropsWithChildren<HomeCardProps<TElement>> & Omit<React.ComponentPropsWithoutRef<TElement>, keyof HomeCardProps<TElement>>) {
	const Component = as ?? "div";

	return (
		<Component
			{...asProps}
			className={classNames("flex flex-col divide-y-2 divide-blue-400 overflow-hidden rounded-lg border-2 border-gray-200 bg-white shadow", className)}>
			<div className="bg-gray-100 p-4 text-gray-900">
				<h2 className="text-xl leading-6 text-inherit">{title}</h2>
			</div>
			<div className="flex-grow  px-4 pb-4 pt-3">{children}</div>
			{Footer && (
				<div className="bg-gray-100 p-2">
					<Footer />
				</div>
			)}
		</Component>
	);
}
