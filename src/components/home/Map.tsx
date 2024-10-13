import { useRef } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { cn } from '@/lib/utils'

const Map = () => {
  const mapRef = useRef(null)
  const latitude = -6.147
  const longitude = 106.85

  return (
    // Make sure you set the height and width of the map container otherwise the map won't show
    <div className='relative w-fit'>
      <MapContainer
        ref={mapRef}
        zoom={12}
        center={[latitude, longitude]}
        dragging={false}
        touchZoom={false} // Disables pinch-to-zoom on touch devices
        scrollWheelZoom={false} // Disables zooming with the mouse wheel
        doubleClickZoom={false} // Disables zooming on double-click
        zoomControl={false} // Hides the zoom control
        className={cn(
          'brightness-[0.64] -hue-rotate-[24deg] saturate-[0.86]',
          'size-[400px]'
        )}
      >
        <TileLayer
          url='https://api.maptiler.com/maps/streets-v2-dark/{z}/{x}/{y}.png?key=SZLTcvRlE5ytIR3yS8Xb'
          // attribution='\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e'
          tileSize={512}
          zoomOffset={-1}
          minZoom={1}
        />
        {/* Additional map layers or components can be added here */}
      </MapContainer>
      <div
        className={cn(
          'absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-200/50',
          'drop-shadow-green'
        )}
      ></div>
    </div>
  )
}

export default Map
