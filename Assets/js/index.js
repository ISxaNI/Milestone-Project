const gamePad = document.getElementById('canvas');
const gpcxt = gamePad.getContext("2d");

let ball = {
    x: gamePad.width / 2,
    y: gamePad.height - 30,
    dx: 2,
    dy: -2,
    radius: 10
}

let balls = []

function createBall() {
    balls.forEach(ball => {
        gpcxt.beginPath();
        gpcxt.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
        gpcxt.fillStyle = "#0095DD";
        gpcxt.fill();
        gpcxt.closePath();
    });
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

function toss() {
    gpcxt.clearRect(0, 0, gamePad.width, gamePad.height);
    createBall(); // This now draws all balls
    balls.forEach(ball => {
        updateBallPosition(ball); // Make sure this function is adapted
        detectCollisions(ball); // Adapt this function too
    });
    requestAnimationFrame(toss);
}


toss()
document.getElementById('Sizeup').addEventListener('click', function() {
    ball.radius += 5; 
    if (ball.radius + ball.x > canvas.width) {
        ball.x = canvas.width - ball.radius;
    }
    if (ball.radius + ball.y > canvas.height) {
        ball.y = canvas.height - ball.radius;
    }
});

document.getElementById('Sizedown').addEventListener('click', function() {
    ball.radius -= 5;
    if (ball.radius < 5) {
        ball.radius = 1; 
    }
});

document.getElementById('Add').addEventListener('click', function() {
    const newBall = {
        x: Math.random() * (gamePad.width - 20) + 10, // Random x position
        y: Math.random() * (gamePad.height - 20) + 10, // Random y position
        dx: (Math.random() - 0.5) * 4, // Random x velocity
        dy: (Math.random() - 0.5) * 4, // Random y velocity
        radius: 10 // Default radius
    };
    balls.push(newBall); // Add the new ball to the balls array
});

