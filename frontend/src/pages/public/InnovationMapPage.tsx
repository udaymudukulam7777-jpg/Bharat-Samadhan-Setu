import React, { useState } from 'react';
import { IndiaLeafletMap } from '../../components/map/IndiaLeafletMap';
import { INDIAN_STATES } from '../../utils/constants';
import { MapPin, Layers, Filter } from 'lucide-react';

export const InnovationMapPage: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('All');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
            Geospatial Decision Support System
          </span>
          <h1 className="text-3xl font-extrabold text-white">National GIS Innovation Map</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time geospatial visualization of civic problem severity, IIT/NIT research clusters, and verified prototype deployments.
          </p>
        </div>

        {/* State Selector */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-400" />
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-slate-900 text-slate-200 text-xs rounded-xl px-3.5 py-2 border border-slate-700 focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All 28 States & 8 UTs</option>
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <IndiaLeafletMap selectedState={selectedState} height="650px" />
    </div>
  );
};
