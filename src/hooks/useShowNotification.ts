import { useContext } from "react";
import { NotificationContext } from "../contexts/Notification";

export function useNotifier() {
	const { showNotification, showSuccessNotification } = useContext(NotificationContext);

	return { custom: showNotification, success: showSuccessNotification };
}
