import { Star, StarBorder } from '@mui/icons-material';
import { Box, Card, CardContent, IconButton, Link, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC, useContext } from 'react';
import { collection, deleteDoc, doc } from 'firebase/firestore';

import { Place, db } from '../firebase/firebase';
import useLoggedInUser from '../hooks/useLoggedUser';
import { AuthContext } from '../context/auth-context';
import ButtonLink from './ButtonLink';

const ReviewPreview: FC<Place> = ({ name, stars, url_image, url_desc, user_email}) => {
	const user = useLoggedInUser();
	const { currentUser, signOut } = useContext(AuthContext)
  
	const handleDelete = async (reviewId: any) => {
		try {
			// Create a reference to the document to be deleted
			const reviewRef = doc(collection(db, 'place'), reviewId);

		
			// Log success message
			console.log(`Document with ID ${reviewId} successfully deleted`);
		} catch (error) {
			console.error('Error deleting document: ', error);
		}
	};

	const canDelete = user?.email === user_email;

	if(user?.email===user_email){
		return (
	
		
			<Card
			  sx={{
				position: 'relative',
				width: '100%',
				height: '70%',
				padding: '1em',
				border: 'solid #D3D3D3 2px',
			  }}
			>
				
			<img
				src={url_image}
				width="100%"
				height="100%"
			/>
			  <CardContent sx={{ padding: '16px' }}>
				<div>
				  <h2>{name}</h2>
	
				  <Box mb={2}>
						{[...Array(5).keys()].map(i =>
							i < stars ? (
								<Star key={i} color="primary" />
							) : (
								<StarBorder key={i} color="primary" />
							)
						)}
					</Box>
				  <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
					<a href={url_desc}>
					  <button className="learn-more-btn">Learn More</button>
					</a>
				  </div>
				</div>
			  </CardContent>
			</Card>
		  );
	}else return(

		<div>
		<h3>You have not added any places.</h3>
	  </div>
	);
	
		
};
export default ReviewPreview;
