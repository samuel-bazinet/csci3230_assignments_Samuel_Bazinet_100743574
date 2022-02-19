let gameBoard = new Array(9);
for (let i = 0; i < 9; i++) {
    gameBoard[i] = new Array(9);
    
    for (let j = 0; j < 9; j++) {
        gameBoard[i][j] = -1;
        //gameBoard[i][j] = ((j+Math.floor(i/3)%3) + ((i)%3)*3)%9+1;
        //gameBoard[i][j]=(i+j)%9+1;
    }
    
}

const undoStack = [];
current = -1;

/*
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        console.log("GameBoard[" + i + "][" + j + "] = " + gameBoard[i][j]);
    }
}
*/

$(document).ready(function() {
    //console.log("Hello");
    //buildBoard(gameBoard, 30);
    buildBoardTest(gameBoard);
    undoStack.push(JSON.parse(JSON.stringify(gameBoard)));

    setBoard(gameBoard);
    
    $("#pallete td").click(function() {
        current = parseInt($(this).text());
        if (isNaN(current)) {
            console.log("Undo")
            undoStack.pop();
            gameBoard = undoStack.pop();
            undoStack.push(JSON.parse(JSON.stringify(gameBoard)));
            setBoard(gameBoard);
        } else {
            console.log(current);
        }

    });

    $("#board td").click(function() {
        if ($(this).text() == "" ) {
            $(this).text(current);
            console.log($(this).attr('id'));
            let x = parseInt($(this).attr('id')[1])
            let y = parseInt($(this).attr('id')[2])
            gameBoard[x][y] = current;
            checkBoard(gameBoard);
            undoStack.push(JSON.parse(JSON.stringify(gameBoard)));
        }
    })

});

function setBoard(board) {
    console.log("Board is being set");
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let cellIndex = "#c"+i.toString()+(j).toString();
            if (board[i][j] == -1) {
                $(cellIndex).text("");
                continue;
            }
            
            //console.log(cellIndex);
            $(cellIndex).text(board[i][j]);
            $(cellIndex).text();
            
        }
    }
    clearAllErrors();
    checkBoard(gameBoard);
}

function resetBoard(board) {
    for (let i = 0; i < 9; i++) {      
        for (let j = 0; j < 9; j++) {
            board[i][j] = -1;
        }
        
    }
}

function buildBoard(board, numberOfPrefilled) {
    do {
        resetBoard(board);
        for (let i = 0; i < numberOfPrefilled; i++) {
            x = Math.floor(Math.random()*9);
            y = Math.floor(Math.random()*9);
            number = Math.floor(Math.random()*9+1);

            //console.log(number);
            board[x][y] = number;
        }
        //console.log(checkBoard(board));
    } while (!checkBoard(board));
    clearAllErrors();
}

function buildBoardTest(board) {
    board[0][1] = 1;
    board[0][7] = 9;
    board[1][2] = 4;
    board[1][6] = 2;
    board[2][2] = 8;
    board[2][5] = 5;
    board[3][7] = 3;
    board[4][0] = 2;
    board[4][4] = 4;
    board[4][6] = 1;
    board[6][2] = 1;
    board[6][3] = 8;
    board[6][6] = 6;
    board[7][1] = 3;
    board[7][7] = 8;
    board[8][2] = 6;

}

function clearAllErrors() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            $("#c" + i.toString() + j.toString()).removeClass("error");
        }
    }
    console.log("Cleared all errors!");
}

function setRowAsError(rowNumber) {
    for (let j = 0; j < 9; j++) {
        $("#c"+ rowNumber.toString()+j.toString()).addClass("error");
    }
}

function setColAsError(colNumber) {
    for (let i = 0; i < 9; i++) {
        $("#c"+ i.toString()+colNumber.toString()).addClass("error");
    }
}

function setSquareAsError(startX, startY) {
    for (let i = startX; i < startX+3; i++) {
        for (let j = startY; j < startY+3; j++) {
            $("#c"+ i.toString()+j.toString()).addClass("error");
        }
    }
}

function checkRow(board, rowNumber) {
    const checkMap = new Map();
    for (let j = 0; j < 9; j++) {
        if (checkMap.has(board[rowNumber][j]) && board[rowNumber][j] != -1) {
            console.log("Row "+ rowNumber + " has an error");
            return false;
        } else {
            checkMap.set(board[rowNumber][j], 1);
        }
    }
    return true;
}

function checkCol(board, colNumber) {
    const checkMap = new Map();
    for (let i = 0; i < 9; i++) {
        if (checkMap.has(board[i][colNumber]) && board[i][colNumber] != -1) {
            console.log("Col "+ colNumber + " has an error");
            return false;
        } else {
            checkMap.set(board[i][colNumber], 1);
        }
    }
    return true;
}

function checkSquare(board, startX, startY) {
    const checkMap = new Map();
    for (let i = startX; i < startX+3; i++) {
        for (let j = startY; j < startY+3; j++) {
            if (checkMap.has(board[i][j]) && board[i][j] != -1) {
                console.log("Square ("+ (startX/3) + ", " + (startY/3) +  ") has an error");
                return false;
            } else {
                checkMap.set(board[i][j]);
            }
        }
    }
    return true;
}

function checkBoard(board) {
    masterFlag = true;
    flag = true;
    for (let i = 0; i < 9; i++) {
        flag = checkRow(board, i);
        if (flag == false) {
            setRowAsError(i);
            masterFlag = false;
            //console.log("Master has been set to " + masterFlag);
        }
        flag = checkCol(board, i);
        if (flag == false) {
            setColAsError(i);
            masterFlag = false;
            //console.log("Master has been set to " + masterFlag);
        }
    }
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            flag = checkSquare(board, i, j);
            if (flag == false) {
                setSquareAsError(i, j);
                masterFlag = false;
                //console.log("Master has been set to " + masterFlag);
            }
        }
    }
    return masterFlag;
} 