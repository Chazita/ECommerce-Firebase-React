import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Product } from "src/types/Product";

interface Props {
	product: Product;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			maxWidth: 350,
			minHeight: 270,
			margin: theme.spacing(2),
		},
		media: {
			maxWidth: 150,
		},
		discount: {
			color: "green",
		},
		price: {
			marginBottom: "21px",
		},
		priceDiscount: {
			textDecorationLine: "line-through",
		},
	})
);

export const CardProduct = ({ product }: Props) => {
	const classes = useStyles();

	if (product.discount && product.discount > 0) {
		const newPrice = product.price
			? product.price - (product.price * product.discount) / 100
			: 0;
		return (
			<Card className={classes.root}>
				<CardMedia
					className={classes.media}
					image={product.photo_url}
					component="img"
				/>

				<CardContent>
					<Typography variant="body1" color="textPrimary" display="inline">
						${newPrice}
					</Typography>
					<Typography
						variant="body2"
						color="textPrimary"
						display="inline"
						className={classes.discount}
					>
						{" " + product.discount}%
					</Typography>
					<Typography
						variant="body2"
						color="textPrimary"
						className={classes.priceDiscount}
					>
						${product.price}
					</Typography>
					<Typography variant="h5" color="textPrimary">
						{product.name}
					</Typography>
				</CardContent>
			</Card>
		);
	} else {
		return (
			<Card className={classes.root}>
				<CardMedia
					className={classes.media}
					image={product.photo_url}
					component="img"
				/>

				<CardContent>
					<Typography
						variant="body1"
						color="textPrimary"
						className={classes.price}
					>
						${product.price}
					</Typography>
					<Typography variant="h5" color="textPrimary">
						{product.name}
					</Typography>
				</CardContent>
			</Card>
		);
	}
};
