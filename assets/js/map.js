// ==========================================================================
// MAPA INTERACTIVO + VISTA FOTOGRÁFICA REAL - KUBO INMUEBLES
// ==========================================================================

let activeDevelopmentId = 'los-mezquites';
let miniMap = null;
let miniMarker = null;

function initMap() {
  const pinsContainer = document.getElementById('pinsContainer');
  if (!pinsContainer || typeof developments === 'undefined') return;

  // 1. Renderizar los botones de los pins sobre el visor fotográfico
  pinsContainer.innerHTML = developments.map(dev => {
    return `
      <button 
        id="pin-${dev.id}" 
        onclick="selectMapDevelopment('${dev.id}')"
        style="top: ${dev.mapPin.top}; left: ${dev.mapPin.left};" 
        class="map-pin-btn absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-all duration-300 z-20 focus:outline-none"
        title="${dev.name}"
      >
        <div class="pin-icon-box p-2 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center bg-white text-stone-700">
          <i data-lucide="map-pin" class="w-4 h-4"></i>
        </div>
        <span class="pin-label text-[10px] font-semibold px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap transition-colors duration-300 bg-black/75 text-white">
          ${dev.name}
        </span>
      </button>
    `;
  }).join('');

  // 2. Inicializar el mini-mapa satelital real con Leaflet + Esri
  initLeafletMiniMap(activeDevelopmentId);

  // 3. Aplicar estado inicial
  selectMapDevelopment(activeDevelopmentId);
}

function initLeafletMiniMap(initialId) {
  const mapContainer = document.getElementById('leafletMiniMap');
  const dev = developments.find(d => d.id === initialId);
  if (!mapContainer || !dev || typeof L === 'undefined') return;

  miniMap = L.map('leafletMiniMap', {
    center: dev.coords,
    zoom: 15,
    zoomControl: false,
    attributionControl: false
  });

  // Capa satelital gratuita de Esri World Imagery (sin API Key)
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19
  }).addTo(miniMap);

  // Icono dorado personalizado para el marcador GPS
  const goldIcon = L.divIcon({
    className: 'custom-gps-pin',
    html: `<div style="background-color:#c58d43; width:18px; height:18px; border-radius:50%; border:3px solid white; box-shadow:0 2px 6px rgba(0,0,0,0.45);"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });

  miniMarker = L.marker(dev.coords, { icon: goldIcon }).addTo(miniMap);
}

function selectMapDevelopment(devId) {
  const dev = developments.find(d => d.id === devId);
  if (!dev) return;

  activeDevelopmentId = devId;

  // 1. Cambiar la fotografía de fondo con transición suave
  const bgImg = document.getElementById('mapBgImage');
  const bgLabel = document.getElementById('bgPhotoLabel');
  if (bgImg) {
    bgImg.style.opacity = '0.35';
    setTimeout(() => {
      bgImg.src = dev.image;
      bgImg.style.opacity = '1';
    }, 180);
  }
  if (bgLabel) {
    bgLabel.textContent = dev.name;
  }

  // 2. Actualizar estilos visuales de todos los pines
  document.querySelectorAll('.map-pin-btn').forEach(btn => {
    const iconBox = btn.querySelector('.pin-icon-box');
    const label = btn.querySelector('.pin-label');
    const isCurrent = btn.id === `pin-${activeDevelopmentId}`;

    if (isCurrent) {
      iconBox.className = 'pin-icon-box p-2.5 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center bg-[#c58d43] text-white ring-4 ring-[#c58d43]/40 scale-110';
      label.className = 'pin-label text-[10px] font-bold px-2.5 py-0.5 rounded shadow mt-1 whitespace-nowrap bg-[#c58d43] text-white';
    } else {
      iconBox.className = 'pin-icon-box p-2 rounded-full shadow-md transition-all duration-300 flex items-center justify-center bg-white text-stone-700 hover:scale-105';
      label.className = 'pin-label text-[10px] font-semibold px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap bg-black/75 text-white';
    }
  });

  // 3. Actualizar textos, amenidades y enlace de Google Maps
  const titleEl = document.getElementById('markerTitle');
  const descEl = document.getElementById('markerDesc');
  const amenitiesListEl = document.getElementById('markerAmenities');
  const gmapsLink = document.getElementById('googleMapsLink');

  if (titleEl) titleEl.textContent = dev.name;
  if (descEl) descEl.textContent = dev.description;
  if (gmapsLink) {
    gmapsLink.href = `https://www.google.com/maps?q=${dev.coords[0]},${dev.coords[1]}`;
  }

  if (amenitiesListEl) {
    amenitiesListEl.innerHTML = dev.amenities
      .map(amenity => `
        <li class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-[#c58d43] flex-shrink-0"></span>
          <span>${amenity}</span>
        </li>
      `)
      .join('');
  }

  // 4. Mover suavemente el mapa satelital real a las coordenadas del desarrollo
  if (miniMap && miniMarker && dev.coords) {
    miniMap.flyTo(dev.coords, 15, { duration: 1.1 });
    miniMarker.setLatLng(dev.coords);
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

document.addEventListener('DOMContentLoaded', initMap);