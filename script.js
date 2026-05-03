let pixelsPorMm = 0;
let ultimoAro = null;

const sliderCalibrar = document.getElementById("sliderCalibrar");
const sliderMedir = document.getElementById("sliderMedir");
const circuloCalibrar = document.getElementById("circuloCalibrar");
const circuloMedir = document.getElementById("circuloMedir");
const tamanhoAroEl = document.getElementById("tamanhoAro");
const feedbackEl = document.getElementById("feedback");

// ====================== CALIBRAÇÃO ======================
sliderCalibrar.addEventListener("input", function () {
    const valor = this.value;
    circuloCalibrar.style.width = valor + "px";
    circuloCalibrar.style.height = valor + "px";
});

function confirmarCalibracao() {
    const px = circuloCalibrar.offsetWidth;

    if (px < 160) {
        alert("❌ Ajuste o círculo maior. Ele deve ficar do tamanho do cartão.");
        return;
    }

    // Calibração baseada na largura do cartão (85.6 mm)
    pixelsPorMm = px / 85.6;

    // Troca para tela de medição do anel
    document.getElementById("calibracao").classList.remove("ativa");
    document.getElementById("medicao").classList.add("ativa");

    // Ajuste inicial do círculo do anel
    sliderMedir.value = Math.round(px * 0.78);
    atualizarMedicao();
}

// ====================== MEDIÇÃO DO ANEL ======================
sliderMedir.addEventListener("input", function () {
    atualizarMedicao();
});

function atualizarMedicao() {
    const valor = parseInt(sliderMedir.value);
    circuloMedir.style.width = valor + "px";
    circuloMedir.style.height = valor + "px";
    calcularTamanhoAro(valor);
}

function calcularTamanhoAro(px) {
    if (pixelsPorMm === 0) return;

    const diametroMm = px / pixelsPorMm;
    const circunferenciaMm = diametroMm * Math.PI;

    // Cálculo mais estável para numeração brasileira (8 ao 30)
    let aro = Math.round((circunferenciaMm - 37.5) / 1.22);
    aro = Math.max(8, Math.min(30, aro));

    tamanhoAroEl.textContent = aro;

    if (aro === ultimoAro) {
        circuloMedir.classList.add("perfeito");
        feedbackEl.textContent = "✅ Encaixe perfeito!";
    } else {
        circuloMedir.classList.remove("perfeito");
        feedbackEl.textContent = "Ajuste até encaixar perfeitamente";
    }
    ultimoAro = aro;
}

// ====================== FUNÇÕES AUXILIARES ======================
function voltarCalibracao() {
    document.getElementById("medicao").classList.remove("ativa");
    document.getElementById("calibracao").classList.add("ativa");
}

function comprar() {
    const aro = tamanhoAroEl.textContent;
    if (aro === "--") return alert("Faça a calibração primeiro.");
    alert(`✅ Aro ${aro} selecionado!\n\nPode prosseguir com a compra.`);
}

// Inicialização
window.onload = () => {
    sliderCalibrar.value = 235;
    circuloCalibrar.style.width = "235px";
    circuloCalibrar.style.height = "235px";
};
