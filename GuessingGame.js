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
    if(this.pastGuesses.length > 4){
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
