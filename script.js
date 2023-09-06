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

let sequenciaCor =[];
let sequenciaClick =[];
let score = 0;
let cliques = 0;

// Abrir e fechar modal do começo do jogo
const toggleModal = () => {
    [modal, fade].forEach((el) => el.classList.toggle("hide"));
};
  
modalCancelButton.addEventListener("click", function(event) {
    toggleModal();
});

modalOkButton.addEventListener("click", function(event) {
    toggleModal();
    playGame();
});

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
        await new Promise(resolve => setTimeout(resolve, 5000));
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
        await new Promise(resolve => setTimeout(resolve, 2000));      
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
    gerarNumeroCor();
};

// Checar se a sequencia do computador e do jogador estão iguais
function checkSequencia() {
    cliques = 0;
    console.log("checkSequencia", sequenciaCor);
    console.log("checkSequencia", sequenciaClick);

    for (let i = 0; i < sequenciaCor.length; i++) {
        if (sequenciaCor[i] == sequenciaClick[i]){
            document.querySelector('#seqAcerto').textContent = score + 1;
        } 
        else {
            gameOver();
        }
    } 
    proximaSequencia();      
}

function gameOver() {
    alert("Você perdeu!");
    sequenciaCor =[];
    sequenciaClick =[];
    score = 0;
    document.querySelector('#seqAcerto').textContent = score;
    return;
}

// Efeitos dos botões
// botoes.forEach((botao) =>
//   botao.addEventListener("mouseenter", () => {
//     const cor = getComputedStyle(botao).backgroundColor;
//     botao.style.boxShadow = `0px 0px 10px 1px ${cor}`;
//   })
// );

// botoes.forEach((botao) =>
//   botao.addEventListener("mouseleave", () => {
//     setTimeout(function () {
//       botao.style.boxShadow = "";
//     }, 100);
//   })
// );

// botoes.forEach((botao) =>
//   botao.addEventListener("mousedown", () => {
//     const cor = getComputedStyle(botao).backgroundColor;
//     botao.style.boxShadow = `0px 0px 60px 4px ${cor}`;
//   })
// );

// botoes.forEach((botao) =>
//   botao.addEventListener("mouseup", () => {
//     setTimeout(function () {
//       const cor = getComputedStyle(botao).backgroundColor;
//       botao.style.boxShadow = `0px 0px 10px 1px ${cor}`;
//     }, 100);
//   })
// );