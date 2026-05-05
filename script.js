console.log("JS carregado");

// ESPERA CARREGAR DOM
document.addEventListener("DOMContentLoaded", () => {

  const sliderCalibrar = document.getElementById("sliderCalibrar");
  const sliderMedir = document.getElementById("sliderMedir");

  const circuloCalibrar = document.getElementById("circuloCalibrar");
  const circuloMedir = document.getElementById("circuloMedir");

  const resultado = document.getElementById("resultado");

  const modal = document.getElementById("modal");
  const modalAro = document.getElementById("modalAro");

  let pixelsPorMm = null;

  // CALIBRAR
  sliderCalibrar.oninput = () => {
    let v = sliderCalibrar.value;
    circuloCalibrar.style.width = v + "px";
    circuloCalibrar.style.height = v + "px";
  };

  window.confirmarCalibracao = function () {
    let px = circuloCalibrar.offsetWidth;
    pixelsPorMm = px / 23;

    document.getElementById("calibracao").style.display = "none";
    document.getElementById("medicao").style.display = "block";
  };

  // MEDIR
  sliderMedir.oninput = () => {
    let v = sliderMedir.value;

    circuloMedir.style.width = v + "px";
    circuloMedir.style.height = v + "px";

    if (!pixelsPorMm) {
      resultado.innerText = "Calibre primeiro";
      return;
    }

    let diametro = v / pixelsPorMm;
    let aro = Math.round((diametro * Math.PI) - 40);

    resultado.innerText = "Aro: " + aro;
  };

  // CONFIRMAR
  window.confirmarMedida = function () {
    let check = document.getElementById("confirmacao");

    if (!check.checked) {
      alert("Confirme");
      return;
    }

    modalAro.innerText = resultado.innerText;
    modal.style.display = "flex";
  };

  // FECHAR
  window.fecharModal = function () {
    modal.style.display = "none";
  };

});
