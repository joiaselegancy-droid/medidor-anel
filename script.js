document.addEventListener("DOMContentLoaded", () => {

  const sliderCalibrar = document.getElementById("sliderCalibrar");
  const sliderMedir = document.getElementById("sliderMedir");

  const circuloCalibrar = document.getElementById("circuloCalibrar");
  const circuloMedir = document.getElementById("circuloMedir");

  const resultado = document.getElementById("resultado");

  const modal = document.getElementById("modal");
  const modalAro = document.getElementById("modalAro");

  let pixelsPorMm = localStorage.getItem("ppm");

  if (pixelsPorMm) {
    calibracao.style.display = "none";
    medicao.style.display = "block";
  }

  sliderCalibrar.oninput = () => {
    let v = sliderCalibrar.value || 120;
    circuloCalibrar.style.width = v + "px";
    circuloCalibrar.style.height = v + "px";
  };

  window.confirmarCalibracao = () => {
    let px = circuloCalibrar.offsetWidth;
    pixelsPorMm = px / 23;

    localStorage.setItem("ppm", pixelsPorMm);

    calibracao.style.display = "none";
    medicao.style.display = "block";
  };

  sliderMedir.oninput = () => {
    let v = sliderMedir.value || 120;

    circuloMedir.style.width = v + "px";
    circuloMedir.style.height = v + "px";

    if (!pixelsPorMm) return;

    let diametro = v / pixelsPorMm;
    let aro = Math.round((diametro * Math.PI - 40) * 10) / 10;

    resultado.innerText = "Aro: " + aro;

    circuloMedir.classList.add("perfeito");

    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  window.confirmarMedida = () => {
    if (!confirmacao.checked) {
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
