import Phaser from "phaser";
import Webfont from "webfontloader";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "preloader" });
  }

  create() {
    Webfont.load({
      custom: {
        families: ["PoetsenOne"],
      },
      active: () => {
        this.scene.start("loading");
      },
    });
  }
}

export default PreloadScene;
