import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "",
	authDomain: "",
	databaseURL: "",
	projectId: "",
	storageBucket: "",
	messagingSenderId: "",
	appId: "",
	measurementId: "",
};

const fb = firebase.initializeApp(firebaseConfig);

export const storage = fb.storage();
export const firestore = fb.firestore();
export const auth = fb.auth();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
