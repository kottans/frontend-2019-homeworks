var cards = document.querySelectorAll('.card');

let firstGuessCard, secondGuessCard, startTime, endTime, gameTime;
let activeCard = false;
let lockAttempt = false;
let gameResult = 0;
let gamePairs = 6;

function flip() {

  this.firstElementChild.style.transform = 'rotateY(180deg)';
  if (this === firstGuessCard) return;
  if (lockAttempt) return;
  this.classList.add('flip');


  if (!activeCard) {
    activeCard = true;
    firstGuessCard = this;
 
  }
  else{
    lockAttempt = true;
    activeCard = false;
    secondGuessCard = this;
    match();
    
  }

}

function match(){

  if(firstGuessCard.firstElementChild.src === secondGuessCard.firstElementChild.src){
      firstGuessCard.removeEventListener('click', flip);
      secondGuessCard.removeEventListener('click', flip);
    
      setTimeout(()=>{
        firstGuessCard.classList.add('hidden');
        secondGuessCard.classList.add('hidden');
        resetVariables();
      }, 500);

      gameResult++;

      if(gameResult === gamePairs){
        endTime = new Date().getTime();
        gameTime = ( ( endTime - startTime )/1000).toFixed(1);
        if(gameTime > 10){
          alert(` Your result is ${gameTime} seconds. It was close but I know you can do more, just keep going! `);
        }
        else{
          alert(`Congratulation!!! Your result is ${gameTime} seconds. That was hard but you've made it. You made the first step to become Kottan`);
        }
        
        location.reload();
      } 
  }

  else{

    setTimeout( ()=>{
      lockAttempt = false;
      firstGuessCard.classList.remove('flip');
      secondGuessCard.classList.remove('flip');
      resetVariables();
    }, 1000);
  }
}

function resetVariables() {
  activeCard = false;
  lockAttempt = false;
  firstGuessCard = null;
  secondGuessCard = null; 
}

function shuffleCards(){
  alert('If you think you are Kottan  then you have 10 seconds to complete this game');

	for(let i = 0; i<cards.length;i++){
     let ramdomPos = Math.floor(Math.random() * 12);
     cards[i].style.order = ramdomPos;
     cards[i].lastElementChild.style.opacity = '0';

  }

  setTimeout( function(){
    for(let i = 0; i < cards.length; i++){
      cards[i].lastElementChild.style.opacity = null;
      cards[i].addEventListener('click', flip);
    }
    
  startTime = new Date().getTime();
   
  }, 3000 )

} 

 window.onload = shuffleCards;


