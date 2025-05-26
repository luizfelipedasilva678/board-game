import { Text, Button } from "../components";

class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "gameover" });
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
      "Todos os jogadores morreram",
      {
        fontSize: "20px",
      }
    ).setOrigin(0.5);

    new Button(
      this,
      +this.game.config.width / 2 - 100,
      +this.game.config.height / 2 + 100,
      "Reiniciar",
      () => {
        this.scene.start("menu");
      }
    );
  }
}

export default GameOverScene;
