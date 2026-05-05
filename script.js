document.addEventListener("DOMContentLoaded", () => {

  const calibracao = document.getElementById("calibracao");
  const medicao = document.getElementById("medicao");

  const sliderCalibrar = document.getElementById("sliderCalibrar");
  const sliderMedir = document.getElementById("sliderMedir");

  const circuloCalibrar = document.getElementById("circuloCalibrar");
  const circuloMedir = document.getElementById("circuloMedir");

  const resultado = document.getElementById("resultado");

  const modal = document.getElementById("modal");
  const modalAro = document.getElementById("modalAro");

  // 🔴 FORÇA começar na calibração
  calibracao.style.display = "block";
  medicao.style.display = "none";

  let pixelsPorMm = null;

  // ===== CALIBRAÇÃO =====
  sliderCalibrar.oninput = () => {
    let v = sliderCalibrar.value;

    circuloCalibrar.style.width = v + "px";
    circuloCalibrar.style.height = v + "px";
  };

  window.confirmarCalibracao = () => {
    let px = circuloCalibrar.offsetWidth;

    pixelsPorMm = px / 23; // moeda 50 centavos

    calibracao.style.display = "none";
    medicao.style.display = "block";
  };

  // ===== MEDIÇÃO =====
  sliderMedir.oninput = () => {
    let v = sliderMedir.value;

    circuloMedir.style.width = v + "px";
    circuloMedir.style.height = v + "px";

    if (!pixelsPorMm) {
      resultado.innerText = "Faça a calibração primeiro";
      return;
    }

    let diametro = v / pixelsPorMm;
    let aro = Math.round((diametro * Math.PI) - 40);

    aro = Math.max(8, Math.min(30, aro));

    resultado.innerText = "Aro: " + aro;
  };

  // ===== CONFIRMAR =====
  window.confirmarMedida = () => {
    const check = document.getElementById("confirmacao");

    if (!check.checked) {
      alert("Confirme a medida.");
      return;
    }

    modalAro.innerText = resultado.innerText;
    modal.style.display = "flex";
  };

  window.fecharModal = () => {
    modal.style.display = "none";
  };

});
