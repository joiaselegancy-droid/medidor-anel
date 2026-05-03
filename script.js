let pixelsPorMm = 1;

// =========================
// REFERÊNCIAS
// =========================
const slider = document.getElementById("slider");
const circuloCalibrar = document.getElementById("circuloCalibrar");
const circuloMedir = document.getElementById("circuloMedir");

// =========================
// ATUALIZAR TAMANHO PELO SLIDER
// =========================
slider.addEventListener("input", function () {
  let valor = slider.value;

  // aplica no círculo ativo
  if (document.getElementById("calibracao").classList.contains("ativa")) {
    circuloCalibrar.style.width = valor + "px";
    circuloCalibrar.style.height = valor + "px";
  } else {
    circuloMedir.style.width = valor + "px";
    circuloMedir.style.height = valor + "px";
    calcularResultado(valor);
  }
});

// =========================
// CALIBRAÇÃO (50 centavos = 23mm)
// =========================
function confirmarCalibracao() {
  let px = circuloCalibrar.offsetWidth;

  pixelsPorMm = px / 23;

  document.getElementById("calibracao").classList.remove("ativa");
  document.getElementById("medicao").classList.add("ativa");

  slider.value = 120; // reset slider
}

// =========================
// CÁLCULO DO ARO (8 a 30)
// =========================
function calcularResultado(px) {
  let mm = px / pixelsPorMm;

  let aro = Math.round((mm - 10) * 2);

  if (aro < 8) aro = 8;
  if (aro > 30) aro = 30;

  document.getElementById("resultado").innerText = "Aro: " + aro;
}
