export type Tile = {
  x: number;
  y: number;
  width: number;
  height: number;
  type: TileType;
};

type TileType = "normal" | "start" | "end" | "luckOrSetback" | "missATurn";
