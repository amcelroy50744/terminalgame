var rs = require('readline-sync');
while (true){
    var startGame = rs.keyInPause(' Press any key to start the game. ')

    const ship = {shipName: 'Carrier', size: 5 };

    const carrier = ["00000"];
    var battleship = '0000';
    var cruiser = '000';
    var submarine = '000';
    var destroyer ='00'
    var locations = {}
    var size = 10;
    var myShips = 2;
    var enemyShips = 2;
    var myGrid = createGrid(size);
    var enemyGrid = createGrid(size);
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
for (let i = 0; i <= myShips; i++) {
    var x = getRandomInt(size);
    var y = getRandomInt(size);
    placeCharacter(x, y, '0', myGrid);
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

function createGrid(size) {
   let grid = []
    for (let i = 0; i < size; i++) {
        grid[i] = [];
        for (let j = 0; j < size; j++ ) {
            grid[i][j] = ' ';
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

function placeRandomCharacter(c, grid, max) {
        let didPlace = false; 
        while(!didPlace) {
            let x = getRandomInt(max);
            let y = getRandomInt(max);
            if(!locations[`${x}-${y}`])
            placeCharacter(x, y, c, grid);
            didPlace = true;
            locations['${x}-${y}'] = true;
        }
    }

function myBattleship(ship,c, grid){
            var x = getRandomInt(size);
            var y = getRandomInt(size);  
            
    
            for (let i = 0; i < ship.length; i++) { 
        if(grid[x][y] != ' '){
            x = getRandomInt(x)
            y = getRandomInt(y)}
            else{
        placeRandomCharacter(c, grid, size);
        
        }
         if (x + 1 <= 9) {
            x++;
         }else{x--}
        }
        
    }


    function generateRandomLocation(board, max, ship) {
        let didPlace = false;
        let directionString;
        let valid;

        while (!didPlace) {
            let x = getRandomInt(size);
            let y = getRandomInt(size);

            [valid, directionString] = generateRandomDirection(x, y, ship);

            if (valid) {
                placeShip( x, y, "S", board, directionString, ship);
                didPlace = true;
            }
        }
    }

     function generateRandomDirection(column, row, ship) {
        let valid = false;
        let direction = Math.floor(Math.random() * 4) + 1;
        let directionString = "";

        if (direction === 1 ) {

            for (let index = 0; index < ship.size; index++) {
                if (
                    column + index >= myGrid.length ||
                    myGrid[y][column + index] === "S" ||
                    myGrid[y][column + index] === undefined 
                ) {
                    return [ valid, directionString];
                }
            }
            valid = true; 
            directionString = "right";
            return [valid, directionString];
        }else if (direction === 2) {
            
            for (let index = 0; index < ship.size; index++) {
                if (
                    column - index < 0 ||
                    myGrid[y][column - index] === "S" ||
                    myGrid[y][column - index] === undefined 
                ){
                    return [valid, directionString];
                }
            }
        }
        
        function placeShip (x, y, c, board, direction, ship) {
            if (direction === "right") {
                for (let i = 0; i < ship.size; i++) {
                    board[y] [x + i] = c;
                    ship.coordinates.push(`${x + i} -${y}`);
                }
            } else if ( direction === "left") {
                for (let i = 0; i < ship.size; i++) {
                    board[y][x - i] = c;
                    ship.coordinates.push(`${x - i} -${y} `);
                }
            }

                }

            }
        

    
    



    





