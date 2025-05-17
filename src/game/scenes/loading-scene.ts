import Phaser from "phaser";

class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: "loading" });
  }

  preload() {
    this.load.image("dice-albedo", "/dice-albedo.png");
    this.load.obj("dice-obj", "/dice.obj");

    this.add.text(
      +this.game.config.width / 2,
      +this.game.config.height / 2,
      "Carregando..."
    );
  }

  create() {
    console.log("loading");
    this.scene.start("game");
  }
}

export default LoadingScene;
