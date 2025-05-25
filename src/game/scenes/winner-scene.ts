import { LIGHT_BLUE } from "../../configs/colors";
import { Text, Button } from "../components";

class WinnerScene extends Phaser.Scene {
  private playerName = "";

  constructor() {
    super({ key: "winnerscene" });
  }

  init(data: Record<string, any>) {
    this.playerName = data.player ?? "Jogador";
  }

  create() {
    this.cameras.main.setBackgroundColor("#ffffff");

    new Text(
      this,
      +this.game.config.width / 2,
      +this.game.config.height / 2,
      "Fim de jogo"
    ).setOrigin(0.5);

    new Text(
      this,
      +this.game.config.width / 2,
      +this.game.config.height / 2 + 50,
      `O ${this.playerName} ganhou!`,
      {
        fontSize: "20px",
      }
    ).setOrigin(0.5);

    new Button(
      this,
      +this.game.config.width / 2 - 180,
      +this.game.config.height / 2 + 100,
      "Jogar novamente",
      () => {
        this.scene.start("game");
      },
      LIGHT_BLUE,
      350
    );
  }
}

export default WinnerScene;
