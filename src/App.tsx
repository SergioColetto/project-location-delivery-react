import React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import AddCircle from '@material-ui/icons/AddCircle';
import NavigationIcon from '@material-ui/icons/Navigation';
import MapIcon from '@material-ui/icons/Map';
import MuiAlert from '@material-ui/lab/Alert';
import { useState } from 'react';
import { isValid, sanitize } from './Utils/Util';

import {
  Badge,
  InputBase,
  List,
  ListItem,
  Container,
  ListItemText,
  IconButton,
  Snackbar,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core';

interface Address {
  building_name: string;
  building_number: string;
  country: string;
  county: string;
  district: string;
  latitude: number;
  line_1: string;
  line_2: string;
  line_3: string;
  longitude: number;
  post_town: string;
  postcode: string;
}


const App = () => {
  const classes = useStyles();
  const [searchPostcode, setSearchPostcode] = useState('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [route, setRoute] = useState<Address[]>([]);
  const [openDialogRoute, setOpenDialogRoute] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
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
      const { coords } = await getPosition();
      const locationsBuild: string[] = [];
      locationsBuild.push(`${coords.latitude},${coords.longitude}`);
      route.forEach(address => locationsBuild.push(`${address.latitude},${address.longitude}`))
      locationsBuild.push(`@${locationsBuild[locationsBuild.length - 1]},14z/`)

      const allLocations = locationsBuild.join("/")

      const link = `https://www.google.com/maps/dir/${allLocations}`
      window.open(link, "_blank")
    }
  }

  const mapFromAddress = (address: Address) => {
    const link = `https://www.google.com/maps/place/${address.latitude},${address.longitude}/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d${address.latitude}!4d${address.longitude}`
    window.open(link, "_blank")
  }

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const handleCloseDialogRoute = () => {
    setOpenDialogRoute(false)
  }

  const handleAdd = (address: Address, index: number) => {
    if (route.includes(address)) {
      const ifDeleted = route.filter(a => a !== address)
      setRoute(ifDeleted)
      return
    }
    if (route.length === 9) {
      setOpenDialogRoute(true)
      return
    }
    setRoute([...route, address])
    setSnackbar({ ...snackbar, open: true })
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
          open={openDialogRoute}
          onClose={handleCloseDialogRoute} >

          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Route
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Maximum number of addresses on the route.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogRoute} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </AppBar>



      <Container maxWidth="sm">
        <List className={classes.list}>

          {addresses.map((address, index) =>
            <ListItem id={index.toString()}>

              <Tooltip title="Map route from address">
                <IconButton onClick={() => mapFromAddress(address)}>
                  <NavigationIcon fontSize="large" />
                </IconButton>
              </Tooltip>

              <ListItemText className={classes.listContent}
                primary={`${address.line_1} | ${address.line_2}`}
                secondary={`${address.postcode} | ${address.district} UK`} />

              <Tooltip title="Add address in route">
                <IconButton edge="end"
                  onClick={() => handleAdd(address, index)}>
                  <AddCircle className={route.includes(address) ? classes.green : ''} />
                </IconButton>
              </Tooltip>


            </ListItem>,
          )}

        </List>

        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackbar.open} autoHideDuration={1000} onClose={handleClose}>
          <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
            Address added in routes
          </MuiAlert>
        </Snackbar>

      </Container>


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