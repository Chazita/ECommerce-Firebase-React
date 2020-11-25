import React from "react";
import { useForm, Controller } from "react-hook-form";
import { CategoryRadio } from "./CategoryRadio";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RadioGroup from "@material-ui/core/RadioGroup";
import { useHistory } from "react-router-dom";

export const Filtro = ({ loaded }: any) => {
	const { register, handleSubmit, control } = useForm();
	const history = useHistory();
	const filterSubmit = (data: any) => {
		// filter(data.category);
		history.push("/products/1/" + data.category);
	};

	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>Filter</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container justify="center" alignItems="center">
					<Grid item xs={10} sm={8} lg={4}>
						<form onSubmit={handleSubmit(filterSubmit)}>
							<Controller
								rules={{ required: true }}
								control={control}
								name="category"
								defaultValue="vehicles"
								as={
									<RadioGroup>
										<CategoryRadio register={register} />
									</RadioGroup>
								}
							/>

							<Button
								fullWidth
								type="submit"
								color="primary"
								variant="contained"
							>
								Apply
							</Button>
							<Button
								fullWidth
								type="button"
								color="secondary"
								variant="contained"
								onClick={() => {
									history.push("/products/1/");
									loaded(false);
								}}
							>
								Reset
							</Button>
						</form>
					</Grid>
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
};
