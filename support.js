/*This function is used to get the left position cell at index [i][j] */
function getPosTop(i,j){
    return 20+i*120;
}
/*This function is used to get the left position cell at index [i][j] */
function getPosLeft(i,j){
    return 20+j*120;
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
            if(board[i][j] == 0)
                return true;
        }
    return false;
}