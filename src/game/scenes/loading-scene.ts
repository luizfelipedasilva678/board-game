import Phaser from "phaser";
import { Text } from "../components";
import diceAlbedoUrl from "/dice-albedo.png?url";
import diceObjUrl from "/dice.obj?url";
import pawnUrl from "/pawn.png?url";
import closeUrl from "/close.svg?url";
import monsterUrl from "/monster.png?url";
import gameConfigFormUrl from "/html/game-config-form.html?url";

class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: "loading" });
  }

  preload() {
    this.load.image("dice-albedo", diceAlbedoUrl);
    this.load.obj("dice-obj", diceObjUrl);
    this.load.image("pawn", pawnUrl);
    this.load.image("close", closeUrl);
    this.load.image("monster", monsterUrl);
    this.load.html("game-config-form", gameConfigFormUrl);

    new Text(
      this,
      +this.game.config.width / 2,
      +this.game.config.height / 2,
      "Carregando..."
    ).setOrigin(0.5);
  }

  create() {
    this.cameras.main.setBackgroundColor("#ffffff");
    this.scene.start("menu");
  }
}

export default LoadingScene;
