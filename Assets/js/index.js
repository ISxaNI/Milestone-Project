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

function detectBallCollisions() {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            const dx = balls[j].x - balls[i].x;
            const dy = balls[j].y - balls[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < balls[i].radius + balls[j].radius) {
                balls[i].dx = -balls[i].dx;
                balls[i].dy = -balls[i].dy;
                balls[j].dx = -balls[j].dx;
                balls[j].dy = -balls[j].dy;
            }
        }
    }
}

document.getElementById('Sizeup').addEventListener('click', function() {
    balls.forEach(ball => {
    ball.radius += 5; 
    if (ball.radius + ball.x > canvas.width) {
        ball.x = canvas.width - ball.radius;
    }
    if (ball.radius + ball.y > canvas.height) {
        ball.y = canvas.height - ball.radius;
    }
})
});

document.getElementById('Sizedown').addEventListener('click', function() {
    balls.forEach(ball => {
    ball.radius -= 5;
    if (ball.radius < 5) {
        ball.radius = 1; 
    }
})
});

document.getElementById('Add').addEventListener('click', function() {
    const newBall = {
        x: Math.random() * (gamePad.width - 20) + 10,
        y: Math.random() * (gamePad.height - 20) + 10,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
        radius: 10
    };
    balls.push(newBall);
});

function toss() {
    gpcxt.clearRect(0, 0, gamePad.width, gamePad.height);
    createBall();
    updateBallPosition(ball);
    detectBallCollisions();
    detectCollisions(ball);
    requestAnimationFrame(toss);
}

async function colorShift() {
    
}

toss()

//NEXT UP ON THE LIST OF WHAT TO DO:

//SETUP PROPER OPERATION USE OF COLOR AND SPEED. SETTING COLOR TO RAINBOW BECAUSE HONESTLY. 
//THAT SEEMS EASIER. SETTING SPEED SO YOU CAN INCREASE AND DECREASE THE VELOCITY OF OBJECTS. 
//IF I REMEMBER RIGHT, I HAVE TO SETUP A ASYNC FUNCTION FOR THE COLOR CHANGE FUNCTIONALITY.
//DONT FORGET ABOUT THE AWAIT AND EVERYTHING TOO. NEED TO SET IT UP CORRECTLY.