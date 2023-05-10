function showNumberAnimation(randx,randy,randNum){
    var numCell = $('#number-cell-' + randx + '-' + randy);

    numCell.css('background-color',getNumberBackgroundColor(randNum));
    numCell.css('color',getNumberColor(randNum));
    numCell.text(randNum);

    numCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getPosTop(randx,randy),
        left:getPosLeft(randx,randy)
    },50);
}

function showMoveAnimation(fromx,fromy,tox,toy){
    var numCell = $('#number-cell-'+fromx+'-'+fromy);
    numCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200)
}

function updateScore(score){
    $('#score'.text(score));//show animation of score updating
}