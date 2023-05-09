/*The following variable is used for mobile game*/
documentWidth = window.screen.availWidth;//width of screen
gridContainerWidth = 0.92 * documentWidth;// the board of main game
cellSideLength =0.18 * documentWidth;//each cell in the board
cellSpace = 0.04*documentWidth;//the space bewtween of each cell

/*This function is used to get the left position cell at index [i][j] */
function getPosTop(i,j){
    return cellSpace+i*(cellSpace+cellSideLength);
}
/*This function is used to get the left position cell at index [i][j] */
function getPosLeft(i,j){
    return cellSpace+j*(cellSpace+cellSideLength);
}

function getNumberBackgroundColor(number) {
    switch (number) {
        case 2: return '#eee4da'; break;
        case 4: return '#EEC591'; break;
        case 8: return '#EEB4B4'; break;
        case 16: return '#EE9572'; break;
        case 32: return '#EE7AE9'; break;
        case 64: return '#EE7942'; break;
        case 128: return '#EE6AA7'; break;
        case 256: return '#EE5C42'; break;
        case 512: return '#EE3A8C'; break;
        case 1024: return '#EE2C2C'; break;
        case 2048: return '#EE0000'; break;
    }

    return 'black';
}

function getNumberColor(num){
    if(num <= 4)
        return "#776e65";
    return "white";
}

function nospace(board){
    for(var i = 0; i < 4; i++)
        for(var j = 0; j < 4; j++){
            if(board[i][j] == 0)//The position is empty
                return true;
        }
    return false;
}

function canMoveLeft(board){
    for(var i = 0; i < 4; i++)
        for(var j = 0; j < 4; j++)
            if(board[i][j] != 0)/**the position has a number */
                if(board[i][j-1] == 0/*the left of position is empty*/||board[i][j-1] == board[i][j]/*same value*/)//then it can go left
                    return true;
    return false;
}

function canMoveRight(board){

}

function canMoveUp(board){

}

function canMoveDown(board){

}

function noBlockHorizontal(row,col1,col2,board){//check there is any block from col1 to col2
    for(var i = col1+1 ; i < col2; i++){
        if(board[row][i]!=0)//there is a block
            return false;
    }
    return true;
}

function noBlockVertical(col,row1,row2,board){
    for(var i = row1+1; i < row2; i++)
        if(board[i][col]!=0)
            return false;
    return true;
}

function nomove(board){
    if(canMoveDown(board)||canMoveLeft(board)||canMoveRight(board)||canMoveUp(board))
        return false;

    return true;
}