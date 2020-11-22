import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { Product } from "../../types/Product";
import { DeleteProduct } from "src/utils/ProductFunctions";

interface Props {
	data: Product[] | undefined;
	setData: any;
	setOpen: any;
}

export const ProductTable = ({ data, setData, setOpen }: Props) => {
	const editRow = (data: Product) => {
		setData(data);
		setOpen(true);
	};

	const deleteRow = (id: string | undefined) => {
		DeleteProduct(id);
	};

	return (
		<TableContainer component={Paper} square>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Price</TableCell>
						<TableCell>Discount</TableCell>
						<TableCell>Create at</TableCell>
						<TableCell>Accion</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data ? (
						data.map((row: Product) => (
							<TableRow key={row.product_id}>
								<TableCell>{row.name}</TableCell>
								<TableCell>${row.price}</TableCell>
								<TableCell>{row.discount}%</TableCell>
								<TableCell>{row.create_at}</TableCell>
								<TableCell>
									<IconButton color="primary" onClick={() => editRow(row)}>
										<Edit />
									</IconButton>
									<IconButton
										color="secondary"
										onClick={() => deleteRow(row.product_id)}
									>
										<Delete />
									</IconButton>
								</TableCell>
							</TableRow>
						))
					) : (
						<></>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
