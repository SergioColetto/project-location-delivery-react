import AddCircle from '@material-ui/icons/AddCircle';
import NavigationIcon from '@material-ui/icons/Navigation';
import { Address } from '../interfaces/Address';

import {
  List,
  ListItem,
  Container,
  ListItemText,
  IconButton,
  Tooltip,
  Theme,
  makeStyles,
  createStyles,
  Button
} from '@material-ui/core';
import { get } from '../api/Services';
import { mapFromAddress } from '../Utils/LinkGeneratorUtils';

interface Props {
  addresses: Address[];
  route: Address[];
  routeAdd: Function,
  mapFromAddress: Function,
}

const routeFromAddressJustEat = async () => {
  try {
      const clipboard = await navigator.clipboard.readText();
      const address = clipboard.split(',');
      const postcode = address[address.length -1];
      const line1 = address[0];
      const listAddress: Address[] = await get(postcode);
      const match = listAddress.filter((e) => {
        return e.line_1 === line1;
      });
      mapFromAddress(match[0])
    } catch( e )  {
      
    }
  }

export const AddressList = ({ addresses, route, routeAdd }: Props) => {
  const classes = useStyles();

  return(
    <Container maxWidth="sm">
      <List className={classes.list}>

        {addresses.map((address, index) =>
          <ListItem key={index.toString()}>

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
                  onClick={() => routeAdd(address, index)}>
                    
                <AddCircle className={route.includes(address) ? classes.green : ''} />
              </IconButton>
            </Tooltip>

          </ListItem>,
        )}
      </List>
      <Button 
        variant='contained' 
        color='primary' 
        onClick={routeFromAddressJustEat}
      >
          Just Eat
      </Button>
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