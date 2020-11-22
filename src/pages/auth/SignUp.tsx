import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import { auth } from "src/firebase";
import { UserUploadImage } from "src/utils/userPhotoUpload";
import { storage } from "src/firebase";

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
				label="Username"
				inputRef={register({ required: true })}
				name="username"
				error={errors.username ? true : false}
				helperText={
					errors.username?.type === "required" && "Username is required"
				}
			/>

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
					(errors.email?.type === "required" && "Email is required") ||
					(errors.email?.type === "pattern" && "Email is invalid")
				}
			/>

			<TextField
				label="Password"
				type="password"
				inputRef={register({ required: true, minLength: 6 })}
				name="password"
				error={errors.password ? true : false}
				helperText={
					(errors.password?.type === "required" && "Password is required") ||
					(errors.password?.type === "minLength" &&
						"Password must have at least 6 characters")
				}
			/>

			<TextField
				label="Confirm Password"
				type="password"
				inputRef={register({ required: true, minLength: 6 })}
				name="confirmPassword"
				error={errors.password ? true : false}
				helperText={
					(errors.password?.type === "required" && "Password is required") ||
					(errors.password?.type === "minLength" &&
						"Password must have at least 6 characters")
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
					Upload Photo
				</Button>
			</label>

			<Button variant="contained" color="primary" type="submit">
				Sign Up
			</Button>
		</form>
	);
};
