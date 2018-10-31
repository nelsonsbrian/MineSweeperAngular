import { Component, OnInit } from '@angular/core';
import { Tile } from './models/tile.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MineSweeper';
  gameGrid: any[];
  gameRow: Tile[];
  gameRows: number = 10;
  gameCols: number = 10;
  gameBombsCount: number = 20;
  gameStatus: string = "Playing";
  isGameOver: boolean = false;
  gameDirections: any[] = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ];

  ngOnInit() {
    this.resetGame();
  }

  resetGame() {
    this.gameGrid = [];
    this.gameRow = [];
    this.isGameOver = false;
    this.gameStatus = "Playing";
    this.createGrid();
    this.addBombsToGrid();
    this.AddTextIcon();
    console.log(this.gameGrid);
  }

  addBombsToGrid() {
    let addedBombs = 0;
    while (addedBombs < this.gameBombsCount) {
      let randomRow = Math.floor(Math.random() * this.gameRows);
      let randomCol = Math.floor(Math.random() * this.gameCols);
      if (!(this.gameGrid[randomRow][randomCol].isBomb)) {
        this.gameGrid[randomRow][randomCol].isBomb = true;
        addedBombs++;
        console.log(`row is ${randomRow}, col is ${randomCol}`);
      }
    }
  }

  addBombstoTileNeighbor(tile: Tile) {
    let neighbors: Tile[] = [];
    for (let i = 0; i < this.gameDirections.length; i++) {
      for (let j = 0; j < this.gameGrid.length; j++) {
        for (let k = 0; k < this.gameGrid[j].length; k++) {
          console.log(i, j, k);
          if (tile.row + this.gameDirections[0] < this.gameRow || tile.row + this.gameDirections[0] >= 0 || tile.col + this.gameDirections[1] < this.gameCols || tile.col + this.gameDirections[1] >= 0) {
            if (this.gameGrid[tile.row + this.gameDirections[0]][tile.col + this.gameDirections[1]].isBomb) {
              neighbors.push(this.gameGrid[tile.row + this.gameDirections[0]][tile.col + this.gameDirections[1]]);
            }
          }
        }
      }
    }
    tile.neighbors = neighbors;
  }

  getTile(row: number, col: number) {
    for (let i = 0; i < this.gameRows; i++) {
      for (let j = 0; j < this.gameCols; j++) {
        if (i === row && j === col) {
          return this.gameGrid[i][j];
        }
      }
    }
  }

  createGrid() {
    for (let i = 0; i < this.gameRows; i++) {
      for (let j = 0; j < this.gameCols; j++) {
        let newTile = new Tile(i, j);
        this.gameRow.push(newTile);
      }
      this.gameGrid.push(this.gameRow);
      this.gameRow = [];
    }
  }

  AddTextIcon() {
    for (let i = 0; i < this.gameGrid.length; i++) {
      for (let j = 0; j < this.gameGrid[i].length; j++) {
        this.setBombNumber(i, j, this.gameGrid[i][j]);
        this.gameGrid[i][j].getIconString();
        // this.addBombstoTileNeighbor(this.gameGrid[i][j]);
      }
    }
  }

  setBombNumber(row: number, col: number, tile: Tile) {
    if (row - 1 >= 0 && col - 1 >= 0) {
      if (this.gameGrid[row - 1][col - 1].isBomb == true) {
        tile.numberText++;
      }
    }

    if (row - 1 >= 0) {
      if (this.gameGrid[row - 1][col].isBomb == true) {
        tile.numberText++;
      }
    }

    if (row - 1 >= 0 && col + 1 < this.gameCols) {
      if (this.gameGrid[row - 1][col + 1].isBomb == true) {
        tile.numberText++;
      }
    }

    if (col + 1 < this.gameCols) {
      if (this.gameGrid[row][col + 1].isBomb == true) {
        tile.numberText++;
      }
    }

    if (row + 1 < this.gameRows && col + 1 < this.gameCols) {
      if (this.gameGrid[row + 1][col + 1].isBomb == true) {
        tile.numberText++;
      }
    }

    if (row + 1 < this.gameRows) {
      if (this.gameGrid[row + 1][col].isBomb == true) {
        tile.numberText++;
      }
    }

    if (row + 1 < this.gameRows && col - 1 >= 0) {
      if (this.gameGrid[row + 1][col - 1].isBomb == true) {
        tile.numberText++;
      }
    }

    if (col - 1 >= 0) {
      if (this.gameGrid[row][col - 1].isBomb == true) {
        tile.numberText++;
      }
    }
  }

  clickFunction(tile: Tile) {
    tile.isLastClicked = true;
    this.checkTiles(tile);
    if (tile.isBomb) {
      this.gameStatus = "Game Over";
      this.isGameOver = true;
      this.gameOver();
    }
  }

  checkTiles(tile: Tile) {
    tile.reveal = true;
    this.showProperClass(tile);
    if (tile.numberText == 0) {
      this.revealAllZero(tile);
    }
  }


  gameOver() {
    for (let i = 0; i < this.gameGrid.length; i++) {
      for (let j = 0; j < this.gameGrid[i].length; j++) {
        if (this.gameGrid[i][j].isBomb) {
          this.gameGrid[i][j].reveal = true;
          this.checkTiles(this.gameGrid[i][j]);
        }
      }
    }
  }

  showProperClass(tile: Tile) {
    if (tile.isBomb && tile.isLastClicked) {
      tile.class = "mine-wrong";
    } else if (tile.isBomb) {
      tile.class = "bomb";
    } else if (tile.numberText == 0) {
      tile.class = "empty";
    } else {
      tile.class = "number" + tile.numberText;
    }
    console.log(tile);
  }

  revealAllZero(tile: Tile) {
    if (tile.row - 1 >= 0 && tile.col - 1 >= 0 && (this.gameGrid[tile.row - 1][tile.col - 1].numberText == 0 || this.gameGrid[tile.row - 1][tile.col - 1].isBomb == false) && this.gameGrid[tile.row - 1][tile.col - 1].reveal == false) {
      this.checkTiles(this.gameGrid[tile.row - 1][tile.col - 1]);
    }

    if (tile.row - 1 >= 0 && (this.gameGrid[tile.row - 1][tile.col].numberText == 0 || this.gameGrid[tile.row - 1][tile.col].isBomb == false) && this.gameGrid[tile.row - 1][tile.col].reveal == false) {
      this.checkTiles(this.gameGrid[tile.row - 1][tile.col]);
    }

    if (tile.row - 1 >= 0 && tile.col + 1 < this.gameCols && (this.gameGrid[tile.row - 1][tile.col + 1].numberText == 0 || this.gameGrid[tile.row - 1][tile.col + 1].isBomb == false) && this.gameGrid[tile.row - 1][tile.col + 1].reveal == false) {
      this.checkTiles(this.gameGrid[tile.row - 1][tile.col + 1]);
    }

    if (tile.col + 1 < this.gameCols && (this.gameGrid[tile.row][tile.col + 1].numberText == 0 || this.gameGrid[tile.row][tile.col + 1].isBomb == false) && this.gameGrid[tile.row][tile.col + 1].reveal == false) {
      this.checkTiles(this.gameGrid[tile.row][tile.col + 1]);

    }

    if (tile.row + 1 < this.gameRows && tile.col + 1 < this.gameCols && (this.gameGrid[tile.row + 1][tile.col + 1].numberText == 0 || this.gameGrid[tile.row + 1][tile.col + 1].isBomb == false) && this.gameGrid[tile.row + 1][tile.col + 1].reveal == false) {
      this.checkTiles(this.gameGrid[tile.row + 1][tile.col + 1]);
    }

    if (tile.row + 1 < this.gameRows && (this.gameGrid[tile.row + 1][tile.col].numberText == 0 || this.gameGrid[tile.row + 1][tile.col].isBomb == false) && this.gameGrid[tile.row + 1][tile.col].reveal == false) {
      this.checkTiles(this.gameGrid[tile.row + 1][tile.col]);
    }

    if (tile.row + 1 < this.gameRows && tile.col - 1 >= 0 && (this.gameGrid[tile.row + 1][tile.col - 1].numberText == 0 || this.gameGrid[tile.row + 1][tile.col - 1].isBomb == false) && this.gameGrid[tile.row + 1][tile.col - 1].reveal == false) {
      this.checkTiles(this.gameGrid[tile.row + 1][tile.col - 1]);
    }

    if (tile.col - 1 >= 0 && (this.gameGrid[tile.row][tile.col - 1].numberText == 0 || this.gameGrid[tile.row][tile.col - 1].isBomb == false) && this.gameGrid[tile.row][tile.col - 1].reveal == false) {
      this.checkTiles(this.gameGrid[tile.row][tile.col - 1]);
    }
  }
}
