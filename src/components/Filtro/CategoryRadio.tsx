import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { useTranslation } from "react-i18next";

type Category = {
	name: string;
	value: string;
};

export const CategoryRadio = () => {
	const { t } = useTranslation();

	let categorys: Category[] = t("categorys");
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
