// ==========================================================================
// CHATBOT KUBO IA - ASESOR VIRTUAL
// ==========================================================================

function initChatbot() {
  const openChatBtn = document.getElementById('openChatBtn');
  const closeChatBtn = document.getElementById('closeChatBtn');
  const chatModal = document.getElementById('chatModal');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');

  if (!openChatBtn || !chatModal || !chatForm) return;

  // Abrir y cerrar modal
  openChatBtn.addEventListener('click', () => {
    chatModal.classList.remove('hidden');
    chatModal.classList.add('flex');
    chatInput.focus();
  });

  closeChatBtn.addEventListener('click', () => {
    chatModal.classList.add('hidden');
    chatModal.classList.remove('flex');
  });

  // Manejo del envío de mensajes
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;

    // 1. Mostrar mensaje del usuario
    appendMessage(query, 'user');
    chatInput.value = '';

    // 2. Indicador de "escribiendo..."
    const typingIndicator = showTypingIndicator();

    // 3. Procesar respuesta (Motor local con conocimiento de KUBO)
    setTimeout(() => {
      typingIndicator.remove();
      const response = generateKuboResponse(query);
      appendMessage(response, 'bot');
    }, 700);
  });

  // Función para agregar burbuja de mensaje
  function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'user' 
      ? 'flex items-start justify-end gap-2' 
      : 'flex items-start gap-2';

    if (sender === 'user') {
      msgDiv.innerHTML = `
        <div class="bg-brand-gold text-white p-3 rounded-2xl rounded-tr-none shadow-xs max-w-[85%] leading-relaxed">
          ${text}
        </div>
      `;
    } else {
      msgDiv.innerHTML = `
        <div class="w-6 h-6 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center flex-shrink-0 mt-0.5">
          <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
        </div>
        <div class="bg-white p-3 rounded-2xl rounded-tl-none border border-stone-200 text-stone-700 shadow-xs max-w-[85%] leading-relaxed">
          ${text}
        </div>
      `;
    }

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Refrescar iconos de Lucide
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Indicador de escritura animado
  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'flex items-start gap-2 typing-indicator';
    typingDiv.innerHTML = `
      <div class="w-6 h-6 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center flex-shrink-0 mt-0.5">
        <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
      </div>
      <div class="bg-white p-3 rounded-2xl rounded-tl-none border border-stone-200 text-stone-400 shadow-xs flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:0.2s]"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:0.4s]"></span>
      </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    if (window.lucide) window.lucide.createIcons();
    return typingDiv;
  }

  // Base de conocimiento contextual
  function generateKuboResponse(input) {
    const text = input.toLowerCase();

    if (text.includes('precio') || text.includes('costo') || text.includes('cuanto cuesta')) {
      return 'Nuestros terrenos van desde los $165,000 en Los Mezquites hasta los $240,000 en Las Palmas. Puedes usar el simulador de financiamiento en la web para calcular tus mensualidades.';
    }

    if (text.includes('buro') || text.includes('crédito') || text.includes('credito') || text.includes('financiamiento')) {
      return '¡Contamos con financiamiento directo sin intermediarios bancarios ni revisión de buró de crédito! Ofrecemos plazos flexibles de hasta 120 meses y mensualidades fijas.';
    }

    if (text.includes('enganche')) {
      return 'Manejamos esquemas de enganche accesibles que puedes ajustar según tu presupuesto (desde el 10% hasta el 50% o más) para reducir tu cuota mensual.';
    }

    if (text.includes('ubicacion') || text.includes('donde estan') || text.includes('jalisco')) {
      return 'Nuestros 5 fraccionamientos se ubican en zonas estratégicas de alta plusvalía en Jalisco: El Paraje, Los Sauces, Los Mezquites, San Francisco y Las Palmas. Puedes ver cada uno en el mapa interactivo de la página.';
    }

    if (text.includes('escritura') || text.includes('papeles') || text.includes('legal')) {
      return 'En KUBO Inmuebles garantizamos certeza jurídica absoluta. Todos nuestros lotes cuentan con escrituración garantizada y procesos 100% transparentes.';
    }

    if (text.includes('visita') || text.includes('asesor') || text.includes('contacto') || text.includes('telefono')) {
      return 'Con gusto te canalizo con uno de nuestros asesores para agendar una visita a los terrenos. Puedes comunicarte vía WhatsApp al botón verde inferior o al teléfono 33 1000 0000.';
    }

    return 'Gracias por tu mensaje. En KUBO Inmuebles contamos con terrenos con financiamiento directo, sin buró y mensualidades a tu medida. ¿Te gustaría saber detalles de un fraccionamiento en específico o cotizar un financiamiento?';
  }
}

document.addEventListener('DOMContentLoaded', initChatbot);