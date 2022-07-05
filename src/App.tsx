import React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Vertical from './Layout/Vertical/Vertical';
import Store from './Shared/Store/Store';

import './App.scss';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5272FA',
    },
  },
});

function appBarLabel(label: string) {
  return (
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        {label}
      </Typography>
    </Toolbar>
  );
}

function App() {
  return (
    <div id="app">
      <Provider store={Store}>
        <ThemeProvider theme={darkTheme}>
          {appBarLabel('Simple Jira')}
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<Vertical />} />
              <Route path="*/*" element={<Navigate to={{ pathname: '/' }} />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
