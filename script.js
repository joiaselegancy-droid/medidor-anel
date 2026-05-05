document.addEventListener("DOMContentLoaded", function () {

  const calibracao = document.getElementById("calibracao");
  const medicao = document.getElementById("medicao");

  const sliderCalibrar = document.getElementById("sliderCalibrar");
  const sliderMedir = document.getElementById("sliderMedir");

  const circuloCalibrar = document.getElementById("circuloCalibrar");
  const circuloMedir = document.getElementById("circuloMedir");

  const resultado = document.getElementById("resultado");

  const btnCalibrar = document.getElementById("btnCalibrar");
  const btnConfirmar = document.getElementById("btnConfirmar");

  const modal = document.getElementById("modal");
  const modalAro = document.getElementById("modalAro");
  const fecharModal = document.getElementById("fecharModal");

  // 🔒 FORÇA FLUXO CORRETO
  calibracao.style.display = "block";
  medicao.style.display = "none";

  let pixelsPorMm = null;

  // CALIBRAR
  sliderCalibrar.addEventListener("input", function () {
    let v = this.value;
    circuloCalibrar.style.width = v + "px";
    circuloCalibrar.style.height = v + "px";
  });

  btnCalibrar.addEventListener("click", function () {
    let px = circuloCalibrar.offsetWidth;

    if (!px) {
      alert("Ajuste o círculo.");
      return;
    }

    pixelsPorMm = px / 23;

    calibracao.style.display = "none";
    medicao.style.display = "block";
  });

  // MEDIR
  sliderMedir.addEventListener("input", function () {
    let v = this.value;

    circuloMedir.style.width = v + "px";
    circuloMedir.style.height = v + "px";

    if (!pixelsPorMm) {
      resultado.innerText = "Calibre primeiro";
      return;
    }

    let diametro = v / pixelsPorMm;
    let aro = Math.round((diametro * Math.PI) - 40);

    aro = Math.max(8, Math.min(30, aro));

    resultado.innerText = "Aro: " + aro;
  });

  // CONFIRMAR
  btnConfirmar.addEventListener("click", function () {
    const check = document.getElementById("confirmacao");

    if (!check.checked) {
      alert("Confirme a medida.");
      return;
    }

    modalAro.innerText = resultado.innerText;
    modal.style.display = "flex";
  });

  fecharModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

});
