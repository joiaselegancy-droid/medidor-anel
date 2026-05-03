let pixelsPorMm = 1;
let ultimoAro = null;

const sliderCalibrar = document.getElementById("sliderCalibrar");
const sliderMedir = document.getElementById("sliderMedir");

const circuloCalibrar = document.getElementById("circuloCalibrar");
const circuloMedir = document.getElementById("circuloMedir");

// CALIBRAÇÃO (MEIO CARTÃO = 42.8 mm)
sliderCalibrar.addEventListener("input", function () {
  let valor = this.value;

  circuloCalibrar.style.width = valor + "px";
  circuloCalibrar.style.height = valor + "px";
});

function confirmarCalibracao() {
  let px = circuloCalibrar.offsetWidth;

  pixelsPorMm = px / 42.8;

  document.getElementById("calibracao").classList.remove("ativa");
  document.getElementById("medicao").classList.add("ativa");
}

// MEDIÇÃO
sliderMedir.addEventListener("input", function () {
  let valor = this.value;

  circuloMedir.style.width = valor + "px";
  circuloMedir.style.height = valor + "px";

  calcularResultado(valor);
});

// CÁLCULO
function calcularResultado(px) {
  let diametroMm = px / pixelsPorMm;

  let circ = diametroMm * Math.PI;

  let aro = Math.round(circ - 40);

  if (aro < 8) aro = 8;
  if (aro > 30) aro = 30;

  document.getElementById("resultado").innerText = "Aro: " + aro;

  let feedback = document.getElementById("feedback");

  if (aro === ultimoAro) {
    circuloMedir.classList.add("perfeito");
    feedback.style.display = "block";

    if (navigator.vibrate) navigator.vibrate(10);

  } else {
    circuloMedir.classList.remove("perfeito");
    feedback.style.display = "none";
  }

  ultimoAro = aro;
}

// COMPRA
function comprar() {
  let aro = document.getElementById("resultado").innerText.replace("Aro: ", "");
  alert("Selecionado aro " + aro);
}
