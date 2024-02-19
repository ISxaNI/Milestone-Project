const gamePad = document.getElementById('canvas');
const gpcxt = gamePad.getContext("2d");
let isColorShifting = false;
let ball = {
    x: gamePad.width / 2,
    y: gamePad.height - 30,
    dx: 2,
    dy: -2,
    radius: 10
}

const acceleration = 1.25

const deceleration = 0.75

let balls = []

function createBall() {
    balls.forEach(ball => {
        gpcxt.beginPath();
        gpcxt.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
        gpcxt.fillStyle = ball.color;
        gpcxt.fill();
        gpcxt.closePath();
    });
}

function addBallButton() {
const newBall = {
    color: `rgb( ${Math.random() * 255}, ${Math.random() * 255}, 255)`,
    x: Math.random() * (gamePad.width - 20) + 10,
    y: Math.random() * (gamePad.height - 20) + 10,
    dx: (Math.random() - 0.5) * 4,
    dy: (Math.random() - 0.5) * 4,
    radius: 10
};
balls.push(newBall);
}

function updateBallPosition() {
    balls.forEach(ball => {
    ball.x += ball.dx;
    ball.y += ball.dy; 
})
}

function detectCollisions() {
    balls.forEach(ball => {
    if (ball.x + ball.dx > gamePad.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    if (ball.y + ball.dy > gamePad.height - ball.radius || ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    }
    })
}

function detectBallCollisions() {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            const dx = balls[j].x - balls[i].x;
            const dy = balls[j].y - balls[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < balls[i].radius + balls[j].radius) {
                handleCollision(balls[i], balls[j], dx, dy, distance);
            }
        }
    }
}

function handleCollision(ball1, ball2, dx, dy, distance) {
    const vecx = dx / distance;
    const vecy = dy / distance;

    const projection1 = ball1.dx * vecx + ball1.dy * vecy;
    const projection2 = ball2.dx * vecx + ball2.dy * vecy;

    const tP1 = projection1;
    const tP2 = projection2;

    ball1.dx += (tP2 - tP1) * vecx;
    ball1.dy += (tP2 - tP1) * vecy;
    ball2.dx += (tP1 - tP2) * vecx;
    ball2.dy += (tP1 - tP2) * vecy;
}

document.getElementById('Sizeup').addEventListener('click', function() {
    balls.forEach(ball => {
    ball.radius *= 1.2; 
})
});

document.getElementById('Sizedown').addEventListener('click', function() {
    balls.forEach(ball => {
    ball.radius *= 0.85;
})
});

document.getElementById('Add').addEventListener('click', addBallButton);

document.addEventListener('keydown', function(event) {
    if (event.key === "Space" || event.code === "space")
    addBallButton()
})

document.getElementById('Speedup').addEventListener('click', function() {
    balls.forEach(ball => {
        ball.dx *= acceleration;
        ball.dy *= acceleration;
    })
})

document.getElementById('Speeddown').addEventListener('click', function() {
    balls.forEach(ball => {
        ball.dx *= deceleration;
        ball.dy *= deceleration;
    })
})

async function colorShiftToggle() {
    isColorShifting = !isColorShifting

    const toggleButton = document.getElementById('Color')

    if (isColorShifting) {
        toggleButton.style.backgroundColor = `rgb( ${Math.random() * 255}, ${Math.random() * 255}, 255)`
    } else {
        toggleButton.style.backgroundColor = ``
    }

    while (isColorShifting) {
            balls.forEach(ball => {
                ball.color = `rgb( ${Math.random() * 255}, ${Math.random() * 255}, 255)`
            });
        await new Promise(resolve => setTimeout(resolve, 50))
    }
}

document.getElementById('Color').addEventListener('click', colorShiftToggle);

function toss() {
    gpcxt.clearRect(0, 0, gamePad.width, gamePad.height);
    createBall();
    updateBallPosition();
    detectBallCollisions();
    detectCollisions();
    requestAnimationFrame(toss);
}

toss()

//NEXT UP ON THE LIST OF WHAT TO DO:
//DONT FORGET ABOUT THE AWAIT AND EVERYTHING TOO. NEED TO SET IT UP CORRECTLY.