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
        return btnVermelho;
    } else if (numeroCor == 2) {
        return btnAzul;
    } else if (numeroCor == 3) {
        return btnAmarelo;
    } else if (numeroCor == 4) {
        return btnVerde;
    }
};

// Pega os cliques dos botões das cores
btnVermelho.addEventListener("click", function(event) {
    botaoCor(1);
});
    
btnAzul.addEventListener("click", function(event) {
    botaoCor(2);
});
    
btnAmarelo.addEventListener("click", function(event) {
    botaoCor(3);
});
    
btnVerde.addEventListener("click", function(event) {
    botaoCor(4);
});

//Gerar um número aleatório de 1 a  que corresconde as cores
function gerarNumeroCor() {
    let numeroCor = Math.floor(Math.random() * 4 + 1);
    sequenciaCor.push(numeroCor);

    for (item of sequenciaCor) {
        let elemento = botaoCor(item); 
        highlightColor(elemento);             
    }
    console.log(sequenciaCor);
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
}


// const precisamosEsperar = () => {
//     return new Promise(resolve => {
//     setTimeout(function() {
//        console.log("Espere meu resultado!")
//        resolve(5)
//      }, 1000)
//    })
//  }
//  const outraFuncao = async () => {
//    const x = await clickUsuario()
   
//    console.log(x)
//  }
//  outraFuncao()

//Efeitos dos botões
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