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

import ButtonLink from './components/ButtonLink';
import Login from './routes/Login';
import { useLogin } from './hooks/useLogin';


import theme from './theme/theme';
import useLoggedInUser from './hooks/useLoggedUser';
import { signOut } from './firebase/firebase-new';

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
					maxWidth="sm"
					component="main"
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						flexGrow: 1,
						gap: 2
					}}
				>
					<Outlet />
				</Container>
			</ThemeProvider>
		);
	}
});





const loginRoute = new Route({
	getParentRoute: () => rootRoute,
	path: '/login',
	component: Login
});

const githubLoginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/githubLogin',
  component: 
});


const routeTree = rootRoute.addChildren([

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
