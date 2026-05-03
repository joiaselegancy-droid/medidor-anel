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
    
    if (px < 100) {
        alert("❌ Ajuste o círculo maior. Ele deve encostar nas bordas do cartão.");
        return;
    }

    // Lado menor do cartão de crédito = 53.98 mm
    pixelsPorMm = px / 53.98;

    // Troca de tela com animação
    document.getElementById("calibracao").classList.remove("ativa");
    document.getElementById("medicao").classList.add("ativa");

    // Sincroniza o slider de medição com o da calibração
    sliderMedir.value = sliderCalibrar.value;
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

// Cálculo mais preciso do tamanho de anel brasileiro
function calcularTamanhoAro(px) {
    if (pixelsPorMm === 0) return;

    const diametroInternoMm = px / pixelsPorMm;
    const circunferenciaMm = diametroInternoMm * Math.PI;

    // Fórmula aproximada para numeração brasileira (ARO)
    // Baseado na circunferência interna
    let aro = Math.round((circunferenciaMm - 36.5) / 1.2);

    // Limites realistas
    aro = Math.max(8, Math.min(35, aro));

    // Atualiza resultado
    tamanhoAroEl.textContent = aro;

    // Feedback visual
    const diferenca = Math.abs(aro - (ultimoAro || aro));
    
    if (diferenca === 0 && aro === ultimoAro) {
        circuloMedir.classList.add("perfeito");
        feedbackEl.innerHTML = "✅ Encaixe perfeito!";
        feedbackEl.style.color = "#00c853";
        
        if (navigator.vibrate) navigator.vibrate([15, 10, 15]);
    } else {
        circuloMedir.classList.remove("perfeito");
        feedbackEl.innerHTML = "Ajuste até encaixar perfeitamente";
        feedbackEl.style.color = "#666";
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
    
    if (aro === "--" || pixelsPorMm === 0) {
        alert("❌ Primeiro faça a calibração e ajuste o anel.");
        return;
    }

    const confirmacao = confirm(`Deseja comprar um anel no tamanho Aro ${aro}?`);
    if (confirmacao) {
        alert(`✅ Pedido de Aro ${aro} registrado!\n\nEm uma loja real, isso abriria o carrinho.`);
        // Aqui você pode integrar com WhatsApp, loja, etc.
    }
}

// Inicialização
window.onload = function() {
    // Define valores iniciais mais agradáveis
    sliderCalibrar.value = 180;
    circuloCalibrar.style.width = "180px";
    circuloCalibrar.style.height = "180px";
    
    sliderMedir.value = 160;
    circuloMedir.style.width = "160px";
    circuloMedir.style.height = "160px";
};
