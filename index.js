var rs = require('readline-sync');

while (true){
    var startGame = rs.keyInPause(' Press any key to start the game. ')
    var size = 3;
    var myShips = 2;
    var enemyShips = 2;
    let myGrid = createGrid(size);
    let enemyGrid = createGrid(size);
    var abcKey = [
    'a',
    'b',
    'c'
];
for (let i = 0; i <= myShips; i++) {
    var x = getRandomInt(size);
    var y = getRandomInt(size);
    placeCharacter(x, y, '0', myGrid);
    placeCharacter(x, y, '0', enemyGrid);
}
printGrid(enemyGrid, true);
printGrid(myGrid);

while (enemyShips > 0 && myShips > 0) {
    let coordinate = rs.question("Enter a location to strike ie 'A2' ");
    const myCoordinate = coordinate.split('');
     let x = myCoordinate[1] -1;
     let y = abcKey.indexOf(myCoordinate[0]);
    if ( attack(x, y, enemyGrid)) {
        enemyShips --;
    }
    printGrid(enemyGrid, true);
    drawBreak();
    printGrid(myGrid);
    drawBreak();
}
if (rs.keyInYN('Would you like to play again? Y/N')){
    continue;
    }else{break;}
}
// if ( myShips < enemyShips) {
//     console.log('Lose it all!');
// }else{
//     boolYesOrEmpty = readlineSync.keyInYN('You have destroyed all battleships. Would you like to play again? Y/N')
// }

function createGrid(size) {
   let grid = []
    for (let i = 0; i < size; i++) {
        grid[i] = [];
        for (let j = 0; j < size; j++ ) {
            grid[i][j] = '-';
        } 
    }
    return grid;
}
    
function printGrid(grid, isEnemy = false) {
    const headers = createHeaders(grid.length);
    console.log(headers);
    for(let i = 0; i < grid.length; i++) {
        let rowStr = abcKey[i] + ' ';
        for(let cell of grid[i]) {
            if (isEnemy && cell == '0') {
                rowStr += '- ';
            } else {
                rowStr += cell + ' ';
            }
        }
        console.log(rowStr);
    }
}

function createHeaders(size) {
    let result = '  ';
    for (let i = 1; i < size + 1; i++) {
        result += i + ' ';
    }
    return result
}

function placeCharacter( x, y, c, grid) {
    grid[y][x] = c;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function attack(x, y, grid) {
    if (grid[y][x] == '0') {
        grid[y][x] = '!';
        console.log('Hit. You have sunk a battleship. 1 ship remaining.');
        return true  
    }else if (grid[y][x] == '-') {
        grid[y][x] = 'x';
        console.log('You have missed!');
        return false   
    } else {
        console.log('You have already picked this location. Miss!');
        return false 
    }
}

function drawBreak() {
    console.log('---------------');   
}

