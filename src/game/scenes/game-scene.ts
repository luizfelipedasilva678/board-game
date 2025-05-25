import Phaser from "phaser";
import { Text, Tile, Player, Monster, Dice } from "../components";
import boardTiles from "../../configs/board";
import powerUps from "../../configs/power-ups";
import { LIGHT_BLUE, OCEAN_BLUE, SKY_BLUE } from "../../configs/colors";

class Game extends Phaser.Scene {
  private players: Player[] = [];
  private missingTurn = new Set();
  private killedPlayers = new Set();
  private log: string[] = ["\nRegistro de jogadas: \n"];
  private quantityOfPlayers = 4;
  private turnIdx = 0;
  private currentPlayerText: Phaser.GameObjects.Text | null = null;
  private turnText: Phaser.GameObjects.Text | null = null;
  private gameLog: Phaser.GameObjects.Text | null = null;
  private dice: Dice | null = null;
  private monster: Monster | null = null;
  private turn = 1;

  constructor() {
    super({ key: "game" });
  }

  getCurrentPlayer() {
    return this.players[this.turnIdx];
  }

  getWinner() {
    return this.players.find(
      (player) => player.getCurrentTile() === boardTiles.length - 1
    );
  }

  async handleLuckOrSetback() {
    let newPosition = 0;
    const powerUp = powerUps[Phaser.Math.Between(0, powerUps.length - 1)];
    const player = this.getCurrentPlayer();
    const currentPlayerPosition = player.getCurrentTile();

    this.addLog(
      `- ${powerUp.description.replace("{player}", player.displayName)}`
    );

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
            new Text(this, tile.width / 2, tile.height / 2, "Início").setOrigin(
              0.5
            ),
          ]);
          break;
        case "normal":
          new Tile(this, tile.x, tile.y, tile.width, tile.height, LIGHT_BLUE);
          break;
        case "luckOrSetback":
          this.add.container(tile.x, tile.y, [
            new Tile(this, 0, 0, tile.width, tile.height, OCEAN_BLUE),
            new Text(this, tile.width / 2, tile.height / 2, "?", {
              fontSize: "60px",
              align: "center",
            }).setOrigin(0.5),
          ]);
          break;
        case "missATurn":
          this.add.container(tile.x, tile.y, [
            new Tile(this, 0, 0, tile.width, tile.height, SKY_BLUE),
            new Text(
              this,
              tile.width / 2,
              tile.height / 2,
              ["Perca", "Um", "Turno"],
              {
                align: "center",
                fontSize: "28px",
              }
            ).setOrigin(0.5),
          ]);
          break;
        case "end":
          this.add.container(tile.x, tile.y, [
            new Tile(this, 0, 0, tile.width, tile.height, LIGHT_BLUE),
            new Text(this, tile.width / 2, tile.height / 2, "Fim").setOrigin(
              0.5
            ),
          ]);
          break;
        default:
          break;
      }
    }
  }

  addLog(log: string) {
    this.log.push(log);
  }

  init() {
    this.players = [];
    this.missingTurn = new Set();
    this.killedPlayers = new Set();
    this.log = ["\nRegistro de jogadas: \n"];
    this.quantityOfPlayers = 4;
    this.turnIdx = 0;
    this.currentPlayerText = null;
    this.turnText = null;
    this.gameLog = null;
    this.dice = null;
    this.monster = null;
    this.turn = 1;
  }

  async handleDiceRolling(diceValue: number) {
    this.turn++;

    if (this.turnIdx !== -1) {
      const player = this.getCurrentPlayer();
      const currentPlayerPosition = player.getCurrentTile();
      const newPosition =
        currentPlayerPosition + diceValue > boardTiles.length - 1
          ? boardTiles.length - 1
          : currentPlayerPosition + diceValue;

      this.addLog(
        `- ${this.getCurrentPlayer().displayName} avançou ${diceValue} casas`
      );

      await player.makeMovement(newPosition);

      const tile = boardTiles[newPosition];

      if (tile.type === "luckOrSetback") {
        await this.handleLuckOrSetback();
      }

      if (boardTiles[player.getCurrentTile()].type === "missATurn") {
        this.addLog(`- ${this.getCurrentPlayer().displayName} perdeu um turno`);
        this.missingTurn.add(this.turnIdx);
      }
    }

    this.monster!.move();

    for (const player of this.players) {
      if (
        player.getCurrentTile() === this.monster!.getCurrentTile() &&
        !this.killedPlayers.has(this.players.indexOf(player))
      ) {
        this.addLog(`- ${player.displayName} morreu`);
        player.visible = false;
        this.killedPlayers.add(this.players.indexOf(player));
      }
    }

    let nextTurnIdx = -1;
    let nextPlayerIdx = this.turnIdx;
    for (let i = 0; i < this.players.length; i++) {
      nextPlayerIdx = (nextPlayerIdx + 1) % this.players.length;

      if (
        !this.missingTurn.has(nextPlayerIdx) &&
        !this.killedPlayers.has(nextPlayerIdx)
      ) {
        nextTurnIdx = nextPlayerIdx;
        break;
      }

      this.missingTurn.delete(nextPlayerIdx);
    }

    this.turnIdx = nextTurnIdx;
  }

  create() {
    this.cameras.main.setBackgroundColor("#ffffff");
    this.createBoard();

    this.turnText = new Text(this, 1000, 20, `Turno: ${this.turn}`);
    const color = new Phaser.Display.Color();

    for (let i = 0; i < this.quantityOfPlayers; i++) {
      const xOffset = 20 * (i + 1) + 10 * i;
      const yOffset = 20;

      this.players.push(
        new Player(
          this,
          i,
          boardTiles[0].x,
          boardTiles[0].y,
          xOffset,
          yOffset,
          color.random(50).color
        )
      );
    }

    this.monster = new Monster(this, boardTiles[0].x, boardTiles[0].y, 67, 50);
    this.dice = new Dice(this, 78, 800);
    this.currentPlayerText = new Text(
      this,
      195,
      900,
      `Turno do ${this.getCurrentPlayer().displayName}`
    );

    this.gameLog = new Text(this, 1000, 60, "", {
      fontSize: "16px",
    });

    this.currentPlayerText.setOrigin(0.5);
    this.dice.onRoll(this.handleDiceRolling.bind(this));
  }

  update() {
    const winner = this.getWinner();

    if (winner) {
      this.scene.start("winnerscene", {
        player: winner.displayName,
      });
    }

    if (this.killedPlayers.size === this.players.length) {
      this.scene.start("gameover");
    }

    this.turnText!.setText(`Turno: ${this.turn}`);
    this.gameLog!.setText(this.log.join("\n"));

    if (this.turnIdx !== -1) {
      this.currentPlayerText!.setText(
        `Turno do ${this.getCurrentPlayer().displayName}`
      );
    } else {
      this.currentPlayerText!.setText("Todos os jogadores perderam um turno");
    }
  }
}

export default Game;
