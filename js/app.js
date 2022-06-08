$(function() {
    
    function play() {

        //define variables
        const popUp = $("#popUp");
        const popUpLose = $("#popUpLose");
        const moves = $(".moves");
        const again = $(".again");
        const deck = $(".deck");
        const restart = $(".restart");
        const starOne = $("#starOne");
        const starTwo = $("#starTwo");
        const starThree = $("#starThree");
        const popStar = $("#popStar");
        const starThreePop = $("#starrr");
        const starTwoPop = $("#starr");
        const starOnePop = $("#star");
        const seconds = $("#seconds");
        const second = $("#second");
        const minutes = $("#minutes");
        const minute = $("#minute");
        const diamond = '<i class="fa fa-diamond"></i>';
        const plane = '<i class="fa fa-paper-plane-o"></i>';
        const anchor = '<i class="fa fa-anchor"></i>';
        const bolt = '<i class="fa fa-bolt"></i>';
        const cube = '<i class="fa fa-cube"></i>';
        const leaf = '<i class="fa fa-leaf"></i>';
        const bicycle = '<i class="fa fa-bicycle"></i>';
        const bomb = '<i class="fa fa-bomb"></i>';
        let cards = [diamond, plane, anchor, bolt, cube, leaf, bicycle, bomb, diamond, plane, anchor, bolt, cube, leaf, bicycle, bomb];
        let openCards = [];
        let count = 0;
        let finish = 0;



        //shuffle the list of cards using the provided "shuffle" method below
        shuffle(cards);

        // Shuffle function from http://stackoverflow.com/a/2450976
        function shuffle(array) {
            let currentIndex = array.length,
                temporaryValue, randomIndex;
            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }

        //loop through each card and create its HTML
        for (let card of cards) {
            adding(card, cards.indexOf(card));
        }

        //add each card's HTML to the page
        function adding(card, id) {
            deck.append(`<li id=${id}  class="card open show noClick">
	          ${card}    </li>`);
        }    

        const card = $(".card");
	    //lock cards temporary
        function lock(){
             card.toggleClass("noClick");
             setTimeout(function() {
             card.toggleClass("noClick");
              }, 500);
        }  
    

         //start the timer
        //countup function from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript (modified version)
       
        let sec = -9;
        function pad(val) {
            return val > 9 ? val : "0" + val;
        }
         let timer = setInterval(function() {
            seconds.html(pad(++sec % 60));
            second.html(pad(++sec % 60));
            minutes.html(pad(parseInt(sec / 60, 10)));
            minute.html(pad(parseInt(sec / 60, 10)));
         
         }, 2000);
              //hide cards after 10 seconds
        setTimeout(function() {
        display(card);
        minutes.toggleClass("hide");
        seconds.toggleClass("hide");
 //End of function

        }, 10000);

        //Switch the cards functions
        function display(a) {
            $(a).toggleClass("open show noClick");
        }

        //set up the event listener for a card. If a card is clicked
        card.click(function() {
            $(this).toggleClass("open show noClick");
            //add the card to a *list* of "open" cards 
            openCards.push(this);

            //if the list already has another card
            if (openCards.length === 2) {
                check(openCards[0], openCards[1]);
				lock();
            }
        })

        // check to see if the two cards match
        function check(x, y) {

            //display counter on the page
            counter();

            //comparing two cards by they id (may find a better way later)
            if ($(x).attr("id") == $(y).attr("id")) {
                match(x, y);
            } else {

                //hide the card's symbol,if the cards do not match, remove the cards from the list
                setTimeout(function() {
                	//animate
                    animate(x);
                    animate(y);

                    //hide cards
                    display(x);
                    display(y);

                    //make opencards empty
                    openCards = [];
                }, 500);
            }
        }

        //if the cards do match, lock the cards in the open position
        function match(x, y) {
            $(x).toggleClass("match open show ");
            $(y).toggleClass("match open show ");

            //reset opencards list
            openCards = [];

            //if all cards have matched increase the counter,and check complete
            finish++;

             // display a message with the final score 
            if (finish === 8) {
                setTimeout(function() {
            //stop the timer
             clearInterval(timer);
            //show popUp
            popUp.modal('show');

                }, 300);
            }
        }

        //increment the move counter
        function counter() {
            //change the moves
            count++;
            moves.html(count);

            // 12 moves 3star
            if (count === 12) {
                star(starThree, starThreePop);
            }

            // 15 moves 2star
            else if (count === 15) {
                star(starTwo, starTwoPop);
            }

            // 18 moves 1star
            else if (count === 18) {
                star(starOne, starOnePop);
            }

           // 20 moves you lose
            else if (count === 20) {
            clearInterval(timer);
            //show popUp
            popUpLose.modal('show'); 
            }
        }

        //set up stars colors
        function removeo(a) {
            $(a).removeClass("star");
        }

        function addo(a, b) {
            $(a).addClass("star");
            $(b).addClass("star");
        }

        function star(star, pop) {
            removeo(star);
            removeo(pop);
        }

        //set up restart button
        function reset() {
            //remove cards from game
        minutes.toggleClass("hide");
        seconds.toggleClass("hide");
            $(".deck").empty();
              clearInterval(timer);        
             //reset num of moves
            count = 0;
            moves.html(count);
            //reset stars
            addo(starThree, starThreePop);
            addo(starTwo, starTwoPop);
            addo(starOne, starOnePop);
            //restart the game
            play();
        }

        //restart event
        restart.click(function() {
            reset();
              //stop the timer
        });

        //play again event
        again.click(function() {
            reset();
        });
     
          //animate using animate.css
        function animate(x){
        $(x).addClass('animated shake');
        //retoggle after 4 second
        setTimeout(function() {
        $(x).removeClass('animated shake');
        }, 400);
        }

    } // end of play func

    play(); //start the game
})