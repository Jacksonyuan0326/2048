var board = new Array();
var score = 0;

var hasConflicted = new Array();

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function(){
    prepareMobile();
    newgame();
})

function prepareMobile(){
    /* We justify about screen width and adjust it for website*/
    if (documentWidth > 500) {
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }
    $('#grid-container').css('width', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('height', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('padding', cellSpace);
    $('#grid-container').css('border-radius', 0.02 * gridContainerWidth);

    $('.grid-cell').css('width', cellSideLength);
    $('.grid-cell').css('height', cellSideLength);
    $('.grid-cell').css('border-radius', 0.02 * cellSideLength);
}

function newgame(){
    //Initialize
    $('#score').text(0);
    init();

    //generate two num from random cells
    generateOneNumber();//this function will generate a new number for game
    generateOneNumber();
}

function init(){
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
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
                theNumberCell.css('top',getPosTop(i,j)+cellSideLength/2);
                theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
            }else{
                theNumberCell.css('width', cellSideLength);
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('backgroud-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }

            hasConflicted[i][j] = false;
        }
    }
    $('.number-cell').css('line-height',cellSideLength+'px');
    $('.number-cell').css('font-size', 0.6 * cellSideLength + 'px');
}

function generateOneNumber(){
    if(nospace(board))
        return false;
    

    //random position
    var randx = parseInt(Math.floofr(Math.random() *4));//create 0 - 4 integer
    var randy = parseInt(Math.floor(Math.random() *4));//create 0 - 4 integer

    var times = 0;//optimized the random position

    //case: if there exist a number at this position
    while(times < 25){
        if(board[randx][randy == 0])
            break;
        
        randx = parseInt(Math.floor(Math.random() *4));
        randy = parseInt(Math.floor(Math.random() *4));

        times++;
    }

    if(times == 25){
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
        event.preventDefault();
            if(moveLeft()){//if we can move left,then we generate one more number
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);//check whether game is over?
            }
            break;
        case 38: //up
        event.preventDefault();
        if(moveUp()){//if we can move up,then we generate one more number
            setTimeout("generateOneNumber()",210);
            setTimeout("isGameOver()",300);//check whether game is over?
        }
            break;
        case 39:  //right
        event.preventDefault();
        if(moveRight()){//if we can move right,then we generate one more number
            setTimeout("generateOneNumber()",210);
            setTimeout("isGameOver()",300);//check whether game is over?
        }
            break;
        case 40:  //down
        event.preventDefault();
        if(moveDown()){//if we can move down,then we generate one more number
            setTimeout("generateOneNumber()",210);
            setTimeout("isGameOver()",300);//check whether game is over?
        }
            break;
        default:
            break;
    }
})

document.addEventListener('touchstart', function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;

}); //add eventListner for mobile

document.addEventListener('touchmove',function(event){event.preventDefault();});

/*Because we only have four direction and only work for one finger, so we have a vector that (endx - startx, endy - starty)*/
/*IF (endx - startx) > 0, we move at x-axis and left, 
     (endx - startx) < 0, we move at x-axis and right,
     (endy - starty) < 0, we move at y-axis and up,
     (endy - starty) > 0, we move at y-axis and down,   */
document.addEventListener('touchend', function(event){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var changex = endx - startx;
    var changey = endy - starty;

    /*Add condition to avoid the operation after one click with board or new game, in other words, prevent accidental touching*/
    if(Math.abs(changex) < 0.3*documentWidth && Math.abs(changey) < 0.3*documentWidth)
    {
        return;
    }

    //move at x-axis
    if(Math.abs(changex) >= Math.abs(changey)){
        if(changex > 0){
            //move right
            if (moveRight()) {
                setTimeout('generateOneNumber()', 210);
                setTimeout('isgameover()', 300);
            }
        }
        else{
            //move left
            if (moveLeft()) {
                setTimeout('generateOneNumber()', 210);
                setTimeout('isgameover()', 300);
            }
        }
    }else{/*Move at y-axis */
        if(changey > 0){
            //move down
            if (moveDown()) {
                setTimeout('generateOneNumber()', 210);
                setTimeout('isgameover()', 300);
            }
        }
        else{
            //move up
            if (moveUp()) {
                setTimeout('generateOneNumber()', 210);
                setTimeout('isgameover()', 300);
            }
        }
    }
}); 


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
    if (!canMoveRight(board))
    return false;

    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                        // move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)) {
                        // move
                        showMoveAnimation(i, j, i, k);
                        // add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;

                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoadrView()", 200);
    return true;
}


function moveUp(){
    if (!canMoveUp(board))
        return false;

    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) {
                        // move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board)) {
                        // move
                        showMoveAnimation(i, j, k, j);
                        // add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;

                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoadrView()", 200);
    return true;
}

function moveDown(){
    if (!canMoveDown(board))
        return false;

    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
                        // move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board)) {
                        // move
                        showMoveAnimation(i, j, k, j);
                        // add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;

                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoadrView()", 200);
    return true;
}
