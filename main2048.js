var board = new Array();
var score = 0;

$(document).ready(function(){
    newgame()
})

function newgame(){
    //Initialize
    init()

    //generate two num from random cells

}

function init(){
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            var gridCell = $("#grid-cell-"+"i"+"-"+j);
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }
    }
}