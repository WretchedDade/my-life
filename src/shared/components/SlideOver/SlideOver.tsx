import { Fragment, MutableRefObject, forwardRef } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { SlideOverHeader, SlideOverHeadingProps } from ".";
import { ColorWaysKey } from "../../../ColorWays";
import { PolymorphicComponent, PolymorphicComponentProps, PolymorphicRef } from "../../types";
import { SlideOverFooter, SlideOverFooterProps } from "./SlideOverFooter";

type SlideOverBaseProps = React.PropsWithChildren<{
	open: boolean;
	onClose: () => void;

	color?: ColorWaysKey;
	header?: Omit<SlideOverHeadingProps, "onClose" | "color">;
	footer?: Omit<SlideOverFooterProps, "color">;
	initialFocus?: MutableRefObject<HTMLElement | null>;
}>;

export const SlideOver: PolymorphicComponent<SlideOverBaseProps> = forwardRef(
	<TElement extends React.ElementType>(
		{
			open,
			onClose,

			as,

			color,
			header,
			footer,

			children,

			initialFocus,

			...props
		}: PolymorphicComponentProps<TElement, SlideOverBaseProps>,
		ref: PolymorphicRef<TElement>,
	) => {
		const Component = as ?? "div";

		return (
			<Transition.Root show={open} as={Fragment}>
				<Dialog as="div" className="relative z-50" onClose={onClose} initialFocus={initialFocus}>
					<Transition.Child
						as={Fragment}
						enter="ease-in-out duration-500"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in-out duration-500"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<div className="fixed inset-0 bg-gray-900/80 bg-opacity-80 transition-opacity" onClick={onClose} />
					</Transition.Child>

					<div className="fixed inset-0 overflow-hidden">
						<div className="absolute inset-0 overflow-hidden">
							<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-16">
								<Transition.Child
									as={Fragment}
									enter="transform transition ease-in-out duration-500 sm:duration-500"
									enterFrom="translate-x-full"
									enterTo="translate-x-0"
									leave="transform transition ease-in-out duration-500 sm:duration-500"
									leaveFrom="translate-x-0"
									leaveTo="translate-x-full">
									<Dialog.Panel className="pointer-events-auto w-screen max-w-md">
										<Component
											ref={ref}
											className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl dark:divide-y-2 dark:divide-gray-900 dark:border-l-2 dark:border-zinc-900 dark:bg-zinc-800"
											{...props}>
											<div className="h-0 flex-1 overflow-y-auto">
												<div className="flex flex-1 flex-col justify-between">
													{header && <SlideOverHeader color={color} onClose={onClose} {...header} />}
													{children}
												</div>
											</div>
											{footer && footer.actions.length > 0 && <SlideOverFooter color={color} {...footer} />}
										</Component>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		);
	},
);

// export const SlideOver = forwardRef(SlideOver)
