let pixelsPorMm = 1;
let ultimoAro = null;

const sliderCalibrar = document.getElementById("sliderCalibrar");
const sliderMedir = document.getElementById("sliderMedir");

const circuloCalibrar = document.getElementById("circuloCalibrar");
const circuloMedir = document.getElementById("circuloMedir");

// =========================
// SLIDER CALIBRAÇÃO
// =========================
sliderCalibrar.addEventListener("input", function () {
  let valor = this.value;
  circuloCalibrar.style.width = valor + "px";
  circuloCalibrar.style.height = valor + "px";
});

// =========================
// SLIDER MEDIÇÃO
// =========================
sliderMedir.addEventListener("input", function () {
  let valor = this.value;
  circuloMedir.style.width = valor + "px";
  circuloMedir.style.height = valor + "px";

  calcularResultado(valor);
});

// =========================
// CALIBRAÇÃO (50 centavos = 23mm)
// =========================
function confirmarCalibracao() {
  let px = circuloCalibrar.offsetWidth;

  pixelsPorMm = px / 23;

  document.getElementById("calibracao").classList.remove("ativa");
  document.getElementById("medicao").classList.add("ativa");
}

// =========================
// CÁLCULO PRECISO (DIÂMETRO INTERNO)
// =========================
function calcularResultado(px) {
  let borda = 6 * 2; // borda do anel (CSS)

  let diametroInternoPx = px - borda;

  let diametroMm = diametroInternoPx / pixelsPorMm;

  let circ = diametroMm * Math.PI;

  let aro = Math.round(circ - 40);

  if (aro < 8) aro = 8;
  if (aro > 30) aro = 30;

  document.getElementById("resultado").innerText = "Aro: " + aro;

  let feedback = document.getElementById("feedback");

  if (aro === ultimoAro) {
    circuloMedir.classList.add("perfeito");
    feedback.style.display = "block";

    if (navigator.vibrate) {
      navigator.vibrate(10);
    }

  } else {
    circuloMedir.classList.remove("perfeito");
    feedback.style.display = "none";
  }

  ultimoAro = aro;
}

// =========================
// BOTÃO COMPRA
// =========================
function comprar() {
  let aro = document.getElementById("resultado").innerText.replace("Aro: ", "");
  alert("Selecionado aro " + aro);
}
