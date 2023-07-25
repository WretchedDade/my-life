import { PropsWithChildren, createContext, useCallback, useState } from "react";
import { createPortal } from "react-dom";

import { faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

import { Notification, NotificationProps } from "./components";

type Notification = Omit<NotificationProps, "onClose">;
type NotificationOptions = Omit<NotificationProps, "id" | "onClose" | "message">;

interface NotificationContext {
	showNotification: (message: string, options?: NotificationOptions) => void;
	showSuccessNotification: (message: string, options?: Omit<NotificationOptions, "icon">) => void;
	showErrorNotification: (message: string, options?: Omit<NotificationOptions, "icon">) => void;
}

export const NotificationContext = createContext<NotificationContext>({
	showNotification: () => undefined,
	showSuccessNotification: () => undefined,
	showErrorNotification: () => undefined,
});

export function NotificationContextProvider({ children }: PropsWithChildren<object>) {
	const [notifications, setNotifications] = useState<Notification[]>([]);

	const showNotification = useCallback<NotificationContext["showNotification"]>((message, options = {}) => {
		setNotifications((prevNotifications) => [...prevNotifications, { id: crypto.randomUUID(), message, ...options }]);
	}, []);

	const showSuccessNotification = useCallback<NotificationContext["showSuccessNotification"]>(
		(message, options = {}) =>
			setNotifications((prevNotifications) => [...prevNotifications, { id: crypto.randomUUID(), message, ...options, icon: faCheckCircle }]),
		[],
	);

	const showErrorNotification = useCallback<NotificationContext["showErrorNotification"]>(
		(message, options = {}) =>
			setNotifications((prevNotifications) => [...prevNotifications, { id: crypto.randomUUID(), message, ...options, icon: faXmarkCircle }]),
		[],
	);
	const closeNotification = useCallback(
		(id: string) => {
			setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id));
		},
		[setNotifications],
	);

	return (
		<NotificationContext.Provider value={{ showNotification, showSuccessNotification, showErrorNotification }}>
			{children}
			{createPortal(
				<div aria-live="assertive" className="pointer-events-none fixed inset-0 z-[60] flex items-end px-4 py-6 sm:items-start sm:p-6">
					<div className="flex h-full w-full flex-col items-center justify-end space-y-4 sm:items-end">
						{notifications.map((props) => (
							<Notification key={props.id} {...props} onClose={closeNotification} />
						))}
					</div>
				</div>,
				document.body,
			)}
		</NotificationContext.Provider>
	);
}
