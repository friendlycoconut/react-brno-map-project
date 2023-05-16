import { Button, Paper, Typography, TextField, Box } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';

import useField from '../hooks/useField';
import { useLogin } from '../hooks/useLogin';
import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedUser';


const Login = () => {
	const userLogged = useLoggedInUser();
	usePageTitle('Login');

	const navigate = useNavigate();

	const [isSignUp, setSignUp] = useState(false);
	const { login, isPending } = useLogin();


	const [submitError, setSubmitError] = useState<string>();

	return (
		<Paper
			component="form"
			onSubmit={async (e: FormEvent) => () => navigate("/")}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				p: 4,
				gap: 2
			}}
		>
			<Typography variant="h4" component="h2" textAlign="center" mb={3}>
				Sign in
			</Typography>

			{userLogged? (<Box
				sx={{
					display: 'flex',
					gap: 2,
					alignItems: 'center',
					alignSelf: 'flex-end',
					mt: 2
				}}
			>
				{submitError && (
					<Typography
						variant="caption"
						textAlign="right"
						sx={{ color: 'error.main' }}
					>
						{submitError}
					</Typography>
				)}
				
				<div>
      <h3>Welcome! {userLogged?.email}</h3>
      <p>Sign In Status: {userLogged && 'active'}</p>
    
    </div>
			</Box>) : ( 
			<Box
				sx={{
					display: 'flex',
					gap: 2,
					alignItems: 'center',
					alignSelf: 'flex-end',
					mt: 2
				}}
			>
				{submitError && (
					<Typography
						variant="caption"
						textAlign="right"
						sx={{ color: 'error.main' }}
					>
						{submitError}
					</Typography>
				)}
				
			
				<Button className="btn" onClick={() => {
                  login();
				  navigate('/');
				
                }} >
					
        {isPending ? "Loading..." : "Login With Github"}
    </Button>
			</Box>)}
		</Paper>
	);
};

export default Login;
