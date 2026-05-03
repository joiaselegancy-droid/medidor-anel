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

    if (px < 150) {
        alert("❌ Ajuste o círculo maior até encostar nas laterais do cartão.");
        return;
    }

    // Largura padrão de um cartão de crédito = 85.6 mm
    pixelsPorMm = px / 85.6;

    document.getElementById("calibracao").classList.remove("ativa");
    document.getElementById("medicao").classList.add("ativa");

    // Sincroniza slider de medição
    sliderMedir.value = Math.round(sliderCalibrar.value * 0.82);
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
    const circunferenciaMm = diametroMm * Math.PI;

    // Cálculo aproximado para numeração brasileira
    let aro = Math.round((circunferenciaMm - 36) / 1.18);
    aro = Math.max(8, Math.min(35, aro));

    tamanhoAroEl.textContent = aro;

    // Feedback
    if (aro === ultimoAro) {
        circuloMedir.classList.add("perfeito");
        feedbackEl.innerHTML = "✅ Encaixe perfeito!";
        feedbackEl.style.color = "#00c853";
        if (navigator.vibrate) navigator.vibrate([15, 10, 15]);
    } else {
        circuloMedir.classList.remove("perfeito");
        feedbackEl.innerHTML = "Ajuste até encaixar perfeitamente";
        feedbackEl.style.color = "#555";
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
    if (aro === "--") {
        alert("Faça a calibração primeiro.");
        return;
    }
    alert(`✅ Aro ${aro} selecionado!\n\nPronto para compra segura.`);
}

// Inicialização
window.onload = () => {
    sliderCalibrar.value = 205;
    circuloCalibrar.style.width = "205px";
    circuloCalibrar.style.height = "205px";
};
