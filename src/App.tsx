
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import { Address } from './interfaces/Address';
import { SearchBar } from './components/SearchBar';
import { Button, createStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, Snackbar, Theme } from '@material-ui/core';
import { get } from './api/Services';
import { LatLng } from 'leaflet';
import { AddressList } from './components/AddressList';
import { MapRender } from './components/MapRender';
import { RouteList } from './components/RouteList';
import MuiAlert from '@material-ui/lab/Alert';
import { mapFromAddress } from './Utils/LinkGeneratorUtils';

const App = () => {
  const classes = useStyles();
  const [route, setRoute] = useState<Address[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [position, setPosition] = useState(new LatLng(0,0));
    const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  
  const [openDialogRoute, setOpenDialogRoute] = useState({
    open: false,
    title:'Route',
    message: 'Maximum number of addresses on the route.'
  });

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const searchByPostcode = async ( postcode: string ) => {
    try {
      const listAddress = await get(postcode)
      setAddresses( listAddress )
    } catch( e )  {
      setOpenDialogRoute({ open: true,
        title: 'Location Delivery',
        message: e.message })
    }
  }

  const handleCloseDialogRoute = () => {
    setOpenDialogRoute({ ...openDialogRoute, open: false })
  }

  const routeAdd = (address: Address, index: number) => {
    if (route.includes(address)) {
      routeRemove(address, index)
      return
    }
    if (route.length === 9) {
      setOpenDialogRoute({
        open: true,
        title:'Route',
        message: 'Maximum number of addresses on the route.'
      })
      return
    }
    setRoute([...route, address])
    setSnackbar({ ...snackbar, open: true })
  }

  const routeRemove = (address: Address, index: number) => {
    const ifDeleted = route.filter(a => a !== address)
    setRoute(ifDeleted)
  }

  useEffect(()=>{
    setAddresses(addresses)
    setRoute(route)
  },[])

  return (
    <Router>
      <SearchBar
        route={route} 
        searchPostcode={searchByPostcode} />
        
      <Switch>
        <Route path="/addresses">
          <AddressList 
              addresses={addresses}
              route={route}
              routeAdd={routeAdd}
              mapFromAddress={mapFromAddress} />
        </Route>

        <Route path="/map">
          <MapRender position={position}/>
        </Route>

        <Route path="/route">
          <RouteList 
            route={route}
            routeRemove={routeRemove} />
        </Route>
      </Switch>

      <Dialog
        open={openDialogRoute.open}
        onClose={handleCloseDialogRoute} >

        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {openDialogRoute.title}
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
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbar.open} autoHideDuration={1000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
          Address added in routes
        </MuiAlert>
      </Snackbar>
    </Router>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    centerDown: {
      padding: theme.spacing(2),
      textAlign: 'center',
      marginTop: theme.spacing(6),
    },

  }),
);


export default App;