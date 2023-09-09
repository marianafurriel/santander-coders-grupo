class DomController {
  static botoes = [...document.querySelectorAll(".botao")];
  static init() {
    console.log(DomController.botoes);
    const novoJogo = document.querySelector(".btnNovoJogo");
    novoJogo.addEventListener("click", () => {
      Partida.novaPartida();
      Partida.clique = 0;
    });

    DomController.botoes[0].addEventListener("click", () => {
      Partida.avaliarClique(0);
      Partida.clique++;
      Partida.controle = true;
    });
    DomController.botoes[1].addEventListener("click", () => {
      Partida.avaliarClique(1);
      Partida.clique++;
      Partida.controle = true;
    });
    DomController.botoes[2].addEventListener("click", () => {
      Partida.avaliarClique(2);
      Partida.clique++;
      Partida.controle = true;
    });
    DomController.botoes[3].addEventListener("click", () => {
      Partida.avaliarClique(3);
      Partida.clique++;
      Partida.controle = true;
    });
  }
  static acendeBotao(id) {
    const cor = getComputedStyle(DomController.botoes[id]).backgroundColor;
    DomController.botoes[id].style.boxShadow = `0px 0px 60px 1px ${cor}`;
    setTimeout(function () {
      DomController.botoes[id].style.boxShadow = "";
    }, 100);
  }
}

class Partida {
  static controle;
  static partida;
  static clique;
  #sequencia;
  #pontuacao;
  constructor() {
    Partida.controle = false;
    const seq = [];
    for (let i = 0; i < 15; i++) {
      seq.push(Math.floor(Math.random() * 4));
    }
    this.#sequencia = seq;
    this.#pontuacao = 0;
    console.log(seq);
  }

  get sequencia() {
    return this.#sequencia;
  }
  set pontuacao(pontuacao) {
    this.#pontuacao = pontuacao;
  }
  static novaPartida() {
    Partida.partida = new Partida();
    Partida.loopPartida();
  }
  static loopPartida() {
    //loop da partida vai aqui
  }

  static avaliarClique(id) {
    if (!(id === Partida.partida.sequencia[Partida.clique])) {
      Partida.gameOver();
    }
  }
  static gameOver() {
    alert("Você perdeu!");
    location.reload();
  }
}

// let partida;
DomController.init();
console.log("teste1");
setTimeout(() => {
  console.log("teste timeout");
}, 10000);
console.log("teste2");
