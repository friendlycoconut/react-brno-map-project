import { ThemeOptions, createTheme } from '@mui/material';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#DE3C4B', 
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
    primary: { main: '#DE3C4B' },
    mode: 'dark',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // Css rule that makes sure app is always 100% height of window
        'body, #root': {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        },
      },
    },
  },
});

export default theme;
