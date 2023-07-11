import { useContext } from "react";

import { NotificationContext } from "../NotificationContext";

export function useNotifier() {
	const { showNotification, showSuccessNotification } = useContext(NotificationContext);

	return { custom: showNotification, success: showSuccessNotification };
}
