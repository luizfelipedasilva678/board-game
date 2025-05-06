import { boardTiles } from "../../configs";

class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }

  preload() {
    this.load.image("sky", "../assets/sky.png");
  }

  create() {
    this.add
      .rectangle(
        0,
        0,
        +this.game.config.width,
        +this.game.config.height,
        0xffffff
      )
      .setOrigin(0, 0);

    for (const tile of boardTiles) {
      const graphics = this.add.graphics();

      switch (tile.type) {
        case "start":
          graphics.lineStyle(2, 0x000000, 1);
          graphics.fillStyle(0xb1d4e0, 1);
          graphics.fillRect(0, 0, tile.width, tile.height);
          graphics.strokeRect(0, 0, tile.width, tile.height);
          this.add.container(tile.x, tile.y, [
            graphics,
            this.add.text(5, 35, "Início", {
              fontSize: "32px",
              color: "#000000",
            }),
          ]);
          break;
        case "normal":
          graphics.lineStyle(2, 0x000000, 1);
          graphics.fillStyle(0xb1d4e0, 1);
          graphics.fillRect(tile.x, tile.y, tile.width, tile.height);
          graphics.strokeRect(tile.x, tile.y, tile.width, tile.height);
          break;
        case "luckOrSetback":
          graphics.lineStyle(2, 0x000000, 1);
          graphics.fillStyle(0x2e8bc0, 1);
          graphics.fillRect(0, 0, tile.width, tile.height);
          graphics.strokeRect(0, 0, tile.width, tile.height);
          this.add.container(tile.x, tile.y, [
            graphics,
            this.add.text(50, 35, "?", {
              fontSize: "60px",
              color: "#000000",
            }),
          ]);
          break;
        case "missATurn":
          graphics.lineStyle(2, 0x000000, 1);
          graphics.fillStyle(0x68bbe3, 1);
          graphics.fillRect(0, 0, tile.width, tile.height);
          graphics.strokeRect(0, 0, tile.width, tile.height);
          this.add.container(tile.x, tile.y, [
            graphics,
            this.add.text(14, 7, ["Perca", "Um", "Turno"], {
              fontSize: "32px",
              color: "#000000",
              align: "center",
            }),
          ]);
          break;
        case "end":
          graphics.lineStyle(2, 0x000000, 1);
          graphics.fillStyle(0xb1d4e0, 1);
          graphics.fillRect(0, 0, tile.width, tile.height);
          graphics.strokeRect(0, 0, tile.width, tile.height);
          this.add.container(tile.x, tile.y, [
            graphics,
            this.add.text(30, 35, "Fim", {
              fontSize: "32px",
              color: "#000000",
            }),
          ]);
          break;
      }
    }

    const player1 = this.add.rectangle(50, 50, 20, 20, 0x000000);
    const player2 = this.add.rectangle(100, 50, 20, 20, 0x0304020);

    console.log(
      boardTiles.find((tile) => {
        if (tile.x === player1.x && tile.y === player1.y) {
          return tile;
        }
      })
    );
  }
}

export default Game;
