import {  makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { LatLng } from 'leaflet';
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, MapConsumer } from 'react-leaflet'

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