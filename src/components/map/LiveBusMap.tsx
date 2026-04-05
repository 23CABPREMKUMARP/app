import React, { useEffect, useState, useRef, Suspense } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const originalWarn = console.warn;
const originalError = console.error;
const originalLog = console.log;

console.warn = (...args) => {
  if (typeof args[0] === 'string' && (
      args[0].includes('THREE.Clock: This module has been deprecated') ||
      args[0].includes('non-static position') ||
      args[0].includes('Context Lost')
  )) return;
  originalWarn(...args);
};

console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Context Lost')) return;
  originalError(...args);
};

console.log = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Context Lost')) return;
  originalLog(...args);
};

import { createRoot, Root } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls, Center, PerspectiveCamera, Bounds } from "@react-three/drei";

// --- Types ---
interface BusLocation { lat: number; lng: number; rotation: number; }
interface BusPathNode { lat: number; lng: number; }
interface BusStop { _id: string; stopName: string; lat: number; lng: number; type?: 'major' | 'small'; }
interface BusData {
  _id: string;
  busNumber: string;
  status: string;
  speed: number;
  fare: number;
  availableSeats: number;
  departureTime: string;
  arrivalTime: string;
  currentStop?: string;
  nextStop?: string;
  location: BusLocation;
  routeId?: {
    routeName: string;
    from: string;
    to: string;
    path: BusPathNode[];
    stops: BusStop[];
  };
}

interface MapLayers {
  showBuses: boolean;
  showRoutes: boolean;
  showMajorStops: boolean;
  showSmallStops: boolean;
  showTraffic: boolean;
  showBuildings: boolean;
}

// Brisbane City Bus Model
function BrisbaneBusModel() {
  const { scene } = useGLTF("/brisbane_fixed.glb");
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);
  
  return (
    <primitive 
      object={clonedScene} 
      scale={0.4} // Drastically scaled up 16x! The massive 250px container prevents clipping, but the model needs to be huge natively.
    />
  );
}

const BusMarkerCanvas = React.memo(({ rotationDegrees, isRunning, busNumber, isSelected, mapBearing, showTelemetry }: { rotationDegrees: number, isRunning: boolean, busNumber: string, isSelected: boolean, mapBearing: number, showTelemetry?: boolean }) => {
  // DYNAMIC COMPASS SYNC: To visually align with the road in our non-rotating billboard canvas,
  // we counter-rotate the 3D model by the MAP'S current bearing + the bus heading.
  const visualRotation = rotationDegrees + mapBearing;
  const rotationY = -(visualRotation * Math.PI) / 180;

  return (
    <div className={`flex flex-col items-center justify-center relative pointer-events-none transition-all duration-700 ${isSelected ? "z-50" : "z-10"}`}>
      {/* HUD Plate */}
      <div className={`absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.2)] border-2 transition-all duration-300 flex flex-col items-center gap-1 z-[100] pointer-events-auto ${isSelected ? "border-orange-500 scale-110 -translate-y-4" : "border-white"}`}>
        <div className="flex items-center gap-2">
           <div className={`w-2.5 h-2.5 rounded-full ${isRunning ? "bg-orange-600 animate-pulse shadow-[0_0_10px_rgba(255,107,0,0.8)]" : "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"}`} />
           <span className="text-[11px] font-black text-zinc-900 tracking-tight uppercase whitespace-nowrap">{busNumber}</span>
        </div>
        {showTelemetry && isRunning && (
           <div className="text-[8px] text-orange-600 font-bold tracking-widest uppercase mt-1 px-2 border-t border-orange-500/10 pt-1 w-full text-center">
             Radar Active
           </div>
        )}
      </div>

      {/* 3D Model Stage - Massive DOM wrapper size prevents DOM clipping during fast rotation */}
      <div 
        className="w-[250px] h-[250px] relative pointer-events-none transition-transform duration-100 ease-out"
        style={{ transform: `scale(calc(var(--bus-scale, 0.4) * ${isSelected ? 1.15 : 1}))`, transformOrigin: 'center center' }}
      >
         <Suspense fallback={null}>
           <Canvas dpr={[1, 1.5]} frameloop="demand" gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}>
              <PerspectiveCamera makeDefault position={[-10, 10, 10]} fov={35} onUpdate={(c) => c.lookAt(0, 0, 0)} />
              <ambientLight intensity={1.5} />
              <directionalLight position={[10, 20, 5]} intensity={2.5} castShadow={false} />
              <directionalLight position={[-10, 20, -5]} intensity={1} castShadow={false} />
              
              <group rotation={[0, rotationY, 0]}>
                 <Center>
                    <BrisbaneBusModel />
                 </Center>
              </group>
           </Canvas>
        </Suspense>
        
        {isSelected && (
          <div className="absolute inset-x-8 inset-y-16 rounded-full border-4 border-orange-500 flex items-center justify-center animate-ping pointer-events-none" />
        )}
      </div>
    </div>
  );
});

export default function LiveBusMap({ 
    onBusClick, buses, selectedBusId, layers, onUserLocationUpdate,
    userLocation, nearestBus, centerOn, navPath, navStats
}: { 
    onBusClick: (bus: any) => void, buses: BusData[], selectedBusId?: string | null, layers: MapLayers, onUserLocationUpdate?: (pos: {lat: number, lng: number}) => void,
    userLocation?: {lat: number, lng: number} | null, nearestBus?: any, centerOn?: any, navPath?: any, navStats?: any
}) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const busMarkers = useRef<{ [key: string]: { marker: maplibregl.Marker, root: Root, isRunning: boolean, isSelected: boolean } }>({});
  const stopMarkersRef = useRef<{ [key: string]: maplibregl.Marker }>({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapBearing, setMapBearing] = useState(-15);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Stable OSM Raster Base with 3D Pitch Built-In
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "© OpenStreetMap contributors"
          }
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm"
          }
        ]
      },
      center: [76.9558, 11.0168],
      zoom: 14,
      pitch: 60, // 3D Tilt for beautiful side-mapping
      bearing: -15, // Slight landscape rotation
      scrollZoom: true
    });

    // Dynamically scale buses perfectly with map zoom without React re-renders!
    const updateBusScale = () => {
      if (mapContainer.current) {
        const zoom = map.getZoom();
        // SUBTLE SCALING: Gentle zoom curve to prevent massive distortion during tracking
        const scale = Math.max(0.65, Math.min(1.2, 0.95 * Math.pow(1.04, zoom - 14)));
        mapContainer.current.style.setProperty('--bus-scale', scale.toString());
      }
    };

    map.on('zoom', updateBusScale);
    map.on('rotate', () => setMapBearing(map.getBearing()));

    map.on("load", () => {
      setMapLoaded(true);
      updateBusScale(); // Apply initial scale

      // Only adding essential route sources
      map.addSource("routes", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
      
      // 0. Volumetric Drop Shadow (Depth)
      map.addLayer({
        id: "routes-layer-shadow",
        type: "line",
        source: "routes",
        layout: {
          "line-cap": "round",
          "line-join": "round"
        },
        paint: {
          "line-color": "rgba(0,0,0,0.15)",
          "line-width": [
            "interpolate", ["linear"], ["zoom"],
            10, 16,
            14, 30,
            18, 64
          ],
          "line-blur": 2,
          "line-offset": 2
        }
      });

      // 1. Outer Casing (The "road structure" base)
      map.addLayer({
        id: "routes-layer-casing",
        type: "line",
        source: "routes",
        layout: {
          "line-cap": "round",
          "line-join": "round"
        },
        paint: {
          "line-color": [
            "case",
            ["==", ["get", "isActive"], true], "#FFEDD5", // Light orange border for active
            "#e2e8f0" // Faint gray for inactive
          ],
          "line-width": [
            "interpolate", ["linear"], ["zoom"],
            10, 10,
            14, 26,
            18, 60
          ],
          "line-opacity": [
            "case",
            ["==", ["get", "isActive"], true], 1.0,
            0.5
          ]
        }
      });

      // 2. Inner Route Line (The colored "lane")
      map.addLayer({
        id: "routes-layer-inner",
        type: "line",
        source: "routes",
        layout: {
          "line-cap": "round",
          "line-join": "round"
        },
        paint: {
          "line-color": [
            "case",
            ["==", ["get", "isActive"], true], "#FF6B00", // Bright orange for active
            "#94a3b8" // Slate gray for alternate
          ],
          "line-width": [
            "interpolate", ["linear"], ["zoom"],
            10, 6,
            14, 18,
            18, 48
          ],
          "line-opacity": [
            "case",
            ["==", ["get", "isActive"], true], 1.0,
            0.6
          ]
        }
      });

      // 3. User to Bus Navigation Path (Neon Highlights)
      map.addSource("nav-routes", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
      map.addLayer({
        id: "nav-routes-casing",
        type: "line",
        source: "nav-routes",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": "#10b981", "line-width": ["interpolate", ["linear"], ["zoom"], 10, 8, 14, 18, 18, 30], "line-opacity": 0.4 }
      });
      map.addLayer({
        id: "nav-routes-inner",
        type: "line",
        source: "nav-routes",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": "#34d399", "line-width": ["interpolate", ["linear"], ["zoom"], 10, 4, 14, 10, 18, 20] }
      });
    });

    mapRef.current = map;
    return () => {
      if (mapRef.current) mapRef.current.remove();
      mapRef.current = null;
    };
  }, []);

  // Update Polyline
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;
    const routeFeatures = !layers.showRoutes ? [] : buses.filter(b => b.routeId?.path && b.routeId.path.length >= 2).map(bus => ({
      type: "Feature",
      properties: {
        isActive: selectedBusId ? selectedBusId === bus._id : true
      },
      geometry: { type: "LineString", coordinates: bus.routeId!.path.map(p => [p.lng, p.lat]) }
    }));
    const s = map.getSource("routes") as maplibregl.GeoJSONSource;
    if (s) s.setData({ type: "FeatureCollection", features: routeFeatures } as any);

    // Update Live Navigation Paths
    const navSource = map.getSource("nav-routes") as maplibregl.GeoJSONSource;
    if (navSource) {
      if (navPath) {
        navSource.setData({
          type: "FeatureCollection",
          features: [{ type: "Feature", properties: {}, geometry: navPath }]
        } as any);
        
        // Auto-center and perfectly frame the user's nav path on screen
        if (navPath.coordinates && navPath.coordinates.length > 0) {
           const bounds = new maplibregl.LngLatBounds();
           navPath.coordinates.forEach((coord: any) => bounds.extend(coord));
           map.fitBounds(bounds, { padding: 120, duration: 2000, pitch: 45, maxZoom: 16 });
        }
      } else {
        navSource.setData({ type: "FeatureCollection", features: [] } as any);
      }
    }
  }, [buses, mapLoaded, selectedBusId, navPath, layers.showRoutes]);

  // Center Map when Search or Navigation triggers
  useEffect(() => {
    if (mapRef.current && centerOn && mapLoaded) {
      mapRef.current.flyTo({ 
        center: [centerOn.lng, centerOn.lat], 
        zoom: centerOn.zoom || 16, 
        pitch: centerOn.pitch !== undefined ? centerOn.pitch : 45,
        bearing: centerOn.bearing !== undefined ? centerOn.bearing : 0,
        essential: true, 
        duration: 2500 
      });
    }
  }, [centerOn, mapLoaded]);

  // Handle User Location Map Marker
  const userMarkerRef = useRef<maplibregl.Marker | null>(null);
  useEffect(() => {
      const map = mapRef.current;
      if (!map || !mapLoaded) return;
      
      if (userLocation) {
         if (!userMarkerRef.current) {
            const el = document.createElement('div');
            el.className = 'w-5 h-5 bg-orange-600 border-[3px] border-white rounded-full shadow-[0_0_20px_rgba(255,107,0,0.8)] animate-pulse';
            userMarkerRef.current = new maplibregl.Marker({ element: el })
              .setLngLat([userLocation.lng, userLocation.lat])
              .addTo(map);
         } else {
            userMarkerRef.current.setLngLat([userLocation.lng, userLocation.lat]);
         }
      } else if (userMarkerRef.current) {
         userMarkerRef.current.remove();
         userMarkerRef.current = null;
      }
  }, [userLocation, mapLoaded]);


  // Update Markers Target Engine
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    buses.forEach(bus => {
      const isSelected = selectedBusId === bus._id;
      const isRunning = bus.status === 'Running';

      if (!busMarkers.current[bus._id]) {
        const el = document.createElement('div');
        el.className = "bus-marker-canvas-wrapper";
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          onBusClick(bus);
          map.flyTo({ center: [bus.location.lng, bus.location.lat], zoom: 15 });
        });
        
        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([bus.location.lng, bus.location.lat])
          .addTo(map);
          
        const root = createRoot(el);
        root.render(<BusMarkerCanvas rotationDegrees={bus.location.rotation} isRunning={isRunning} busNumber={bus.busNumber} isSelected={isSelected} mapBearing={mapBearing} />);
        busMarkers.current[bus._id] = { 
            marker, root, isRunning, isSelected, 
            rotation: bus.location.rotation,
            targetLng: bus.location.lng, 
            targetLat: bus.location.lat 
        } as any;
      } else {
        const cache = busMarkers.current[bus._id] as any;
        // Set target coordinates for the smooth interpolator Engine!
        cache.targetLng = bus.location.lng;
        cache.targetLat = bus.location.lat;
        
        // Critical: Must evaluate if rotation shifted, otherwise the bus is frozen facing the same default direction forever!
        if (cache.isRunning !== isRunning || cache.isSelected !== isSelected || cache.rotation !== bus.location.rotation || cache.mapBearing !== mapBearing) {
           cache.isRunning = isRunning;
           cache.isSelected = isSelected;
           cache.rotation = bus.location.rotation;
           cache.mapBearing = mapBearing;
           cache.root.render(<BusMarkerCanvas rotationDegrees={bus.location.rotation} isRunning={isRunning} busNumber={bus.busNumber} isSelected={isSelected} mapBearing={mapBearing} showTelemetry={layers.showTraffic} />);
        }
        cache.marker.getElement().style.display = layers.showBuses ? 'block' : 'none';
      }
    });

    Object.keys(busMarkers.current).forEach(id => {
      if (!buses.find(b => b._id === id)) {
        setTimeout(() => {
           if (busMarkers.current[id]) {
               busMarkers.current[id].root.unmount();
               busMarkers.current[id].marker.remove();
               delete busMarkers.current[id];
           }
        }, 0);
      }
    });
    
    // Station/Stops Engine Handler
    const activeMap = mapRef.current;
    if (layers.showMajorStops && activeMap) {
        buses.forEach(bus => {
           if (bus.routeId?.stops) {
              bus.routeId.stops.forEach((stop: any) => {
                 if (!stopMarkersRef.current[stop._id]) {
                     const el = document.createElement('div');
                     el.className = "relative flex flex-col items-center group cursor-pointer";
                     
                     // The Dot
                     const dot = document.createElement('div');
                     dot.className = "w-3 h-3 bg-white border-2 border-[#EA580C] rounded-full shadow-md transition-transform hover:scale-150";
                     
                     // The Label (Visible by default)
                     const label = document.createElement('div');
                     label.className = "absolute -bottom-8 bg-white/95 border border-[#EA580C]/20 text-[#EA580C] text-[10px] font-black tracking-tight px-2 py-0.5 rounded-md shadow-sm whitespace-nowrap backdrop-blur-sm pointer-events-none z-10";
                     label.innerText = stop.stopName;
                     
                     el.appendChild(dot);
                     el.appendChild(label);
                     
                     const smarker = new maplibregl.Marker({ element: el, anchor: 'center' })
                       .setLngLat([stop.lng, stop.lat])
                       .addTo(activeMap);
                     stopMarkersRef.current[stop._id] = smarker;
                  }
              });
           }
        });
    } else {
        Object.keys(stopMarkersRef.current).forEach(id => {
            stopMarkersRef.current[id].remove();
            delete stopMarkersRef.current[id];
        });
    }
    
  }, [buses, mapLoaded, selectedBusId, onBusClick, layers.showTraffic, layers.showMajorStops, layers.showBuses, mapBearing]);

  // Buttery-Smooth Fast-Rendering GPU Interpolator
  useEffect(() => {
     let frameId: number;
     const animateGL = () => {
        Object.values(busMarkers.current).forEach((cache: any) => {
           if (cache.targetLng !== undefined && cache.targetLat !== undefined) {
              const curr = cache.marker.getLngLat();
              const dx = cache.targetLng - curr.lng;
              const dy = cache.targetLat - curr.lat;
              
              // Glide marker position smoothly (15% closer per frame, achieving ~60FPS visual snap)
              if (Math.abs(dx) > 0.000001 || Math.abs(dy) > 0.000001) {
                 cache.marker.setLngLat([
                    curr.lng + dx * 0.15, 
                    curr.lat + dy * 0.15
                 ]);
              }
           }
        });
        frameId = requestAnimationFrame(animateGL);
     };
     frameId = requestAnimationFrame(animateGL);
     return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="h-full w-full relative bg-zinc-50 overflow-hidden">
      <div 
        ref={mapContainer} 
        className="w-full h-full relative" 
        style={{ minHeight: '600px', position: 'relative' }} 
      />
      {!mapLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-xl z-[1000]">
           <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
           <p className="text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">Synchronizing Network State</p>
        </div>
      )}
    </div>
  );
}
