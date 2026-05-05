document.addEventListener("DOMContentLoaded", () => {

  const sliderCalibrar = document.getElementById("sliderCalibrar");
  const sliderMedir = document.getElementById("sliderMedir");

  const circuloCalibrar = document.getElementById("circuloCalibrar");
  const circuloMedir = document.getElementById("circuloMedir");

  const resultado = document.getElementById("resultado");

  let pixelsPorMm = localStorage.getItem("ppm");

  // 👉 SE JÁ CALIBRADO, PULA DIRETO
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

  window.confirmarCalibracao = function () {
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

    // 🔥 MAIS PRECISO
    let aro = Math.round((diametro * Math.PI - 40) * 10) / 10;

    resultado.innerText = "Aro: " + aro;

    circuloMedir.classList.add("perfeito");
  };

  // CONFIRMAR (WHATSAPP DIRETO)
  window.confirmarMedida = function () {
    let check = document.getElementById("confirmacao");

    if (!check.checked) {
      alert("Confirme a medida.");
      return;
    }

    let aro = resultado.innerText;

    let msg = encodeURIComponent("Olá! Meu tamanho é " + aro);
    window.location.href = `https://wa.me/5517991611311?text=${msg}`;
  };

});
