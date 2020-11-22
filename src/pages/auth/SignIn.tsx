import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { auth, GoogleProvider } from "src/firebase";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			flexDirection: "column",
			margin: "auto",
			width: "40%",
			"& > *": {
				margin: theme.spacing(1),
			},
			[theme.breakpoints.down("xl")]: {
				width: "25%",
			},
			[theme.breakpoints.down("lg")]: {
				width: "30%",
			},
			[theme.breakpoints.down("md")]: {
				width: "50%",
			},
			[theme.breakpoints.down("sm")]: {
				width: "60%",
			},
			[theme.breakpoints.down("xs")]: {
				width: "90%",
			},
		},
		router: {
			textAlign: "center",
		},
	})
);

interface SignInForm {
	email: string;
	password: string;
}

export const SignIn = () => {
	document.title = "Sign In - ECommerce";
	const { register, errors, handleSubmit } = useForm<SignInForm>();
	const classes = useStyles();

	const signIn = (data: SignInForm) => {
		auth.signInWithEmailAndPassword(data.email, data.password).then(() => {
			localStorage.setItem("cart", JSON.stringify({ data: [] }));
		});
	};

	const signInWithGoogle = () => {
		auth
			.signInWithPopup(GoogleProvider)
			.then((res) => {
				localStorage.setItem("cart", JSON.stringify({ data: [] }));
				console.log(res);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	return (
		<form className={classes.root} onSubmit={handleSubmit(signIn)}>
			<TextField
				label="Email"
				placeholder="Ex:some@email.com"
				inputRef={register({
					required: true,
					pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
				})}
				name="email"
				error={errors.email ? true : false}
				helperText={
					(errors.email?.type === "required" && "Email is required.") ||
					(errors.email?.type === "pattern" && "Email is invalid.")
				}
			/>
			<TextField
				label="Password"
				type="password"
				inputRef={register({ required: true, minLength: 6 })}
				name="password"
				error={errors.password ? true : false}
				helperText={
					(errors.password?.type === "required" && "Password is required.") ||
					(errors.password?.type === "minLength" && "Password is invalid.")
				}
			/>
			<Button type="submit" variant="contained" color="primary">
				Sign in
			</Button>
			<Button onClick={signInWithGoogle} variant="contained" color="secondary">
				Sign in with Google
			</Button>
			<Typography variant="body2" className={classes.router}>
				You don't have an account click <Link to="/sign-up">here</Link>.
			</Typography>
		</form>
	);
};
