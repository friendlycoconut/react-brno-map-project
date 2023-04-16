import L, { LatLngExpression } from "leaflet";
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import React, { FC, useEffect, useState } from "react";
import { GeometryMapPlace, MapPlace, Review, reviewsCollection } from "../firebase/firebase-new";
import useLoggedInUser from "../hooks/useLoggedUser";
import { onSnapshot } from "firebase/firestore";
import axios, { AxiosResponse } from 'axios';


export const FavoritesMap: FC = () =>  {
  const [reviews, setReviews] = useState<Review[]>([]);
  const position: LatLngExpression = [59.91174337077401, 10.750425582038146];
  const zoom: number = 15;
  const [mapPoints, setMapPoints] = useState<[]>()

  let response: any = undefined;
	const user = useLoggedInUser();

	const userEmail = user?.email;

	const [enableButton, setEnableButton] = useState(true);


  useEffect(()=>{
    axios.get('https://services6.arcgis.com/fUWVlHWZNxUvTUh8/arcgis/rest/services/PLACES/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson')
    .then(res=>{
        console.log('Response from main API: ',typeof(res.data.features))
        console.log('Home Data: ',res.data.features)          
        console.log('Colors Data: ',res.data.data)

        const filteredResult = res.data.features.filter( (element:any) => element.geometry!==null);
        console.log(filteredResult);
        setMapPoints(filteredResult);
   
    })
    .catch(err=>{
        console.log(err);
    })
},[])

	useEffect(() => {
		// Call onSnapshot() to listen to changes
    console.log(mapPoints);


		const unsubscribe = onSnapshot(reviewsCollection, snapshot => {
			// Access .docs property of snapshot
			setReviews(snapshot.docs.map(doc => doc.data()));
  
      
		});
		// Don't forget to unsubscribe from listening to changes
		return () => {
			unsubscribe();
		};
	}, []);





  return (
   
    <MapContainer
    center={[49.1951, 16.6068]}
    zoom={13}
    scrollWheelZoom={true}
    style={{ width: "100%", height: "calc(100vh - 15rem)" }}
  >
     
    <TileLayer
      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    /> {mapPoints?.map((park:any) => (
   
      <Marker
        key={park.id}
        position={[
          park.geometry?.coordinates[1] ,
          park.geometry?.coordinates[0] 
        ]}
       
      ><Popup>{park.properties.name}</Popup></Marker>
    ))}

    <Marker position={[49.1951, 16.6068]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
    <Marker position={[49.1951, 16.6058]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
</MapContainer>
  );
}



export default FavoritesMap;



