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
    desabilitarBotoes();
    checkSequencia();
}
}

//eventos de clique para as cores
btnVermelho.onclick = () => click(1);
btnAzul.onclick = () => click(2);
btnAmarelo.onclick = () => click(3);
btnVerde.onclick = () => click(4);

//Funcao para desabilitar clique nos botões
function desabilitarBotoes() {
botoesColoridos.style.pointerEvents = "none";
}
//Funcao para habilitar clique nos botões
function habilitarBotoes() {
botoesColoridos.style.pointerEvents = "auto";
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