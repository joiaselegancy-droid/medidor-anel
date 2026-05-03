let pixelsPorMm = 1;

// =========================
// BLOQUEAR ZOOM (iPhone)
// =========================
document.addEventListener("gesturestart", function (e) {
  e.preventDefault();
});

// =========================
// CONTROLE DO CÍRCULO (TOQUE PRECISO)
// =========================
function ativarResize(id) {
  const el = document.getElementById(id);

  el.addEventListener("touchmove", function(e) {
    e.preventDefault();

    let touch = e.touches[0];
    let area = el.parentElement.getBoundingClientRect();

    let centerX = area.left + area.width / 2;
    let centerY = area.top + area.height / 2;

    let dx = touch.clientX - centerX;
    let dy = touch.clientY - centerY;

    let distancia = Math.sqrt(dx * dx + dy * dy);

    let novo = distancia * 2;

    if (novo > 50 && novo < 300) {
      el.style.width = novo + "px";
      el.style.height = novo + "px";

      if (id === "circuloMedir") {
        calcularResultado(novo);
      }
    }
  }, { passive: false });
}

// ativar nos dois círculos
ativarResize("circuloCalibrar");
ativarResize("circuloMedir");

// =========================
// CALIBRAÇÃO (50 centavos = 23mm)
// =========================
function confirmarCalibracao() {
  let px = document.getElementById("circuloCalibrar").offsetWidth;

  pixelsPorMm = px / 23;

  document.getElementById("calibracao").classList.remove("ativa");
  document.getElementById("medicao").classList.add("ativa");
}

// =========================
// CÁLCULO DO ARO (8 a 30)
// =========================
function calcularResultado(px) {
  let mm = px / pixelsPorMm;

  let aro = Math.round((mm - 10) * 2);

  if (aro < 8) aro = 8;
  if (aro > 30) aro = 30;

  document.getElementById("resultado").innerText = "Aro: " + aro;
}
