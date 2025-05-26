import "./styles/reset.css";
import "./styles/index.css";
import { HEIGHT, WIDTH } from "./configs/dimensions";
import Game from "./game/scenes/game-scene";
import PreloadScene from "./game/scenes/pre-loading-scene";
import LoadingScene from "./game/scenes/loading-scene";
import GameOverScene from "./game/scenes/game-over";
import WinnerScene from "./game/scenes/winner-scene";
import MenuScene from "./game/scenes/menu-scene";
import HowToPlayScene from "./game/scenes/how-to-play-scene";

const gameConfig: Phaser.Types.Core.GameConfig = {
  width: WIDTH,
  height: HEIGHT,
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: "body",
  dom: {
    createContainer: true,
  },
  scene: [
    PreloadScene,
    LoadingScene,
    MenuScene,
    Game,
    GameOverScene,
    WinnerScene,
    HowToPlayScene,
  ],
  physics: {
    default: "arcade",
  },
};

new Phaser.Game(gameConfig);
