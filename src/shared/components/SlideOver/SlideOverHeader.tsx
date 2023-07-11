import { Dialog } from "@headlessui/react";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames";
import { ColorWays, ColorWaysKey } from "../../../ColorWays";

export interface SlideOverHeadingProps {
	color: ColorWaysKey;

	title: string;
	description?: string;

	onClose: () => void;
}

export function SlideOverHeader({ color, title, description, onClose }: SlideOverHeadingProps) {
	const colorWay = ColorWays[color];

	return (
		<div className={classNames("px-4 py-6 sm:px-6", colorWay.modal.header.root)}>
			<div className="flex items-center justify-between">
				<Dialog.Title className="text-base font-semibold leading-6 text-inherit">{title}</Dialog.Title>
				<div className="ml-3 flex h-7 items-center">
					<button
						type="button"
						className={classNames("rounded-md focus:outline-none focus:ring-2 focus:ring-white", colorWay.modal.header.dismiss)}
						onClick={onClose}>
						<span className="sr-only">Close panel</span>
						<FontAwesomeIcon icon={faXmark} className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
			</div>
			{description && (
				<div className="mt-1">
					<p className={classNames("text-sm", colorWay.modal.header.description)}>{description}</p>
				</div>
			)}
		</div>
	);
}
