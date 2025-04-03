class Racket {
    constructor(x) {
        this.w = 10;
        this.h = 60;
        this.x = x;
        this.y = height / 2 - this.h / 2;
    }

    update() {

        // se a raquete atualizando o metodo é a do jogador (lado esquerdo)
        if (this.x < width / 2) {
            this.y = mouseY;
        } else {
            if (ball.y < this.y + this.h / 2) {
                this.y -= 3;
            } else {
                this.y += 3;
            }
        }

        // limitar movimento dentro das bordas verticais
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y > height - this.h) {
            this.y = height - this.h;
        }
    }

    draw() {
        // se a raquete atualizando o metodo é a do jogador (lado esquerdo)
        if (this.x < width / 2) {
            image(jogadorImage, this.x, this.y, this.w, this.h);
        } else {
            image(oponenteImage, this.x, this.y, this.w, this.h);
        }
    }
}

class Ball {
    constructor() {
        this.radius = 12;
        this.reset();
        goSom.play();
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        const maxSpeed = 5;
        this.vx = Math.random() * maxSpeed * 2 - maxSpeed;
        this.vy = Math.random() * maxSpeed * 2 - maxSpeed;
        this.angulo = 0;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // rotaciona a bola de acordo com a velocidade x e y
        this.angulo += Math.sqrt(this.vx * this.vx + this.vy * this.vy) / 5;

        if (this.x < this.radius || this.x > width - this.radius) {
            // se a bola sair pela esquerda, oponente ganha ponto
            if (this.x < this.radius) {
                pontosOponente++;
            } else {
                pontosJogador++;
            }

            goSom.play();
            falaPontos();
 
            this.reset();
        }

        if (this.y < this.radius || this.y > height - this.radius) {
            this.vy *= -1;
        }

        if (colideCircleRect(this.x, this.y, this.radius, jogador.x, jogador.y, jogador.w, jogador.h) ||
            colideCircleRect(this.x, this.y, this.radius, oponente.x, oponente.y, oponente.w, oponente.h)) {

            quicarSom.play();
            this.vx *= -1;
            this.vx *= 1.1;
            this.vy *= 1.1;
        }
    }

    draw() {
        // rotaciona antes de desenhar
        push();
        translate(this.x, this.y);
        rotate(radians(this.angulo));
        imageMode(CENTER);
        image(ballImage, 0, 0, this.radius * 2, this.radius * 2);
        pop();
    }
}

//verifica a colisão entre um circulo e retangulo
//onde circulo é raio e cx, cy
// e retângulo é x, y, w, h
function colideCircleRect(cx, cy, raio, rx, ry, rw, rh) {
    // se o circulo está a esquerda ou a direita do retangulo
    if (cx + raio < rx || cx - raio > rx + rw) {
        return false;
    }

    // se o circulo está acima ou abaixo do retangulo
    if (cy + raio < ry || cy - raio > ry + rh) {
        return false;
    }

    return true;
}


let ball;
let jogador;
let oponente;

let ballImage;
let jogadorImage;
let oponenteImage;
let bgImage;
let quicarSom;
let goSom;

let pontosJogador = 0;
let pontosOponente = 0;

function falaPontos() {
    // falar em portugues os pontos de cada um iniciando sempre pelo que tem mais pontos
    let pontos = pontosJogador > pontosOponente ? `Jogador ${pontosJogador} a ${pontosOponente} contra Oponente` : `Oponente ${pontosOponente} a ${pontosJogador} contra Jogador`;
    let msg = new SpeechSynthesisUtterance(pontos);
    msg.lang = 'pt-BR';
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 1;
    window.speechSynthesis.speak(msg);
}

function preload() {
    ballImage = loadImage('bola.png');
    jogadorImage = loadImage('jogador.png');
    oponenteImage = loadImage('oponenete.png');
    bgImage = loadImage('fundo.png');
    quicarSom = loadSound('446100__justinvoke__bounce.wav');
    goSom = loadSound('274178__littlerobotsoundfactory__jingle_win_synth_02.wav');
}

function setup() {
    createCanvas(800, 400);
    ball = new Ball();
    jogador = new Racket(30);
    oponente = new Racket(width - 40);
}

function draw() {

    // centralized fundo, with canvas aspectratio, and zoomout as maximum as possible
    let aspectRatio = bgImage.width / bgImage.height;
    let canvasAspectRatio = width / height;
    if (aspectRatio > canvasAspectRatio) {
        let newWidth = height * aspectRatio;
        image(bgImage, (width - newWidth) / 2, 0, newWidth, height);
    } else {
        let newHeight = width / aspectRatio;
        image(bgImage, 0, (height - newHeight) / 2, width, newHeight);
    }

    ball.draw();
    ball.update();

    jogador.draw();
    jogador.update();

    oponente.draw();
    oponente.update();
}

