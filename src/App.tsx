import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import {
	Home,
	SignIn,
	SignUp,
	MysProduct,
	Products,
	Error,
	SelectProduct,
	ShoppingCart,
} from "./pages";
import { AuthContext } from "./contexts/authContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { UserRoute } from "./utils/UserRoute";

export default function App() {
	const [user, loading, error] = useAuthState(auth);

	if (error) {
		return (
			<div>
				<h1>Error: {error}</h1>
			</div>
		);
	}

	if (loading) {
		return (
			<div>
				<h1>Is loading...</h1>
			</div>
		);
	}

	return (
		<BrowserRouter>
			<AuthContext.Provider value={{ user, loading }}>
				<NavBar />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/products/:pageNumber" component={Products} />
					<Route path="/product/:id/:name" component={SelectProduct} />
					<UserRoute path="/user/product">
						<MysProduct />
					</UserRoute>
					<UserRoute path="/user/shopping-cart">
						<ShoppingCart />
					</UserRoute>
					<Route path="/sign-in" component={SignIn} />
					<Route path="/sign-up" component={SignUp} />
					<Route component={Error} />
				</Switch>
			</AuthContext.Provider>
		</BrowserRouter>
	);
}
