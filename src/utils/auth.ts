export async function GetUser() {
	const response = await fetch("/.auth/me");
	const payload = await response.json();

	const { clientPrincipal } = payload;

	return clientPrincipal;
}
