import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
	signOut as authSignOut,
  signInWithEmailAndPassword,
  NextOrObserver,
  User
} from 'firebase/auth';
import { getFirebaseConfig } from './firebase-config';
import { getFirestore, collection, CollectionReference, doc, DocumentReference } from 'firebase/firestore';

const app = initializeApp(getFirebaseConfig());
export const auth = getAuth(app);



// Sign out handler
export const signOut = () => authSignOut(auth);

export const userStateListener = (callback:NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback)
}

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);

// Firestore
export const db = getFirestore();

export type Place = {
	name: string; 
	stars: number;
	url_image: string;
	url_desc: string;
	user_email: string;
}



// Map place collection
export type MapPlace = {
	geometry: {coordinates: [];
				type:"Point";};
	id:string;			
}

export type GeometryMapPlace = {
	coordinates: [];
				type:"Point";
}

export const placeDBCollection = collection(
		db,
		'place'
	) as CollectionReference<Place>;
	
	export const placeDBDocument = (id: string) =>
		doc(db, 'place', id) as DocumentReference<Place>;


export const SignOutUser = async () => await signOut();
