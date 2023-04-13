import { Button, type ButtonProps } from '@mui/material';
import { Link, LinkPropsOptions } from '@tanstack/react-router';

type Props = ButtonProps & LinkPropsOptions;

const ButtonLink = (props: Props) => (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	<Button component={Link} {...(props as any)} />
);

export default ButtonLink;
