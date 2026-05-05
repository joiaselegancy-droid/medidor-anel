let pixelsPorMm = localStorage.getItem("ppm") || 1;
let ultimoAro = null;

const sliderCalibrar = document.getElementById("sliderCalibrar");
const sliderMedir = document.getElementById("sliderMedir");

const circuloCalibrar = document.getElementById("circuloCalibrar");
const circuloMedir = document.getElementById("circuloMedir");

// CALIBRAÇÃO (50 centavos = 23 mm)
sliderCalibrar.oninput = () => {
  let v = sliderCalibrar.value;
  circuloCalibrar.style.width = v + "px";
  circuloCalibrar.style.height = v + "px";
};

function confirmarCalibracao() {
  let px = circuloCalibrar.offsetWidth;

  pixelsPorMm = px / 23;

  localStorage.setItem("ppm", pixelsPorMm);

  document.getElementById("calibracao").classList.remove("ativa");
  document.getElementById("medicao").classList.add("ativa");
}

// MEDIÇÃO
sliderMedir.oninput = () => {
  let v = sliderMedir.value;

  circuloMedir.style.width = v + "px";
  circuloMedir.style.height = v + "px";

  calcular(v);
};

// CÁLCULO
function calcular(px) {
  let diametro = px / pixelsPorMm;

  let aro = Math.round((diametro * Math.PI) - 40);

  aro = Math.max(8, Math.min(30, aro));

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
  window.location.href = "https://www.elegancyjoias.com.br/busca?aro=" + aro;
}
