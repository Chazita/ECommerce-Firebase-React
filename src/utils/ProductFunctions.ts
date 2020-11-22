import { Product } from "src/types/Product";
import { firestore, storage } from "src/firebase";

async function UploadProductPhoto(product_id: string, file: File) {
	return storage.ref(`products/${product_id}`).put(file);
}

export async function AddProduct(data: Product, file: File) {
	const produtRef = firestore.collection("products").doc();
	const upload = UploadProductPhoto(produtRef.id, file);

	upload.then((uploadTask) =>
		uploadTask.task.on(
			"state_changed",
			() => {},
			(error) => {
				console.log(error);
			},
			() => {
				storage
					.ref(`products/${produtRef.id}`)
					.getDownloadURL()
					.then((firebaseUrl) => {
						let time: string = new Date().toISOString();
						data.photo_url = firebaseUrl;
						data.create_at = time;
						data.update_at = time;
						data.product_id = produtRef.id;
						produtRef.set(data);
					});
			}
		)
	);
}

export async function EditProduct(data: Product, file: File[]) {
	const produtRef = firestore.collection("products").doc(data.product_id);
	console.log(data, file);
	if (file.length > 0) {
		const upload = UploadProductPhoto(produtRef.id, file[0]);
		upload.then((uploadTask) =>
			uploadTask.task.on(
				"state_changed",
				() => {},
				(error) => {
					console.log(error);
				},
				() => {
					storage
						.ref(`products/${produtRef.id}`)
						.getDownloadURL()
						.then((firebaseUrl) => {
							let time: string = new Date().toISOString();
							data.photo_url = firebaseUrl;
							data.update_at = time;
							produtRef.update(data);
						});
				}
			)
		);
	} else {
		let time: string = new Date().toISOString();
		data.update_at = time;
		produtRef.update(data);
	}
}

export async function DeleteProduct(product_id: string | undefined) {
	if (product_id) {
		firestore
			.collection("products")
			.doc(product_id)
			.delete()
			.then(() => console.log("Se ha elimando el producto"))
			.catch((error: Error) => console.log(error.message));
		storage.ref(`products/${product_id}`).delete();
	}
}
