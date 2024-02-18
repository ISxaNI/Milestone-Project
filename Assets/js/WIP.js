document.getElementById('Speed').addEventListener('click', function() {
    balls.forEach(ball => {
        ball.dx += 1;
        if(ball.dx < 1) {}
    })
})