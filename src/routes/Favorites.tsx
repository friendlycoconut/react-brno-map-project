import { Typography } from "@mui/material";
import useLoggedInUser from "../hooks/useLoggedUser";
import usePageTitle from "../hooks/usePageTitle";

const Favorites = () => {
	usePageTitle('Saved Places');
	const user = useLoggedInUser();
	return (
		<>			
			{user?.email && (
				<Typography variant="h4" textAlign="center">
					Saved Places
				</Typography>
			)}
		</>
	);
};

export default Favorites;