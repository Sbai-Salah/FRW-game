
var memoArr = [
  "Gryffondor",
  "Gryffondor",
  "Slytherin",
  "Slytherin",
  "Hufflepuff",
  "Hufflepuff",
  "Ravenclaw",
  "Ravenclaw",
  "Hagrid",
  "Hagrid",
  "Hermione",
  "Hermione",
  "Horcruxe",
  "Horcruxe",
  "Harry",
  "Harry",
  "Malfoy",
  "Malfoy",
  "Voldemort",
  "Voldemort",
  "Sirius Black",
  "Sirius Black",
  "RON",
  "RON",
  "Neville",
  "Neville",
  "Pumpkin juice",
  "Pumpkin juice",
  "Nagini",
  "Nagini"
];
var memoVallues = [];
var memoTileId = [];
var tilesFlipped = 0;

// score : 
var gameScore = 0;

// shuffling the array
Array.prototype.memoTile_shuffle = function () {
  var i = this.length,
    j,
    temp;

  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
};

function newBoard() {
  tilesFlipped = 0;
  var output = "";
  memoArr.memoTile_shuffle();
  for (var i = 0; i < memoArr.length; i++) {
    output +=
      '<div id="tile_' +
      i +
      '" onClick="memoryFlipTiles(this,\'' +
      memoArr[i] +
      "')\"></div>";
  }
  document.getElementById("memory_board").innerHTML = output;
}
/* posibilities when clicking two cards: 
1- no match ==> return them to the init state
2- a match ==> keep them in front. 

+ when fliping cards the background color of the card = white (or any color :) )

*/
function memoryFlipTiles(tile, val) {
  if (tile.innerHTML == "" && memoVallues.length < 2) {
    tile.style.background = "#FFF";
    
    tile.innerHTML = val;

    if (memoVallues.length == 0) {
      memoVallues.push(val);
      memoTileId.push(tile.id);
      
    } else if (memoVallues.length == 1) {
      memoVallues.push(val);
      memoTileId.push(tile.id);

      if (memoVallues[0] == memoVallues[1]) {
        tilesFlipped += 2;
        gameScore+=4;
        document.querySelector(".gameScore").innerHTML = gameScore;
        if(gameScore <0){
          document.querySelector(".gameScore").style.color = "red";
        }else if(gameScore >=0){
          document.querySelector(".gameScore").style.color = "green";

        }
        
        //clearing arrays
        memoVallues = [];
        memoTileId = [];

        if (tilesFlipped == memoArr.length) {
          alert("WELL DONE HARRY, WELL DONE: NOW TRY AGAIN and BEAT YOUR SCORE: "+gameScore);
          document.getElementById("memory_board").innerHTML = "";
          gameScore = 0;
        document.querySelector(".gameScore").innerHTML = gameScore;
          newBoard();
        }
      } else {
        function flipToBack() {
          // Flip the 2 tiles back
          var tile_1 = document.getElementById(memoTileId[0]);
          var tile_2 = document.getElementById(memoTileId[1]);

          tile_1.style.background = "rgb(47, 66, 90)";
          tile_1.innerHTML = "";
          // to return the card at the initial state

          tile_2.style.background = "rgb(47, 66, 90)";
          tile_2.innerHTML = "";
          // to return the card at the initial state
          gameScore-=1;
          document.querySelector(".gameScore").innerHTML = gameScore;
          if(gameScore <0){
            document.querySelector(".gameScore").style.color = "red";
          }else if(gameScore >=0){
            document.querySelector(".gameScore").style.color = "green";

          }
          //clearing arrays again
          memoVallues = [];
          memoTileId = [];
        }
        setTimeout(flipToBack, 400);
        // time of flipp
      }
    }
  }
}
