import { PropsWithChildren, createContext, useCallback, useState } from "react";

import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import { Notification, NotificationProps } from "./components";

type Notification = Omit<NotificationProps, "onClose">;
type NotificationOptions = Omit<NotificationProps, "id" | "onClose" | "message">;

interface NotificationContext {
	showNotification: (message: string, options?: NotificationOptions) => void;
	showSuccessNotification: (message: string, options?: Omit<NotificationOptions, "icon">) => void;
}

export const NotificationContext = createContext<NotificationContext>({
	showNotification: () => undefined,
	showSuccessNotification: () => undefined,
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

	const closeNotification = useCallback(
		(id: string) => {
			setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id));
		},
		[setNotifications],
	);

	return (
		<NotificationContext.Provider value={{ showNotification, showSuccessNotification }}>
			{children}
			<div aria-live="assertive" className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
				<div className="flex w-full flex-col items-center space-y-4 sm:items-end">
					{notifications.map((props) => (
						<Notification key={props.id} {...props} onClose={closeNotification} />
					))}
				</div>
			</div>
		</NotificationContext.Provider>
	);
}
