import React from "react";
import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";
import { AuthContext } from "src/contexts/authContext";
import { auth } from "src/firebase";

//#region components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
//#endregion

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			"& a": {
				color: "white",
				textDecoration: "none",
				marginRight: theme.spacing(2),
				[theme.breakpoints.down("md")]: {
					display: "none",
				},
			},
		},
		title: {
			flexGrow: 1,
		},
		menuButton: {
			display: "none",
			marginRight: theme.spacing(2),
			[theme.breakpoints.down("md")]: {
				display: "inline",
			},
		},
		sidenav: {
			width: "10rem",
		},
		username: {
			[theme.breakpoints.down("md")]: {
				display: "none",
				marginRight: "0px",
			},
			display: "block",
			marginRight: "10px",
		},
		link: {
			textDecoration: "none",
			color: "black",
		},
	})
);

export const NavBar = () => {
	const userContext = React.useContext(AuthContext);
	const [sideNav, setSideNav] = React.useState(false);
	const [menuOpen, setMenuOpen] = React.useState<null | HTMLElement>(null);

	const handleUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setMenuOpen(event.currentTarget);
	};

	const signOut = () => {
		setMenuOpen(null);
		localStorage.removeItem("cart");
		auth.signOut();
	};

	const classes = useStyles();
	let logged: JSX.Element;

	if (userContext?.user) {
		logged = (
			<>
				<Button color="inherit" onClick={handleUserMenu}>
					<Typography variant="inherit" className={classes.username}>
						{userContext.user.displayName}
					</Typography>

					<Avatar
						src={
							userContext.user.photoURL
								? userContext.user.photoURL
								: "https://censur.es/wp-content/uploads/2019/03/default-avatar.png"
						}
					/>
				</Button>

				<Menu
					anchorEl={menuOpen}
					keepMounted
					open={Boolean(menuOpen)}
					onClose={() => setMenuOpen(null)}
					style={{ width: "100%" }}
				>
					<MenuItem onClick={() => setMenuOpen(null)}>
						<Link className={classes.link} to="/user/product">
							My Products
						</Link>
					</MenuItem>
					<MenuItem>
						<Link className={classes.link} to="/user/shopping-cart">
							<Typography>
								<ShoppingCartIcon />
								Shopping-Cart
							</Typography>
						</Link>
					</MenuItem>
					<MenuItem onClick={signOut}>SignOut</MenuItem>
				</Menu>
			</>
		);
	} else {
		logged = (
			<Typography component={Link} to="/sign-in">
				Login
			</Typography>
		);
	}

	return (
		<AppBar position="static" className={classes.root}>
			<Toolbar>
				<IconButton
					className={classes.menuButton}
					color="inherit"
					onClick={() => setSideNav((prev) => (prev = !sideNav))}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" className={classes.title}>
					E-Commerce
				</Typography>
				<Typography component={Link} to="/">
					Home
				</Typography>
				<Typography component={Link} to="/products/1">
					Products
				</Typography>
				{logged}
			</Toolbar>

			<Drawer
				open={sideNav}
				onClose={() => setSideNav((prev) => (prev = !sideNav))}
			>
				<List
					className={classes.sidenav}
					role="presentation"
					onClick={() => setSideNav((prev) => (prev = !sideNav))}
				>
					<ListItem button>
						<ListItemIcon>
							<Close />
						</ListItemIcon>
					</ListItem>

					<Divider />

					<ListItem component={Link} to="/" button>
						<ListItemText primary="Home" />
					</ListItem>
					<ListItem component={Link} to="/products/1" button>
						<ListItemText primary="Product" />
					</ListItem>
					{userContext?.user ? (
						<></>
					) : (
						<ListItem component={Link} to="/sign-in" button>
							<ListItemText primary="Sign-In" />
						</ListItem>
					)}
				</List>
			</Drawer>
		</AppBar>
	);
};
