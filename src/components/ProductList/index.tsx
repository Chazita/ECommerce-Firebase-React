import React from "react";
import { CardProduct } from "../CardProduct";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Product } from "src/types/Product";

interface Props {
	data: Product[];
}

const useStyles = makeStyles(() =>
	createStyles({
		link: {
			textDecoration: "none",
		},
	})
);

export const ProductList = ({ data }: Props) => {
	const classes = useStyles();
	let list: any = data.map((value: Product, index) => (
		<Grid
			item
			xs={12}
			sm={6}
			md={4}
			lg={3}
			xl={2}
			key={index}
			component={Link}
			to={() => `/product/${value.product_id}/${value.name}`}
			className={classes.link}
		>
			<CardProduct product={value} />
		</Grid>
	));

	return list;
};
