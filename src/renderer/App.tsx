import 'tailwindcss/tailwind.css';
import { AppRouter } from '@/router';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/theme';
import { Provider } from 'react-redux';
import { store } from './store/store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './App.css';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppRouter />
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  );
}
