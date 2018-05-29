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
    if(this.playersGuess === this.winningNumber){
        return 'You Win!'
    } else if(this.pastGuesses.includes(this.playersGuess)) {
        return 'You have already guessed that number.'
    }
    this.pastGuesses.push(this.playersGuess)
    if(this.pastGuesses.length >= 5){
        return 'You Lose.'
    }
    if(this.difference() < 10){
        return "You\'re burning up!"
    } else if(this.difference() < 25){
        return "You\'re lukewarm."
    } else if(this.difference() < 50){
        return "You\'re a bit chilly."
    } else {
        return "You\'re ice cold!"
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
        $('#player-input').val('')
        var guessOutput = myGame.playersGuessSubmission(guess)
        $('#title').text(guessOutput)
        var numGuesses = myGame.pastGuesses.length
        

        function winOrLose(){
            $('#player-input, #submit,#hint').prop('disabled',true)
        }

        if(guessOutput.includes('number')){
            $('#instructions').text('Guess again bitch')
        } else if(guessOutput.includes('Win')){
            winOrLose()
            $(`.guess li:nth-child(${numGuesses + 1})`).text(guess)
            $('#instructions').text('You\'re pretty fly for a white guy! Another?')
        } else if(guessOutput.includes('You\'re')){
            $(`.guess li:nth-child(${numGuesses})`).text(guess)
            if(myGame.isLower()){
                $('#instructions').text('Guess higher bitch')
            } else {
                $('#instructions').text('Guess lower bitch')
            }
        } else if(guessOutput.includes('Lose')){
            winOrLose()
            $(`.guess li:nth-child(${numGuesses})`).text(guess)
            $('#instructions').text('Fancy another game, Charles?')
        }
    }
    $('#submit').on('click',function(){
        submitGuess()
    })

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
