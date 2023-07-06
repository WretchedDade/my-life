import classNames from "classnames";
import { styles } from "../../utils/styles";

interface BillPaymentTagProps {
	name: string;
	color: string;

	isLoading?: boolean;
}

export function BillPaymentTag({ name, color, isLoading }: BillPaymentTagProps) {
	const colorClasses = TagColorConfig[color] ?? "";

	return (
		<div className={classNames("rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset", { [styles.loading]: isLoading, [colorClasses]: !isLoading })}>
			{name}
		</div>
	);
}

const TagColorConfig = {
	red: "text-red-700 bg-red-300 ring-red-600/20",
	purple: "text-purple-700 bg-purple-300 ring-purple-600/20",
	yellow: "text-yellow-700 bg-yellow-300 ring-yellow-600/20",
	green: "text-green-700 bg-green-300 ring-green-600/20",
} as { [key: string]: string };
