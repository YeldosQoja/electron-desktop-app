import "@mui/material";

declare module '@mui/material/styles' {
  interface Palette {
    screen: {
      main: string;
    };
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    screen?: {
      main: string;
    }
  }
}
