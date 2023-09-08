export const cores = [
    { id: 1, descricao: 'vermelho', ativa: false, },
    { id: 2, descricao: 'azul', ativa: false, },
    { id: 3, descricao: 'amarelo', ativa: false, },
    { id: 4, descricao: 'verde', ativa: false, },
];

class Cor {

    constructor(){
        this.#id =  Math.floor(Math.random() * 4 + 1);
        this.descricao = this.descricao;
        this.ativa = this.ativa;
    }
    get id(){
        return this.#id;
    }

    buscarBotaoPeloId(id) {
        if (id == 1) {
            let audio = document.getElementById("clip1");
            audio.play();
            return this.descricao;
        } 
        else if (id == 2) {
            let audio = document.getElementById("clip2");
            audio.play();
            return this.descricao;
        } 
        else if (id == 3) {
            let audio = document.getElementById("clip3");
            audio.play();
            return this.descricao;
        } 
        else if (id == 4) {
            let audio = document.getElementById("clip4");
            audio.play();
            return this.descricao;
        }
    }
}

class Tabuleiro{
    static btnVerde = document.querySelector(".verde");
    static btnVermelho = document.querySelector(".vermelho");
    static btnAzul = document.querySelector(".azul");
    static btnAmarelo = document.querySelector(".amarelo");

    static click(cor) {
        sequenciaClick[sequenciaClick.length] = cor;
            botaoCor(cor).classList.add('highlighted');
        
            setTimeout(() => {
                botaoCor(cor).classList.remove('highlighted');
            }, 250);

            cliques += 1;
            contaClick(cliques);
    };
           
    static iniciarBotoes() {
        //eventos de clique para as cores
        btnVermelho.onclick = () => Tabuleiro.click(1);
        btnAzul.onclick = () => Tabuleiro.click(2);
        btnAmarelo.onclick = () => Tabuleiro.click(3);
        btnVerde.onclick = () => Tabuleiro.click(4);
    }
}
