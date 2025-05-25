import Phaser from "phaser";
import { Text } from "../components";

class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: "loading" });
  }

  preload() {
    this.load.image("dice-albedo", "/dice-albedo.png");
    this.load.obj("dice-obj", "/dice.obj");
    this.load.image("pawn", "/pawn.png");
    this.load.image("monster", "/monster.png");

    new Text(
      this,
      +this.game.config.width / 2,
      +this.game.config.height / 2,
      "Carregando..."
    ).setOrigin(0.5);
  }

  create() {
    this.cameras.main.setBackgroundColor("#ffffff");
    this.scene.start("game");
  }
}

export default LoadingScene;
