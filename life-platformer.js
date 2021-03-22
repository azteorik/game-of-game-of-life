var h = 800;
var w = 1200;


var grid_h = 160;
var grid_w = 240;
var gol_grid = [];
var temp_gol_grid = [];

var ver_len = h / grid_h;
var hor_len = w / grid_w;

var frame_rate = 15;

/*

  #
    #
# # #

*/

function setup() {

  frameRate(frame_rate);
  var canvas = createCanvas(w, h);
  canvas.parent('animation');
  canvas.style('margin', 'auto');
  canvas.style('display', 'block');
  canvas.style('padding-top', '3%');
  frameRate(frame_rate);

  for(let i = 0; i < grid_h; i++){
    gol_grid.push([]);
    for(let j = 0; j < grid_w; j++){
      gol_grid[i].push( Math.random() + 100 < 0.25 );
    }
  }
  //print_matrix(50,50, GLIDER, gol_grid);
  print_matrix(50,100, SPACE_SHIP, gol_grid);
  print_matrix(100,100, COW, gol_grid);

  for(let i = 0; i < grid_h; i++){
    temp_gol_grid.push([]);
    for(let j = 0; j < grid_w; j++){
      temp_gol_grid[i].push(false);
    }
  }

  colorMode(HSB, 360, 100, 100, 100);
}

function count_neigh(grid, x, y){
    const neigh = [[-1,-1],[-1,0],[-1,1],
                   [ 0,-1],/*..,*/[ 0,1],
                   [ 1,-1],[ 1,0],[ 1,1]];
    var count = 0;

    for(let i = 0; i < neigh.length; i++){
        let xx = neigh[i][0] + x;
        let yy = neigh[i][1] + y;
        if( xx >= 0 && xx < grid_h && yy >= 0 && yy < grid_w ){
            if( grid[xx][yy] ) count += 1;
        }
    }

    return count;

}

function update_grid(){

    for(let i = 0; i < grid_h; i++){
        for(let j = 0; j < grid_w; j++){

            let neigh_count = count_neigh(gol_grid, i, j);

            if( neigh_count < 2 ){
                temp_gol_grid[i][j] = false;
            }
            else if( neigh_count == 3 ){
                temp_gol_grid[i][j] = true;
            }
            else if( neigh_count > 3 ){
                temp_gol_grid[i][j] = false;
            }
            else {
                temp_gol_grid[i][j] = gol_grid[i][j];
            }

        }
    }

}


function print_matrix(x, y, m, grid) {
    
    for(let i = 0; i < m.length; i++) {
        const row = m[i];
        for(let j = 0; j < row.length; j++) {
            grid[x+i][y+j] = row[j];
        }
    }
}

function draw() {
    background(0, 0, 0, 60);

    noStroke();
    fill(0, 0, 100);
    for(let i = 0; i < grid_h; i++){
        for(let j = 0; j < grid_w; j++){
            if( gol_grid[i][j] )
                rect(j * hor_len, i * ver_len, hor_len, ver_len);
        }
    }

    update_grid();
    const temp = gol_grid;
    gol_grid = temp_gol_grid;
    temp_gol_grid = temp;

}

GLIDER = 
    [[false, true, false],
     [false, false, true],
     [true, true, true],
    ]


function stringToGoLArray(str, on='1', off='0') {
  return str.split('\n').map((line)=>line.split('').map(char=>char==on))
}

// https://www.conwaylife.com/wiki/Spaceship
const spaceShip =
`..O..............O..................................O.....
O..O..OOO.......O.OOOO...............OO...........OO.O....
O..O............OOO.O.O.........O.....O.......O...O.......
.O.O..O.....................OOO..O.O.OOO.....O.O.O....O...
..OO......O....O................OOOOOO..O..O...O...O..O...
.O.O...OO.....O...OO......OO.OO..O..OO..O.O.OO..O.........
..O.....O.OO..O...OO......OO....O.O.O..O..O.O.O......OO..O
..O....OOO..O.........OOO.......OOO.O.OO.....O.......OOO.O
............OOOOOOOOO...O........OO.OOO...OOOO.........O.O
..........................................................
............OOOOOOOOO...O........OO.OOO...OOOO.........O.O
..O....OOO..O.........OOO.......OOO.O.OO.....O.......OOO.O
..O.....O.OO..O...OO......OO....O.O.O..O..O.O.O......OO..O
.O.O...OO.....O...OO......OO.OO..O..OO..O.O.OO..O.........
..OO......O....O................OOOOOO..O..O...O...O..O...
.O.O..O.....................OOO..O.O.OOO.....O.O.O....O...
O..O............OOO.O.O.........O.....O.......O...O.......
O..O..OOO.......O.OOOO...............OO...........OO.O....
..O..............O..................................O.....`

const SPACE_SHIP = stringToGoLArray(spaceShip, 'O')

const cow = 
`OO.......OO..OO..OO..OO..OO..OO..OO..OO..OO..OO..OO..OO.....
OO....O.OOO..OO..OO..OO..OO..OO..OO..OO..OO..OO..OO..OO...OO
....OO.O.................................................O.O
....OO...OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO..
....OO.O..................................................O.
OO....O.OOO..OO..OO..OO..OO..OO..OO..OO..OO..OO..OO..OO..OO.
OO.......OO..OO..OO..OO..OO..OO..OO..OO..OO..OO..OO..OO.....`



const COW = stringToGoLArray(cow, 'O')