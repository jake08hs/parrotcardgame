// Lista de gifs 
const gifs = [
    "bobrossparrot.gif", "explodyparrot.gif", "fiestaparrot.gif",
    "metalparrot.gif", "revertitparrot.gif", "tripletsparrot.gif", "unicornparrot.gif"
];

let cartasViradas = [];
let acertos = 0;
let tentativas = 0; 
let qtdCartas = 0;  


function embaralharCartas(array) {
    return array.sort(() => Math.random() - 0.5);
}

window.onload = function () {
    definirCartas();
};

function definirCartas() {
    do {
        qtdCartas = parseInt(prompt("Com quantas cartas você quer jogar? (Escolha um número par entre 4 e 14)"), 10);
    } while (isNaN(qtdCartas) || qtdCartas < 4 || qtdCartas > 14 || qtdCartas % 2 !== 0);

    criarCartas(qtdCartas);
}

function criarCartas(qtdCartas) {
    const gifsSelecionados = gifs.slice(0, qtdCartas / 2);

    let gifsDuplicados = [];
    for (let i = 0; i < gifsSelecionados.length; i++) {
        gifsDuplicados.push(gifsSelecionados[i]);
        gifsDuplicados.push(gifsSelecionados[i]);
    }

    const cartasEmbaralhadas = embaralharCartas(gifsDuplicados);

    const container = document.querySelector('.container');
    container.innerHTML = "";

    cartasEmbaralhadas.forEach((gif) => {
        const carta = document.createElement('div');
        carta.classList.add('card');

        const frente = document.createElement('img');
        frente.src = './assets/back.png';
        frente.classList.add('frente');

        const verso = document.createElement('img');
        verso.src = `./assets/${gif}`;
        verso.classList.add('verso');

        carta.appendChild(frente);
        carta.appendChild(verso);
        carta.addEventListener('click', () => virarCarta(carta, frente, verso, gif));

        container.appendChild(carta);
    });
}

function virarCarta(carta, frente, verso, gif) {
    if (carta.classList.contains('virada') || cartasViradas.length === 2) return;

    carta.classList.add('virada');

    cartasViradas.push({ carta, frente, verso, gif });

    if (cartasViradas.length === 2) {
        setTimeout(verificarPar, 1000);
    }
}

function verificarPar() {
    const [carta1, carta2] = cartasViradas;

    tentativas += 2; 

    if (carta1.gif === carta2.gif) {
        acertos++;
        cartasViradas = [];

       
        if (acertos === qtdCartas / 2) {
            setTimeout(() => alert(`Você ganhou em ${tentativas} jogadas!`), 500);
        }
    } else {
        setTimeout(() => {
            carta1.carta.classList.remove('virada');
            carta2.carta.classList.remove('virada');
            cartasViradas = [];
        }, 1000);
    }
}
