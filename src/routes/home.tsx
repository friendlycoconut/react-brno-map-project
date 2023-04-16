import { Box, Typography } from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import 'leaflet/dist/leaflet.css'
import ButtonLink from '../components/ButtonLink';
import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedUser';
import FavoritesMap from '../components/map-component';

const Home = () => {
	usePageTitle('Home');
	const user = useLoggedInUser();
	return (
		<>
			
			
			{user?.email && (
				<Typography variant="h4" textAlign="center">
					Welcome, {user.email}!
				</Typography>
			)}
			{/* TODO: Add 3 latest matches */}
			{/* TODO: Add 3 latest reviews */}
		</>
	);
};

export default Home;
