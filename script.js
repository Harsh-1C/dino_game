score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');

setTimeout(() => {
    audio.play();
}, 1000);


document.onkeydown = function(e){
    console.log("Key code is :",e.keyCode);
    if(e.keyCode == 38){ // Up arrow keycode{
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }
    if(e.keyCode == 39){ // forward arrow keycode{
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX + 112) + "px";
        dino.style.transform = 'rotateY(0deg)'
    }
    if(e.keyCode == 37){ // backward arrow keycode{
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
        dino.style.transform = 'rotateY(180deg)'
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy); 

    // console.log(dx,dy);
    // console.log(ox,oy);
    if(offsetX < 73 && offsetY < 52){
        gameOver.style.visibility = 'visible';
        scoreCont.style.visibility = 'hidden';
        obstacle.classList.remove('obstacleAni');
         
        audiogo.play();
        setTimeout(() => {
           audiogo.pause(); 
           audio.pause();
        }, 1000);
        document.getElementById('myscore').innerHTML  = score-1

    }
    else if(offsetX < 145 && cross){
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
           
            aniDur = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
            newDur = aniDur;
            if (newDur > 4) {
                newDur = aniDur - 0.1;
            }
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur);
        }, 500);
       
    }
}, 100);

function updateScore(score){
    document.getElementById('scoreCont').innerHTML = "Your Score: "+score
}




