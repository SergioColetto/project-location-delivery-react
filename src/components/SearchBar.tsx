import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import MapIcon from '@material-ui/icons/Map';
import { useState } from 'react';
import { Address } from '../interfaces/Address';

import {
  InputBase,
  Container,
  IconButton,
  Tooltip,
  Badge
} from '@material-ui/core';
import { Link } from 'react-router-dom';

interface Props {
  route: Address[];
  searchPostcode: Function;
}

export const SearchBar = ({ searchPostcode, route }: Props ) => {
  const classes = useStyles();
  const [postcode, setPostcode] = useState('');

  return(
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
                  value={postcode.toUpperCase()}
                  onChange={(e) => setPostcode(e.target.value)} />
              </Tooltip>
            </div>

            <Tooltip title="Search postcode">
                <IconButton onClick={() => searchPostcode(postcode)} aria-label="show 4 new mails" color="inherit">
                    <SearchIcon />
                </IconButton>
            </Tooltip>

            <Tooltip title="Generate route from selected addresses">
              <Link to='/route' aria-label="show 4 new mails" color="inherit">
                <IconButton >
                  <Badge badgeContent={route.length} showZero color="secondary">
                    <MapIcon />
                  </Badge>
                </IconButton>
              </Link>
            </Tooltip>

          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
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