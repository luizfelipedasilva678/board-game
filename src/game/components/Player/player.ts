import boardTiles from "../../../configs/board";

class Player extends Phaser.GameObjects.Rectangle {
  private readonly xOffset: number;
  private readonly yOffset: number;
  private readonly id: number;

  constructor(
    scene: Phaser.Scene,
    id: number,
    x: number,
    y: number,
    xOffset: number,
    yOffset = 20,
    color = 0x000000
  ) {
    super(scene, x, y, 20, 20, color);
    this.scene.add.existing(this);

    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.id = id;
  }

  get displayName() {
    return `Jogador ${this.id + 1}`;
  }

  currentTile() {
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

  makeMovement(steps: number, direction: "forward" | "backward" = "forward") {
    return new Promise<void>((resolve) => {
      let currentTile = this.currentTile();
      const sequence = [];

      if (direction === "backward") {
        let i = 0;

        while (i !== steps + 1 && currentTile >= 0) {
          sequence.push({
            x: boardTiles[currentTile].x + this.xOffset,
            y: boardTiles[currentTile].y + this.yOffset,
            duration: 500,
            ease: "Linear",
          });

          currentTile--;
          i++;
        }
      } else {
        for (let i = currentTile; i <= steps; i++) {
          sequence.push({
            x: boardTiles[i].x + this.xOffset,
            y: boardTiles[i].y + this.yOffset,
            duration: 500,
            ease: "Linear",
          });
        }
      }

      this.scene.tweens.chain({
        targets: this,
        tweens: sequence,
        onComplete: () => {
          resolve();
        },
      });
    });
  }
}

export default Player;
