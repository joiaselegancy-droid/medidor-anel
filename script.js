// ====================== JS - MEDIDOR DE ANEL ELEGANCY JOIAS ======================

document.addEventListener("DOMContentLoaded", function() {

    // Tabela de tamanhos (do 8 ao 30)
    const tamanhos = [
        {br: 8,  diam: 15.3, circ: 48},
        {br: 9,  diam: 15.6, circ: 49},
        {br: 10, diam: 15.9, circ: 50},
        {br: 11, diam: 16.2, circ: 51},
        {br: 12, diam: 16.5, circ: 52},
        {br: 13, diam: 16.8, circ: 53},
        {br: 14, diam: 17.2, circ: 54},
        {br: 15, diam: 17.5, circ: 55},
        {br: 16, diam: 17.8, circ: 56},
        {br: 17, diam: 18.1, circ: 57},
        {br: 18, diam: 18.5, circ: 58},
        {br: 19, diam: 18.8, circ: 59},
        {br: 20, diam: 19.1, circ: 60},
        {br: 21, diam: 19.4, circ: 61},
        {br: 22, diam: 19.7, circ: 62},
        {br: 23, diam: 20.0, circ: 63},
        {br: 24, diam: 20.4, circ: 64},
        {br: 25, diam: 20.7, circ: 65},
        {br: 26, diam: 21.0, circ: 66},
        {br: 27, diam: 21.3, circ: 67},
        {br: 28, diam: 21.7, circ: 68},
        {br: 29, diam: 22.0, circ: 69},
        {br: 30, diam: 22.3, circ: 70}
    ];

    // Gerar tabela
    function gerarTabela() {
        const tbody = document.getElementById('tabela');
        if (!tbody) return;
        
        let html = '';
        tamanhos.forEach(t => {
            html += `
                <tr>
                    <td><strong>${t.br}</strong></td>
                    <td>${t.diam}</td>
                    <td>${t.circ}</td>
                </tr>
            `;
        });
        tbody.innerHTML = html;
    }

    // Encontrar tamanho mais próximo
    function encontrarTamanho(diametro) {
        let melhor = tamanhos[0];
        let menorDiferenca = Math.abs(tamanhos[0].diam - diametro);

        tamanhos.forEach(t => {
            const diferenca = Math.abs(t.diam - diametro);
            if (diferenca < menorDiferenca) {
                menorDiferenca = diferenca;
                melhor = t;
            }
        });
        return melhor;
    }

    // Mostrar resultado
    window.mostrarResultado = function(diametro, tamanhoBR, circunferencia) {
        const resultado = document.getElementById('resultado');
        if (!resultado) return;

        resultado.innerHTML = `
            <h2 style="color: #00B2A9; margin: 0 0 15px 0;">
                Seu tamanho recomendado é <strong>${tamanhoBR}</strong>
            </h2>
            <p style="font-size: 17px; margin: 12px 0;">
                <strong>Diâmetro:</strong> ${diametro} mm &nbsp;&nbsp; | &nbsp;&nbsp; 
                <strong>Circunferência:</strong> ${circunferencia}
