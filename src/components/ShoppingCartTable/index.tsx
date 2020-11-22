import React from "react";
import { Product } from "src/types/Product";
import { Remove } from "src/utils/ShoppingCartFunct";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

import Clear from "@material-ui/icons/Clear";

interface Props {
	data: Product[];
	localRefresh: any;
}

export const ShoppingCartTable = ({ data, localRefresh }: Props) => {
	return (
		<TableContainer component={Paper} square>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Image</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Price</TableCell>
						<TableCell>Delete</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data ? (
						data.map((row: Product) => (
							<TableRow key={row.product_id}>
								<TableCell>
									<img src={row.photo_url} alt="Doesn't found" height="50px" />
								</TableCell>
								<TableCell>{row.name}</TableCell>
								<TableCell>
									$
									{row.discount && row.price
										? row.price - (row.price * row.discount) / 100
										: row.price}
								</TableCell>
								<TableCell>
									<IconButton
										onClick={() => {
											Remove(row.product_id ? row.product_id : "");
											localRefresh();
										}}
									>
										<Clear />
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
