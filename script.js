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

    if (px < 140) {
        alert("❌ Ajuste o círculo maior, ele deve ficar do tamanho do cartão.");
        return;
    }

    pixelsPorMm = px / 85.6; // largura padrão do cartão

    // Troca de tela
    document.getElementById("calibracao").classList.remove("ativa");
    document.getElementById("medicao").classList.add("ativa");

    // Sincroniza slider
    sliderMedir.value = Math.round(px * 0.75);
    atualizarMedicao();
}

// ====================== MEDIÇÃO ======================
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
    const circunferencia = diametroMm * Math.PI;
    let aro = Math.round((circunferencia - 36) / 1.2);
    aro = Math.max(8, Math.min(35, aro));

    tamanhoAroEl.textContent = aro;

    if (aro === ultimoAro) {
        circuloMedir.classList.add("perfeito");
        feedbackEl.textContent = "✅ Encaixe perfeito!";
    } else {
        circuloMedir.classList.remove("perfeito");
        feedbackEl.textContent = "";
    }
    ultimoAro = aro;
}

// ====================== OUTRAS FUNÇÕES ======================
function voltarCalibracao() {
    document.getElementById("medicao").classList.remove("ativa");
    document.getElementById("calibracao").classList.add("ativa");
}

function comprar() {
    const aro = tamanhoAroEl.textContent;
    if (aro === "--") return alert("Faça a calibração primeiro.");
    alert(`✅ Aro ${aro} selecionado para compra!`);
}

// Inicialização
window.onload = () => {
    sliderCalibrar.value = 225;
    circuloCalibrar.style.width = "225px";
    circuloCalibrar.style.height = "225px";
};
