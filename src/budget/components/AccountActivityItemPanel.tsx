import { AccountActivityItem } from "..";

import { SlideOver } from "../../shared/components";
import { Format } from "../../shared/utils";

interface AccountActivityItemPanelProps {
	open: boolean;
	onClose: () => void;

	item?: AccountActivityItem;
}

export function AccountActivityItemPanel({ open, onClose, item }: AccountActivityItemPanelProps) {
	return (
		<SlideOver
			open={open}
			onClose={onClose}
			header={{ title: "Account Activity Item" }}
			footer={{
				actions: [{ text: "Cancel", variant: "primary", type: "button", onClick: onClose }],
			}}>
			{item && (
				<dl className="grid grid-cols-2 gap-y-6 p-4">
					<div className="border-l-2 px-4">
						<dt className="block font-medium leading-6 text-gray-900">Name</dt>
						<dd className="mt-2 text-sm text-gray-600">{item.name}</dd>
					</div>
					<div className="border-l-2 px-4">
						<dt className="block font-medium leading-6 text-gray-900">Date</dt>
						<dd className="mt-2 text-sm text-gray-600">{Format.asFullDate(item.date)}</dd>
					</div>
					<div className="border-l-2 px-4">
						<dt className="block font-medium leading-6 text-gray-900">Category</dt>
						<dd className="mt-2 text-sm text-gray-600">{item.category}</dd>
					</div>
					<div className="border-l-2 px-4">
						<dt className="block font-medium leading-6 text-gray-900">Amount</dt>
						<dd className="mt-2 text-sm text-gray-600">{Format.asCurrency(item.amount)}</dd>
					</div>
					<div className="col-span-2 border-l-2 px-4">
						<dt className="block font-medium leading-6 text-gray-900">Full Name</dt>
						<dd className="mt-2 text-sm text-gray-600">{item.fullName}</dd>
					</div>
					<div className="border-l-2 px-4">
						<dt className="block font-medium leading-6 text-gray-900">Last Synced</dt>
						<dd className="mt-2 text-sm text-gray-600">{Format.asDateString(item.lastModifiedOn, "medium", "medium")}</dd>
					</div>
				</dl>
			)}
		</SlideOver>
	);
}
