const slider = document.getElementById("sliderMedir");
const circulo = document.getElementById("circuloMedir");
const resultado = document.getElementById("resultado");

const modal = document.getElementById("modal");
const modalAro = document.getElementById("modalAro");
const btnWhats = document.getElementById("btnWhats");
const btnCopiar = document.getElementById("btnCopiar");

let pixelsPorMm = 5; // valor fixo simples (evita erro)

// SLIDER
slider.oninput = () => {
  let v = slider.value;
  circulo.style.width = v + "px";
  circulo.style.height = v + "px";

  let diametro = v / pixelsPorMm;
  let aro = Math.round((diametro * Math.PI) - 40);

  resultado.innerText = "Aro: " + aro;
};

// CONFIRMAR
function confirmarMedida() {
  let check = document.getElementById("confirmacao");

  if (!check.checked) {
    alert("Confirme a medida.");
    return;
  }

  let aro = resultado.innerText;

  modalAro.innerText = aro;

  // WhatsApp dinâmico
  let msg = encodeURIComponent("Meu tamanho é " + aro);
  btnWhats.href = `https://wa.me/5517991611311?text=${msg}`;

  modal.style.display = "flex";
}

// COPIAR
btnCopiar.onclick = () => {
  navigator.clipboard.writeText("MEDIDACERTA");
  btnCopiar.innerText = "Copiado!";
};

// FECHAR
function fecharModal() {
  modal.style.display = "none";
}
