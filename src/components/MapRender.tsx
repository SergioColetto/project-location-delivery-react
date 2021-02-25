import {  makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { LatLng } from 'leaflet';
import React from 'react';
import { MapContainer } from 'react-leaflet'

interface Props {
  position: LatLng;
}

export const MapRender = ({ position }: Props ) => {
  const classes = useStyles();

  return( 
    <MapContainer center={position} zoom={20} />
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({}),
);