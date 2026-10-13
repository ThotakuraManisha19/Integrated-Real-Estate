import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { PropertyItem } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { Crosshair } from 'lucide-react';

// Fix Leaflet Default Marker Icons in bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface PropertyMapProps {
  properties: PropertyItem[];
  selectedPropertyId?: string | null;
  onSelectProperty?: (property: PropertyItem) => void;
  height?: string;
  center?: [number, number];
  zoom?: number;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  selectedPropertyId,
  onSelectProperty,
  height = '100%',
  center = [12.9716, 77.5946],
  zoom = 10
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const polygonsRef = useRef<Record<string, L.Polygon>>({});
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [mapType, setMapType] = useState<'streets' | 'satellite' | 'terrain'>('streets');

  const tileUrls = {
    streets: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    terrain: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
  };

  const tileAttributions = {
    streets: '&copy; OpenStreetMap contributors',
    satellite: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye',
    terrain: 'Map data: &copy; OpenStreetMap contributors, SRTM'
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: false
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      const baseTile = L.tileLayer(tileUrls[mapType], {
        attribution: tileAttributions[mapType],
        maxZoom: 19
      }).addTo(map);

      tileLayerRef.current = baseTile;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer on type change
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    mapInstanceRef.current.removeLayer(tileLayerRef.current);
    const newTile = L.tileLayer(tileUrls[mapType], {
      attribution: tileAttributions[mapType],
      maxZoom: 19
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newTile;
  }, [mapType]);

  // Update Markers & Polygons
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers & polygons
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    Object.values(polygonsRef.current).forEach(p => p.remove());
    polygonsRef.current = {};

    if (properties.length === 0) return;

    const bounds = L.latLngBounds([]);

    properties.forEach(item => {
      const { lat, lng } = item.coordinates;
      if (!lat || !lng) return;

      const isSelected = selectedPropertyId === item.id;
      const isPlot = item.category === 'plot';

      // 1. Draw Plot Boundary Polygon if defined
      if (item.boundaryPolygon && item.boundaryPolygon.length > 2) {
        const polyLatLngs = item.boundaryPolygon.map(p => [p.lat, p.lng] as [number, number]);
        const polygon = L.polygon(polyLatLngs, {
          color: isSelected ? '#f59e0b' : isPlot ? '#10b981' : '#3b82f6',
          weight: isSelected ? 3 : 2,
          fillColor: isPlot ? '#10b981' : '#3b82f6',
          fillOpacity: isSelected ? 0.45 : 0.25,
          dashArray: isSelected ? undefined : '4, 4'
        }).addTo(map);

        polygon.on('click', () => {
          onSelectProperty?.(item);
        });

        polygonsRef.current[item.id] = polygon;
      }

      // 2. Custom HTML Pin
      const customHtml = `
        <div class="cursor-pointer transition-transform duration-200 hover:scale-110 flex items-center justify-center">
          <div class="px-2.5 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 border-2 ${
            isSelected 
              ? 'bg-amber-400 text-slate-950 border-white ring-4 ring-amber-400/50 scale-110' 
              : isPlot 
              ? 'bg-emerald-600 text-white border-white' 
              : 'bg-blue-600 text-white border-white'
          }">
            <span class="text-[10px]">${isPlot ? '🌳' : '🏢'}</span>
            <span>${formatPrice(item.price)}</span>
            ${item.isVerified ? '<span class="text-[9px] bg-white text-emerald-700 px-1 rounded-full font-black">✓</span>' : ''}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: customHtml,
        iconSize: [90, 30],
        iconAnchor: [45, 15]
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

      // Popup Content
      const popupContent = document.createElement('div');
      popupContent.className = 'p-1 max-w-[240px] text-slate-900';
      popupContent.innerHTML = `
        <img src="${item.images[0]}" alt="${item.title}" class="w-full h-24 object-cover rounded-lg mb-2" />
        <div class="flex items-center gap-1 mb-1">
          <span class="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
            isPlot ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
          }">${item.category}</span>
          ${item.isVerified ? '<span class="text-[10px] font-bold bg-emerald-600 text-white px-1.5 py-0.5 rounded">✓ Verified</span>' : ''}
        </div>
        <h5 class="font-bold text-xs line-clamp-1">${item.title}</h5>
        <p class="text-[11px] text-slate-500 mb-1">${item.locality}, ${item.city}</p>
        <div class="flex justify-between items-center text-xs font-bold mt-2 pt-2 border-t border-slate-200">
          <span class="text-emerald-700 font-extrabold">${formatPrice(item.price)}</span>
          <span class="text-slate-600">${item.plotSize} ${item.sizeUnit}</span>
        </div>
        <button id="view-details-${item.id}" class="w-full mt-2 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors">
          View Details
        </button>
      `;

      popupContent.querySelector(`#view-details-${item.id}`)?.addEventListener('click', () => {
        onSelectProperty?.(item);
      });

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        onSelectProperty?.(item);
      });

      markersRef.current[item.id] = marker;
      bounds.extend([lat, lng]);
    });

    if (properties.length > 0 && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [properties, selectedPropertyId, onSelectProperty]);

  // Center on selected property
  useEffect(() => {
    if (!selectedPropertyId || !mapInstanceRef.current) return;
    const selected = properties.find(p => p.id === selectedPropertyId);
    if (selected && selected.coordinates.lat && selected.coordinates.lng) {
      mapInstanceRef.current.setView([selected.coordinates.lat, selected.coordinates.lng], 14, {
        animate: true
      });
      markersRef.current[selectedPropertyId]?.openPopup();
    }
  }, [selectedPropertyId, properties]);

  const handleRecenter = () => {
    if (!mapInstanceRef.current || properties.length === 0) return;
    const bounds = L.latLngBounds([]);
    properties.forEach(p => {
      if (p.coordinates.lat && p.coordinates.lng) {
        bounds.extend([p.coordinates.lat, p.coordinates.lng]);
      }
    });
    if (bounds.isValid()) {
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200" style={{ height }}>
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Layer switcher & Recenter Control */}
      <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
        <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 p-1 flex gap-1 text-xs">
          <button
            onClick={() => setMapType('streets')}
            className={`px-2.5 py-1.5 rounded-lg font-bold transition-colors ${
              mapType === 'streets' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Street
          </button>
          <button
            onClick={() => setMapType('satellite')}
            className={`px-2.5 py-1.5 rounded-lg font-bold transition-colors ${
              mapType === 'satellite' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Satellite
          </button>
          <button
            onClick={() => setMapType('terrain')}
            className={`px-2.5 py-1.5 rounded-lg font-bold transition-colors ${
              mapType === 'terrain' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Terrain
          </button>
        </div>

        <button
          onClick={handleRecenter}
          className="self-end bg-white/95 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          title="Fit all properties on map"
        >
          <Crosshair className="w-4 h-4" />
        </button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-md border border-slate-200 text-xs flex items-center gap-3">
        <div className="flex items-center gap-1.5 font-semibold text-slate-700">
          <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
          <span>Plot / Land</span>
        </div>
        <div className="flex items-center gap-1.5 font-semibold text-slate-700">
          <span className="w-3 h-3 rounded-full bg-blue-600"></span>
          <span>Property</span>
        </div>
        <div className="flex items-center gap-1 font-bold text-emerald-700">
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded">✓</span>
          <span>Verified Badge</span>
        </div>
      </div>
    </div>
  );
};
