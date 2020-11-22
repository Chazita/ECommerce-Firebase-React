export function AddCart(product_id: string) {
	let localCart: string | null = localStorage.getItem("cart");

	if (localCart) {
		let cartJson: { data: string[] } = JSON.parse(localCart);
		cartJson.data.push(product_id);
		localStorage.setItem("cart", JSON.stringify(cartJson));
	}
}

export function GetCart() {
	let localCart: string | null = localStorage.getItem("cart");

	if (localCart) {
		let cartJson: { data: string[] } = JSON.parse(localCart);
		return cartJson.data;
	} else {
		return [];
	}
}

export function ProductExist(product_id: string) {
	let localCart: string | null = localStorage.getItem("cart");

	if (localCart) {
		let cartJson: { data: string[] } = JSON.parse(localCart);
		const result = cartJson.data.some((element) => element === product_id);
		return result;
	}
	return false;
}

export function Remove(product_id: string) {
	let localCart: string | null = localStorage.getItem("cart");

	if (localCart) {
		let cartJson: { data: string[] } = JSON.parse(localCart);
		const index = cartJson.data.indexOf(product_id);
		if (index > -1) {
			cartJson.data.splice(index, 1);
		}
		localStorage.setItem("cart", JSON.stringify(cartJson));
	}
}
