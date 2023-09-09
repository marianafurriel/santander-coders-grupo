class Button {
  constructor(color) {
    this.color = color;
    this.element = document.getElementById(color);
  }
  //adicionar a classe de acender o botão
  flash() {
    this.element.classList.add(`${this.color}-lit`);
    setTimeout(() => {
      this.element.classList.remove(`${this.color}-lit`);
    }, 500);
  }
}

class Sequence {
  constructor() {
    this.sequence = [];
  }

  addToSequence() {
    const colors = ["red", "green", "blue", "yellow"];
    const randomColor = colors[Math.floor(Math.random() * 4)];
    this.sequence.push(randomColor);
  }

  playSequence() {
    console.log("play sequence");
    let i = 0;
    const interval = setInterval(() => {
      const button = new Button(this.sequence[i]);
      button.flash();
      i++;
      if (i >= this.sequence.length) {
        clearInterval(interval);
      }
    }, 1000);
  }
}

class SimonGame {
  constructor() {
    console.log("começa partida");
    this.sequence = new Sequence();
    this.playerSequence = [];
    this.round = 1;
    this.isPlaying = false;

    document
      .getElementById("start-btn")
      .addEventListener("click", () => this.startGame());
    document.querySelectorAll(".simon-button").forEach((button) => {
      button.addEventListener("click", () => this.handleButtonClick(button.id));
    });
  }

  startGame() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.round = 1;
      this.sequence = new Sequence();
      this.playRound();
    }
  }

  playRound() {
    this.sequence.addToSequence();
    setTimeout(() => {
      this.sequence.playSequence();
      this.playerSequence = [];
    }, 1000);
  }

  handleButtonClick(color) {
    if (this.isPlaying) {
      const button = new Button(color);
      button.flash();
      this.playerSequence.push(color);

      if (this.playerSequence.length === this.sequence.sequence.length) {
        if (
          JSON.stringify(this.playerSequence) ===
          JSON.stringify(this.sequence.sequence)
        ) {
          this.round++;
          setTimeout(() => {
            this.playRound();
          }, 1000);
          const pontuacao = document.querySelector("#seqAcerto");
          pontuacao.textContent = this.round - 1;
        } else {
          const maiorPontuacao = document.querySelector("#maiorAcerto");
          if (this.round - 1 > Number(maiorPontuacao.textContent)) {
            localStorage.setItem("maiorPontuacao", this.round - 1);
            maiorPontuacao.textContent = this.round - 1;
          }
          alert(`Game Over! Your score: ${this.round - 1}`);
          this.isPlaying = false;
        }
      }
    }
  }
}

const maiorPontuacaoLocal = localStorage.getItem("maiorPontuacao") || 0;
const maiorPontuacaoSpan = document.querySelector("#maiorAcerto");
maiorPontuacaoSpan.textContent = maiorPontuacaoLocal;
const game = new SimonGame();
