const botoes = [...document.querySelectorAll(".botao")];
const btnVerde = document.querySelector('.verde');
const btnVermelho = document.querySelector('.vermelho');
const btnAzul = document.querySelector('.azul');
const btnAmarelo = document.querySelector('.amarelo');
const btnNovoJogo = document.getElementById("#btnovoJogo");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");
const modalOkButton = document.querySelector("#modalOkButton");
const modalCancelButton = document.querySelector("#modalCancelButton");
const modal2 = document.querySelector("#modal2");
const fade2 = document.querySelector("#fade2");
const modalSimButton = document.querySelector("#modalSimButton");
const modalNaoButton = document.querySelector("#modalNaoButton");
const mypopup = document.querySelector("#my-popup");
const botoesColoridos = document.querySelector("#botoesColoridos");

let sequenciaCor =[];
let sequenciaClick =[];
let score = 0;
let cliques = 0;
let intervalo = 5000;
const cores = ["rgb(255, 0, 0)", "rgb(0,10,255)", "rgb(82,255,0)", "rgb(250,255,0)"];

// Abrir e fechar modal do começo do jogo
const toggleModal = () => {
    [modal, fade].forEach((el) => el.classList.toggle("hide"));
};
  
modalCancelButton.addEventListener("click", function(event) {
    toggleModal();
});

modalOkButton.addEventListener("click", function(event) {
    toggleModal();
    countDown();
});

// Abrir e fechar modal do reset do jogo
const toggleModalReset = () => {
    [modal2, fade2].forEach((el) => el.classList.toggle("hide"));
};
  
modalNaoButton.addEventListener("click", function(event) {
    toggleModalReset();
});

modalSimButton.addEventListener("click", function(event) {
    toggleModalReset();
    countDown();
});

// Abrir e fechar Contagem regressiva
const toggleModalCountdown = () => {
    botoesColoridos.classList.toggle("hide");
    mypopup.classList.toggle("hide");
};

// relaciona as cores e botões com os números da sequencia que será criada
let botaoCor = (numeroCor) => {
        if (numeroCor == 1) {
            let audio = document.getElementById("clip1");
            audio.play();
            return btnVermelho;
        } else if (numeroCor == 2) {
            let audio = document.getElementById("clip2");
            audio.play();
            return btnAzul;
        } else if (numeroCor == 3) {
            let audio = document.getElementById("clip3");
            audio.play();
            return btnAmarelo;
        } else if (numeroCor == 4) {
            let audio = document.getElementById("clip4");
            audio.play();
            return btnVerde;
        } 
};


let click = cor => {
    sequenciaClick[sequenciaClick.length] = cor;
        botaoCor(cor).classList.add('highlighted');
  
        setTimeout(() => {
            botaoCor(cor).classList.remove('highlighted');
        }, 250);
        cliques += 1;
        contaClick(cliques);
};

async function contaClick(cliques) {
    if (cliques !== sequenciaCor.length) {
        await new Promise(resolve => setTimeout(resolve, intervalo));
    }
    else {
        checkSequencia();
    }
}

//eventos de clique para as cores
btnVermelho.onclick = () => click(1);
btnAzul.onclick = () => click(2);
btnAmarelo.onclick = () => click(3);
btnVerde.onclick = () => click(4);


//Gerar um número aleatório de 1 a  que corresconde as cores
function gerarNumeroCor() {
    let numeroCor = Math.floor(Math.random() * 4 + 1);
    sequenciaCor.push(numeroCor);

    highlightElement();
}

async function highlightElement() {
    for (item of sequenciaCor) {
        let elemento = botaoCor(item); 
        highlightColor(elemento);       
        await new Promise(resolve => setTimeout(resolve, 1500));      
    }
}

// faz o efeito de iluminar o botão quando estiver na sua vez da sequencia
function highlightColor(elemento) {
    elemento.classList.add('highlighted');
    setTimeout(() => {
        elemento.classList.remove('highlighted');
    }, 500);
    console.log(elemento);
};

//Começa o jogo
function playGame() {
    sequenciaCor =[];
    sequenciaClick =[];
    score = 0;
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
            break;
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
    sequenciaCor =[];
    sequenciaClick =[];
    score = 0;
    cliques = 0;
    toggleModalReset();
    document.querySelector('#seqAcerto').textContent = score;
}

// Efeitos dos botões
botoes.forEach((botao) =>
  botao.addEventListener("mouseenter", () => {
    const cor = getComputedStyle(botao).backgroundColor;
    botao.style.boxShadow = `0px 0px 10px 1px ${cor}`;
  })
);

botoes.forEach((botao) =>
  botao.addEventListener("mouseleave", () => {
    setTimeout(function () {
      botao.style.boxShadow = "";
    }, 100);
  })
);

botoes.forEach((botao) =>
  botao.addEventListener("mousedown", () => {
    const cor = getComputedStyle(botao).backgroundColor;
    botao.style.boxShadow = `0px 0px 60px 4px ${cor}`;
  })
);

botoes.forEach((botao) =>
  botao.addEventListener("mouseup", () => {
    setTimeout(function () {
      const cor = getComputedStyle(botao).backgroundColor;
      botao.style.boxShadow = `0px 0px 10px 1px ${cor}`;
    }, 100);
  })
);

