document.addEventListener("DOMContentLoaded", () => {

  const sliderCalibrar = document.getElementById("sliderCalibrar");
  const sliderMedir = document.getElementById("sliderMedir");

  const circuloCalibrar = document.getElementById("circuloCalibrar");
  const circuloMedir = document.getElementById("circuloMedir");

  const resultado = document.getElementById("resultado");

  const modal = document.getElementById("modal");
  const modalAro = document.getElementById("modalAro");

  let pixelsPorMm = localStorage.getItem("ppm");

  // Se já calibrado, pula
  if (pixelsPorMm) {
    document.getElementById("calibracao").style.display = "none";
    document.getElementById("medicao").style.display = "block";
  }

  // CALIBRAÇÃO
  sliderCalibrar.oninput = () => {
    let v = sliderCalibrar.value;
    circuloCalibrar.style.width = v + "px";
    circuloCalibrar.style.height = v + "px";
  };

  window.confirmarCalibracao = () => {
    let px = circuloCalibrar.offsetWidth;

    pixelsPorMm = px / 23; // moeda 50 centavos

    localStorage.setItem("ppm", pixelsPorMm);

    document.getElementById("calibracao").style.display = "none";
    document.getElementById("medicao").style.display = "block";
  };

  // MEDIÇÃO
  sliderMedir.oninput = () => {
    let v = sliderMedir.value;

    circuloMedir.style.width = v + "px";
    circuloMedir.style.height = v + "px";

    if (!pixelsPorMm) {
      resultado.innerText = "Calibre primeiro";
      return;
    }

    let diametro = v / pixelsPorMm;
    let circunferencia = diametro * Math.PI;

    // 🔥 ARO CORRETO (INTEIRO)
    let aro = Math.round(circunferencia - 40);

    // limite real
    aro = Math.max(8, Math.min(30, aro));

    resultado.innerText = "Aro: " + aro;
  };

  // CONFIRMAR
  window.confirmarMedida = () => {
    let check = document.getElementById("confirmacao");

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
