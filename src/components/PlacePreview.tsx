import { Star, StarBorder } from '@mui/icons-material';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC } from 'react';
import { collection, deleteDoc, doc } from 'firebase/firestore';

import { Place, db } from '../firebase/firebase-new';
import useLoggedInUser from '../hooks/useLoggedUser';

const ReviewPreview: FC<Place> = ({ name, stars, url_image, url_desc, user_email}) => {
	const user = useLoggedInUser();

	const handleDelete = async (reviewId: any) => {
		try {
			// Create a reference to the document to be deleted
			const reviewRef = doc(collection(db, 'place'), reviewId);

			// Delete the document
			await deleteDoc(reviewRef);

			// Log success message
			console.log(`Document with ID ${reviewId} successfully deleted`);
		} catch (error) {
			console.error('Error deleting document: ', error);
		}
	};

	const canDelete = user?.email === user_email;

	return (
		<Card
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				width: '100%',
				textAlign: 'left'
			}}
		>
			<CardContent>
				<Typography variant="h5" color="textSecondary">
					{user_email}
				</Typography>
				<Box mb={2}>
					{[...Array(5).keys()].map(i =>
						i < stars ? (
							<Star key={i} color="primary" />
						) : (
							<StarBorder key={i} color="primary" />
						)
					)}
				</Box>
				{name && <Typography>{name}</Typography>}
			</CardContent>
			{canDelete && (
				<Box p={2} display="flex" justifyContent="flex-end">
					<IconButton color="primary" onClick={handleDelete}>
						<DeleteIcon />
					</IconButton>
				</Box>
			)}
		</Card>
	);
};

export default ReviewPreview;
