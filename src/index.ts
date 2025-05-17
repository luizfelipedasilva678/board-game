import "./styles/reset.css";
import "./styles/index.css";
import { HEIGHT, WIDTH } from "./configs/dimensions";
import Game from "./game/scenes/game-scene";
import PreloadScene from "./game/scenes/pre-loading-scene";
import LoadingScene from "./game/scenes/loading-scene";

const gameConfig: Phaser.Types.Core.GameConfig = {
  width: WIDTH,
  height: HEIGHT,
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [PreloadScene, LoadingScene, Game],
  physics: {
    default: "arcade",
  },
};

const game = new Phaser.Game(gameConfig);
