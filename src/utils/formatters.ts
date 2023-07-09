export function asCurrency(value: number | undefined) {
	if (value === undefined) {
		return "";
	}

	return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export function asOrdinal(value: number | undefined) {
	if (value === undefined) {
		return "";
	}

	if (value <= 0) return value.toString();

	switch (value % 100) {
		case 11:
		case 12:
		case 13:
			return `${value}th`;
	}

	switch (value % 10) {
		case 1:
			return `${value}st`;
		case 2:
			return `${value}nd`;
		case 3:
			return `${value}rd`;
		default:
			return `${value}th`;
	}
}

export function asFullDate(value: string | undefined | Date) {
	return asDateString(value, "full", "medium");
}

export function asDateString(
	value: string | undefined | Date,
	dateStyle: Intl.DateTimeFormatOptions["dateStyle"],
	timeStyle: Intl.DateTimeFormatOptions["timeStyle"],
) {
	if (value === undefined) {
		return "";
	}

	const date = value instanceof Date ? value : new Date(value);

	return new Intl.DateTimeFormat("en-US", { dateStyle, timeStyle }).format(date);
}
