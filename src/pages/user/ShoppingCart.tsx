import React, { useEffect, useState } from "react";
import { ShoppingCartTable } from "src/components/ShoppingCartTable";
import { GetCart } from "src/utils/ShoppingCartFunct";
import { firestore } from "src/firebase";
import { Product } from "src/types/Product";

export const ShoppingCart = () => {
	const [productsId, setProductsId] = useState<string[]>(GetCart());
	const [productsData, setProductsData] = useState<Product[]>([]);

	useEffect(() => {
		if (productsId.length > 0) {
			console.log("call");
			firestore
				.collection("products")
				.where("product_id", "in", productsId)
				.get()
				.then((value) => {
					let products = value.docs.map((value) => value.data());
					setProductsData(products);
				});
		} else {
			setProductsData([]);
		}
	}, [productsId]);

	const refreshLocal = () => {
		setProductsId(GetCart());
	};

	return (
		<div>
			<ShoppingCartTable data={productsData} localRefresh={refreshLocal} />
		</div>
	);
};
