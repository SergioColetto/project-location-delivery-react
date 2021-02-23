import AddCircle from '@material-ui/icons/AddCircle';
import NavigationIcon from '@material-ui/icons/Navigation';

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
  route: Address[];
  handleRemove: Function
}

export const RouteList = ({ route, handleRemove }: Props) => {
  const classes = useStyles();
  const [routeList, setRouteList] = useState<Address[]>([])

  const getPosition = () => new Promise<GeolocationPosition>((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  )

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

  }

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

  useEffect(()=>{
    setRouteList( route )
  },[])

  return(
    <Container maxWidth="sm">
      <List className={classes.list}>
        Route List
        {routeList.map((address, index) =>
          <ListItem id={index.toString()}>

            <Tooltip title="Map route from address">
              <IconButton >
                <NavigationIcon fontSize="large" />
              </IconButton>
            </Tooltip>

            <ListItemText className={classes.listContent}
              primary={`${address.line_1} | ${address.line_2}`}
              secondary={`${address.postcode} | ${address.district} UK`} />

            <Tooltip title="Add address in route">
              <IconButton edge="end"
                onClick={() => handleRemove(address, index)}>
                <AddCircle className={classes.green} />
              </IconButton>
            </Tooltip>

          </ListItem>,
        )}
      </List>
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