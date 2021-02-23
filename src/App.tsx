
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import { Address } from './interfaces/Address';
import { AddressList } from './components/AddressList';
import { SearchBar } from './components/SearchBar';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

const App = () => {
  const [route, setRoute] = useState<Address[]>([]);
  const [postcode, setPostcode] = useState('');
  const [openDialogRoute, setOpenDialogRoute] = useState({
    open: false,
    message: 'Maximum number of addresses on the route.'
  });

  const searchByPostcode = () => console.log(postcode)

// const api = async () => {
  //   const postcode = sanitize(searchPostcode)
  //   if (isValid(postcode)) {
  //     const data = await fetch('')
  //     const listAddress = await data.json()
  //     if (!listAddress.result) {
  //       setAddresses([])
  //       return
  //     }
  //     setAddresses(listAddress.result)

  //     await fetch(`https://location-delivery.herokuapp.com/api/location`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(listAddress.result)
  //     })
  //   }

  // }


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
        postcode={postcode}
        setPostcode={setPostcode} 
        searchPostcode={searchByPostcode} />
        
      <Switch>
        <Route path="/address">
          <AddressList 
            postcode={postcode}
            route={route}
            handleAdd={handleAdd} />

        </Route>
        
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
      </Switch>
    </Router>
  );
}




export default App;