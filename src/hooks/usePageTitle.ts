import { useEffect } from 'react';

const usePageTitle = (title: string) => {
	useEffect(() => {
		document.title = `${title} | Top Brno Locations `;
	}, [title]);
};

export default usePageTitle;
