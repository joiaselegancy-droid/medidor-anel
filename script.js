document.addEventListener("DOMContentLoaded", () => {

  const sliderCalibrar = document.getElementById("sliderCalibrar");
  const sliderMedir = document.getElementById("sliderMedir");

  const circuloCalibrar = document.getElementById("circuloCalibrar");
  const circuloMedir = document.getElementById("circuloMedir");

  const resultado = document.getElementById("resultado");

  const modal = document.getElementById("modal");
  const modalAro = document.getElementById("modalAro");
  const copiar = document.getElementById("copiar");

  let pixelsPorMm = localStorage.getItem("ppm");

  // 🔊 SOM SUAVE
  const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-soft-click-1118.mp3");

  if (pixelsPorMm) {
    calibracao.style.display = "none";
    medicao.style.display = "block";
  }

  // CALIBRAÇÃO
  sliderCalibrar.oninput = () => {
    let v = sliderCalibrar.value;
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

  // MEDIÇÃO
  sliderMedir.oninput = () => {
    let v = sliderMedir.value;

    circuloMedir.style.width = v + "px";
    circuloMedir.style.height = v + "px";

    if (!pixelsPorMm) return;

    let diametro = v / pixelsPorMm;
    let circ = diametro * Math.PI;

    let aro = Math.round(circ - 40);
    aro = Math.max(8, Math.min(30, aro));

    resultado.innerText = "Aro: " + aro;

    // 🎯 FEEDBACK VISUAL
    circuloMedir.classList.add("encaixe");

    // 📳 VIBRAÇÃO
    if (navigator.vibrate) navigator.vibrate(8);

    // 🔊 SOM (não spammar)
    if (!audio.paused) return;
    audio.currentTime = 0;
    audio.play();
  };

  // CONFIRMAR
  window.confirmarMedida = () => {
    if (!confirmacao.checked) {
      alert("Confirme a medida.");
      return;
    }

    modalAro.innerText = resultado.innerText;
    modal.style.display = "flex";

    // 📳 vibração sucesso
    if (navigator.vibrate) navigator.vibrate([10, 30, 10]);
  };

  // COPIAR CUPOM
  copiar.onclick = () => {
    navigator.clipboard.writeText("MEDIDACERTA");
    copiar.innerText = "Copiado!";
  };

  // FECHAR
  window.fecharModal = () => {
    modal.style.display = "none";
  };

});
