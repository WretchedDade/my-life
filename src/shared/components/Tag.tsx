import classNames from "classnames";
import { GetColorWay } from "../../ColorWays";

interface BillPaymentTagProps {
	color: string;
	className?: string;
}

export function Tag({ children, color, className }: React.PropsWithChildren<BillPaymentTagProps>) {
	const colorWay = GetColorWay(color);

	return <div className={classNames("whitespace-nowrap rounded px-2 py-1 text-xs ring-1 ring-inset", colorWay.tag.root, className)}>{children}</div>;
}
