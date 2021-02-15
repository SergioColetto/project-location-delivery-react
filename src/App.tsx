import React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';

import AddCircle from '@material-ui/icons/AddCircle';
import NavigationIcon from '@material-ui/icons/Navigation';
import MapIcon from '@material-ui/icons/Map';

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

interface Address {
  line_01: string;
  postcode: string;
  town: string;
}

const App = () => {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [counter, setCounter] = useState(0);
  const [searchPostcode, setSearchPostcode] = useState('');
  const [addresses, setAddresses] = useState<Address[]>([]);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
      
          <div className={classes.search}>
            <div className={classes.searchIcon} >
              <SearchIcon />
            </div>

            <InputBase
              placeholder="Search Postcode"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={searchPostcode}
            />

          </div>

          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={counter} showZero color="secondary">
              <MapIcon />
            </Badge>
          </IconButton>

        </Toolbar>
      </AppBar>
      <Menu keepMounted
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose} />


      <List className={classes.list}>
        { addresses.map( address => 
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <NavigationIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={address.line_01}
              secondary={`${address.postcode} | ${address.town} UK`}
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
    },

    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },

  }),
);


export default App;