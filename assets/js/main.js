// ==========================================================================
// ORQUESTADOR PRINCIPAL - KUBO INMUEBLES
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar iconos de Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Renderizar el catálogo inicial
  renderDevelopmentCards(developments);

  // 3. Inicializar el buscador interactivo
  initSearchFilter();
});

// Renderiza las tarjetas de desarrollos en el DOM
function renderDevelopmentCards(items) {
  const cardsGrid = document.getElementById('cardsGrid');
  if (!cardsGrid) return;

  // Generar HTML para cada desarrollo
  let html = items.map(dev => `
    <div class="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col group">
      <!-- Contenedor de Imagen y Badges -->
      <div class="relative h-60 overflow-hidden bg-stone-100">
        <img 
          src="${dev.image}" 
          alt="${dev.name}" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        <!-- Badge de categoría superior (ej. Más Vendido, Vista al Lago) -->
        <span class="absolute top-4 left-4 ${dev.badgeClass} text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
          ${dev.badge}
        </span>

        <!-- Logotipo oficial sobrepuesto en la esquina inferior izquierda -->
        <div class="logo-badge-overlay absolute bottom-3 left-3 w-12 h-12 rounded-xl p-1 flex items-center justify-center border border-white/50">
          <img 
            src="${dev.logo}" 
            alt="Logo ${dev.name}" 
            class="max-w-full max-h-full object-contain rounded"
          />
        </div>
      </div>

      <!-- Información del Fraccionamiento -->
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-1">
            <h3 class="font-serif text-2xl font-bold text-stone-800">${dev.name}</h3>
            <a href="#ubicacion" onclick="selectMapDevelopment('${dev.id}')" title="Ver en mapa" class="p-1 text-brand-gold hover:text-brand-goldHover transition">
              <i data-lucide="arrow-up-right" class="w-5 h-5"></i>
            </a>
          </div>
          <p class="text-xs text-stone-400 mb-6 flex items-center gap-1">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-brand-gold"></i> ${dev.location}
          </p>
        </div>

        <div class="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
          <div>
            <span class="text-stone-400 block text-[10px] uppercase font-medium">Desde</span>
            <span class="text-stone-800 font-bold text-base">${dev.priceLabel}</span>
          </div>
          <div class="text-right">
            <span class="text-stone-400 block text-[10px] uppercase font-medium">Superficie</span>
            <span class="text-stone-800 font-semibold">${dev.sizeLabel}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Agregar la tarjeta dorada de asesoría al final de la cuadrícula
  html += `
    <div class="bg-gradient-to-br from-brand-gold to-[#986725] text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg">
      <div>
        <span class="text-xs uppercase font-semibold tracking-wider text-amber-200">¿Necesitas Ayuda?</span>
        <h3 class="font-serif text-3xl font-bold mt-3 mb-4 leading-tight">Te ayudamos a elegir el lote ideal</h3>
        <p class="text-sm text-white/90 font-light leading-relaxed">
          Nuestros asesores te guían sin compromiso para encontrar la inversión perfecta según tu presupuesto.
        </p>
      </div>
      <a href="#contacto" class="inline-flex items-center justify-center gap-2 bg-[#2d1b0f] hover:bg-black text-white text-xs font-semibold py-3.5 px-6 rounded-full transition mt-8 shadow-md">
        Hablar con un asesor <i data-lucide="arrow-right" class="w-4 h-4"></i>
      </a>
    </div>
  `;

  cardsGrid.innerHTML = html;

  // Refrescar iconos insertados dinámicamente
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Filtro del buscador avanzado
function initSearchFilter() {
  const form = document.getElementById('searchForm');
  const filterDev = document.getElementById('filterDevelopment');
  const filterPrice = document.getElementById('filterPrice');
  const filterSize = document.getElementById('filterSize');

  if (!form) return;

  function applyFilters() {
    const selectedDev = filterDev.value;
    const selectedPrice = filterPrice.value;
    const selectedSize = filterSize.value;

    const filtered = developments.filter(dev => {
      // 1. Filtro por desarrollo
      if (selectedDev !== 'all' && dev.id !== selectedDev) {
        return false;
      }

      // 2. Filtro por precio
      if (selectedPrice === 'under-180' && dev.price >= 180000) return false;
      if (selectedPrice === '180-220' && (dev.price < 180000 || dev.price > 220000)) return false;
      if (selectedPrice === 'over-220' && dev.price <= 220000) return false;

      // 3. Filtro por tamaño
      if (selectedSize === '160-200' && (dev.size < 160 || dev.size > 200)) return false;
      if (selectedSize === '200-plus' && dev.size < 200) return false;

      return true;
    });

    renderDevelopmentCards(filtered);
  }

  // Filtrar al presionar el botón o cambiar selectores
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    applyFilters();
  });

  filterDev.addEventListener('change', applyFilters);
  filterPrice.addEventListener('change', applyFilters);
  filterSize.addEventListener('change', applyFilters);
}