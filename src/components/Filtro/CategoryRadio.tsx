import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { categorys } from "../../types/Category";

export const CategoryRadio = ({ register }: any) => {
	let category = categorys.map((option, index) => {
		return (
			<FormControlLabel
				control={<Radio />}
				key={index}
				label={option.name}
				name={option.value}
				value={option.value}
				color="default"
			/>
		);
	});

	return <>{category}</>;
};
