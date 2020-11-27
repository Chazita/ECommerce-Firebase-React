import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { Product } from "../../types/Product";
import { categorys } from "../../types/Category";
import { useForm, Controller } from "react-hook-form";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { AddProduct, EditProduct } from "src/utils/ProductFunctions";
import { AuthContext } from "src/contexts/authContext";
import { useTranslation } from "react-i18next";

interface Props {
	open: boolean;
	close: any;
	dataProduct?: Product;
	setData: any;
}

interface productForm {
	name: string;
	price: string;
	discount: string;
	photo: File[];
	category: string;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		input: {
			marginBottom: "25px",
		},
		img: {
			display: "block",
			height: "100px",
		},
	})
);

export const ModalProduct = ({ open, close, dataProduct, setData }: Props) => {
	const auth = React.useContext(AuthContext);
	const { register, errors, handleSubmit, control } = useForm<productForm>();
	const classes = useStyles();
	const { t } = useTranslation();

	const submitProduct = (data: productForm) => {
		if (dataProduct) {
			let product: Product = {
				product_id: dataProduct.product_id,
				category: data.category,
				name: data.name,
				price: +data.price,
				discount: +data.discount,
			};
			EditProduct(product, data.photo);
			closeModal();
		} else {
			let product: Product = {
				name: data.name,
				discount: +data.discount,
				price: +data.price,
				category: data.category,
				user_id: auth?.user?.uid,
				user_name: auth?.user?.displayName?.toString(),
			};
			AddProduct(product, data.photo[0]);
		}
	};

	const closeModal = () => {
		if (dataProduct) {
			setData(undefined);
		}
		close(false);
	};

	return (
		<Dialog open={open} onClose={() => close(false)}>
			<DialogTitle>
				{dataProduct
					? t("product-modal.title-edit")
					: t("product-modal.title-add")}
			</DialogTitle>
			<form onSubmit={handleSubmit(submitProduct)}>
				<DialogContent>
					<img
						src={dataProduct?.photo_url}
						alt="no existe"
						className={classes.img}
					/>
					<input
						type="file"
						ref={dataProduct ? register : register({ required: true })}
						name="photo"
						className={classes.input}
					/>
					<TextField
						fullWidth
						defaultValue={dataProduct ? dataProduct.name : ""}
						variant="outlined"
						inputRef={register({ required: true })}
						name="name"
						className={classes.input}
						label={t("product-modal.product-name")}
						error={errors.name ? true : false}
					/>
					<TextField
						fullWidth
						defaultValue={dataProduct ? dataProduct.price : ""}
						variant="outlined"
						inputRef={register({ required: true })}
						name="price"
						className={classes.input}
						label={t("product-modal.product-price")}
						error={errors.price ? true : false}
					/>
					<TextField
						fullWidth
						defaultValue={dataProduct ? dataProduct.discount : ""}
						variant="outlined"
						inputRef={register({ required: true })}
						name="discount"
						className={classes.input}
						label={t("product-modal.product-discount")}
						error={errors.discount ? true : false}
					/>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>{t("product-modal.product-category")}</InputLabel>
						<Controller
							name="category"
							control={control}
							defaultValue={dataProduct ? dataProduct.category : ""}
							as={
								<Select label={t("product-modal.product-category")}>
									{categorys.map((category) => (
										<MenuItem key={category.value} value={category.value}>
											{category.name}
										</MenuItem>
									))}
								</Select>
							}
						/>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeModal} variant="contained" color="secondary">
						{t("product-modal.button-cancel")}
					</Button>
					<Button type="submit" variant="contained" color="primary">
						{dataProduct
							? t("product-modal.button-save")
							: t("product-modal.button-create")}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
