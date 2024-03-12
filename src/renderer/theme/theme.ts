import { createTheme } from '@mui/material';
import { colors } from './colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    screen: {
      main: colors.background,
    },
  },
});
