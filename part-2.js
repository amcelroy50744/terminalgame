var rs = require('readline-sync');
const carrier = 5;
const battleship = 4;
const cruiser = 3;
const submarine = 3;
const destroyer = 2;
let enemyLocations = {};


while (true){
    var startGame = rs.keyInPause(' Press any key to start the game. ')
    var size = 10;
    var myShips = 17;
    var enemyShips = 17;
    var myGrid = createGrid(size);
    var enemyGrid = createGrid(size);
    var direction;
    var abcKey = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j'
];
 for (let i = 0; i < 1; i++) {
    var x = getRandomInt(size);
    var y = getRandomInt(size);

   placeShip(x, y, "r", myGrid, carrier, direction);
   placeShip(x, y, "b", myGrid, battleship, direction);
   placeShip(x, y, "c", myGrid, cruiser, direction);
   placeShip(x, y, "s", myGrid, submarine, direction);
   placeShip(x, y, "d", myGrid, destroyer, direction);
   
   placeShip(x, y, "0", enemyGrid, carrier, direction);
   placeShip(x, y, "0", enemyGrid, battleship, direction);
   placeShip(x, y, "0", enemyGrid, cruiser, direction);
   placeShip(x, y, "0", enemyGrid, submarine, direction);
   placeShip(x, y, "0", enemyGrid, destroyer, direction);
   

} 
printGrid(enemyGrid);
printGrid(myGrid);


while (enemyShips > 0 && myShips > 0) {
    let coordinate = rs.question("Enter a location to strike ie 'A2' ");
    const myCoordinate = coordinate.split('');
    if(myCoordinate.length === 3){
     var x = 9;
     var y = abcKey.indexOf(myCoordinate[0]);}
     else{
        var x = myCoordinate[1] -1;
        var y = abcKey.indexOf(myCoordinate[0]);}
     
    if ( attack(x, y, enemyGrid)) {
        enemyShips --;
    }
    printGrid(enemyGrid);
    drawBreak();
    printGrid(myGrid);
    drawBreak();
}
if (rs.keyInYN('Would you like to play again? Y/N')){
    continue;
    }else{break;}
}

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
            if (isEnemy && cell == 'S') {
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

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function attack(x, y, grid) {
    if (grid[y][x] == 'S') {
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
    console.log('-----------------------------------------------------');   
}

function placeShip(x, y, c, grid, ship, direction) {
         x = getRandomInt(size);
         y = getRandomInt(size);
        direction = getRandomInt(4);
         if( y + ship < grid.length
             || x + ship < grid.length
             ||y - ship > 0
             || x - ship > 0){
         for (let index = 0; index < ship; index++){
         if (direction === 1) {
            for (let i = 0; i < ship; i++){
                grid[y][x + i] = c;
            }
          }else if ( direction === 2) {
            for (let i = 0; i < ship; i++) {
                grid[y][x - i ] = c; 
            }
          }else if ( direction === 3) {
            for (let i = 0; i < ship; i++) {
                grid[y + 1 ][x] = c; 
            }
          }else if (direction === 4){
            for (let i = 0; i < ship; i++){
                grid[y - 1][x] = c;
            }
          }
        }
}else{ return placeShip(x, y, c, grid, ship, direction)}
}


