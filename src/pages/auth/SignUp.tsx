import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import { auth } from "src/firebase";
import { UserUploadImage } from "src/utils/userPhotoUpload";
import { storage } from "src/firebase";
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
		input: {
			display: "none",
		},
	})
);

interface SignUpForm {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	file: File[];
}

export const SignUp = () => {
	document.title = "Sign Up - ECommerce";
	const classes = useStyles();
	const { register, errors, handleSubmit } = useForm<SignUpForm>();

	const { t } = useTranslation();

	const signUpSubmit = async (data: SignUpForm) => {
		if (data.password === data.confirmPassword) {
			auth
				.createUserWithEmailAndPassword(data.email, data.password)
				.then((userCredentials) => {
					let uid = userCredentials.user?.uid;
					if (uid) {
						UserUploadImage(uid, data.file[0]).then((uploadTask) =>
							uploadTask.task.on(
								"state_changed",
								() => {},
								(error) => {
									console.log(error);
								},
								() => {
									storage
										.ref(`userPhoto/${uid}`)
										.getDownloadURL()
										.then((firebaseUrl) => {
											userCredentials.user?.updateProfile({
												displayName: data.username,
												photoURL: firebaseUrl,
											});
										});
								}
							)
						);
					}
				});
		}
	};

	return (
		<form onSubmit={handleSubmit(signUpSubmit)} className={classes.root}>
			<TextField
				label={t("sign-up.username")}
				inputRef={register({ required: true })}
				name="username"
				error={errors.username ? true : false}
				helperText={
					errors.username?.type === "required" && t("sign-up.validation-name")
				}
			/>

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
						t("sign-up.validation-password-minLength"))
				}
			/>

			<TextField
				label={t("sign-up.password-confirm")}
				type="password"
				inputRef={register({ required: true, minLength: 6 })}
				name="confirmPassword"
				error={errors.password ? true : false}
				helperText={
					(errors.password?.type === "required" &&
						t("sign-in.validation-password-required")) ||
					(errors.password?.type === "minLength" &&
						t("sign-up.validation-password-minLength"))
				}
			/>

			<input
				accept="image/*"
				className={classes.input}
				id="contained-button-file"
				type="file"
				name="file"
				ref={register({ required: true })}
			/>

			<label htmlFor="contained-button-file">
				<Button
					variant="contained"
					color="secondary"
					component="span"
					fullWidth
				>
					{t("sign-up.upload-photo")}
				</Button>
			</label>

			<Button variant="contained" color="primary" type="submit">
				{t("sign-up.register")}
			</Button>
		</form>
	);
};
