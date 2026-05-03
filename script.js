alert("JS carregou");
let pixelsPorMm = 1;

// ==========================
// AJUSTE DO CÍRCULO (TOQUE)
// ==========================
function ativarResize(id) {
  const el = document.getElementById(id);

  let startX, startSize;

  el.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startSize = el.offsetWidth;
  });

  el.addEventListener("touchmove", (e) => {
    let moveX = e.touches[0].clientX;
    let diff = moveX - startX;

    let novo = startSize + diff;

    if (novo > 50 && novo < 300) {
      el.style.width = novo + "px";
      el.style.height = novo + "px";

      if (id === "circuloMedicao") {
        calcularResultado(novo);
      }
    }
  });
}

// ativar nos dois círculos
ativarResize("circulo");
ativarResize("circuloMedicao");


// ==========================
// CALIBRAÇÃO
// ==========================
function confirmarCalibracao() {
  let tamanhoPx = document.getElementById("circulo").offsetWidth;

  pixelsPorMm = tamanhoPx / 27;

  trocarTela("medicao");
}


// ==========================
// TROCAR TELA
// ==========================
function trocarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");
}


// ==========================
// CALCULAR ARO
// ==========================
function calcularResultado(px) {
  let mm = px / pixelsPorMm;

  let aro = calcularAro(mm);

  document.getElementById("resultado").innerText = "Aro: " + aro;
}


// ==========================
// TABELA DE ARO
// ==========================
function calcularAro(d) {
  if (d < 14.3) return 8;
  else if (d < 14.7) return 9;
  else if (d < 15.1) return 10;
  else if (d < 15.5) return 11;
  else if (d < 15.9) return 12;
  else if (d < 16.3) return 13;
  else if (d < 16.7) return 14;
  else if (d < 17.1) return 15;
  else if (d < 17.5) return 16;
  else if (d < 17.9) return 17;
  else return 18;
}
