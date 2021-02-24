import {  makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { LatLng } from 'leaflet';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

interface Props {
  position: LatLng;
}

export const MapRender = ({ position }: Props ) => {
  const classes = useStyles();

  useEffect(()=>{

  },[])

  return( 
    <MapContainer>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({}),
);