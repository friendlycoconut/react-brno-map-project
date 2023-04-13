import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import { onAuthChanged } from '../firebase/firebase-new';

// Hook providing logged in user information
const useLoggedInUser = () => {
	// Hold user info in state
	const [user, setUser] = useState<User>();

	// Setup onAuthChanged once when component is mounted
	useEffect(() => {
		onAuthChanged((u: any) => setUser(u ?? undefined));
	}, []);

	return user;
};

export default useLoggedInUser;
