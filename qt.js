

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