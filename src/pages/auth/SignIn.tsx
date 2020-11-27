import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { auth, GoogleProvider } from "src/firebase";
import { useTranslation } from "react-i18next";

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
	const { t } = useTranslation();
	const history = useHistory();

	const signIn = (data: SignInForm) => {
		auth.signInWithEmailAndPassword(data.email, data.password).then(() => {
			localStorage.setItem("cart", JSON.stringify({ data: [] }));
			history.push("/home");
		});
	};

	const signInWithGoogle = () => {
		auth
			.signInWithPopup(GoogleProvider)
			.then(() => {
				localStorage.setItem("cart", JSON.stringify({ data: [] }));
				history.push("/home");
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	return (
		<form className={classes.root} onSubmit={handleSubmit(signIn)}>
			<TextField
				label={t("sign-in.email")}
				placeholder={t("sign-in.email-placeholder")}
				inputRef={register({
					required: true,
					pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
				})}
				name="email"
				error={errors.email ? true : false}
				helperText={
					(errors.email?.type === "required" &&
						t("sign-in.validation-email-required")) ||
					(errors.email?.type === "pattern" &&
						t("sign-in.validation-email-invalid"))
				}
			/>
			<TextField
				label={t("sign-in.passowrd")}
				type="password"
				inputRef={register({ required: true, minLength: 6 })}
				name="password"
				error={errors.password ? true : false}
				helperText={
					(errors.password?.type === "required" &&
						t("sign-in.validation-password-required")) ||
					(errors.password?.type === "minLength" &&
						t("sign-in.validation-password-minLength"))
				}
			/>
			<Button type="submit" variant="contained" color="primary">
				{t("sign-in.sign-in-button")}
			</Button>
			<Button onClick={signInWithGoogle} variant="contained" color="secondary">
				{t("sign-in.sign-in-google")}
			</Button>
			<Typography variant="body2" className={classes.router}>
				{t("sign-in.register-button")}{" "}
				<Link to="/sign-up">{t("sign-in.link-to-click")}</Link>.
			</Typography>
		</form>
	);
};
