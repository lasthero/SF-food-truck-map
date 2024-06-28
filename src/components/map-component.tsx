import React, { useCallback, useState } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';


export type foodTruckItem = {
    id: string,
    applicant: string,
    fooditems: string,
    locationdescription: string,
    location: { lat: number, lng: number},
    categories: string[];
  }

const MapComponent = ({data}: {data: foodTruckItem[]}) => {
  const mapStyles = {
    height: "400px",
    width: "100%"
  };
  // Default to SF city center
  const defaultCenter = {
    lat: 37.784279, 
    lng: -122.407234
  };
  const [selected, setSelected] = useState<foodTruckItem>();

  const onSelect = useCallback((item: foodTruckItem) => {
    setSelected(item);
  }, []);

  const maxLabelLength: number = 15;
   return ( <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GMAP_API_KEY ?? ''}
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={11}
        center={defaultCenter}
      >
        {
          data.map(item => {
            return (
              <Marker key={item.id} position={item.location} onClick={() => onSelect(item)}
              label={{ color: '#0a0a0a', fontWeight: 'bold', fontSize: '10px', text: item.applicant.length > maxLabelLength ? item.applicant.substring(0,maxLabelLength)+'...' : item.applicant }}/>
            )
          })
        }
         {selected ? (
          <InfoWindow
            position={selected.location}
            onCloseClick={() => setSelected(undefined)}
          >
            <div>
              <h2><b>{selected.applicant}</b></h2>
                <p><b>Location: </b>{selected.locationdescription}</p>
                <p><b>Food Items: </b>{selected.fooditems}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </LoadScript>
  )
}

export default MapComponent;
