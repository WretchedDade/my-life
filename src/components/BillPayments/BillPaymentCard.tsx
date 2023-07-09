import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

import classNames from "classnames";
import { BillPayment } from "../../types/bills";
import { BillPaymentIcon } from "./BillPaymentIcon";
import { BillPaymentTag } from "./BillPaymentTag";

import { asCurrency, asFullDate } from "../../utils/formatters";
import { styles } from "../../utils/styles";

import { useBillConfigurationQuery } from "../../hooks/useBillConfiguration";
import { useMarkBillAsPaidMutation } from "../../hooks/useMarkBillAsPaidMutation";
import { LoadingSpinner } from "../LoadingSpinner";

interface BillPaymentsCardProps<TElement extends React.ElementType> {
	as?: TElement;
	billPayment: BillPayment;
	isLoading?: boolean;
}

export function BillPaymentsCard<TElement extends React.ElementType = "div">({ as, billPayment, isLoading }: BillPaymentsCardProps<TElement>) {
	const Component = as ?? "div";

	const { data: billConfiguration } = useBillConfigurationQuery(billPayment.billConfigurationId, !isLoading);

	const markBillAsPaidMutation = useMarkBillAsPaidMutation();

	return (
		<Component className="flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-2xl">
			<div
				style={{ backgroundImage: `url(${billPayment?.coverUri})` }}
				className={classNames("flex h-28  items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 bg-cover bg-center md:h-32 md:bg-top xl:h-52", {
					[styles.loading]: isLoading,
				})}
			/>

			<div className="flex items-center gap-x-2 border-b border-gray-900/5 bg-gray-50 p-3 md:gap-x-4 md:px-6 md:py-4">
				<div
					className={classNames(
						"flex h-6 w-6 flex-none items-center justify-center rounded-lg object-cover text-center text-lg ring-gray-900/10 sm:h-10 sm:w-10 sm:bg-white sm:ring-1",
						{ [styles.loading]: isLoading },
					)}>
					<BillPaymentIcon billPayment={billPayment} className="h-6 w-6" />
				</div>

				<div className={classNames("text-sm font-medium leading-6 text-gray-900", { [styles.loading]: isLoading })}>
					{billPayment.name.split(" - ")[0]}
				</div>

				{!isLoading && (
					<Menu as="div" className="relative ml-auto">
						<Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
							<span className="sr-only">Open options</span>
							<EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
						</Menu.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95">
							<Menu.Items className="absolute right-0 z-10 mt-0.5 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
								<Menu.Item>
									{({ active }) => (
										<a
											target="_blank"
											href={billPayment.pageUri}
											className={classNames(active ? "bg-gray-100" : "", "block px-3 py-1 text-sm leading-6 text-gray-900")}>
											Open <span className="sr-only">, {billPayment.name}</span> in Notion
										</a>
									)}
								</Menu.Item>
								{billConfiguration && (
									<Menu.Item>
										{({ active }) => (
											<a
												target="_blank"
												href={billConfiguration.pageUri}
												className={classNames(active ? "bg-gray-100" : "", "block px-3 py-1 text-sm leading-6 text-gray-900")}>
												View Configuration
											</a>
										)}
									</Menu.Item>
								)}
								{billPayment.linkToPay && (
									<Menu.Item>
										{({ active }) => (
											<a
												target="_blank"
												href={billPayment.linkToPay}
												className={classNames(active ? "bg-gray-100" : "", "block px-3 py-1 text-sm leading-6 text-gray-900")}>
												Pay the <span className="sr-only">, {billPayment.name}</span> Bill
											</a>
										)}
									</Menu.Item>
								)}
							</Menu.Items>
						</Transition>
					</Menu>
				)}
			</div>

			<dl className="-my-3 flex-grow divide-y divide-gray-100 p-4 text-sm leading-6">
				<div className="flex justify-between gap-x-4 py-2 md:py-3">
					<dt className="text-gray-500">Date Due</dt>
					<dd className={classNames("text-gray-700", { [styles.loading]: isLoading })}>
						<time dateTime={billPayment.dateDue.toDateString()}>{asFullDate(billPayment.dateDue)}</time>
					</dd>
				</div>
				<div className="flex justify-between gap-x-4 py-2 md:py-3">
					<dt className="text-gray-500">Amount</dt>
					<dd className="flex items-start gap-x-2">
						<div className={classNames("font-medium text-gray-900", { [styles.loading]: isLoading })}>{asCurrency(billPayment.amount)}</div>
					</dd>
				</div>
				{billPayment.tags && billPayment.tags.length > 0 && (
					<div className="flex flex-wrap items-center justify-end gap-2 py-2 md:py-3">
						{billPayment.tags.map((tag) => (
							<BillPaymentTag key={`${billPayment.id}-${tag.name}`} name={tag.name} color={tag.color} isLoading={isLoading} />
						))}
					</div>
				)}
			</dl>

			<div className="flex items-center justify-end gap-x-4 border-t border-gray-900/5 bg-gray-50 p-2 md:px-6 md:py-4">
				<button
					disabled={markBillAsPaidMutation.isLoading}
					type="button"
					onClick={() => markBillAsPaidMutation.mutate(billPayment.id)}
					className={classNames(
						"inline-flex items-center gap-x-1.5 rounded-md bg-green-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700",
						{ [styles.loading]: isLoading },
					)}>
					Mark as Paid
					{markBillAsPaidMutation.isLoading && <LoadingSpinner className="ml-1 h-4 w-4 text-white" />}
				</button>
			</div>
		</Component>
	);
}
