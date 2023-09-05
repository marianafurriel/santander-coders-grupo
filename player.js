    // Array para armazenar as entradas do jogador
    const sequenciaJogador = [];
    let contador = 0
    // Função para exibir a sequência gerada pelo jogo
    export async function exibirSequenciaJogador() {
      for (const color of sequence) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Aguarda 1 segundo
        highlightColor(color);
      }
      vezJogador(); // Após exibir a sequência, é a vez do jogador
    }

    // Função para a vez do jogador
    export function vezJogador() {
      // dicionar eventos de clique aos botões coloridos
      colorButtons.forEach(button => {
        button.addEventListener('click', () => {
          const color = button.getAttribute('btn-color');
          sequenciaJogador.push(color);
          highlightColor(color);
          checarSequencia(); // Verificar se a sequência do jogador corresponde
        });
      });
    }

    export function highlightColor(color) {
                                                  //alterar para o nome do atributo no html
      const button = document.querySelector(`[btn-color="${color}"]`);
      button.classList.add('highlighted');
      setTimeout(() => {
        button.classList.remove('highlighted');
      }, 500);
    }

    // Função para verificar se a sequência do jogador corresponde à sequência original
    export function checarSequencia() {
      for (let i = 0; i < sequenciaJogador.length; i++) {
        if (sequenciaJogador[i] !== sequence[i]) {
          alert('Sequência incorreta! Fim do jogo.');
          return;
        }else{
          contador++
          alert(`Você acertou ${contador} vezes seguidas a sequência`)
        }
      }
    }