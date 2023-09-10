class Button {
  constructor(color) {
    this.color = color;
    this.element = document.getElementById(color);
    this.sound = document.getElementById(`${color}-sound`);
    this.element.addEventListener("click", () => this.playSound());
  }

  playSound() {
    this.sound.currentTime = 0; // Reinicie o áudio se já estiver em execução
    this.sound.play();
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

  

  //adiciona uma cor aleatória a sequencia
  addToSequence() {
    const colors = ["red", "green", "blue", "yellow"];
    const randomColor = colors[Math.floor(Math.random() * 4)];
    this.sequence.push(randomColor);
  }

  //toca a sequencia com 1 segundo de espera entre cada cor
  playSequence() {
    let i = 0;
    const interval = setInterval(() => {
      const button = new Button(this.sequence[i]);
      button.flash();
      button.playSound();
      i++;
      if (i >= this.sequence.length) {
        clearInterval(interval);
      }
    }, 1000);
  }
}



class SimonGame {
  constructor() {
    this.sequence = new Sequence();
    this.playerSequence = [];
    this.round = 1;
    this.isPlaying = false; //esse atributo vai ser usado para impedir que comece um jogo quando já tiver um acontecendo

    //adiciona evento de clique para o botão de novo jogo
    document
      .getElementById("start-btn")
      .addEventListener("click", () => this.startGame());

    //adiciona evento de clique para cada botão
    document.querySelectorAll(".simon-button").forEach((button) => {
      button.addEventListener("click", () => this.handleButtonClick(button.id));
    });
  }

  //inicia a partida
  startGame() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.round = 1;
      this.sequence = new Sequence();
      this.playRound();
    }
  }

  //metodo que vai ser chamado para iniciar cada rodada
  playRound() {
    this.sequence.addToSequence();
    setTimeout(() => {
      this.sequence.playSequence();
      this.playerSequence = [];
    }, 1000);
  }

  handleButtonClick(color) {
    if (this.isPlaying) {
      //essa função só faz algo se tiver algum jogo rolando
      const button = new Button(color);
      button.flash();
      button.playSound();//reproduzir o som dos botões
      this.playerSequence.push(color);

      if (this.playerSequence.length === this.sequence.sequence.length) {
        //compara a sequencia de cliques do usuario com a sequencia de cores da rodada
        if (
          JSON.stringify(this.playerSequence) ===
          JSON.stringify(this.sequence.sequence)
        ) {
          //atualiza no DOM a pontuação atual
          const pontuacao = document.querySelector("#seqAcerto");
          pontuacao.textContent = this.round;
          this.round++;
          //espera 1 segundo e começa a proxima rodada
          setTimeout(() => {
            this.playRound();
          }, 1000);
        } else {
          //ao terminar a partida checa se a pontuação atual é recorde, se for, adiciona no local storage e atualiza no DOM
          const maiorPontuacao = document.querySelector("#maiorAcerto");
          if (this.round - 1 > Number(maiorPontuacao.textContent)) {
            localStorage.setItem("maiorPontuacao", this.round - 1);
            maiorPontuacao.textContent = this.round - 1;
          }
          // encerra a partida e exibe um alerta para avisar o jogador
          alert(`Game Over! Your score: ${this.round - 1}`);
          this.isPlaying = false;
        }
      }
    }
  }
}

//atualiza o record ao iniciar a página, se for a primeira vez, seta como 0
const maiorPontuacaoLocal = localStorage.getItem("maiorPontuacao") || 0;
const maiorPontuacaoSpan = document.querySelector("#maiorAcerto");
maiorPontuacaoSpan.textContent = maiorPontuacaoLocal;

//inicia o jogo
const game = new SimonGame();
