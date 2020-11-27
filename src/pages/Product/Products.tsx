import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Product } from "src/types/Product";
import { firestore } from "src/firebase";
import { Filtro } from "../../components/Filtro/Filtro";
import { ProductList } from "../../components/ProductList";
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from "@material-ui/core/styles";

interface ParamsTypes {
	pageNumber: string;
	category: string;
}

const useStyles = makeStyles(() =>
	createStyles({
		pagination: {
			display: "flex",
			justifyContent: "center",
			marginBottom: "1rem",
		},
	})
);

export const Products = () => {
	document.title = "Products - ECommerce";
	const history = useHistory();
	const { pageNumber, category } = useParams<ParamsTypes>();
	const [data, setData] = useState<Product[]>([]);
	const [size, setSize] = useState<number>(0);
	const [isLoaded, setIsLoaded] = useState(false);
	const [page, setPage] = useState(1);
	const classes = useStyles();

	console.log(history.location);

	useEffect(() => {
		console.log("call");
		if (history.location.pathname === `/products/1/${category}` && !isLoaded) {
			firestore
				.collection("products")
				.where("category", "==", category)
				.limit(500)
				.get()
				.then((snap) => {
					setSize(snap.docs.length);
					const productData: Product[] = snap.docs.map((product) =>
						product.data()
					);
					setData(productData);
					setIsLoaded(true);
					console.log(productData);
				});
		} else if (pageNumber === "1" && data.length === 0 && !isLoaded) {
			firestore
				.collection("products")
				.limit(500)
				.get()
				.then((snap) => {
					setSize(snap.docs.length);
					const productData: Product[] = snap.docs.map((product) =>
						product.data()
					);
					setData(productData);
				});
		} else if (+pageNumber > 1 && data.length === 0) {
			history.push("/products/1");
		}

		return () => {
			setIsLoaded(false);
		};
	}, [pageNumber, data, history, category, isLoaded]);

	const pageChange = (e: React.ChangeEvent<unknown>, value: number) => {
		window.scrollTo(0, 0);
		setPage(value);
		if (history.location.pathname === `/products/1/${category}`) {
			history.push(`/products/${value}/${category}`);
		} else {
			history.push(`/products/${value}`);
		}
	};

	return (
		<div>
			<Filtro loaded={setIsLoaded} />
			<Grid container direction="row" alignItems="center">
				<ProductList data={data.slice(page * 18 - 18, page * 18)} />
			</Grid>
			<Pagination
				count={Math.floor(size / 10)}
				shape="rounded"
				variant="outlined"
				showFirstButton
				showLastButton
				size="large"
				page={page}
				onChange={pageChange}
				className={classes.pagination}
			/>
		</div>
	);
};
