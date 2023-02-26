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