let pixelsPorMm = 0;

function ajustar(valor, tipo) {
    let idCirculo = tipo === 'calibrar' ? 'circuloCalibrar' : 'circuloMedir';
    let idValor = tipo === 'calibrar' ? 'valorCalibrar' : 'valorMedir';
    let circulo = document.getElementById(idCirculo);
    let span = document.getElementById(idValor);
    
    let atual = parseInt(circulo.style.width) || 200;
    let novo = atual + valor;
    
    circulo.style.width = novo + "px";
    circulo.style.height = novo + "px";
    span.textContent = novo;
}

function confirmarCalibracao() {
    const px = parseInt(document.getElementById("circuloCalibrar").style.width);
    pixelsPorMm = px / 85.6; // largura cartão
    
    document.getElementById("calibracao").classList.remove("ativa");
    document.getElementById("medicao").classList.add("ativa");
}

function voltarCalibracao() {
    document.getElementById("medicao").classList.remove("ativa");
    document.getElementById("calibracao").classList.add("ativa");
}

function calcularAro(px) {
    const diametro = px / pixelsPorMm;
    const circ = diametro * Math.PI;
    let aro = Math.round((circ - 38) / 1.2);
    aro = Math.max(8, Math.min(30, aro));
    document.getElementById("aroFinal").textContent = aro;
}

document.getElementById("circuloMedir").addEventListener("input", function() {
    calcularAro(parseInt(this.style.width));
});

function comprar() {
    let aro = document.getElementById("aroFinal").textContent;
    alert(`Aro selecionado: ${aro}\n\nObrigado por escolher Elegancy Joias!`);
}

// Inicial
window.onload = () => {
    document.getElementById("circuloCalibrar").style.width = "230px";
    document.getElementById("circuloCalibrar").style.height = "230px";
    document.getElementById("valorCalibrar").textContent = "230";
};
