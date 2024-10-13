import { useRef, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { cn } from '@/lib/utils'
import { Map as MapLeaflet, type ZoomPanOptions } from 'leaflet'

const LATITUDE = -6.147
const LONGITUDE = 106.85

const ZOOM_STEP = 2
const zoomOptions: ZoomPanOptions = {
  animate: true,
  duration: 0.5,
  easeLinearity: 0.25
}

const MAX_ZOOM = 12
const MIN_ZOOM = 8

interface ZoomButtonProps
  extends Pick<
    React.HTMLProps<HTMLButtonElement>,
    'onClick' | 'children' | 'className'
  > {
  hide?: boolean
}

const ZoomButton = (props: ZoomButtonProps) => {
  const { onClick, children, className, hide } = props
  return (
    <button
      onClick={onClick}
      className={cn(
        'absolute size-12 rounded-full bg-zinc-950 text-3xl leading-none outline outline-2 outline-slate-700',
        'scale-100 transition-all duration-300 hover:outline-4',
        hide && 'scale-0',
        className
      )}
    >
      {children}
    </button>
  )
}

const Map = () => {
  const mapRef = useRef<MapLeaflet>(null)
  const [currentZoom, setCurrentZoom] = useState(
    mapRef.current?.getZoom() ?? MAX_ZOOM
  )

  const zoomIn = () => {
    setCurrentZoom((prev) => {
      const newZoom = prev + ZOOM_STEP
      mapRef.current?.setZoom(newZoom, zoomOptions)
      return newZoom
    })
  }

  const zoomOut = () => {
    setCurrentZoom((prev) => {
      const newZoom = prev - ZOOM_STEP
      mapRef.current?.setZoom(newZoom, zoomOptions)
      return newZoom
    })
  }

  return (
    // Make sure you set the height and width of the map container otherwise the map won't show
    <div className='group relative w-fit'>
      <MapContainer
        ref={mapRef}
        zoom={MAX_ZOOM}
        center={[LATITUDE, LONGITUDE]}
        dragging={false}
        touchZoom={false} // Disables pinch-to-zoom on touch devices
        scrollWheelZoom={false} // Disables zooming with the mouse wheel
        doubleClickZoom={false} // Disables zooming on double-click
        zoomControl={false} // Hides the zoom control
        attributionControl={false} // Hides the attribution control
        className={cn(
          'brightness-[0.64] -hue-rotate-[24deg] saturate-[0.86]',
          'size-[400px] rounded-2xl'
        )}
      >
        <TileLayer
          url='https://api.maptiler.com/maps/streets-v2-dark/{z}/{x}/{y}.png?key=SZLTcvRlE5ytIR3yS8Xb'
          tileSize={512}
          zoomOffset={-1}
          minZoom={1}
        />
        {/* Additional map layers or components can be added here */}
      </MapContainer>

      <div
        className={cn(
          'absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-200/50',
          'drop-shadow-green animate-pulse',
          'transition-all duration-400 group-hover:scale-125'
        )}
      ></div>

      <ZoomButton
        onClick={zoomIn}
        className='bottom-4 right-4'
        hide={currentZoom >= MAX_ZOOM}
      >
        +
      </ZoomButton>

      <ZoomButton
        onClick={zoomOut}
        className='bottom-4 left-4'
        hide={currentZoom <= MIN_ZOOM}
      >
        -
      </ZoomButton>
    </div>
  )
}

export default Map
