document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('entrada').value = '00:00';
    document.getElementById('saida').value = '00:00';
    document.getElementById('inicioAlmoco').value = '00:00';
    document.getElementById('fimAlmoco').value = '00:00';

    document.getElementById('calcular').addEventListener('click', function () {
        const entrada = document.getElementById('entrada').valueAsDate;
        const saida = document.getElementById('saida').valueAsDate;
        const inicioAlmoco = document.getElementById('inicioAlmoco').valueAsDate;
        const fimAlmoco = document.getElementById('fimAlmoco').valueAsDate;

        const totalTrabalhado = calcularTotalTrabalhado(entrada, saida, inicioAlmoco, fimAlmoco);
        exibirResultado(totalTrabalhado);
    });

    const totalTrabalhadoInicial = calcularTotalTrabalhado(
        document.getElementById('entrada').valueAsDate,
        document.getElementById('saida').valueAsDate,
        document.getElementById('inicioAlmoco').valueAsDate,
        document.getElementById('fimAlmoco').valueAsDate
    );
    exibirResultado(totalTrabalhadoInicial);
});

function calcularTotalTrabalhado(entrada, saida, inicioAlmoco, fimAlmoco) {

    if (!entrada || !saida || !inicioAlmoco || !fimAlmoco) {
        return 'Erro: Preencha todos os campos de hora.';
    }

    const entradaMinutos = entrada.getHours() * 60 + entrada.getMinutes();
    const saidaMinutos = saida.getHours() * 60 + saida.getMinutes();
    const inicioAlmocoMinutos = inicioAlmoco.getHours() * 60 + inicioAlmoco.getMinutes();
    const fimAlmocoMinutos = fimAlmoco.getHours() * 60 + fimAlmoco.getMinutes();

    const tempoTrabalhadoAntesAlmoco = saidaMinutos - entradaMinutos;
    const tempoTrabalhadoDepoisAlmoco = fimAlmocoMinutos - inicioAlmocoMinutos;

    const totalMinutos = tempoTrabalhadoAntesAlmoco + tempoTrabalhadoDepoisAlmoco;
    const totalHoras = Math.floor(totalMinutos / 60);
    const minutosRestantes = totalMinutos % 60;

    return `${totalHoras}:${minutosRestantes.toString().padStart(2, '0')}`;
}

function exibirResultado(totalTrabalhado) {
    const tempoTotalLabel = document.getElementById('tempoTotalLabel');
    const tempoTotal = document.getElementById('tempoTotal');
    
    tempoTotalLabel.innerText = 'Tempo Total: ';
    tempoTotal.innerText = totalTrabalhado + ' horas'; 
}
