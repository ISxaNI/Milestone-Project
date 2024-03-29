//=====================================LET AND CONSTANTS START========================================
const background = document.getElementById('body')
const gamePad = document.getElementById('canvas');
const gpcxt = gamePad.getContext("2d");
const Counter = document.getElementById(ballCount)
const acceleration = 1.25
const deceleration = 0.75

let gravityEnabled = false;
let isTransitioning = false;
let isColorShifting = false;
let hue = 250;
let balls = []
let ball = {
    x: gamePad.width / 2,
    y: gamePad.height - 30,
    dx: 2,
    dy: -2,
    radius: 10
}
//========================================LET AND CONSTANTS END======================================
//============================================FUNCTIONS START========================================
function backgroundRender() {
    background.style.backgroundImage = `url('Assets/Images/BlueBackground.jpg')`;
}

backgroundRender()

function createBall() {
    balls.forEach(ball => {
        gpcxt.beginPath();
        gpcxt.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        gpcxt.fillStyle = ball.color;
        gpcxt.fill();
        gpcxt.closePath();
    });
}

function updateBallCount() {
    const count = balls.length;
    document.getElementById('ballCount').innerText = 'Ball Count: ' + count;
}

function addBallButton() {
    const newBall = {
        color: `hsl(232, 71%, 44%)`,
        x: Math.random() * (gamePad.width - 20) + 10,
        y: Math.random() * (gamePad.height - 20) + 10,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
        radius: 10
    };
    balls.push(newBall);
    updateBallCount();
}

function addMultipleBalls(SpawnAmount) {
    for (let i = 0; i < SpawnAmount; i++) {
        addBallButton()
    }
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

function detectBallCollisions() { //Had Assistance with sources cited in the README to figure out the physics and usage of vector
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
    let overlap = (ball1.radius + ball2.radius) - distance;

    const vecx = dx / distance;
    const vecy = dy / distance;

    const projection1 = ball1.dx * vecx + ball1.dy * vecy;
    const projection2 = ball2.dx * vecx + ball2.dy * vecy;

    const tP1 = projection1;
    const tP2 = projection2;

    ball1.x -= overlap * vecx / 2;
    ball1.y -= overlap * vecy / 2;
    ball2.x += overlap * vecx / 2;
    ball2.y += overlap * vecy / 2;

    ball1.dx += (tP2 - tP1) * vecx;
    ball1.dy += (tP2 - tP1) * vecy;
    ball2.dx += (tP1 - tP2) * vecx;
    ball2.dy += (tP1 - tP2) * vecy;
}

function toggleGravity() {
    gravityEnabled = !gravityEnabled;
}

function applyGravity() {
    if(gravityEnabled) {
        for (let i = 0; i < balls.length; i++) {
            balls[i].dy += 0.37;
        }
    }
}
//================================================FUNCTIONS END======================================
//==========================ASYNC FUNCTIONS, REPEATING LOOPS AND TOGGLES START ======================

async function colorShiftToggle() {
    if (isTransitioning) return;

    isColorShifting = !isColorShifting;

    if (isColorShifting) {
        const toggleButton = document.getElementById('Color');

        while (isColorShifting) {
            balls.forEach(ball => {
                ball.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, 255)`;
            });

            toggleButton.style.backgroundColor = 'transparent';
            toggleButton.style.backgroundImage = `url('Assets/Images/Blue-spasm.gif')`;
            toggleButton.style.backgroundPosition = 'center';
            toggleButton.style.backgroundRepeat = 'no-repeat';
            toggleButton.style.backgroundSize = 'cover';

            await new Promise(resolve => setTimeout(resolve, 50));
        }
        if (!isColorShifting) {
            toggleButton.style.backgroundImage = ``;
            toggleButton.style.backgroundColor = ``;
            balls.forEach(ball => {
                ball.color = `hsl(232, 71%, 44%)`;
            });
        }
    }
}

async function transition() {
    if (isColorShifting) return;

    isTransitioning = !isTransitioning;

    if (isTransitioning) {
        const transitionButton = document.getElementById('Rainbow');
        const bodyTransition = document.getElementById('body')
        const countNumber = document.getElementById('ballCount')

        while (isTransitioning) {
            hue += 1;

            balls.forEach(ball => {
                ball.color = `hsl(${hue}, 100%, 50%)`;
            });
            transitionButton.style.backgroundColor = 'transparent';
            transitionButton.style.backgroundImage = `url('Assets/Images/RainbowSpiral.gif')`;
            transitionButton.style.backgroundPosition = 'center';
            transitionButton.style.backgroundRepeat = 'no-repeat';
            transitionButton.style.backgroundSize = 'cover'; 
            bodyTransition.style.backgroundColor = 'transparent';
            bodyTransition.style.backgroundImage = `url('Assets/Images/razer_rainbow_spectrum_background-wallpaper-3840x2160.jpg')`;
            bodyTransition.style.backgroundSize = 'cover';
            countNumber.style.color = `hsl(${hue}, 100%, 50%)`;

            await new Promise(resolve => setTimeout(resolve, 5));
        }
        if (!isTransitioning) {
            transitionButton.style.backgroundImage = '';
            transitionButton.style.backgroundColor = '';
            bodyTransition.style.backgroundImage = `url('Assets/Images/BlueBackground.jpg')`;
            bodyTransition.style.backgroundSize = '';
            countNumber.style.color = '';
            balls.forEach(ball => {
                ball.color = `hsl(232, 71%, 44%)`;
            });
        }
    }
}

//===========================ASYNC FUNCTIONS, REPEATING LOOPS AND TOGGLES END========================
//=========================EVENTS, CLICK FUNCTIONS, KEYDOWN FUNCTIONS, ETC START=====================

document.getElementById('Sizeup').addEventListener('click', function () {
    balls.forEach(ball => {
        ball.radius *= 1.2;
    })
});

document.getElementById('Sizedown').addEventListener('click', function () {
    balls.forEach(ball => {
        ball.radius *= 0.85;
        if (ball.radius <= 2) {
            ball.radius = 2
        }
    })
});

document.getElementById('Add').addEventListener('click', addBallButton);

document.getElementById('SpawnCustom').addEventListener('click', function () {
    const SpawnAmountInput = document.getElementById('SpawnAmount');
    const SpawnAmount = parseInt(SpawnAmountInput.value);

    addMultipleBalls(SpawnAmount)
})

document.getElementById('Speedup').addEventListener('click', function () {
    balls.forEach(ball => {
        ball.dx *= acceleration;
        ball.dy *= acceleration;
    })
})

document.getElementById('Speeddown').addEventListener('click', function () {
    balls.forEach(ball => {
        ball.dx *= deceleration;
        ball.dy *= deceleration;
    })
})

document.getElementById('Clear').addEventListener('click', function () {
    gpcxt.clearRect(0, 0, gamePad.width, gamePad.height)
    balls = [];
    updateBallCount();
})
//======================================================KEYSTROKE EVENTS=============================
document.addEventListener('keydown', function (event) {
    if (event.key === "Space" || event.code === "space") {
        addBallButton()
    }
})

document.addEventListener('keydown', function (event) {
    if (event.key === "ArrowUp" || event.code === "ArrowUp") {
        balls.forEach(ball => {
            ball.radius *= 1.2;
        })
    }
})

document.addEventListener('keydown', function (event) {
    if (event.key === "ArrowDown" || event.code === "ArrowDown") {
        balls.forEach(ball => {
            ball.radius *= 0.85;
            if (ball.radius <= 2) {
                ball.radius = 2
            }
        })
    }
})

document.addEventListener('keydown', function (event) {
    if (event.key === "Enter" || event.code === "Enter") {
        const SpawnAmountInput = document.getElementById('SpawnAmount');
    const SpawnAmount = parseInt(SpawnAmountInput.value);

    addMultipleBalls(SpawnAmount)
    }
})

document.addEventListener('keydown', function (event) {
    if (event.key === "Delete" || event.code === "Delete") {
        gpcxt.clearRect(0, 0, gamePad.width, gamePad.height)

        balls = [];
        updateBallCount();
    }
})

document.addEventListener('keydown', function (event) {
    if (event.key === "ArrowLeft" || event.code === "ArrowLeft") {
        balls.forEach(ball => {
            ball.dx *= deceleration;
            ball.dy *= deceleration;
        })
    }
})

document.addEventListener('keydown', function (event) {
    if (event.key === "ArrowRight" || event.code === "ArrowRight") {
        balls.forEach(ball => {
            ball.dx *= acceleration;
            ball.dy *= acceleration;
        })
    }
})

document.addEventListener('keydown', function(event) {
    if (event.key === "g" || event.code === "G") {
        toggleGravity()
    }
})
//======================================================KEYSTROKE EVENTS=============================
document.getElementById('Color').addEventListener('click', colorShiftToggle);

document.getElementById('Rainbow').addEventListener('click', transition)
//=========================EVENTS, CLICK FUNCTIONS, KEYDOWN FUNCTIONS, ETC END=======================
//=================================FINAL FUNCTION FOR LOADING THE GAME===============================
function toss() {
    gpcxt.clearRect(0, 0, gamePad.width, gamePad.height);
    createBall();
    applyGravity();
    updateBallPosition();
    detectBallCollisions();
    detectCollisions();
    requestAnimationFrame(toss);
}

toss()

//NEXT UP ON THE LIST OF WHAT TO DO:
//MAKE A WAY TO HAVE AN ACTIVE COUNT OF HOW MANY BALLS ARE ON THE SCREEN