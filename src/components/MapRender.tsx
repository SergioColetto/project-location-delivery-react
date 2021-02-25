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
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
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