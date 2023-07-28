import { AccountActivityItem } from "..";

import { SlideOver } from "../../shared/components";
import { Format } from "../../shared/utils";

interface AccountActivityItemsPanelProps {
	open: boolean;
	onClose: () => void;

	items: AccountActivityItem[] | undefined;
	onItemSelect: (item: AccountActivityItem) => void;
}

export function AccountActivityItemsPanel({ open, onClose, items, onItemSelect }: AccountActivityItemsPanelProps) {
	return (
		<SlideOver
			open={open}
			onClose={onClose}
			header={{ title: "Account Activity Items" }}
			footer={{
				actions: [{ text: "Cancel", variant: "primary", type: "button", onClick: onClose }],
			}}>
			{items && (
				<dl className="grid grid-cols-2 gap-y-6 p-4">
					<div className="border-l-2 px-4">
						<dt className="block font-medium leading-6 text-gray-900">Name</dt>
						<dd className="mt-2 text-sm text-gray-600">{items[0].name}</dd>
					</div>
					<div className="border-l-2 px-4">
						<dt className="block font-medium leading-6 text-gray-900">Amount</dt>
						<dd className="mt-2 text-sm text-gray-600">{Format.asCurrency(items.reduce((sum, item) => sum + Math.abs(item.amount), 0))}</dd>
					</div>
					<div className="border-l-2 px-4">
						<dt className="block font-medium leading-6 text-gray-900">Category</dt>
						<dd className="mt-2 text-sm text-gray-600">{items[0].category}</dd>
					</div>
					<div className="col-span-2">
						<p className="mb-2 block border-l-2 px-4 font-medium leading-6 text-gray-900">Items</p>
						<ul className="grid grid-cols-2 gap-y-2">
							{items
								.sort((a, b) => a.date.getTime() - b.date.getTime())
								.map((item) => (
									<li
										key={item.id}
										onClick={() => onItemSelect(item)}
										className="cursor-pointer border-l-2 px-4 text-xs text-gray-500 hover:border-gray-500 hover:text-gray-900">
										On <span className="text-gray-800">{Format.asDateString(item.date, "long", undefined)}</span> for{" "}
										<span className="text-gray-800">{Format.asCurrency(Math.abs(item.amount))}</span>
									</li>
								))}
						</ul>
					</div>
				</dl>
			)}
		</SlideOver>
	);
}
