
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import { Address } from './interfaces/Address';
import { SearchBar } from './components/SearchBar';
import { Button, createStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, Theme } from '@material-ui/core';
import { get } from './api/api';
import { LatLng } from 'leaflet';
import { AddressList } from './components/AddressList';
import { MapRender } from './components/MapRender';
import { RouteList } from './components/RouteList';

const App = () => {
  const classes = useStyles();
  const [route, setRoute] = useState<Address[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [position, setPosition] = useState(new LatLng(0,0));
  
  const [openDialogRoute, setOpenDialogRoute] = useState({
    open: false,
    title:'Route',
    message: 'Maximum number of addresses on the route.'
  });

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

  const handleAdd = (address: Address, index: number) => {
    if (route.length === 9) {
      setOpenDialogRoute({ ...openDialogRoute, open: true })
      return
    }
    setRoute([...route, address])
    setPosition(new LatLng(address.latitude, address.longitude))
  }

  const handleRemove = (address: Address, index: number) => {
    if (route.includes(address)) {
      const ifDeleted = route.filter(a => a !== address)
      setRoute(ifDeleted)
    }
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
              handleAdd={handleAdd} />
        </Route>

        <Route path="/map">
          <MapRender position={position}/>
        </Route>

        <Route path="/route">
          <RouteList 
            route={route}
            handleRemove={handleRemove} />
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