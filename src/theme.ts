import { createTheme } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale';

const theme = createTheme({
  palette: {
    primary: {
      light: '#ff88dd',
      main: '#CD56AB',
      dark: '#99217c',
    },
    secondary: {
      light: '#8a768a',
      main: '#5d4a5d',
      dark: '#332233',
      contrastText: '#000',
    },  
  },
}, ruRU,);



  export default theme;