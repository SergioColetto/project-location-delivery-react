import React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';

import AddCircle from '@material-ui/icons/AddCircle';
import NavigationIcon from '@material-ui/icons/Navigation';

import { useState, cloneElement, ReactElement } from 'react';
import { green } from '@material-ui/core/colors';

import {
  Badge, 
  InputBase, 
  List, 
  ListItem, 
  ListItemAvatar, 
  Avatar, 
  ListItemText, 
  IconButton,
  ListItemSecondaryAction
} from '@material-ui/core';


const App = () => {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [counter, setCounter] = useState(0);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const generate = (element: ReactElement) => {
    return [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ].map((value) =>
      cloneElement(element, { key: value }),
    );
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          

          <div className={classes.search}>

            <InputBase placeholder="Search Postcode" />
            <IconButton edge="end" className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>

          </div>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={counter} showZero color="secondary">
              <NavigationIcon />
            </Badge>
          </IconButton>

        </Toolbar>
      </AppBar>
      <Menu keepMounted
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose} />


      <List className={classes.list}>
        { generate(
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <NavigationIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="8 Essex Walk"
              secondary='SN3 3EY | Swindon UK'
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => setCounter(counter+1)}>
                <AddCircle style={{ color: green[500] }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>,
        )}
      </List>
    </div>
  );
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    search: {
      padding: '2px 4px',
      
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(1),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },

    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    list: {
      padding: theme.spacing(2),
      textAlign: 'center',
      // maxWidth: 752,
    }
  }),
);


export default App;