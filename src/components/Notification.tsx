export type NotificationVariants = "success" | "warning" | "error" | "info";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment, useEffect, useState } from "react";
import { ColorWays } from "../ColorWays";

export interface NotificationProps {
	id: string;
	message: string;

	icon?: typeof faXmark;
	title?: string;
	color?: keyof ColorWays;

	onClose: (id: string) => void;
}

const notificationLifetime = 2500;

export function Notification({ id, message, onClose, title, color = "green", icon }: NotificationProps) {
	const [show, setShow] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => setShow(false), notificationLifetime);

		return () => clearTimeout(timeout);
	}, [setShow]);

	useEffect(() => {
		if (!show) {
			const timeout = setTimeout(() => onClose(id), 700);
			return () => clearTimeout(timeout);
		}
	}, [id, onClose, show, setShow]);

	const colorWay = ColorWays[color];

	return (
		<Transition
			appear={true}
			show={show}
			as={Fragment}
			unmount={false}
			enter="transform duration-200 transition"
			enterFrom="translate-x-48 opacity-0"
			enterTo="translate-x-0 opacity-100"
			leave="transition duration-700"
			leaveFrom="opacity-100 translate-x-0"
			leaveTo="opacity-0 translate-x-48">
			<div
				className={classNames(
					"pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1  ring-opacity-5",
					colorWay.notification.root,
				)}>
				<div className="p-4">
					<div className="flex items-center">
						{icon && (
							<div className="flex-shrink-0">
								<FontAwesomeIcon icon={icon} className="h-6 w-6 text-inherit" aria-hidden="true" />
							</div>
						)}
						<div className="ml-3 w-0 flex-1 pt-0.5">
							{title && <p className={classNames("text-sm font-medium", colorWay.notification.title)}>{title}</p>}
							<p className="mt-1 text-sm text-gray-700">{message}</p>
						</div>
						<div className="ml-4 flex flex-shrink-0">
							<button
								type="button"
								className={classNames(
									"inline-flex rounded-md p-2 text-inherit focus:outline-none focus:ring-2 focus:ring-offset-2",
									colorWay.notification.dismiss,
								)}
								onClick={() => onClose(id)}>
								<span className="sr-only">Close</span>
								<FontAwesomeIcon icon={faXmark} className="h-5 w-5" aria-hidden="true" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</Transition>
	);
}
