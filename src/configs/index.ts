import Phaser from "phaser";
import Game from "../game/scenes/game-scene";
import type { Tile } from "../typings";

const WIDTH = 1360;
const HEIGHT = window.innerHeight;
const TILE_WIDTH = 130;
const TILE_HEIGHT = 100;

const gameConfig: Phaser.Types.Core.GameConfig = {
  width: WIDTH,
  height: HEIGHT,
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Game],
  physics: {
    default: "arcade",
  },
};

const boardTiles: Tile[] = [
  { x: 20, y: 20, type: "start", width: TILE_WIDTH, height: TILE_HEIGHT },
  { x: 20, y: 120, type: "normal", width: TILE_WIDTH, height: TILE_HEIGHT },
  {
    x: 20,
    y: 220,
    type: "luckOrSetback",
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
  },
  { x: 20, y: 320, type: "normal", width: TILE_WIDTH, height: TILE_HEIGHT },
  { x: 20, y: 420, type: "normal", width: TILE_WIDTH, height: TILE_HEIGHT },
  {
    x: 20,
    y: 520,
    type: "luckOrSetback",
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
  },
  { x: 20, y: 620, type: "normal", width: TILE_WIDTH, height: TILE_HEIGHT },
  { x: 150, y: 620, type: "missATurn", width: TILE_WIDTH, height: TILE_HEIGHT },
  {
    x: 280,
    y: 620,
    type: "normal",
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
  },
  { x: 280, y: 520, type: "normal", width: TILE_WIDTH, height: TILE_HEIGHT },
  {
    x: 280,
    y: 420,
    type: "luckOrSetback",
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
  },
  {
    x: 280,
    y: 320,
    type: "normal",
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
  },
  { x: 280, y: 220, type: "normal", width: TILE_WIDTH, height: TILE_HEIGHT },
  {
    x: 280,
    y: 120,
    type: "luckOrSetback",
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
  },
  { x: 280, y: 20, type: "normal", width: TILE_WIDTH, height: TILE_HEIGHT },
  { x: 410, y: 20, type: "missATurn", width: TILE_WIDTH, height: TILE_HEIGHT },
  {
    x: 540,
    y: 20,
    type: "luckOrSetback",
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
  },
  { x: 540, y: 120, type: "normal", width: TILE_WIDTH, height: TILE_HEIGHT },
  { x: 540, y: 220, type: "normal", width: TILE_WIDTH, height: TILE_HEIGHT },
  {
    x: 540,
    y: 320,
    type: "luckOrSetback",
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
  },
  { x: 540, y: 420, type: "normal", width: TILE_WIDTH, height: TILE_HEIGHT },
  { x: 540, y: 520, type: "normal", width: TILE_WIDTH, height: TILE_HEIGHT },
  {
    x: 540,
    y: 620,
    type: "luckOrSetback",
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
  },
  { x: 670, y: 620, type: "missATurn", width: TILE_WIDTH, height: TILE_HEIGHT },
  { x: 800, y: 620, type: "normal", width: TILE_WIDTH, height: TILE_HEIGHT },
  { x: 800, y: 520, type: "normal", width: TILE_WIDTH, height: TILE_HEIGHT },
  {
    x: 800,
    y: 420,
    type: "luckOrSetback",
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
  },
  { x: 800, y: 320, type: "normal", width: TILE_WIDTH, height: TILE_HEIGHT },
  { x: 800, y: 220, type: "normal", width: TILE_WIDTH, height: TILE_HEIGHT },
  {
    x: 800,
    y: 120,
    type: "luckOrSetback",
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
  },
  { x: 800, y: 20, type: "end", width: TILE_WIDTH, height: TILE_HEIGHT },
];

export { gameConfig, boardTiles, WIDTH, HEIGHT };
