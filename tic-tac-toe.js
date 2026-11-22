// JOGO DA VELHA DE NATAL
const tic_tac_toe = {

   
    board: ['','','','','','','','',''],
    simbols: {
                options: ['X','O'],
                turn_index: 0,
                change: function(){
                    this.turn_index = ( this.turn_index === 0 ? 1:0 );
                }
            },
    emojis: { X: '🎅', O: '🎄' },
    pontos: { X: 0, O: 0 },
    empates: 0,
    container_element: null,
    gameover: false,
    sequencia_ganhadora: [],
    winning_sequences: [
                        [0,1,2],
                        [3,4,5],
                        [6,7,8],
                        [0,3,6],
                        [1,4,7],
                        [2,5,8],
                        [0,4,8],
                        [2,4,6]
                    ],

    
    init: function(container) {
        this.container_element = container;
        this.atualizar_ranking();
    },

    make_play: function(position) {
        if (this.gameover) return false;
        if (this.board[position] === ''){
            let simbolo = this.simbols.options[this.simbols.turn_index];
            this.board[position] = simbolo;

            let winning_sequences_index = this.check_winning_sequences(simbolo);
            if (winning_sequences_index >= 0){
                this.sequencia_ganhadora = this.winning_sequences[winning_sequences_index];
                this.game_is_over(simbolo);
            } else if (!this.board.includes('')) {
                // ninguem ganhou e o tabuleiro encheu
                this.game_is_over('empate');
            } else{
                this.simbols.change();
                this.mostrar_vez();
            }
            this.draw();
            return true;
        }
        else {
            return false;
        }
    },

    check_winning_sequences: function(simbol) {
        for (let i = 0; i < this.winning_sequences.length; i++) {
            if (this.board[ this.winning_sequences[i][0] ] == simbol &&
                this.board[ this.winning_sequences[i][1] ] == simbol &&
                this.board[ this.winning_sequences[i][2] ] == simbol) {
                return i;
            }
        }
        return -1;
    },

    game_is_over: function(vencedor) {
        this.gameover = true;
        let texto = '';

        if (vencedor === 'empate') {
            this.empates++;
            texto = 'Deu velha! Empate 🎁';
        } else {
            this.pontos[vencedor]++;
            texto = 'Jogador ' + vencedor + ' ganhou! ' + this.emojis[vencedor];
        }

        this.atualizar_ranking();
        document.getElementById('vez').innerHTML = texto;

        
        setTimeout(function() {
            document.getElementById('texto-aviso').innerHTML = texto;
            document.getElementById('aviso').classList.remove('escondido');
        }, 600);
    },

    atualizar_ranking: function() {
        let jogadores = ['X', 'O'];

        
        jogadores.sort((a, b) => this.pontos[b] - this.pontos[a]);

        let lista = '';
        for (let i = 0; i < jogadores.length; i++) {
            let j = jogadores[i];
            let vez_ou_vezes = this.pontos[j] === 1 ? ' vez' : ' vezes';
            lista += '<li>' + this.emojis[j] + ' Jogador ' + j + ' ganhou ' + this.pontos[j] + vez_ou_vezes + '</li>';
        }

        document.getElementById('lista-ranking').innerHTML = lista;
        document.getElementById('empates').innerHTML = this.empates;
    },

    mostrar_vez: function() {
        let simbolo = this.simbols.options[this.simbols.turn_index];
        document.getElementById('vez').innerHTML = 'Vez do jogador ' + simbolo + ' ' + this.emojis[simbolo];
    },

    start: function() {
        this.board.fill('');
        this.gameover = false;
        this.sequencia_ganhadora = [];
        this.simbols.turn_index = 0;
        document.getElementById('aviso').classList.add('escondido');
        this.mostrar_vez();
        this.draw();
    },

    draw: function() {
        let content = '';

        for (let i = 0; i < this.board.length; i++) {
            let emoji = this.board[i] ? this.emojis[this.board[i]] : '';
            let classe = this.sequencia_ganhadora.includes(i) ? 'ganhou' : '';
            content += '<div class="' + classe + '" onclick="tic_tac_toe.make_play(' + i + ')">' + emoji + '</div>';
        }

        this.container_element.innerHTML = content;
    },
};
