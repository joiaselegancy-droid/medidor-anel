let pixelsPorMm = localStorage.getItem("ppm") || 1;
let ultimoAro = null;

const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-positive-interface-beep-221.mp3");

// CALIBRAÇÃO
sliderCalibrar.oninput = () => {
  let v = sliderCalibrar.value;
  circuloCalibrar.style.width = v + "px";
  circuloCalibrar.style.height = v + "px";
};

function confirmarCalibracao() {
  let px = circuloCalibrar.offsetWidth;
  pixelsPorMm = px / 23;

  localStorage.setItem("ppm", pixelsPorMm);

  calibracao.classList.remove("ativa");
  medicao.classList.add("ativa");
}

// MEDIÇÃO
sliderMedir.oninput = () => {
  let v = sliderMedir.value;
  circuloMedir.style.width = v + "px";
  circuloMedir.style.height = v + "px";
  calcular(v);
};

function calcular(px) {
  let diametro = px / pixelsPorMm;
  let aro = Math.round((diametro * Math.PI) - 40);
  aro = Math.max(8, Math.min(30, aro));

  resultado.innerText = "Aro: " + aro;

  if (aro === ultimoAro) {
    circuloMedir.classList.add("perfeito");
    feedback.style.display = "block";
  } else {
    circuloMedir.classList.remove("perfeito");
    feedback.style.display = "none";
  }

  ultimoAro = aro;
}

// CONFIRMAR
function confirmarMedida() {
  if (!confirmacao.checked) {
    alert("Confirme a medida antes de continuar.");
    return;
  }

  modalAro.innerText = resultado.innerText;

  modal.style.display = "flex";

  setTimeout(() => {
    modal.classList.add("ativo");
  }, 10);

  // Vibração
  if (navigator.vibrate) {
    navigator.vibrate([20, 40, 20]);
  }

  // Som
  audio.currentTime = 0;
  audio.play();
}

// COPIAR
function copiarCupom() {
  navigator.clipboard.writeText("MEDIDACERTA");
  copiadoMsg.style.display = "block";

  setTimeout(() => {
    copiadoMsg.style.display = "none";
  }, 2000);
}

// FECHAR
function fecharModal() {
  modal.classList.remove("ativo");

  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}
