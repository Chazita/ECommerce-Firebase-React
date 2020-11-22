import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { ProductTable } from "../../components/ProductTable";
import { Product } from "../../types/Product";
import { ModalProduct } from "../../components/ModalProduct";
import { firestore } from "src/firebase";
import { AuthContext } from "src/contexts/authContext";

export const MysProduct = () => {
	document.title = "My Products - ECommerce";
	const authContext = useContext(AuthContext);
	const [dataModal, setDataModal] = useState<Product>();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [data, setData] = useState<Product[]>();

	useEffect(() => {
		const unsubcribe = firestore
			.collection("products")
			.orderBy("create_at", "desc")
			.where("user_id", "==", authContext?.user?.uid)
			.onSnapshot({
				next: (querySnapShot) => {
					const productItems = querySnapShot.docs.map((docSnapshot) =>
						docSnapshot.data()
					);
					setData(productItems);
				},
			});

		return unsubcribe;
	});

	return (
		<div>
			<Grid
				container
				justify="flex-end"
				direction="row"
				component={Paper}
				square
			>
				<Button
					color="primary"
					onClick={() => {
						setOpenModal(true);
					}}
				>
					Add Product
				</Button>
			</Grid>
			<ProductTable data={data} setData={setDataModal} setOpen={setOpenModal} />
			<ModalProduct
				open={openModal}
				close={setOpenModal}
				dataProduct={dataModal}
				setData={setDataModal}
			/>
		</div>
	);
};
