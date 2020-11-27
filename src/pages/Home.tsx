import React, { useEffect, useState } from "react";
import { SlideshowProduct } from "src/components/SlideshowProduct";
import { Product } from "src/types/Product";
import { firestore } from "src/firebase";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		slide: {
			margin: theme.spacing(2),
		},
	})
);

export const Home = () => {
	document.title = "Home - ECommerce";
	const [discountData, setDiscountData] = useState<Product[]>([]);
	const [newData, setNewData] = useState<Product[]>([]);
	const classes = useStyles();
	const { t } = useTranslation();
	useEffect(() => {
		firestore
			.collection("products")
			.orderBy("discount", "desc")
			.where("discount", ">", 0)
			.limit(20)
			.get()
			.then((value) => {
				let data = value.docs.map((product) => product.data());
				setDiscountData(data);
			});

		firestore
			.collection("products")
			.orderBy("create_at", "desc")
			.limit(20)
			.get()
			.then((value) => {
				let data = value.docs.map((product) => product.data());
				setNewData(data);
			});
		console.log("call");
	}, []);

	return (
		<div>
			<div className={classes.slide}>
				<h1>{t("home.discounts")}</h1>
				<SlideshowProduct data={discountData} />
			</div>
			<div className={classes.slide}>
				<h1>{t("home.new")}</h1>
				<SlideshowProduct data={newData} />
			</div>
		</div>
	);
};
