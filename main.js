const botoes = [...document.querySelectorAll(".botao")];
const btnVerde = document.querySelector('.verde');
const btnVermelho = document.querySelector('.vermelho');
const btnAzul = document.querySelector('.azul');
const btnAmarelo = document.querySelector('.amarelo');
const btnNovoJogo = document.getElementById("#btnovoJogo");

let sequencia = [];
let sequenciaClicada = [];

let numeroCor = (cor) => {
    if (cor == 1) {
        console.log(cor, btnVermelho);
        return btnVermelho;
    } else if (cor == 2) {
        console.log(cor, btnAzul)
        return btnAzul;
    } else if (cor == 3) {
        console.log(cor, btnAmarelo)
        return btnAmarelo;
    } else if (cor == 4) {
        console.log(cor, btnVerde)
        return btnVerde;
    }
}

let sequenciaAleatoria = () => {
    let sequenciaCor = Math.floor(Math.random() * 4);
    sequencia[sequencia.length] = sequenciaCor;
  
    for (let item in sequencia) {
      let elementColor = numeroCor(sequencia[item]);
      highlightColor(elementColor, Number(item) + 1);
    }
  };

function highlightColor(elemento, cor) {
    //alterar para o nome do atributo no html
const button = document.getElementsByClassName(`."${cor}"]`);
elemento.classList.add('highlighted');
setTimeout(() => {
    elemento.classList.remove('highlighted');
    }, 500);
}

// btnVerde.onclick = () => click(1);
// btnVermelho.onclick = () => click(2);
// btnAzul.onclick = () => click(3);
// btnAmarelo.onclick = () => click(4);

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


