var board = new Array();
var score = 0;

var hasConflicted = new Array();

$(document).ready(function(){
    newgame()
})

function newgame(){
    //Initialize
    init();

    //generate two num from random cells
    generateOneNumber();//this function will generate a new number for game
    generateOneNumber();
}

function init(){
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }
    }

    for(var i = 0; i < 4; i++){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for(var j = 0; i < 4; j++)
        board[i][j] = 0;
        hasConflicted[i][j] = false;//make the merge operation only happened once
    }

    updateBoard();

    score = 0;
}

function updateBoard(){
    $(".number-cell").remove();

    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);

            if(board[i][j] == 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j)+50);
                theNumberCell.css('left',getPosLeft(i,j)+50);
            }else{
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('backgroud-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
            }

            hasConflicted[i][j] = false;
        }
    }
}

function generateOneNumber(){
    if(nospace(board))
        return false;
    

    //random position
    var randx = parseInt(Math.floofr(Math.random() *4));//create 0 - 4 integer
    var randy = parseInt(Math.floor(Math.random() *4));//create 0 - 4 integer

    var times = 0;//optimized the random position

    //case: if there exist a number at this position
    while(times < 50){
        if(board[randx][randy == 0])
            break;
        
        randx = parseInt(Math.floor(Math.random() *4));
        randy = parseInt(Math.floor(Math.random() *4));

        times++;
    }

    if(times == 50){
        for(var i = 0; i < 4; i++)    
            for(var j = 0; j < 4; j++)
                if(board[i][j] == 0){
                    randx = i;
                    randy = j;
                }
    }

    //random number
    //because random() only create 0 or 1 so we judge whether it greater than 0.5, which will create 2 or 4 if it is 0 or 1;
    var randNum = Math.random() < 0.5? 2:4;


    //random number at random position
    board[randx][randy] = randNum;

    showNumberAnimation(randx,randy,randNum);

    return true;
}

$(document).keydown(function(event){
    switch(event.keyCode){
        case 37: //left
            if(moveLeft()){//if we can move left,then we generate one more number
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);//check whether game is over?
            }
            break;
        case 38: //up
        if(moveUp()){//if we can move up,then we generate one more number
            setTimeout("generateOneNumber()",210);
            setTimeout("isGameOver()",300);//check whether game is over?
        }
            break;
        case 39:  //right
        if(moveRight()){//if we can move right,then we generate one more number
            setTimeout("generateOneNumber()",210);
            setTimeout("isGameOver()",300);//check whether game is over?
        }
            break;
        case 40:  //down
        if(moveDown()){//if we can move down,then we generate one more number
            setTimeout("generateOneNumber()",210);
            setTimeout("isGameOver()",300);//check whether game is over?
        }
            break;
        default:
            break;
    }
})

function isGameOver() {
    if(nospace(board) && nomove(board)){
        gameOver();
    }
}

function gameOver(){
    alert("Game over!");
}

function moveLeft(){
    if(!canMoveLeft(board))
    //judge whether we can move left:(we need to check whether there is a barrier)
    /**case 1: The left doesn't have number
     * case 2: The left number is same as the number itself, then it can be merged
     */
        return false;
    for(var i = 0; i < 4; i++)
        for(var j = 0; j < 4; j++){
            if(board[i][j]!=0){
                for(var k = 0; k < j; k++){
                    if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
                        //move and the original destination is empty
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][j]){//it haven't process merge operation
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add two number
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score+=board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;

                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoard()",200);//update board because we only change the value from above
    //wait 200ms

    return true;
}

function moveRight(){
    
}

function moveUp(){
    
}

function moveDown(){
    
}
