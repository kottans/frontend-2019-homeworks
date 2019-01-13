document.addEventListener('DOMContentLoaded', function init(){
  
     const pictures=["img/acdc.png","img/deep.png", "img/metallica.png", "img/pink.png", "img/rolling.png", "img/kiss.png"];
     const cards = document.querySelectorAll('.flip-container');
     let clicks = 0;
     let pair = 0;
    
     mixCards();

     function mixCards() {
        cards.forEach(element=> {
            let place = Math.floor(Math.random() * (pictures.length*2));
            element.style.order = place;
        })
     }
       
    function addActiveClass() {
        this.classList.add('active');
     
        clicks++;

        if(clicks===2){

            setTimeout(function () {
                compareOpenedCards();
            }, 700);
           
        }
    }

    function removeActiveClass() {

       let activeCards = document.querySelectorAll('.active') ;
       activeCards.forEach(element=>element.classList.remove('active'));
       clicks = 0;         
      }
      
      function deleteCards(){
        let sameCards = document.querySelectorAll('.active ') ;
        sameCards.forEach(element=>element.classList.remove('active'));
        sameCards.forEach(element=>element.classList.add('delete'));
        clicks = 0;   
        pair++;

        if(pair===6){
            setTimeout(function () {
                alert("Long live Rock'n'Roll");
            }, 500);
        }
    }

    cards.forEach(element => element.addEventListener('click', addActiveClass));


    function compareOpenedCards() {
          
        let opened = document.querySelectorAll('.active .back_card') ;
        let arrayOpened = Array.from(opened);
        
        if(arrayOpened[0].src === arrayOpened[1].src){
            deleteCards();
        } else {
            removeActiveClass();
        }
    } 
});


    
