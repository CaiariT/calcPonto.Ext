document.addEventListener('DOMContentLoaded', function () {
    // Preencher os campos com "00:00" por padrão
    document.getElementById('entrada').value = '00:00';
    document.getElementById('saida').value = '00:00';
    document.getElementById('inicioAlmoco').value = '00:00';
    document.getElementById('fimAlmoco').value = '00:00';

    // Adicionar evento de clique ao botão "Calcular"
    document.getElementById('calcular').addEventListener('click', function () {
        const entrada = document.getElementById('entrada').valueAsDate;
        const saida = document.getElementById('saida').valueAsDate;
        const inicioAlmoco = document.getElementById('inicioAlmoco').valueAsDate;
        const fimAlmoco = document.getElementById('fimAlmoco').valueAsDate;

        const totalTrabalhado = calcularTotalTrabalhado(entrada, saida, inicioAlmoco, fimAlmoco);
        exibirResultado(totalTrabalhado);
    });

    // Calcular o tempo total trabalhado inicialmente ao carregar a página
    const totalTrabalhadoInicial = calcularTotalTrabalhado(
        document.getElementById('entrada').valueAsDate,
        document.getElementById('saida').valueAsDate,
        document.getElementById('inicioAlmoco').valueAsDate,
        document.getElementById('fimAlmoco').valueAsDate
    );
    exibirResultado(totalTrabalhadoInicial);
});

function calcularTotalTrabalhado(entrada, saida, inicioAlmoco, fimAlmoco) {
    // Verificar se todos os campos estão preenchidos
    if (!entrada || !saida || !inicioAlmoco || !fimAlmoco) {
        return 'Erro: Preencha todos os campos de hora.';
    }

    // Convertendo horas e minutos para minutos
    const entradaMinutos = entrada.getHours() * 60 + entrada.getMinutes();
    const saidaMinutos = saida.getHours() * 60 + saida.getMinutes();
    const inicioAlmocoMinutos = inicioAlmoco.getHours() * 60 + inicioAlmoco.getMinutes();
    const fimAlmocoMinutos = fimAlmoco.getHours() * 60 + fimAlmoco.getMinutes();

    // Calculando tempo total trabalhado em minutos
    const tempoTrabalhadoAntesAlmoco = saidaMinutos - entradaMinutos;
    const tempoTrabalhadoDepoisAlmoco = fimAlmocoMinutos - inicioAlmocoMinutos;

    // Convertendo minutos de volta para horas e minutos
    const totalMinutos = tempoTrabalhadoAntesAlmoco + tempoTrabalhadoDepoisAlmoco;
    const totalHoras = Math.floor(totalMinutos / 60);
    const minutosRestantes = totalMinutos % 60;

    // Formatar o resultado
    return `${totalHoras}:${minutosRestantes.toString().padStart(2, '0')}`;
}

function exibirResultado(totalTrabalhado) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<p>Tempo total trabalhado: ${totalTrabalhado} horas</p>`;
}
