import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "src/contexts/authContext";

export const UserRoute = ({ children, ...rest }: any) => {
	const auth = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={({ location }) =>
				auth?.user ? (
					children
				) : (
					<Redirect to={{ pathname: "/sign-in", state: { from: location } }} />
				)
			}
		/>
	);
};
