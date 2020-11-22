import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAt-yxFObo0ljsvDxi0_Jh8zmgrvVCbfiA",
	authDomain: "ecommerce-516f2.firebaseapp.com",
	databaseURL: "https://ecommerce-516f2.firebaseio.com",
	projectId: "ecommerce-516f2",
	storageBucket: "ecommerce-516f2.appspot.com",
	messagingSenderId: "901473080949",
	appId: "1:901473080949:web:b8dfc2c3487a1acbde8a3c",
	measurementId: "G-6QM2341LJ0",
};

const fb = firebase.initializeApp(firebaseConfig);

export const storage = fb.storage();
export const firestore = fb.firestore();
export const auth = fb.auth();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
