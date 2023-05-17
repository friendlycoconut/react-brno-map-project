import L, { LatLngExpression } from "leaflet";
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import React, { FC, useEffect, useState } from "react";
import { GeometryMapPlace, MapPlace, Place, placeDBCollection } from "../firebase/firebase";
import useLoggedInUser from "../hooks/useLoggedUser";
import { addDoc, onSnapshot } from "firebase/firestore";
import axios, { AxiosResponse } from 'axios';
import { Link } from "react-router-dom";
import { Star, StarBorder } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { setDoc, doc, FieldValue } from 'firebase/firestore';
import MarkerClusterGroup from "react-leaflet-markercluster";

import { useNavigate } from 'react-router-dom';
import { iconPerson } from "./Icon";
  
export const FavoritesMap: FC = () =>  {
  const [places, setPlaces] = useState<Place[]>([]);
  const [stars, setStars] = useState(1);
  const [mapPoints, setMapPoints] = useState<[]>();
  const [submitError, setSubmitError] = useState<string>();
  const navigate = useNavigate();
  


  let response: any = undefined;
	const user = useLoggedInUser();

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


		const unsubscribe = onSnapshot(placeDBCollection, snapshot => {
			// Access .docs property of snapshot
			setPlaces(snapshot.docs.map(doc => doc.data()));
      console.log(places)
  
      
		});
		// Don't forget to unsubscribe from listening to changes
		return () => {
			unsubscribe();
		};
	}, []);

  useEffect(() => {
    // get places from the DB
    const unsubscribe = onSnapshot(placeDBCollection, snapshot => {	
    setPlaces(snapshot.docs.map(doc => doc.data()));

    
      console.log(places)
      });
      return () => {
        unsubscribe();
      };
    }, []);

     const getStars = (nameToSearch: string) => {


      const result = places.find(placeEntity => placeEntity.name === nameToSearch)?.stars
      return (typeof result  === 'undefined') ? stars : result;
    }


    const handleSubmit = async (i:number, setName: string,

       setUrlImage: string, 
       setUrlDesc: string) => {
     
      // TODO: Prevent submitting for not logged in users
      try {
        if (!user) {
          throw new Error('You must be logged in to add a stars');
        }

        const userEmailResult = (user.email  != null) ? user?.email : "testEmail";
     
        const reviewRef = doc(placeDBCollection, user?.email ?? 'anon');
        await addDoc(placeDBCollection, {
          name: setName,
          stars: i+1,
          url_image: setUrlImage,
          url_desc: setUrlDesc,
          user_email: userEmailResult
          
        });

        navigate('/favourite'); 

     
      } catch (err) {
        setSubmitError(
          err instanceof Error ? err.message : 'Unknown error occurred'
        );
      }
    };


  return (
    <MapContainer
    center={[49.1951, 16.6068]}
    zoom={10}
    scrollWheelZoom={true}
    style={{ width: "100%", height: "calc(100vh - 15rem)" }}
  >
    
    <TileLayer
      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    /> 
      <MarkerClusterGroup>
	      {mapPoints?.map((park:any) => (
   
      <Marker
        key={park.id}
        position={[
          park.geometry?.coordinates[1] ,
          park.geometry?.coordinates[0] 
        ]}
        icon={ iconPerson }
        
       
      ><Popup>
        <div>
            <h2>{park.properties.name.replace(/&#8211;/gi, "-").replace(/&nbsp;/gi, " ")}</h2>
            <img src={park.properties.image} width="300px" height="200px"></img>
            <Link to={park.properties.url}>
               <button className="learn-more-btn">Learn More</button>
            </Link>

            {!user? null : ( <Box >
						{[...Array(5).keys()].map(i => (
							<IconButton
								key={i}
								color="primary"
								component="span"
								onClick={() => {
                  setStars(i+1);
                 
                  handleSubmit(i,park.properties.name, park.properties.image,
                    park.properties.url);
                  

                  }
                  }
							>
                
								{i < getStars(park.properties.name) ? <Star /> : <StarBorder />}
							</IconButton>
						))}
					</Box>)}
           
        </div> </Popup></Marker>
	      
    ))}
	       </MarkerClusterGroup>

    
</MapContainer>
  );
}


export default FavoritesMap;



