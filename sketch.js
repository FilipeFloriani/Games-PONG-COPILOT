class Racket {
    constructor() {
        this.w = 10;
        this.h = 60;
        this.x = 30;
        this.y = height / 2 - this.h / 2;
    }

    update() {
        this.y = mouseY;

        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y > height - this.h) {
            this.y = height - this.h;
        }     
    }

    draw() {
        fill(255);
        rect(this.x, this.y, this.w, this.h);
    }
}

class Ball {
    constructor() {       
        this.diameter = 50;
        this.radius = 25;
        this.reset();
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        this.vx = Math.random() * 10 -5;
        this.vy = Math.random() * 10 -5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < this.radius || this.x > width - this.radius) {
            this.reset();
        }

        if (this.y < this.radius || this.y > height - this.radius) {
            this.vy *= -1;
        }

        const colideNoX = this.x - this.radius < jogador.x + jogador.w + 10;
        const colideNoY = this.y >= jogador.y && 
                          this.y <= jogador.y + jogador.h;

        console.log(this.x + " - " + this.y);                  

        if (colideNoX && colideNoY) {
             this.vx *= -1;
         }
    }

    draw() {
        fill(255);
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }
}

let ball;
let jogador;

function setup() {
    createCanvas(800, 400);
    ball = new Ball();
    jogador = new Racket();
}

function draw() {
    background(0);

    ball.draw();
    ball.update();

    jogador.draw();
    jogador.update();
    
}

