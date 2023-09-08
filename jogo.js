class Jogo {

    //Gerar um número aleatório de 1 a  que corresconde as cores
    gerarNumeroCor() {
        desabilitarBotoes();
        let numeroCor = new Cor()
        sequenciaCor.push(numeroCor.id);
        highlightElement();
    }

    async highlightElement() {
        for (item of sequenciaCor) {
            let elemento = botaoCor(item); 
            highlightColor(elemento);       
            await new Promise(resolve => setTimeout(resolve, 1200));      
        }
        habilitarBotoes();
    }

    // faz o efeito de iluminar o botão quando estiver na sua vez da sequencia
    highlightColor(elemento) {
        elemento.classList.add('highlighted');
        setTimeout(() => {
            elemento.classList.remove('highlighted');
        }, 500);
    };

    //Começa o jogo
    playGame() {
        sequenciaCor =[];
        sequenciaClick =[];
        score = 0;
        desabilitarBotoes();
        gerarNumeroCor();
    };

    // Colocar mais um número na sequencia de cores
    proximaSequencia = async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
            sequenciaClick = []
            score++;
            intervalo = intervalo * score;
            gerarNumeroCor();
    };

    //Contagem regressiva
    async countDown() {
        toggleModalCountdown();
        for (let i = 3; i <= 3 && i >= 0; i--) {
            if (i !== 0) {
                mypopup.textContent = i;
                mypopup.style.color = cores[i];
                await new Promise(resolve => setTimeout(resolve, 1000));
            }      
            if (i == 0) {
                mypopup.textContent = "GO";
                mypopup.style.color = cores[i];
                await new Promise(resolve => setTimeout(resolve, 1000));
                toggleModalCountdown();
                await new Promise(resolve => setTimeout(resolve, 1200));
                playGame();
            }
        }
    }

    gameOver() {
        if (maiorPontuacao < score) {
            maiorPontuacao = score;
        }   
        sequenciaCor =[];
        sequenciaClick =[];
        score = 0;
        cliques = 0;
        toggleModalReset();
        document.querySelector('#maiorAcerto').textContent = maiorPontuacao;
        document.querySelector('#seqAcerto').textContent = score;
        return;
    }
}