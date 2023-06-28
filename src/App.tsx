import { useQuery } from "react-query";
import { GetUser } from "./utils/auth";

function App() {
	const userQuery = useQuery("user", GetUser);

	return (
		<div>
			<a className="block" href="/.auth/login/aad">
				Login with Azure AD
			</a>
			<a className="block my-2" href="/.auth/logout">
				Logout
			</a>

			{userQuery.data && (
				<pre>
					<code>{JSON.stringify(userQuery.data, null, 4)}</code>
				</pre>
			)}
		</div>
	);
}

export default App;
