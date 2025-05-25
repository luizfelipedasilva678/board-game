import boardTiles from "../../../configs/board";

class Monster extends Phaser.GameObjects.Rectangle {
  private readonly xOffset: number;
  private readonly yOffset: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    xOffset: number,
    yOffset = 20,
    color = 0x000000
  ) {
    super(scene, x + xOffset, y + yOffset, 20, 20, color);
    this.scene.add.existing(this);

    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.visible = false;
  }

  getCurrentTile() {
    for (let i = 0; i < boardTiles.length; i++) {
      if (
        this.x === boardTiles[i].x + this.xOffset &&
        this.y === boardTiles[i].y + this.yOffset
      ) {
        return i;
      }
    }

    return 0;
  }

  move() {
    this.setVisible(true);
    const nextTile = boardTiles[Phaser.Math.Between(1, boardTiles.length - 1)];

    this.x = nextTile.x + this.xOffset;
    this.y = nextTile.y + this.yOffset;

    setTimeout(() => {
      this.setVisible(false);
    }, 2000);
  }
}

export default Monster;
