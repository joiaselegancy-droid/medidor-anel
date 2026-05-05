function confirmarMedida() {
  if (!confirmacao.checked) {
    alert("Confirme a medida.");
    return;
  }

  let aro = resultado.innerText;

  modalAro.innerText = aro;

  // WHATSAPP DINÂMICO
  let numero = "5517991611311";
  let mensagem = encodeURIComponent("Meu tamanho é " + aro);
  btnWhats.href = `https://wa.me/${numero}?text=${mensagem}`;

  modal.style.display = "flex";
  setTimeout(() => modal.classList.add("ativo"), 10);
}

// COPIAR COM FEEDBACK PREMIUM
function copiarCupom() {
  navigator.clipboard.writeText("MEDIDACERTA");

  btnCopiar.innerText = "Copiado ✓";

  if (navigator.vibrate) {
    navigator.vibrate(50);
  }

  setTimeout(() => {
    btnCopiar.innerText = "Copiar";
  }, 2000);
}
