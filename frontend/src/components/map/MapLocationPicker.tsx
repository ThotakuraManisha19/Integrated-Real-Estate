import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Coordinates } from '../../types';
import { MapPin, Navigation } from 'lucide-react';

interface MapLocationPickerProps {
  coordinates: Coordinates;
  onChange: (coords: Coordinates) => void;
  city?: string;
}

export const MapLocationPicker: React.FC<MapLocationPickerProps> = ({
  coordinates,
  onChange,
  city
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const defaultLat = coordinates.lat || 12.9716;
  const defaultLng = coordinates.lng || 77.5946;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [defaultLat, defaultLng],
        zoom: 13
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      // Draggable Marker
      const marker = L.marker([defaultLat, defaultLng], {
        draggable: true
      }).addTo(map);

      marker.on('dragend', () => {
        const position = marker.getLatLng();
        onChange({ lat: Number(position.lat.toFixed(6)), lng: Number(position.lng.toFixed(6)) });
      });

      // Click to place marker
      map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        onChange({ lat: Number(lat.toFixed(6)), lng: Number(lng.toFixed(6)) });
      });

      markerRef.current = marker;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update marker when coords prop changes externally
  useEffect(() => {
    if (markerRef.current && coordinates.lat && coordinates.lng) {
      markerRef.current.setLatLng([coordinates.lat, coordinates.lng]);
      mapInstanceRef.current?.setView([coordinates.lat, coordinates.lng], 13);
    }
  }, [coordinates.lat, coordinates.lng]);

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = Number(pos.coords.latitude.toFixed(6));
          const lng = Number(pos.coords.longitude.toFixed(6));
          onChange({ lat, lng });
          markerRef.current?.setLatLng([lat, lng]);
          mapInstanceRef.current?.setView([lat, lng], 15);
        },
        (err) => {
          alert('Unable to fetch current location: ' + err.message);
        }
      );
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          Pin Exact Plot Location (Click on Map or Drag Pin)
        </label>
        <button
          type="button"
          onClick={handleGetCurrentLocation}
          className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200"
        >
          <Navigation className="w-3 h-3" />
          Use GPS
        </button>
      </div>

      <div className="relative h-64 rounded-xl overflow-hidden border border-slate-300 shadow-sm">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      <div className="flex items-center justify-between text-xs bg-slate-100 px-3 py-2 rounded-lg text-slate-600 font-mono">
        <span>Latitude: <strong className="text-slate-800">{coordinates.lat || defaultLat}</strong></span>
        <span>Longitude: <strong className="text-slate-800">{coordinates.lng || defaultLng}</strong></span>
      </div>
    </div>
  );
};
