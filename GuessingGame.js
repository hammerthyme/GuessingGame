function generateWinningNumber(){
    return Math.floor((Math.random()*100)+1)
}

function shuffle(arr){
    var l = arr.length, i,curr;

    while(l){
        i = Math.floor(Math.random()*l--)
        curr = arr[l]
        arr[l] = arr[i]
        arr[i] = curr
    }
    return arr
}

function Game(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();

}

Game.prototype.difference = function(){
    return Math.abs(this.playersGuess - this.winningNumber)
}

Game.prototype.isLower = function(){
    return this.playersGuess < this.winningNumber
}

Game.prototype.playersGuessSubmission = function(num){
    if(num < 1 || num > 100 || isNaN(num)){
        throw "That is an invalid guess."
    }
    this.playersGuess = num
    return this.checkGuess()
}

Game.prototype.checkGuess = function(){
    
    //check if already guessed
    if(this.pastGuesses.includes(this.playersGuess)) {
        $('#instructions').text('Guess again bitch')
        return 'You have already guessed that number.'
    }

    this.pastGuesses.push(this.playersGuess)
    var numGuesses = this.pastGuesses.length

    function winOrLose(){
        $('#player-input, #submit, #hint').prop('disabled',true)
        $(`.guess li:nth-child(${numGuesses})`).text(this.playersGuess)
    }

    //check guess
    if(this.playersGuess === this.winningNumber){
        winOrLose.call(this)
        $('#instructions').text('You\'re pretty fly for a white guy! Another?')
        return 'You Win!'
    } else if(this.pastGuesses.length > 4){
        winOrLose.call(this)
        $('#instructions').text('Fancy another game? Tap \'Try again\' below.')
        return `You lose, the winning number was....${this.winningNumber}!`
    } else {
        if(this.isLower()){
            $('#instructions').text('Try guessing higher').css('font-weight','bold')
        } else {
            $('#instructions').text('Try guessing lower')
        }
        $(`.guess li:nth-child(${numGuesses})`).text(this.playersGuess)
        if(this.difference() < 10){
            return "Ooooooh SUGAR, you're almost there!"
        } else if(this.difference() < 25){
            return "Not bad, you're getting there!"
        } else if(this.difference() < 50){
            return "I'd be lying if I said you were close."
        } else {
            return "Yeah... you really couldn't be further."
        }
    }
}

function newGame(){
    return new Game;
}

Game.prototype.provideHint = function(){
    var hintArr = [this.winningNumber]
    hintArr.push(generateWinningNumber(),generateWinningNumber())
    shuffle(hintArr)
    return hintArr
}

$(document).ready(function(){ 
    var myGame = newGame();
    console.log('winning number', myGame.winningNumber)
    function submitGuess(){
        var guess = +$('#player-input').val()
        var guessOutput = myGame.playersGuessSubmission(guess)
        $('#player-input').val('')
        $('#title').text(guessOutput)
    }
    $('#submit').on('click',function(){
        submitGuess()
    })
    //allow enter to be used to submit guess
    $('#player-input').on('keypress',function(event){
        if(myGame.pastGuesses.length < 5){
            if(event.which === 13) { 
                submitGuess()
            } 
        }   
    })
    $('#reset').on('click',function(){
        myGame = newGame()
        console.log('winning number', myGame.winningNumber)
        $('#title').text('Here we go again!')
        $('#instructions').text("Don't be shy, guess a number")
        $('#player-input, #submit, #hint').prop('disabled',false)
        $('ul li').text('-')
    })
    $('#hint').click(function(){
        $('#title').text(`Hint: ${myGame.provideHint()}`)
    })
  })

  //TO DO
 /*  Prompt a response when invalid values are entered
  Fix sliding Submit button
  Maybe put a white box behind main content for easier readibility
   */
