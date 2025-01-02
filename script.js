function ajustarPosicao() {
    const elemento = document.getElementById("tres");
    const elemento2 = document.getElementById("dois");
    const largura = window.innerWidth;
    const altura = window.innerHeight;

    if (largura / altura > 16 / 9) {
        elemento.style.transform = "translate(100px, -50%)";
        elemento2.style.transform = "translate(-250px, -50%)";
    } else {
        elemento.style.transform = "translate(40%, 100px)";
        elemento2.style.transform = "translate(40%, -250px)";
    }
}

ajustarPosicao();

window.addEventListener("resize", ajustarPosicao);

let interval;
const chances = { 1: 0, 2: 0, 3: 0, 4: 0 };
const counters = { 1: 0, 2: 0, 3: 0, 4: 0 };

window.onload = () => {
    for (let i = 1; i <= 4; i++) {
        rollInitialDice(i);
    }
};

function rollInitialDice(player) {
    const rolled = Math.floor(Math.random() * 6);
    chances[player] = rolled;
    counters[player] = 0;
    resetBars(player);
}

function rollDice(player) {
    const bar = document.querySelector(`#bars${player} .bar[data-index="${counters[player]}"]`);

    if (bar.classList.contains('atirou')) {
        resetPlayer(player);
        return;
    }

    if (counters[player] >= chances[player]) {
        bar.classList.add('atirou');
        return;
    }
    
    if (bar) {
        bar.classList.add('active');
        counters[player]++;
    }
}

function resetPlayer(player) {
    chances[player] = Math.floor(Math.random() * 6);
    counters[player] = 0;
    resetBars(player);
}

function resetBars(player) {
    document.querySelectorAll(`#bars${player} .bar`).forEach(bar => bar.classList.remove('active'));
    document.querySelectorAll(`#bars${player} .bar`).forEach(bar => bar.classList.remove('atirou'));
}

function resetAll() {
    for (let i = 1; i <= 4; i++) {
        resetPlayer(i);
        const buttons = document.querySelectorAll(`#player${i} button`);
        buttons.forEach(button => {
            button.disabled = false;
            button.classList.remove('selected');
        });
    };
    clearInterval(interval);
    document.getElementById('start').textContent = '00';
    const botao = document.getElementById('dois')
    botao.style.backgroundImage = `url('Imagens/CartaDois.png')`
    const botao2 = document.getElementById('tres')
    botao2.style.backgroundImage = `url('Imagens/CartaTres.png')`
}

document.getElementById('start').addEventListener('click', () => {
    if (!interval) {
    clearInterval(interval);
    timer = 15;
    document.getElementById('start').textContent = String(timer).padStart(2, '0');

    for (let i = 1; i <= 4; i++)  {
        const buttons = document.querySelectorAll(`#player${i} button`);
        buttons.forEach(button => {
        button.disabled = false;
        });
    };

    interval = setInterval(() => {
        timer--;
        document.getElementById('start').textContent = String(timer).padStart(2, '0');

        if (timer <= 0) {
            clearInterval(interval);
            disableAllButtons();
            interval = false
        }
    }, 1000);
    }
});

function selectPlayer(playerId, targetId, Each) {
    const buttons = document.querySelectorAll(`#player${playerId} button`);
    buttons.forEach(button => {
        button.classList.remove('selected');;
    });
    Each.classList.add('selected');
}

function disableAllButtons() {
    for (let i = 1; i <= 4; i++) {
        const buttons = document.querySelectorAll(`#player${i} button`);
        buttons.forEach(button => {
            if (button.id !== 'reset-uni') {
                button.disabled = true;
            }
        });
    };
}

document.getElementById('dois').addEventListener('click', () => {
    let intervalo
    const cartas = ['Q','K']
    const reset = document.getElementById('tres')
    reset.style.backgroundImage = `url('Imagens/CartaTres.png')`
    const botao = document.getElementById('dois')
    

    const alternarCartas = () => {
        const carta = cartas[Math.floor(Math.random() * cartas.length)]
        botao.style.backgroundImage = `url('Imagens/Carta${carta}.png')`
    }

    intervalo = setInterval(alternarCartas, 100)

    setTimeout(() => {
        clearInterval(intervalo)
        const cartaFinal = cartas[Math.floor(Math.random() * cartas.length)]
        botao.style.backgroundImage = `url('Imagens/Carta${cartaFinal}.png')`
    }, 2000);
})

document.getElementById('tres').addEventListener('click', () => {
    let intervalo
    const cartas = ['A','Q','K']
    const reset = document.getElementById('dois')
    reset.style.backgroundImage = `url('Imagens/CartaDois.png')`
    const botao = document.getElementById('tres')

    const alternarCartas = () => {
        const carta = cartas[Math.floor(Math.random() * cartas.length)]
        botao.style.backgroundImage = `url('Imagens/Carta${carta}.png')`
    }

    intervalo = setInterval(alternarCartas, 100)

    setTimeout(() => {
        clearInterval(intervalo)
        const cartaFinal = cartas[Math.floor(Math.random() * cartas.length)]
        botao.style.backgroundImage = `url('Imagens/Carta${cartaFinal}.png')`
    }, 2000);
})