
export class Tile {
    reveal: boolean;
    isBomb: boolean;
    iconString: string;
    numberText: number;
    neighbors: Tile[];
    isLastClicked: boolean = false;
    class: string = "hidden";
    constructor(public row: number, public col: number) {
        this.reveal = false;
        this.isBomb = false;
        this.numberText = 0;
    }

    getIconString() {
        if (this.isBomb) {
            this.iconString = "Bomb";
        } else {
            this.iconString = this.numberText.toString();
        }
    }

    getAdjacentBombs(adjacentTargetTile: Tile) {
        if (adjacentTargetTile.isBomb) {
            this.numberText++;
        }
    }

}
