type TileType = "normal" | "start" | "end" | "luckOrSetback" | "missATurn";

export type Tile = {
	x: number;
	y: number;
	width: number;
	height: number;
	type: TileType;
};

export type PowerUpType = "advanceAdvantage" | "retreatDisadvantage";
