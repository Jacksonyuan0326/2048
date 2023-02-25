var board = new Array();
var score = 0;

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
            var gridCell = $('#grid-cell-'+ i + '-' + j);
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }
    }

    for(var i = 0; i < 4; i++){
        board[i] = new Array();
        for(var j = 0; i < 4; j++)
        board[i][j] = 0;
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
        }
    }
}

function generateOneNumber(){
    if(nospace(board))
        return false;
    return true;

    //random position

    //random number

    //random number at random position
}