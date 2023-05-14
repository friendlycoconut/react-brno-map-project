import { Typography } from "@mui/material";
import useLoggedInUser from "../hooks/useLoggedUser";
import usePageTitle from "../hooks/usePageTitle";
import { useEffect, useState } from "react";
import { Place, placeDBCollection } from "../firebase/firebase-new";
import { onSnapshot } from "firebase/firestore";
import PlacePreview from "../components/PlacePreview";

const Favorites = () => {
	usePageTitle('Saved Places');
	const [places, setPlaces] = useState<Place[]>([]);
	const user = useLoggedInUser();


	useEffect(() => {
	const unsubscribe = onSnapshot(placeDBCollection, snapshot => {	
	setPlaces(snapshot.docs.map(doc => doc.data()));
    console.log(places)
		});
		return () => {
			unsubscribe();
		};
	}, []);


	return (
		<>			
			{user?.email && (
				<Typography variant="h4" textAlign="center">
					Saved Places
				</Typography>
			)}

{places.map((r, i) => (
				<PlacePreview key={i} {...r} />
			))}
		</>
	);
};

export default Favorites;