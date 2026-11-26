// ==========================================================================
// SIMULADOR DE FINANCIAMIENTO DIRECTO - KUBO INMUEBLES
// ==========================================================================

function initSimulator() {
  const developmentSelect = document.getElementById('developmentSelect');
  const downPaymentInput = document.getElementById('downPaymentInput');
  const termInput = document.getElementById('termInput');

  const priceValue = document.getElementById('priceValue');
  const downPaymentValue = document.getElementById('downPaymentValue');
  const termValue = document.getElementById('termValue');

  const monthlyResult = document.getElementById('monthlyResult');
  const financedAmount = document.getElementById('financedAmount');
  const totalAmount = document.getElementById('totalAmount');

  if (!developmentSelect || !downPaymentInput || !termInput) return;

  // Asignar estilos personalizados a los sliders activos
  downPaymentInput.classList.add('kubo-slider');
  termInput.classList.add('kubo-slider');

  // Función para pintar la barra recorrida en dorado y lo restante en oscuro
  function updateSliderFill(slider, activeColor = '#bfa37c', inactiveColor = '#382f27') {
    const min = parseFloat(slider.min) || 0;
    const max = parseFloat(slider.max) || 100;
    const val = parseFloat(slider.value);
    const percentage = ((val - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, ${activeColor} 0%, ${activeColor} ${percentage}%, ${inactiveColor} ${percentage}%, ${inactiveColor} 100%)`;
  }

  function calculateLoan() {
    // Obtiene el precio exacto del fraccionamiento seleccionado
    const price = parseFloat(developmentSelect.value);
    const downPercent = parseFloat(downPaymentInput.value);
    const months = parseInt(termInput.value, 10);

    // Cálculos financieros
    const downPaymentPesos = price * (downPercent / 100);
    const principal = price - downPaymentPesos;

    // Tasa anual de referencia (~10.5% anual)
    const annualRate = 0.105;
    const monthlyRate = annualRate / 12;

    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    } else {
      monthlyPayment = principal / months;
    }

    const totalPaid = (monthlyPayment * months) + downPaymentPesos;

    // Actualización de etiquetas visuales
    priceValue.textContent = `$${price.toLocaleString('es-MX')}`;
    downPaymentValue.textContent = `${downPercent}%`;
    termValue.textContent = `${months} meses`;

    // Actualización de montos proyectados
    monthlyResult.textContent = `$${Math.round(monthlyPayment).toLocaleString('es-MX')}`;
    financedAmount.textContent = `$${Math.round(principal).toLocaleString('es-MX')}`;
    totalAmount.textContent = `$${Math.round(totalPaid).toLocaleString('es-MX')}`;

    // Actualización de progreso visual en sliders
    updateSliderFill(downPaymentInput);
    updateSliderFill(termInput);
  }

  // Escuchar cambios en el selector de terreno y en los sliders
  developmentSelect.addEventListener('change', calculateLoan);
  downPaymentInput.addEventListener('input', calculateLoan);
  termInput.addEventListener('input', calculateLoan);

  // Cálculo inicial al cargar
  calculateLoan();
}

// Función auxiliar opcional por si quieres preseleccionar un desarrollo desde una tarjeta
function selectDevelopmentInSimulator(price) {
  const developmentSelect = document.getElementById('developmentSelect');
  if (developmentSelect) {
    developmentSelect.value = price.toString();
    developmentSelect.dispatchEvent(new Event('change'));
  }
}

document.addEventListener('DOMContentLoaded', initSimulator);