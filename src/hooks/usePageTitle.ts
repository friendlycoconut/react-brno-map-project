import { useEffect } from 'react';

const usePageTitle = (title: string) => {
	useEffect(() => {
		document.title = `${title} | Tic Tac Toe`;
	}, [title]);
};

export default usePageTitle;
