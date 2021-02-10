import React from 'react'
import './styles.css'
import {showDataMap} from '../../util'
import {MapContainer as LeafletMap,TileLayer} from 'react-leaflet'
function Map({center,zoom,countries,casesType}) {
      return (
            <div className="map">
                 <LeafletMap center={center} zoom={zoom}>
                 <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      {showDataMap(countries,casesType)}
                 </LeafletMap>
            </div>
      )
}

export default Map
