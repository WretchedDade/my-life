import { BillPayment } from "..";
import { classNames } from "../../shared/utils";

interface BillPaymentIconProps {
	billPayment: BillPayment;
	className: string;
}

export function BillPaymentIcon({ billPayment, className }: BillPaymentIconProps) {
	if (billPayment.iconUri) return <img src={billPayment.iconUri} alt={billPayment.name} className={className} />;
	if (billPayment.emoji) return <span className={classNames("-mt-1", className)}>{billPayment.emoji}</span>;

	return <></>;
}
