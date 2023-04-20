import {
	AppBar,
	Container,
	Toolbar,
	Button,
	Box,
	ThemeProvider,
	CssBaseline
} from '@mui/material';
import {
	RouterProvider,
	RootRoute,
	Outlet,
	Router,
	Route
} from '@tanstack/react-router';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import ButtonLink from './components/ButtonLink';
import Login from './routes/Login';
import home from './routes/Home';
import { useLogin } from './hooks/useLogin';

import "leaflet/dist/leaflet.css";
import theme from './theme/theme';
import useLoggedInUser from './hooks/useLoggedUser';
import { signOut } from './firebase/firebase-new';
import FavoritesMap from './components/map-component';

const rootRoute = new RootRoute({
	component: () => {
		const user = useLoggedInUser();

		return (
			
			<ThemeProvider theme={theme}>
			
				<CssBaseline />

				<AppBar>
					<Container maxWidth="sm">
						<Toolbar disableGutters sx={{ gap: 2 }}>
							<ButtonLink to="/">Home</ButtonLink>
				
							<Box sx={{ flexGrow: 1 }} />
							{!user ? (
								<ButtonLink to="/login">Login</ButtonLink>
							) : (
								<Button onClick={signOut}>Logout</Button>
							)}
						</Toolbar>
					</Container>
				</AppBar>

				<Container
					
					component="main"
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
				 
				 <h1>Top interesting locations in Brno</h1>
	  <Outlet />
      <FavoritesMap />
				</Container>
				<div className="App">
  
    </div>
			</ThemeProvider>
		);
	}
});


const loginRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/login',
	component: Login
});

const indexRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/',
	component: home
});


const routeTree = rootRoute.addChildren([
  indexRoute,
	loginRoute
]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Register {
		router: typeof router;
	}
}

const App = () => <RouterProvider router={router} />;

export default App;
