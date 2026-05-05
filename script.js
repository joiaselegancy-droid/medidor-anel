// ELEMENTOS
const sliderCalibrar = document.getElementById("sliderCalibrar");
const sliderMedir = document.getElementById("sliderMedir");

const circuloCalibrar = document.getElementById("circuloCalibrar");
const circuloMedir = document.getElementById("circuloMedir");

const resultado = document.getElementById("resultado");

const modal = document.getElementById("modal");
const modalAro = document.getElementById("modalAro");
const btnWhats = document.getElementById("btnWhats");
const btnCopiar = document.getElementById("btnCopiar");

// VALOR SALVO
let pixelsPorMm = localStorage.getItem("ppm");

// =========================
// CALIBRAÇÃO (23mm moeda)
// =========================
sliderCalibrar.oninput = () => {
  let v = sliderCalibrar.value;
  circuloCalibrar.style.width = v + "px";
  circuloCalibrar.style.height = v + "px";
};

function confirmarCalibracao() {
  let px = circuloCalibrar.offsetWidth;

  pixelsPorMm = px / 23; // moeda 50 centavos = 23mm

  localStorage.setItem("ppm", pixelsPorMm);

  document.getElementById("calibracao").style.display = "none";
  document.getElementById("medicao").style.display = "block";
}

// =========================
// MEDIÇÃO
// =========================
sliderMedir.oninput = () => {
  let v = sliderMedir.value;

  circuloMedir.style.width = v + "px";
  circuloMedir.style.height = v + "px";

  calcular(v);
};

function calcular(px) {
  if (!pixelsPorMm) {
    resultado.innerText = "Calibre primeiro";
    return;
  }

  let diametro = px / pixelsPorMm;

  // fórmula correta aro Brasil
  let aro = Math.round((diametro * Math.PI) - 40);

  // limite
  aro = Math.max(8, Math.min(30, aro));

  resultado.innerText = "Aro: " + aro;
}

// =========================
// CONFIRMAR
// =========================
function confirmarMedida() {
  let check = document.getElementById("confirmacao");

  if (!check.checked) {
    alert("Confirme a medida.");
    return;
  }

  let aro = resultado.innerText;

  modalAro.innerText = aro;

  let msg = encodeURIComponent("Meu tamanho é " + aro);
  btnWhats.href = `https://wa.me/5517991611311?text=${msg}`;

  modal.style.display = "flex";
}

// =========================
// COPIAR
// =========================
btnCopiar.onclick = () => {
  navigator.clipboard.writeText("MEDIDACERTA");
  btnCopiar.innerText = "Copiado!";
};

// =========================
// FECHAR
// =========================
function fecharModal() {
  modal.style.display = "none";
}
