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

  calibracao.style.display = "block";
  medicao.style.display = "none";

  let pixelsPorMm = null;

  // CALIBRAÇÃO
  sliderCalibrar.addEventListener("input", function () {
    let v = this.value;
    circuloCalibrar.style.width = v + "px";
    circuloCalibrar.style.height = v + "px";
  });

  btnCalibrar.addEventListener("click", function () {
    let px = circuloCalibrar.offsetWidth;

    if (!px) {
      alert("Ajuste corretamente na moeda.");
      return;
    }

    pixelsPorMm = px / 23;

    calibracao.style.display = "none";
    medicao.style.display = "block";
  });

  // TABELA REAL
  const tabelaAros = [
    { aro: 8, mm: 15.0 }, { aro: 9, mm: 15.3 }, { aro: 10, mm: 15.6 },
    { aro: 11, mm: 15.9 }, { aro: 12, mm: 16.2 }, { aro: 13, mm: 16.5 },
    { aro: 14, mm: 16.9 }, { aro: 15, mm: 17.2 }, { aro: 16, mm: 17.5 },
    { aro: 17, mm: 17.8 }, { aro: 18, mm: 18.1 }, { aro: 19, mm: 18.5 },
    { aro: 20, mm: 18.8 }, { aro: 21, mm: 19.1 }, { aro: 22, mm: 19.4 },
    { aro: 23, mm: 19.7 }, { aro: 24, mm: 20.1 }, { aro: 25, mm: 20.4 },
    { aro: 26, mm: 20.7 }, { aro: 27, mm: 21.0 }, { aro: 28, mm: 21.3 },
    { aro: 29, mm: 21.7 }, { aro: 30, mm: 22.0 }
  ];

  // MEDIÇÃO
  sliderMedir.addEventListener("input", function () {

    let v = this.value;

    circuloMedir.style.width = v + "px";
    circuloMedir.style.height = v + "px";

    if (!pixelsPorMm) return;

    let diametro = (v / pixelsPorMm) + 0.1;

    let aro = tabelaAros.reduce((prev, curr) => {
      return Math.abs(curr.mm - diametro) < Math.abs(prev.mm - diametro)
        ? curr
        : prev;
    });

    resultado.innerText = "Aro: " + aro.aro;
  });

  // CONFIRMAR
  btnConfirmar.addEventListener("click", function () {

    const check1 = document.getElementById("confirmacao");
    const check2 = document.getElementById("termosTroca");

    if (!check1.checked) {
      alert("Confirme a medida.");
      return;
    }

    if (!check2.checked) {
      alert("É necessário aceitar as condições de troca.");
      return;
    }

    modalAro.innerText = resultado.innerText;
    modal.style.display = "flex";
  });

  fecharModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

});
