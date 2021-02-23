import AddCircle from '@material-ui/icons/AddCircle';
import NavigationIcon from '@material-ui/icons/Navigation';
import MuiAlert from '@material-ui/lab/Alert';

import {
  List,
  ListItem,
  Container,
  ListItemText,
  IconButton,
  Snackbar,
  Tooltip,
  Theme,
  makeStyles,
  createStyles
} from '@material-ui/core';
import { Address } from '../interfaces/Address';
import { useEffect, useState } from 'react';

interface Props {
  addresses: Address[];
  route: Address[];
  handleAdd: Function
}

export const AddressList = ({ addresses, route, handleAdd }: Props) => {
  const classes = useStyles();
  const [addressList, setAddressList] = useState<Address[]>([])
  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const mapFromAddress = (address: Address) => {
    const link = `https://www.google.com/maps/place/${address.latitude},${address.longitude}/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d${address.latitude}!4d${address.longitude}`
    window.open(link, "_blank")
  }

  useEffect(()=>{
    setAddressList(addresses)
  },[])

  return(
    <Container maxWidth="sm">
      <List className={classes.list}>

        {addressList.map((address, index) =>
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
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

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
    }

  }),
);