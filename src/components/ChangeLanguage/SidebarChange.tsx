import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "src/i18n";

//#region Material components imports
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
//#endregion

//#region Material icons imports
import Translate from "@material-ui/icons/Translate";
//#endregion

export const SidebarChange = ({ keepOpen }: any) => {
	const { t } = useTranslation();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const openMenuClick = (event: React.MouseEvent<HTMLLIElement>) => {
		setAnchorEl(event.currentTarget);
		keepOpen(true);
	};

	const handleClose = () => {
		setAnchorEl(null);
		keepOpen(false);
	};

	const changeLanguage = (language: string) => {
		i18n.changeLanguage(language);
	};

	return (
		<div>
			<ListItem onClick={openMenuClick}>
				<ListItemIcon>
					<Translate />
				</ListItemIcon>
				<ListItemText primary={t("language")} />
			</ListItem>
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
