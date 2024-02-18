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
        color: `rgb( ${Math.random() * 255}, ${Math.random() * 255}, 255)`,
        x: Math.random() * (gamePad.width - 20) + 10,
        y: Math.random() * (gamePad.height - 20) + 10,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
        radius: 10
    };
    balls.push(newBall);
});

document.getElementById('Speedup').addEventListener('click', function() {
    balls.forEach(ball => {
        ball.dx += 1;
        if(ball.dx <=  -1) {
            ball.dx -= 1
        }
        ball.dy += 1;
        if(ball.dy <= -1) {
            ball.dy -= 1
        }
    })
})

document.getElementById('Speeddown').addEventListener('click', function() {
    balls.forEach(ball => {
        ball.dx -= 1;
        if(-1 <= ball.dx >= 1 ) {
            ball.dx = 0;
        }
        if(ball.dx <= -1) {
            ball.dx += 1
        }
        ball.dy -= 1;
        if(-1 <= ball.dy >= 1) {
            ball.dy = 0;
        }
        if(ball.dy <= -1) {
            ball.dy += 1
        }
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

//SETUP PROPER OPERATION USE OF  SPEED.
//SETTING SPEED SO YOU CAN INCREASE AND DECREASE THE VELOCITY OF OBJECTS. 

//DONT FORGET ABOUT THE AWAIT AND EVERYTHING TOO. NEED TO SET IT UP CORRECTLY.