import React, { useState } from "react";
import i18n from "src/i18n";

//#region Material components imports
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
//#endregion
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TranslateIcon from "@material-ui/icons/Translate";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		translate: {
			color: "white",
			textDecoration: "none",
			marginRight: theme.spacing(2),
			[theme.breakpoints.down("md")]: {
				display: "none",
			},
		},
	})
);

export const ToolbarChange = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const classes = useStyles();

	const openMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const changeLanguage = (language: string) => {
		i18n.changeLanguage(language);
	};

	return (
		<div className={classes.translate}>
			<IconButton color="inherit" onClick={openMenuClick}>
				<TranslateIcon />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem
					onClick={() => {
						changeLanguage("en");
						handleClose();
					}}
				>
					<Typography>English</Typography>
				</MenuItem>
				<MenuItem
					onClick={() => {
						changeLanguage("es");
						handleClose();
					}}
				>
					<Typography>Español</Typography>
				</MenuItem>
			</Menu>
		</div>
	);
};
