import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { firestore } from "src/firebase";
import { Product } from "src/types/Product";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AddCart, ProductExist, Remove } from "src/utils/ShoppingCartFunct";
import { AuthContext } from "src/contexts/authContext";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: theme.spacing(2),
		},
		text: {
			[theme.breakpoints.down("xs")]: {
				marginTop: theme.spacing(2),
			},
		},
		image: {
			width: "100%",
		},
		discount: {
			color: "green",
			marginLeft: theme.spacing(2),
		},
		priceDiscounted: {
			marginTop: theme.spacing(2),
			textDecorationLine: "line-through",
			color: "grey",
		},
		gridImage: {
			[theme.breakpoints.up("sm")]: {
				marginRight: theme.spacing(2),
			},
		},
		button: {
			marginTop: theme.spacing(2),
		},
	})
);

export const SelectProduct = () => {
	const { id, name } = useParams<{ id: string; name: string }>();
	const [product, setProduct] = useState<Product>();
	const [cartExist, SetCartExist] = useState<boolean>(false);
	const auth = useContext(AuthContext);
	const classes = useStyles();

	document.title = name + " - ECommerce";
	let price;

	useEffect(() => {
		console.log("call");
		firestore
			.collection("products")
			.doc(id)
			.get()
			.then((value) => {
				setProduct(value.data());
			});
		SetCartExist(ProductExist(id));
	}, [id]);

	if (product?.name !== name) {
		return <></>;
	}

	if (product?.discount !== undefined && product?.price !== undefined) {
		if (product.discount > 0) {
			price = (
				<>
					<Typography variant="body2" className={classes.priceDiscounted}>
						${product.price}
					</Typography>
					<Grid container direction="row">
						<Typography variant="h6">
							${product.price - (product?.price * product?.discount) / 100}
						</Typography>
						<Typography variant="h6" className={classes.discount}>
							{product?.discount}%
						</Typography>
					</Grid>
				</>
			);
		} else {
			price = (
				<Typography variant="h6" className={classes.text}>
					${product.price}
				</Typography>
			);
		}
	}

	let buttons;
	if (auth?.user) {
		buttons = (
			<>
				<Button
					fullWidth
					color="primary"
					variant="contained"
					className={classes.button}
				>
					Buy
				</Button>
				{cartExist ? (
					<Button
						fullWidth
						color="secondary"
						variant="contained"
						className={classes.button}
						onClick={() => {
							Remove(id);
							SetCartExist(ProductExist(id));
						}}
					>
						Remove to Shopping Cart
					</Button>
				) : (
					<Button
						fullWidth
						color="secondary"
						variant="contained"
						className={classes.button}
						onClick={() => {
							AddCart(id);
							SetCartExist(ProductExist(id));
						}}
					>
						Add to Shopping Cart
					</Button>
				)}
			</>
		);
	}

	return (
		<div>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				className={classes.root}
			>
				<Grid item xs={10} sm={6} md={4} className={classes.gridImage}>
					<img
						src={product.photo_url}
						alt="doesn't show"
						className={classes.image}
					/>
				</Grid>

				<Grid item xs={10} sm={3} md={4}>
					<Typography variant="h6" className={classes.text}>
						{product.name}
					</Typography>
					{price}
					{buttons}
				</Grid>
			</Grid>
		</div>
	);
};
