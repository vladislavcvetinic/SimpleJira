import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Navigate, Route, Routes } from 'react-router-dom';

import Footer from '../../Layout/Vertical/Footer/Footer';
import AddTask from '../../Pages/addTask/addTask';
import SingleTask from '../../Pages/singleTask/SingleTask';
import Tasks from '../../Pages/tasks/Tasks';

import { AppBar, Drawer, DrawerHeader } from './common';

const Vertical = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div id="vertical">
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Simple Jira
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <Link to="/">
                <ListItemButton>
                  <ListItemIcon>
                    <ViewKanbanIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Board"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <Link to="/add">
                <ListItemButton>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Container>
              <div id="content">
                <Routes>
                  <Route path="edit/:taskId" element={<SingleTask />} />
                  <Route path="/add" element={<AddTask />} />
                  <Route path="/" element={<Tasks />} />
                  <Route
                    path="/*"
                    element={<Navigate to={{ pathname: '/' }} />}
                  />
                  <Route
                    path="*/*"
                    element={<Navigate to={{ pathname: '/' }} />}
                  />
                </Routes>
              </div>
            </Container>
          </Grid>

          <Grid item xs={12}>
            <Container>
              <Footer></Footer>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Vertical;
