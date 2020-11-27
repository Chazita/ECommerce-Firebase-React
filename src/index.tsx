import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CssBaseLine from "@material-ui/core/CssBaseline";

import "./i18n";

ReactDOM.render(
	<>
		<Suspense
			fallback={
				<div>
					<h1>Is loading...</h1>
				</div>
			}
		>
			<CssBaseLine />
			<App />
		</Suspense>
	</>,
	document.getElementById("root")
);
