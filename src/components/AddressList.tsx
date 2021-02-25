import AddCircle from '@material-ui/icons/AddCircle';
import NavigationIcon from '@material-ui/icons/Navigation';
import { Address } from '../interfaces/Address';
import { Link } from 'react-router-dom';

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

interface Props {
  addresses: Address[];
  route: Address[];
  routeAdd: Function,
  mapFromAddress: Function,
}

export const AddressList = ({ addresses, route, routeAdd, mapFromAddress }: Props) => {
  const classes = useStyles();

  return(
    <Container maxWidth="sm">
      <List className={classes.list}>

        {addresses.map((address, index) =>
          <ListItem key={index.toString()}>

            <Tooltip title="Map route from address">
              <Link to="/map" onClick={() => mapFromAddress(address)}>
                <IconButton>
                  <NavigationIcon fontSize="large" />
                </IconButton>
              </Link>
            </Tooltip>

            <ListItemText className={classes.listContent}
              primary={`${address.line_1} | ${address.line_2}`}
              secondary={`${address.postcode} | ${address.district} UK`} />

            <Tooltip title="Add address in route">
              <IconButton edge="end"
                  onClick={() => routeAdd(address, index)}>
                    
                <AddCircle className={route.includes(address) ? classes.green : ''} />
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