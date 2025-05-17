import Phaser from "phaser";
import { Text, Tile } from "../components";
import boardTiles from "../../configs/board";
import powerUps from "../../configs/power-ups";
import { LIGHT_BLUE, OCEAN_BLUE, SKY_BLUE } from "../../configs/colors";
import { Player } from "../components/Player";
import { Dice } from "../components/Dice";

class Game extends Phaser.Scene {
  private readonly players: Player[] = [];
  private readonly missingTurn = new Set();
  private readonly quantityOfPlayers = 2;
  private turnIdx = 0;
  private currentPlayerText: Phaser.GameObjects.Text | null = null;
  private turnText: Phaser.GameObjects.Text | null = null;
  private dice: Dice | null = null;
  private turn = 1;

  constructor() {
    super({ key: "game" });
  }

  preload() {
    this.load.image("dice-albedo", "../assets/dice-albedo.png");
    this.load.obj("dice-obj", "../assets/dice.obj");
  }

  getCurrentPlayer() {
    return this.players[this.turnIdx];
  }

  async handleLuckOrSetback() {
    let newPosition = 0;
    const powerUp = powerUps[Phaser.Math.Between(0, powerUps.length - 1)];
    const player = this.getCurrentPlayer();
    const currentPlayerPosition = player.currentTile();

    if (powerUp.type === "advanceAdvantage") {
      newPosition =
        currentPlayerPosition + (powerUp?.advance ?? 0) > boardTiles.length - 1
          ? boardTiles.length - 1
          : currentPlayerPosition + (powerUp?.advance ?? 0);

      await player.makeMovement(newPosition);
    }

    if (powerUp.type === "retreatDisadvantage") {
      await player.makeMovement(powerUp?.retreat ?? 0, "backward");
    }

    if (boardTiles[newPosition].type === "luckOrSetback") {
      await this.handleLuckOrSetback();
    }
  }

  createBoard() {
    for (const tile of boardTiles) {
      switch (tile.type) {
        case "start":
          this.add.container(tile.x, tile.y, [
            new Tile(this, 0, 0, tile.width, tile.height, LIGHT_BLUE),
            new Text(this, 5, 35, "Início"),
          ]);
          break;
        case "normal":
          new Tile(this, tile.x, tile.y, tile.width, tile.height, LIGHT_BLUE);
          break;
        case "luckOrSetback":
          this.add.container(tile.x, tile.y, [
            new Tile(this, 0, 0, tile.width, tile.height, OCEAN_BLUE),
            new Text(this, 47, 25, "?", { fontSize: "60px", align: "center" }),
          ]);
          break;
        case "missATurn":
          this.add.container(tile.x, tile.y, [
            new Tile(this, 0, 0, tile.width, tile.height, SKY_BLUE),
            new Text(this, 14, 7, ["Perca", "Um", "Turno"], {
              align: "center",
            }),
          ]);
          break;
        case "end":
          this.add.container(tile.x, tile.y, [
            new Tile(this, 0, 0, tile.width, tile.height, LIGHT_BLUE),
            new Text(this, 30, 35, "Fim"),
          ]);
          break;
        default:
          break;
      }
    }
  }

  initBackground() {
    this.add
      .rectangle(
        0,
        0,
        +this.game.config.width,
        +this.game.config.height,
        0xffffff
      )
      .setOrigin(0, 0);
  }

  async handleDiceRolling(diceValue: number) {
    this.turn++;

    if (this.turnIdx !== -1) {
      const player = this.getCurrentPlayer();
      const currentPlayerPosition = player.currentTile();
      const newPosition =
        currentPlayerPosition + diceValue > boardTiles.length - 1
          ? boardTiles.length - 1
          : currentPlayerPosition + diceValue;

      await player.makeMovement(newPosition);

      const tile = boardTiles[newPosition];

      if (tile.type === "luckOrSetback") {
        await this.handleLuckOrSetback();
      }

      if (boardTiles[player.currentTile()].type === "missATurn") {
        this.missingTurn.add(this.turnIdx);
      }
    }

    let nextTurnIdx = -1;
    let nextPlayerIdx = this.turnIdx;
    for (let i = 0; i < this.players.length; i++) {
      nextPlayerIdx = (nextPlayerIdx + 1) % this.players.length;

      if (!this.missingTurn.has(nextPlayerIdx)) {
        nextTurnIdx = nextPlayerIdx;
        break;
      }

      this.missingTurn.delete(nextPlayerIdx);
    }

    this.turnIdx = nextTurnIdx;
  }

  create() {
    this.initBackground();
    this.createBoard();

    this.turnText = this.add.text(1000, 20, `Turno: ${this.turn}`, {
      fontSize: "32px",
      color: "#000000",
    });

    const color = new Phaser.Display.Color();

    for (let i = 0; i < this.quantityOfPlayers; i++) {
      const xOffset = 20 * (i + 1) + 10 * i;
      const yOffset = 20;

      this.players.push(
        new Player(
          this,
          i,
          boardTiles[0].x + xOffset,
          boardTiles[0].x + yOffset,
          xOffset,
          yOffset,
          color.random(50).color
        )
      );
    }

    this.dice = new Dice(this, 78, 800);
    this.currentPlayerText = this.add.text(
      195,
      900,
      `Turno do ${this.getCurrentPlayer().displayName}`,
      {
        fontSize: "32px",
        color: "#000000",
      }
    );

    this.currentPlayerText.setOrigin(0.5);
    this.dice.onRoll(this.handleDiceRolling.bind(this));
  }

  update() {
    if (this.turnIdx !== -1) {
      this.currentPlayerText?.setText(
        `Turno do ${this.getCurrentPlayer().displayName}`
      );
    } else {
      this.currentPlayerText?.setText("Todos os jogadores perderam um turno");
    }

    this.turnText?.setText(`Turno: ${this.turn}`);
  }
}

export default Game;
