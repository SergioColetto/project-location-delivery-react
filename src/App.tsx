
import React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import MapIcon from '@material-ui/icons/Map';
import { useState } from 'react';
import { sanitize, isValid } from './Utils/PostcodeUtils';

import {
  Badge,
  InputBase,
  Container,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core';
import { AddressList } from './components/AddressList';
import { Address } from './interfaces/Address';

const App = () => {
  const classes = useStyles();
  const [searchPostcode, setSearchPostcode] = useState('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [route, setRoute] = useState<Address[]>([]);
  const [openDialogRoute, setOpenDialogRoute] = useState({
    open: false,
    message: 'Maximum number of addresses on the route.'
  });

  const getPosition = () => new Promise<GeolocationPosition>((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  )

  const api = async () => {
    const postcode = sanitize(searchPostcode)
    if (isValid(postcode)) {
      const data = await fetch(`https://api.ideal-postcodes.co.uk/v1/postcodes/${postcode}?api_key=iddqd`)
      const listAddress = await data.json()
      if (!listAddress.result) {
        setAddresses([])
        return
      }
      setAddresses(listAddress.result)

      await fetch(`https://location-delivery.herokuapp.com/api/location`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(listAddress.result)
      })
    }

  }

  const routeGenerator = async () => {
    if (route.length > 0) {
      const locationsBuild: string[] = [];
      // const { coords } = await getPosition();
      // locationsBuild.push(`${coords.latitude},${coords.longitude}`);
      locationsBuild.push("");
      route.forEach(address => locationsBuild.push(`${address.latitude},${address.longitude}`))
      locationsBuild.push(`@${locationsBuild[locationsBuild.length - 1]},14z/`)

      const allLocations = locationsBuild.join("/")

      const link = `https://www.google.com/maps/dir/${allLocations}`
      window.open(link, "_blank")
      return;
    }
    setOpenDialogRoute({ message: 'Choose at least one address', open: true })
  }

  const handleCloseDialogRoute = () => {
    setOpenDialogRoute({ ...openDialogRoute, open: false })
  }

  const handleAdd = (address: Address, index: number) => {
    if (route.includes(address)) {
      const ifDeleted = route.filter(a => a !== address)
      setRoute(ifDeleted)
      return
    }
    if (route.length === 9) {
      setOpenDialogRoute({ ...openDialogRoute, open: true })
      return
    }
    setRoute([...route, address])
    // setSnackbar({ ...snackbar, open: true })
  }

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Container maxWidth="sm">
          <Toolbar>

            <div className={classes.search}>
              <Tooltip title="Enter postcode to search">
                <InputBase
                  placeholder="Search Postcode"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  value={searchPostcode.toUpperCase()}
                  onChange={(e) => setSearchPostcode(e.target.value)} />
              </Tooltip>
            </div>

            <Tooltip title="Search postcode">
              <IconButton onClick={api} aria-label="show 4 new mails" color="inherit">
                <SearchIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Generate route from selected addresses">
              <IconButton onClick={routeGenerator} aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={route.length} showZero color="secondary">
                  <MapIcon />
                </Badge>
              </IconButton>
            </Tooltip>

          </Toolbar>
        </Container>
        <Dialog
          open={openDialogRoute.open}
          onClose={handleCloseDialogRoute} >

          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Route
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {openDialogRoute.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogRoute} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </AppBar>


      <AddressList 
        addresses={addresses}
        route={route}
        handleAdd={handleAdd} />
      

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
      marginTop: theme.spacing(6),
    },
    listContent: {
      marginLeft: theme.spacing(5),
    },
    green: {
      color: '#33CC33'
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
      paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
    },

  }),
);


export default App;