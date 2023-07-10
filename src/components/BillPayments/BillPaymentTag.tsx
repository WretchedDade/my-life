import classNames from "classnames";
import { GetColorWay } from "../../ColorWays";

interface BillPaymentTagProps {
	name: string;
	color: string;
}

export function BillPaymentTag({ name, color }: BillPaymentTagProps) {
	const colorWay = GetColorWay(color);

	return <div className={classNames("whitespace-nowrap rounded-md px-2 py-1 text-xs ring-1 ring-inset", colorWay.tag.root)}>{name}</div>;
}
