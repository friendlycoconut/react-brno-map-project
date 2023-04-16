import { ThemeOptions, createTheme } from '@mui/material';

declare module '@mui/material/styles' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Palette {
		playerX?: string;
		playerO?: string;
	}
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface PaletteOptions {
		playerX?: string;
		playerO?: string;
	}
}

export const themeOptions: ThemeOptions = {
	palette: {
	  mode: 'dark',
	  primary: {
		main: '#0f0',
	  },
	  background: {
		default: '#111111',
		paper: '#212121',
	  },
	},
	typography: {
	  fontFamily: 'Open Sans',
	  h1: {
		fontFamily: 'Ubuntu Mono',
	  },
	  h2: {
		fontFamily: 'Ubuntu Mono',
	  },
	  h3: {
		fontFamily: 'Ubuntu Mono',
	  },
	  h4: {
		fontFamily: 'Ubuntu Mono',
	  },
	  h6: {
		fontFamily: 'Ubuntu Mono',
	  },
	  h5: {
		fontFamily: 'Ubuntu Mono',
	  },
	  subtitle1: {
		fontFamily: 'Ubuntu Mono',
	  },
	  subtitle2: {
		fontFamily: 'Ubuntu Mono',
	  },
	  button: {
		fontFamily: 'Ubuntu Mono',
		fontWeight: 900,
	  },
	  overline: {
		fontFamily: 'Ubuntu Mono',
	  },
	},
  };

const theme = createTheme({
	palette: {
		primary: { main: '#f2d45c' },
		mode: 'dark'
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				// Css rule that makes sure app is always 100% height of window
				'body, #root': {
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh'
				}
			}
		}
	}
});

export default theme;
