let pixelsPorMm = localStorage.getItem("ppm") || 1;
let ultimoAro = null;

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
  } else {
    circuloMedir.classList.remove("perfeito");
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
}

// COPIAR CUPOM
function copiarCupom() {
  navigator.clipboard.writeText("MEDIDACERTA");

  copiadoMsg.style.display = "block";

  setTimeout(() => {
    copiadoMsg.style.display = "none";
  }, 2000);
}

// FECHAR
function fecharModal() {
  modal.style.display = "none";
}
