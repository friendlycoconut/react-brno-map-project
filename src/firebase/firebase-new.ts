import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	onAuthStateChanged,
	User
} from 'firebase/auth';
import {
	collection,
	CollectionReference,
	doc,
	DocumentReference,
	getFirestore,
	Timestamp
} from 'firebase/firestore';

// Initialize Firebase

const firebaseConfig = {
    apiKey: "AIzaSyBuffMe_kzeNOorjQNbAhj8q27cgTo0Z24",
    authDomain: "react-brno-app.firebaseapp.com",
    projectId: "react-brno-app",
    storageBucket: "react-brno-app.appspot.com",
    messagingSenderId: "665113238679",
    appId: "1:665113238679:web:2a93bbadf62e2747305dd2"
};

initializeApp(firebaseConfig);

// Authentication
const auth = getAuth();

// Sign up handler
export const signUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

// Sign in handler
export const signIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

// Sign out handler
export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);

// Firestore
const db = getFirestore();

// Reviews collection
export type Review = {
	by: string;
	stars: number;
	description?: string;
};

export const reviewsCollection = collection(
	db,
	'reviews'
) as CollectionReference<Review>;

export const reviewsDocument = (id: string) =>
	doc(db, 'reviews', id) as DocumentReference<Review>;

// Matches collection
export type Match = {
	by: string;
	date: Timestamp;
};

// TODO: Add matches collection
export {auth}