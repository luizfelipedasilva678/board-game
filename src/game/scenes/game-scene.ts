import { boardTiles } from "../../configs";

const PLAYER_1_X_OFFSET = 50;
const PLAYER_1_Y_OFFSET = 50;

const PLAYER_2_X_OFFSET = 100;
const PLAYER_2_Y_OFFSET = 50;

class Game extends Phaser.Scene {
  private currentPlayer: "player1" | "player2" = "player1";
  private player1: Phaser.GameObjects.Rectangle | null = null;
  private player2: Phaser.GameObjects.Rectangle | null = null;
  private currentPlayerText: Phaser.GameObjects.Text | null = null;

  constructor() {
    super({ key: "game" });
  }

  preload() {
    this.load.image("sky", "../assets/sky.png");
  }

  getFormattedPlayerName(player: string) {
    return player === "player1"
      ? "Jogador 1 (Peão preto)"
      : "Jogador 2 (Peão verde)";
  }

  getRandomArbitrary(min: number, max: number) {
    const minimum = Math.ceil(min);
    const maximum = Math.floor(max);
    return Math.floor(Math.random() * (maximum - minimum) + minimum);
  }

  getPlayerCurrentTile(
    player: Phaser.GameObjects.Rectangle,
    xOffset: number,
    yOffset: number
  ) {
    for (let i = 0; i < boardTiles.length; i++) {
      if (
        player.x === boardTiles[i].x + xOffset &&
        player.y === boardTiles[i].y + yOffset
      ) {
        return i;
      }
    }

    return 0;
  }

  makeMovement(
    player: Phaser.GameObjects.Rectangle,
    currentTile: number,
    steps: number,
    xOffset: number,
    yOffset: number,
    cb: () => void = () => {}
  ) {
    const sequence = [];

    for (let i = currentTile; i <= steps; i++) {
      sequence.push({
        x: boardTiles[i].x + xOffset,
        y: boardTiles[i].y + yOffset,
        duration: 500,
        ease: "Linear",
      });
    }

    this.tweens.chain({
      targets: player,
      tweens: sequence,
      onComplete: cb,
    });
  }

  getCurrentPlayer() {
    if (this.currentPlayer === "player1") {
      return {
        player: this.player1!,
        xOffset: PLAYER_1_X_OFFSET,
        yOffset: PLAYER_1_Y_OFFSET,
      };
    }

    return {
      player: this.player2!,
      xOffset: PLAYER_2_X_OFFSET,
      yOffset: PLAYER_2_Y_OFFSET,
    };
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
          graphics.x = tile.x;
          graphics.y = tile.y;
          graphics.lineStyle(2, 0x000000, 1);
          graphics.fillStyle(0xb1d4e0, 1);
          graphics.fillRect(0, 0, tile.width, tile.height);
          graphics.strokeRect(0, 0, tile.width, tile.height);
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

    this.player1 = this.add.rectangle(
      boardTiles[0].x + PLAYER_1_X_OFFSET,
      boardTiles[0].y + PLAYER_1_Y_OFFSET,
      20,
      20,
      0x000000
    );
    this.player2 = this.add.rectangle(
      boardTiles[0].x + PLAYER_2_X_OFFSET,
      boardTiles[0].y + PLAYER_2_Y_OFFSET,
      20,
      20,
      0x0304020
    );

    const diceButtonRect = this.add.rectangle(0, 0, 300, 100, 0x000000);
    this.add.container(170, 800, [
      diceButtonRect,
      this.add
        .text(0, 0, "Sortear número", {
          fontSize: "32px",
          color: "#ffff",
        })
        .setOrigin(0.5),
    ]);

    this.currentPlayerText = this.add.text(
      325,
      900,
      `Turno do ${this.getFormattedPlayerName(this.currentPlayer)}`,
      {
        fontSize: "32px",
        color: "#000000",
      }
    );

    this.currentPlayerText.setOrigin(0.5);

    diceButtonRect.setInteractive();
    let isCallbackActive = false;
    diceButtonRect.on("pointerdown", async () => {
      if (isCallbackActive) return;

      isCallbackActive = true;
      const result = await new Promise<boolean>((resolve) => {
        const number = this.getRandomArbitrary(1, 7);
        const { xOffset, yOffset, player } = this.getCurrentPlayer();
        const currentPlayerPosition = this.getPlayerCurrentTile(
          player,
          xOffset,
          yOffset
        );
        const newPosition =
          currentPlayerPosition + number > boardTiles.length - 1
            ? boardTiles.length - 1
            : currentPlayerPosition + number;

        this.makeMovement(
          player,
          currentPlayerPosition,
          newPosition,
          xOffset,
          yOffset,
          () => {
            resolve(false);
            this.currentPlayer =
              this.currentPlayer == "player1" ? "player2" : "player1";
          }
        );
      });

      isCallbackActive = result;
    });
  }

  update() {
    this.currentPlayerText?.setText(
      `Turno do ${this.getFormattedPlayerName(this.currentPlayer)}`
    );
  }
}

export default Game;
