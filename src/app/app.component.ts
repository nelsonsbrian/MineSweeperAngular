import { Component, OnInit } from '@angular/core';
import { Tile } from './models/tile.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MineSweeper';
  gameGrid: any[] = [];
  gameRow: Tile[] = [];
  gameRows: number = 10;
  gameCols: number = 10;
  gameBombsCount: number = 20;
  gameStatus: string = "Playing";

  ngOnInit() {
    this.createGrid();
    this.addBombs();
    this.AddTextIcon();
  }

  addBombs() {
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

  createGrid() {
    for (let i = 0; i < this.gameRows; i++) {
      for (let j = 0; j < this.gameCols; j++) {
        let newTile = new Tile(i,j);
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
      }
    }
  }

  setBombNumber(row: number, col: number, tile: Tile) {
    if (row - 1 >= 0 && col - 1 >= 0)
    {
      if (this.gameGrid[row-1][col-1].isBomb == true)
      {
        tile.numberText++;
      }
    }

    if (row - 1 >= 0)
    {
      if (this.gameGrid[row-1][col].isBomb == true)
      {
        tile.numberText++;
      }
    }

    if (row - 1 >= 0 && col + 1 < this.gameCols)
    {
      if (this.gameGrid[row-1][col+1].isBomb == true)
      {
        tile.numberText++;
      }
    }

    if (col + 1 < this.gameCols)
    {
      if (this.gameGrid[row][col+1].isBomb == true)
      {
        tile.numberText++;
      }
    }

    if (row + 1 < this.gameRows && col + 1 < this.gameCols)
    {
      if (this.gameGrid[row+1][col+1].isBomb == true)
      {
        tile.numberText++;
      }
    }

    if (row + 1 < this.gameRows)
    {
      if (this.gameGrid[row+1][col].isBomb == true)
      {
        tile.numberText++;
      }
    }

    if (row + 1 < this.gameRows && col - 1 >= 0)
    {
      if (this.gameGrid[row+1][col-1].isBomb == true)
      {
        tile.numberText++;
      }
    }

    if (col - 1 >= 0)
    {
      if (this.gameGrid[row][col-1].isBomb == true)
      {
        tile.numberText++;
      }
    }
  }

  clickFunction(tile: Tile) {
    tile.reveal = true;
    if (tile.isBomb) {
      this.gameStatus = "Game Over";
    } else if (tile.numberText == 0) {
      this.revealAllZero(tile);
    }
  }

  revealAllZero(tile: Tile) {
    if (tile.row - 1 >= 0 && tile.col - 1 >= 0 && this.gameGrid[tile.row-1][tile.col-1].numberText == 0 && this.gameGrid[tile.row-1][tile.col-1].reveal == false)
    {
        this.clickFunction(this.gameGrid[tile.row-1][tile.col-1]);
    }

    if (tile.row - 1 >= 0 && this.gameGrid[tile.row-1][tile.col].numberText == 0 && this.gameGrid[tile.row-1][tile.col].reveal == false)
    {
        this.clickFunction(this.gameGrid[tile.row-1][tile.col]);
    }

    if (tile.row - 1 >= 0 && tile.col + 1 < this.gameCols && this.gameGrid[tile.row-1][tile.col+1].numberText == 0 && this.gameGrid[tile.row-1][tile.col+1].reveal == false)
    {
        this.clickFunction(this.gameGrid[tile.row-1][tile.col+1]);
    }

    if (tile.col + 1 < this.gameCols && this.gameGrid[tile.row][tile.col+1].numberText == 0 && this.gameGrid[tile.row][tile.col+1].reveal == false)
    {
        this.clickFunction(this.gameGrid[tile.row][tile.col+1]);

    }

    if (tile.row + 1 < this.gameRows && tile.col + 1 < this.gameCols && this.gameGrid[tile.row+1][tile.col+1].numberText == 0 && this.gameGrid[tile.row+1][tile.col+1].reveal == false)
    {
        this.clickFunction(this.gameGrid[tile.row+1][tile.col+1]);
    }

    if (tile.row + 1 < this.gameRows && this.gameGrid[tile.row+1][tile.col].numberText == 0 && this.gameGrid[tile.row+1][tile.col].reveal == false)
    {
        this.clickFunction(this.gameGrid[tile.row+1][tile.col]);
    }

    if (tile.row + 1 < this.gameRows && tile.col - 1 >= 0 && this.gameGrid[tile.row+1][tile.col-1].numberText == 0 && this.gameGrid[tile.row+1][tile.col-1].reveal == false)
    {
        this.clickFunction(this.gameGrid[tile.row+1][tile.col-1]);
    }

    if (tile.col - 1 >= 0 && this.gameGrid[tile.row][tile.col-1].numberText == 0 && this.gameGrid[tile.row][tile.col-1].reveal == false)
    {
        this.clickFunction(this.gameGrid[tile.row][tile.col-1]);
    }
  }
}
