import React from "react";

export const AuthContext = React.createContext<
	{ user: firebase.User | undefined; loading: boolean } | undefined
>(undefined);
