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
let vezJogador;
let vezComputador;
let som = true;
let intervalo;

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
        console.log(btnVermelho)
        return btnVermelho;
    } else if (numeroCor == 2) {
        let audio = document.getElementById("clip2");
        audio.play();
        console.log(btnAzul)
        return btnAzul;
    } else if (numeroCor == 3) {
        let audio = document.getElementById("clip3");
        audio.play();
        console.log(btnAmarelo)
        return btnAmarelo;
    } else if (numeroCor == 4) {
        let audio = document.getElementById("clip4");
        audio.play();
        console.log(btnVerde)
        return btnVerde;
    }
};

// Pega os cliques dos botões das cores
function clickUsuario() {
    btnVermelho.addEventListener("click", function(event) {
        sequenciaClick.push(1);
        botaoCor(1);
        checkSequencia();
    });
        
    btnAzul.addEventListener("click", function(event) {
        sequenciaClick.push(2);
        botaoCor(2);
        checkSequencia();
    });
        
    btnAmarelo.addEventListener("click", function(event) {
        sequenciaClick.push(3);
        botaoCor(3);
        checkSequencia();
    });
        
    btnVerde.addEventListener("click", function(event) {
        sequenciaClick.push(4);
        botaoCor(4);
        checkSequencia();
    });
}

//Gerar um número aleatório de 1 a  que corresconde as cores
function gerarNumeroCor() {
    let numeroCor = Math.floor(Math.random() * 4 + 1);
    sequenciaCor.push(numeroCor);
}

function highlightElement() {
    for (item of sequenciaCor) {
        let elemento = botaoCor(item); 
        highlightColor(elemento);             
    }
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
    alert("jogo começou!");
    score = 0;
    gerarNumeroCor();
    highlightElement();
    clickUsuario();
};

let proximaSequencia = () => {
    score++;
    gerarNumeroCor();
    highlightElement();
    clickUsuario();
};

function checkSequencia() {
    console.log(sequenciaCor);
    console.log(sequenciaClick);

    for (let i = 0; i < sequenciaCor.length; i++) {
        if (sequenciaCor[i] == sequenciaClick[i]){
            document.querySelector('#seqAcerto').textContent = score + 1;
            sequenciaClick.shift();
        }
        else {
            score = 0;
            alert("Você perdeu!");
            return;
        }
    }
    proximaSequencia();
}

//Efeitos dos botões
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