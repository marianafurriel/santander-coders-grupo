//Gerar um número aleatório de 1 a  que corresconde as cores
async function gerarNumeroCor() {
    desabilitarBotoes();
    let numeroCor = Math.floor(Math.random() * 4 + 1);
    sequenciaCor.push(numeroCor);

    highlightElement();
}

async function highlightElement() {
    for (item of sequenciaCor) {
        let elemento = botaoCor(item); 
        highlightColor(elemento);       
        await new Promise(resolve => setTimeout(resolve, 1200));      
    }
    habilitarBotoes();
}

// faz o efeito de iluminar o botão quando estiver na sua vez da sequencia
function highlightColor(elemento) {
    elemento.classList.add('highlighted');
    setTimeout(() => {
        elemento.classList.remove('highlighted');
    }, 500);
};

//Começa o jogo
function playGame() {
    sequenciaCor =[];
    sequenciaClick =[];
    score = 0;
    desabilitarBotoes();
    gerarNumeroCor();
};

// Colocar mais um número na sequencia de cores
let proximaSequencia = async () => {
        await new Promise(resolve => setTimeout(resolve, 3000));
        sequenciaClick = []
        score++;
        intervalo = intervalo * score;
        gerarNumeroCor();
};

// Checar se a sequencia do computador e do jogador estão iguais
function checkSequencia() {
    cliques = 0;

    for (let i = 0; i < sequenciaCor.length; i++) {
        if (sequenciaCor[i] == sequenciaClick[i]){
            document.querySelector('#seqAcerto').textContent = score + 1;
        } 
        else {
            gameOver();
            return;
        }
    } 
    proximaSequencia();       
}

//Contagem regressiva
async function countDown() {
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

function gameOver() {
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