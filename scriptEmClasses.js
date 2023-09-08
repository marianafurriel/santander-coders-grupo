class Botao {
  constructor(cor) {
    this.cor = cor;
    this.elemento = document.querySelector(`.${cor}`);
    this.elemento.addEventListener("click", () => this.clique());
  }

  clique() {
    JogoSimon.clique(this.cor);
  }
}

class Modal {
  constructor(id, cancelButtonId, okButtonId) {
    this.modal = document.querySelector(id);
    this.cancelButton = document.querySelector(cancelButtonId);
    this.okButton = document.querySelector(okButtonId);
    this.modal.style.display = "none";

    this.cancelButton.addEventListener("click", () => this.fechar());
    this.okButton.addEventListener("click", () => this.fechar());
  }

  abrir() {
    this.modal.style.display = "block";
  }

  fechar() {
    this.modal.style.display = "none";
  }
}

class JogoSimon {
  static sequenciaCor = [];
  static sequenciaClick = [];
  static score = 0;
  static maiorPontuacao = 0;
  static cliques = 0;
  static posicao = 0;
  static intervalo = 5000;
  static cores = [
    "rgb(255, 0, 0)",
    "rgb(0,10,255)",
    "rgb(82,255,0)",
    "rgb(250,255,0)",
  ];

  static botaoCor(numeroCor) {
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
  }

  static clique(cor) {
    this.sequenciaClick[this.sequenciaClick.length] = cor;
    this.botaoCor(cor).classList.add("highlighted");

    setTimeout(() => {
      this.botaoCor(cor).classList.remove("highlighted");
    }, 250);

    this.cliques += 1;
    this.checarCor(cor);
  }

  static checarCor(cor) {
    if (this.sequenciaCor[this.posicao] !== cor) {
      this.gameOver();
    } else if (this.cliques === this.sequenciaCor.length) {
      document.querySelector("#seqAcerto").textContent = this.score + 1;
      this.proximaSequencia();
    } else {
      this.posicao++;
    }
  }

  static desabilitarBotoes() {
    botoesColoridos.style.pointerEvents = "none";
  }

  static habilitarBotoes() {
    botoesColoridos.style.pointerEvents = "auto";
  }

  static async gerarNumeroCor() {
    this.desabilitarBotoes();
    let numeroCor = Math.floor(Math.random() * 4 + 1);
    this.sequenciaCor.push(numeroCor);
    this.highlightElement();
  }

  static async highlightElement() {
    for (const item of this.sequenciaCor) {
      let elemento = this.botaoCor(item);
      this.highlightColor(elemento);
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }
    this.habilitarBotoes();
  }

  static highlightColor(elemento) {
    elemento.classList.add("highlighted");
    setTimeout(() => {
      elemento.classList.remove("highlighted");
    }, 500);
  }

  static playGame() {
    this.sequenciaCor = [];
    this.sequenciaClick = [];
    this.score = 0;
    this.desabilitarBotoes();
    this.gerarNumeroCor();
  }

  static async proximaSequencia() {
    this.posicao = 0;
    this.cliques = 0;
    await new Promise((resolve) => setTimeout(resolve, 3000));
    this.sequenciaClick = [];
    this.score++;
    this.intervalo = this.intervalo * this.score;
    this.gerarNumeroCor();
  }

  static async countDown() {
    this.toggleModalCountdown();
    for (let i = 3; i <= 3 && i >= 0; i--) {
      if (i !== 0) {
        mypopup.textContent = i;
        mypopup.style.color = this.cores[i];
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      if (i == 0) {
        mypopup.textContent = "GO";
        mypopup.style.color = this.cores[i];
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.toggleModalCountdown();
        await new Promise((resolve) => setTimeout(resolve, 1200));
        this.playGame();
      }
    }
  }

  static gameOver() {
    document.querySelector("#seqAcertoFim").textContent = this.score;
    if (this.maiorPontuacao < this.score) {
      this.maiorPontuacao = this.score;
    }
    this.sequenciaCor = [];
    this.sequenciaClick = [];
    this.score = 0;
    this.cliques = 0;
    this.toggleModalReset();
    document.querySelector("#maiorAcerto").textContent = this.maiorPontuacao;
    document.querySelector("#seqAcerto").textContent = this.score;
    return;
  }

  static toggleModalCountdown() {
    botoesColoridos.classList.toggle("hide");
    mypopup.classList.toggle("hide");
  }

  static toggleModal() {
    [modal, fade].forEach((el) => el.classList.toggle("hide"));
  }

  static toggleModalReset() {
    [modal2, fade2].forEach((el) => el.classList.toggle("hide"));
  }
}

// Criação de instâncias das classes
const botoes = ["verde", "vermelho", "azul", "amarelo"].map((cor) => new Botao(cor));
const modal = new Modal("#modal", "#modalCancelButton", "#modalOkButton");
const modal2 = new Modal("#modal2", "#modalNaoButton", "#modalSimButton");

// Evento de clique no botão Novo Jogo
const botaoNovoJogo = document.querySelector("#btnovoJogo");
botaoNovoJogo.addEventListener("click", () => JogoSimon.countDown());
