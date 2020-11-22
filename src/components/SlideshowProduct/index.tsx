import React from "react";
import Carousel from "react-elastic-carousel";
import { Product } from "src/types/Product";
import { CardProduct } from "src/components/CardProduct";
import { Link } from "react-router-dom";
interface Props {
	data: Product[];
}

let breakPoint = [
	{ width: 1, itemsToShow: 1, itemsToScroll: 1, showArrows: false },
	{ width: 400, itemsToShow: 1, itemsToScroll: 1 },
	{ width: 600, itemsToShow: 2, itemsToScroll: 2 },
	{ width: 960, itemsToShow: 3, itemsToScroll: 3 },
	{ width: 1280, itemsToShow: 4, itemsToScroll: 4 },
	{ width: 1920, itemsToShow: 5, itemsToScroll: 5 },
];

export const SlideshowProduct = ({ data }: Props) => {
	if (data.length !== 0) {
		let items = data.map((value, i) => {
			return (
				<Link
					key={i}
					to={() => `/product/${value.product_id}/${value.name}`}
					style={{ textDecoration: "none" }}
				>
					<CardProduct product={value} />
				</Link>
			);
		});

		return <Carousel breakPoints={breakPoint}>{items}</Carousel>;
	} else {
		return <></>;
	}
};
