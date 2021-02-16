import React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';

import AddCircle from '@material-ui/icons/AddCircle';
import NavigationIcon from '@material-ui/icons/Navigation';
import MapIcon from '@material-ui/icons/Map';

import { useState } from 'react';
import { green, red } from '@material-ui/core/colors';

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
  building_name: string;
  building_number: string;
  country: string; //'England'
  county: string; //'Wiltshire'
  district: string; //'Swindon'
  latitude: number; //51.5626345
  line_1: string; //'1 Essex Walk'
  line_2: string; //''
  line_3: string; //''
  longitude: number; //-1.7597763
  post_town: string; //'SWINDON';
  postcode: string; //'SWINDON';
}

const App = () => {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [colorCircle, setColorCircle] = useState({ color: '#4caf50' });
  const [searchPostcode, setSearchPostcode] = useState('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [route, setRoute] = useState<Address[]>([]);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const api = async (event: any) => {
    if (event.key === 'Enter') {

      const data = await fetch(`https://api.ideal-postcodes.co.uk/v1/postcodes/${searchPostcode}?api_key=iddqd`)
      const listAddress = await data.json()
      if (!listAddress.result) {
        setAddresses([])
        return
      }
      setAddresses(listAddress.result)
    }

    // fetch(`http://location.delivery/${searchPostcode}`, {
    //   method: 'POST',
    //   body: JSON.stringify(addresses)
    // })
  }

  const routeGenerator = () => {
    const locationsBuild: string[] = [];
    route.forEach(address => locationsBuild.push(`${address.latitude},${address.longitude}`))
    locationsBuild.push(`@${locationsBuild[locationsBuild.length - 1]},14z/`)

    const allLocations = locationsBuild.join("/")

    var link = `https://www.google.com/maps/dir/${allLocations}`
    window.open(link, "_blank")
  }

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
              onChange={(e) => setSearchPostcode(e.target.value)}
              onKeyUp={api}
            />

          </div>

          <IconButton
            onClick={routeGenerator}
            aria-label="show 4 new mails" color="inherit">
            <Badge
              badgeContent={route.length}
              showZero
              color="secondary"
            >
              <MapIcon />
            </Badge>
          </IconButton>

        </Toolbar>
      </AppBar>
      <Menu keepMounted
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose} />


      <List className={classes.list}>
        {addresses.map((address, index) =>
          <ListItem>

            <IconButton href={`https://www.google.com/maps/place/${address.latitude},${address.longitude}/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d${address.latitude}!4d${address.longitude}`} >
              <NavigationIcon fontSize="large" />
            </IconButton>

            <ListItemText
              primary={address.line_1}
              secondary={`${address.postcode} | ${address.district} UK`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end"
                onClick={() => {
                  setRoute([...route, address]);
                  setColorCircle({ color: '#4caf50' })
                }}>
                <AddCircle style={colorCircle} />
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