import {
	AppBar,
	Container,
	Toolbar,
	Button,
	Box,
	ThemeProvider,
	CssBaseline,
	Typography
} from '@mui/material';
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
		<Container
					maxWidth="sm"
			
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						flexGrow: 1,
						gap: 2,
						margin: '50px'
					}}
				>
				 <h1>Top Interesting Locations in Brno</h1>

      <FavoritesMap />
				</Container>
	);
};

export default Home;
