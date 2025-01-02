




const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
    constructor(x, targetY, color) {
        this.x = x;
        this.y = canvas.height;
        this.targetY = targetY;
        this.color = color;
        this.particles = [];
        this.exploded = false;
        for (let i = 0; i < 100; i++) {
            this.particles.push(new Particle(this.x, this.targetY, randomColor()));
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    explode() {
        this.exploded = true;
    }

    update() {
        if (!this.exploded) {
            if (this.y > this.targetY) {
                this.y -= 2;
                this.draw();
            } else {
                this.explode();
            }
        } else {
            this.particles.forEach(particle => particle.update());
        }
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 8;
        this.speedY = (Math.random() - 0.5) * 8;
        this.opacity = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.02;
        if (this.opacity > 0) {
            this.draw();
        }
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function randomColor() {
    const colors = ['#ff4949', '#ffcc33', '#66ff66', '#33ccff', '#ff66cc', '#ffffff', '#ff6600'];
    return colors[Math.floor(Math.random() * colors.length)];
}

const fireworks = [];

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework, index) => {
        firework.update();
        if (firework.exploded && firework.particles.every(p => p.opacity <= 0)) {
            fireworks.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

function createFirework() {
    const x = Math.random() * canvas.width;
    const targetY = canvas.height / 2 + Math.random() * 100 - 50; // Near the "Happy new Year 2025"
    const color = randomColor();
    const firework = new Firework(x, targetY, color);
    fireworks.push(firework);
}

// Decrease interval to increase the frequency of fireworks
setInterval(createFirework, 300); // 500ms interval for more frequent fireworks
animate();
