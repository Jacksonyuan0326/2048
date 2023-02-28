function showNumberAnimation(randx,randy,randNum){
    var numCell = $('#number-cell-' + i + "-" + j);

    numCell.css('background-color',getNumberBackgroundColor(randNum));
    numCell.css('color',getNumberColor(randNum));
    numCell.text(randNum);

    numCell.animate({
        width:"100px",
        height:"100px",
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
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
    $('#score'.text(score));//可以增加像老虎机一样的分数增长动画
}