import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { impactApi } from '../../services/api';
import { StateMapData, MapMarker } from '../../types';
import { MapPin, AlertTriangle, ShieldCheck, ExternalLink, Filter, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const getPriorityColor = (priority: string) => {
  switch (priority?.toUpperCase()) {
    case 'CRITICAL':
      return '#ef4444'; // Red
    case 'HIGH':
      return '#f97316'; // Orange
    case 'MEDIUM':
      return '#eab308'; // Amber
    default:
      return '#10b981'; // Emerald
  }
};

const MapController: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

export const IndiaLeafletMap: React.FC<{ selectedState?: string; height?: string }> = ({
  selectedState = 'All',
  height = '500px',
}) => {
  const [states, setStates] = useState<StateMapData[]>([]);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [center, setCenter] = useState<[number, number]>([22.5937, 78.9629]);
  const [zoom, setZoom] = useState<number>(5);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const data = await impactApi.getMapData();
        setStates(data.states || data.districts || []);
        setMarkers(data.markers || []);
      } catch (err) {
        console.error('Failed to load map data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMapData();
  }, []);

  const filteredStates = states.filter((s) => {
    if (selectedState !== 'All' && s.name !== selectedState) return false;
    return true;
  });

  const filteredMarkers = markers.filter((m) => {
    if (selectedState !== 'All' && m.state && m.state !== selectedState) return false;
    if (activeCategory !== 'All' && m.category !== activeCategory) return false;
    return true;
  });

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
      {/* Map Control Overlay */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-wrap items-center gap-2 bg-slate-900/90 backdrop-blur-md p-2 rounded-xl border border-slate-700 shadow-lg text-xs">
        <div className="flex items-center gap-1.5 text-slate-300 font-medium px-2">
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          <span>Category:</span>
        </div>
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
          className="bg-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1 border border-slate-700 focus:outline-none focus:border-emerald-500"
        >
          <option value="All">All Categories</option>
          <option value="Water & Sanitation">Water & Sanitation</option>
          <option value="Clean Energy & Environment">Clean Energy & Environment</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Disaster Management">Disaster Management</option>
        </select>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-slate-900/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-700 shadow-lg text-[11px] text-slate-300 space-y-1">
        <div className="font-semibold text-white mb-1">State Priority Intensity:</div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span>Critical</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span>High</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Low</span>
          </div>
        </div>
      </div>

      {/* Map Canvas */}
      <div style={{ height }}>
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%', backgroundColor: '#0f172a' }}
        >
          <MapController center={center} zoom={zoom} />
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {/* State Circles */}
          {filteredStates.map((s) => (
            <CircleMarker
              key={s.name}
              center={[s.lat, s.lng]}
              radius={Math.max(10, Math.min(26, s.problems / 6))}
              pathOptions={{
                fillColor: getPriorityColor(s.priority),
                fillOpacity: 0.5,
                color: getPriorityColor(s.priority),
                weight: 2,
              }}
            >
              <Popup className="custom-popup">
                <div className="p-1 text-slate-900 text-xs min-w-[200px]">
                  <div className="flex items-center justify-between font-bold text-sm text-slate-900 mb-1 border-b pb-1">
                    <span>{s.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-slate-100">
                      {s.state_code}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px] my-2">
                    <div>
                      <span className="text-slate-500 block">Total Issues:</span>
                      <span className="font-bold text-slate-800">{s.problems}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Active Projects:</span>
                      <span className="font-bold text-emerald-600">{s.active_projects}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Deployments:</span>
                      <span className="font-bold text-blue-600">{s.deployments}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Beneficiaries:</span>
                      <span className="font-bold text-slate-800">{s.beneficiaries?.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="mt-2 pt-1 border-t flex items-center justify-between">
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white"
                      style={{ backgroundColor: getPriorityColor(s.priority) }}
                    >
                      {s.priority} PRIORITY
                    </span>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}

          {/* Active Problem / Deployment Markers */}
          {filteredMarkers.map((m) => (
            <Marker key={m.id} position={[m.lat, m.lng]}>
              <Popup className="custom-popup">
                <div className="p-1 text-slate-900 text-xs min-w-[230px]">
                  <div className="flex items-center justify-between gap-2 mb-1 border-b pb-1">
                    <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded">
                      {m.code}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-600">
                      {m.district}, {m.state}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 leading-tight mb-1">{m.title}</h4>
                  <p className="text-[11px] text-slate-600 mb-2">
                    <span className="font-medium text-slate-800">Category:</span> {m.category}
                  </p>
                  {m.solution && (
                    <div className="bg-slate-50 p-1.5 rounded text-[10px] text-slate-700 mb-2 border border-slate-200">
                      <span className="font-semibold text-emerald-700">Deployed Solution:</span> {m.solution}
                    </div>
                  )}
                  <Link
                    to={`/problems/${m.code}`}
                    className="inline-flex items-center gap-1 font-semibold text-xs text-emerald-700 hover:text-emerald-800"
                  >
                    View Problem DNA & Solutions <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};
