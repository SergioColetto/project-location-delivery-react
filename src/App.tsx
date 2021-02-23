
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import { Address } from './interfaces/Address';
import { AddressList } from './components/AddressList';
import { SearchBar } from './components/SearchBar';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { get } from './api/api';
import { RouteList } from './components/RouteList';

const App = () => {
  const [route, setRoute] = useState<Address[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [openDialogRoute, setOpenDialogRoute] = useState({
    open: false,
    message: 'Maximum number of addresses on the route.'
  });

  const searchByPostcode = async ( postcode: string ) => {
    const listAddress = await get(postcode)
    setAddresses( listAddress )
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
  }

  return (
    <Router>
      <SearchBar
        route={route} 
        searchPostcode={searchByPostcode} />
        
      <Switch>
        <Route path="/">
          <AddressList 
              addresses={addresses}
              route={route}
              handleAdd={handleAdd} />

        </Route>
        <Route path="/route">
          <RouteList 
            route={route}
            handleRemove={handleAdd} />
        </Route>
      </Switch>

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

    </Router>
  );
}

export default App;