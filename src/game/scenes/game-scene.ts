import Phaser from "phaser";
import { Text, Tile } from "../components";
import boardTiles from "../../configs/board";
import powerUps from "../../configs/power-ups";
import getRandomArbitrary from "../../utils";
import { LIGHT_BLUE, OCEAN_BLUE, SKY_BLUE } from "../../configs/colors";

const PLAYER_1_X_OFFSET = 50;
const PLAYER_1_Y_OFFSET = 50;

const PLAYER_2_X_OFFSET = 100;
const PLAYER_2_Y_OFFSET = 50;

class Game extends Phaser.Scene {
	private players: ("player1" | "player2")[] = ["player1", "player2"];
	private turnIdx = 0;
	private missingTurn = new Set();
	private currentPlayer: "player1" | "player2" | "none" = "player1";
	private player1: Phaser.GameObjects.Rectangle | null = null;
	private player2: Phaser.GameObjects.Rectangle | null = null;
	private currentPlayerText: Phaser.GameObjects.Text | null = null;
	private turnText: Phaser.GameObjects.Text | null = null;
	private turn = 1;

	constructor() {
		super({ key: "game" });
	}

	preload() {
		this.load.image("sky", "../assets/sky.png");
	}

	getFormattedPlayerName(player: string) {
		return player === "player1"
			? "Jogador 1 (Peão preto)"
			: "Jogador 2 (Peão verde)";
	}

	getPlayerCurrentTile(
		player: Phaser.GameObjects.Rectangle,
		xOffset: number,
		yOffset: number,
	) {
		for (let i = 0; i < boardTiles.length; i++) {
			if (
				player.x === boardTiles[i].x + xOffset &&
				player.y === boardTiles[i].y + yOffset
			) {
				return i;
			}
		}

		return 0;
	}

	makeMovement(
		player: Phaser.GameObjects.Rectangle,
		currentTile: number,
		steps: number,
		xOffset: number,
		yOffset: number,
		direction: "forward" | "backward" = "forward",
	) {
		return new Promise<void>((resolve) => {
			const sequence = [];

			if (direction === "backward") {
				let i = 0;
				while (i !== steps + 1 && currentTile >= 0) {
					sequence.push({
						x: boardTiles[currentTile].x + xOffset,
						y: boardTiles[currentTile].y + yOffset,
						duration: 500,
						ease: "Linear",
					});

					currentTile--;
					i++;
				}
			} else {
				for (let i = currentTile; i <= steps; i++) {
					sequence.push({
						x: boardTiles[i].x + xOffset,
						y: boardTiles[i].y + yOffset,
						duration: 500,
						ease: "Linear",
					});
				}
			}

			this.tweens.chain({
				targets: player,
				tweens: sequence,
				onComplete: () => {
					resolve();
				},
			});
		});
	}

	getCurrentPlayer() {
		if (this.currentPlayer === "player1") {
			return {
				player: this.player1!,
				xOffset: PLAYER_1_X_OFFSET,
				yOffset: PLAYER_1_Y_OFFSET,
			};
		}

		return {
			player: this.player2!,
			xOffset: PLAYER_2_X_OFFSET,
			yOffset: PLAYER_2_Y_OFFSET,
		};
	}

	async handleLuckOrSetback() {
		let newPosition = 0;
		const idx = getRandomArbitrary(0, powerUps.length);
		const powerUp = powerUps[idx];
		const { player, xOffset, yOffset } = this.getCurrentPlayer();
		const currentPlayerPosition = this.getPlayerCurrentTile(
			player,
			xOffset,
			yOffset,
		);

		if (powerUp.type === "advanceAdvantage") {
			newPosition =
				currentPlayerPosition + (powerUp?.advance ?? 0) > boardTiles.length - 1
					? boardTiles.length - 1
					: currentPlayerPosition + (powerUp?.advance ?? 0);

			await this.makeMovement(
				player,
				currentPlayerPosition,
				newPosition,
				xOffset,
				yOffset,
			);
		}

		if (powerUp.type === "retreatDisadvantage") {
			await this.makeMovement(
				player,
				currentPlayerPosition,
				powerUp?.retreat ?? 0,
				xOffset,
				yOffset,
				"backward",
			);
		}

		if (boardTiles[newPosition].type === "luckOrSetback") {
			await this.handleLuckOrSetback();
		}
	}

	createBoard() {
		for (const tile of boardTiles) {
			switch (tile.type) {
				case "start":
					this.add.container(tile.x, tile.y, [
						new Tile(this, 0, 0, tile.width, tile.height, LIGHT_BLUE),
						new Text(this, 5, 35, "Início"),
					]);
					break;
				case "normal":
					new Tile(this, tile.x, tile.y, tile.width, tile.height, LIGHT_BLUE);
					break;
				case "luckOrSetback":
					this.add.container(tile.x, tile.y, [
						new Tile(this, 0, 0, tile.width, tile.height, OCEAN_BLUE),
						new Text(this, 47, 25, "?", { fontSize: "60px", align: "center" }),
					]);
					break;
				case "missATurn":
					this.add.container(tile.x, tile.y, [
						new Tile(this, 0, 0, tile.width, tile.height, SKY_BLUE),
						new Text(this, 14, 7, ["Perca", "Um", "Turno"], {
							align: "center",
						}),
					]);
					break;
				case "end":
					this.add.container(tile.x, tile.y, [
						new Tile(this, 0, 0, tile.width, tile.height, LIGHT_BLUE),
						new Text(this, 30, 35, "Fim"),
					]);
					break;
				default:
					break;
			}
		}
	}

	initBackground() {
		this.add
			.rectangle(
				0,
				0,
				+this.game.config.width,
				+this.game.config.height,
				0xffffff,
			)
			.setOrigin(0, 0);
	}

	create() {
		this.initBackground();
		this.createBoard();

		this.turnText = this.add.text(1000, 0, `Turno: ${this.turn}`, {
			fontSize: "32px",
			color: "#000000",
		});

		this.player1 = this.add.rectangle(
			boardTiles[0].x + PLAYER_1_X_OFFSET,
			boardTiles[0].y + PLAYER_1_Y_OFFSET,
			20,
			20,
			0x000000,
		);
		this.player2 = this.add.rectangle(
			boardTiles[0].x + PLAYER_2_X_OFFSET,
			boardTiles[0].y + PLAYER_2_Y_OFFSET,
			20,
			20,
			0x0304020,
		);

		const diceButtonRect = this.add.rectangle(0, 0, 300, 100, 0x000000);
		this.add.container(170, 800, [
			diceButtonRect,
			this.add
				.text(0, 0, "Sortear número", {
					fontSize: "32px",
					color: "#ffff",
				})
				.setOrigin(0.5),
		]);

		this.currentPlayerText = this.add.text(
			325,
			900,
			`Turno do ${this.getFormattedPlayerName(this.currentPlayer)}`,
			{
				fontSize: "32px",
				color: "#000000",
			},
		);

		this.currentPlayerText.setOrigin(0.5);

		diceButtonRect.setInteractive();
		let isCallbackActive = false;
		diceButtonRect.on("pointerdown", async () => {
			if (isCallbackActive) return;

			isCallbackActive = true;
			this.turn++;

			if (this.currentPlayer !== "none") {
				const number = getRandomArbitrary(1, 7);
				const { xOffset, yOffset, player } = this.getCurrentPlayer();
				const currentPlayerPosition = this.getPlayerCurrentTile(
					player,
					xOffset,
					yOffset,
				);
				const newPosition =
					currentPlayerPosition + number > boardTiles.length - 1
						? boardTiles.length - 1
						: currentPlayerPosition + number;

				await this.makeMovement(
					player,
					currentPlayerPosition,
					newPosition,
					xOffset,
					yOffset,
				);

				const tile = boardTiles[newPosition];

				if (tile.type === "luckOrSetback") {
					await this.handleLuckOrSetback();
				}

				if (
					boardTiles[this.getPlayerCurrentTile(player, xOffset, yOffset)]
						.type === "missATurn"
				) {
					this.missingTurn.add(
						this.players.filter((player) => player === this.currentPlayer)[0],
					);
				}
			}

			let nextPlayer: "player1" | "player2" | "none" = "none";

			for (let i = 0; i < this.players.length; i++) {
				this.turnIdx = (this.turnIdx + 1) % this.players.length;

				if (!this.missingTurn.has(this.players[this.turnIdx])) {
					nextPlayer = this.players[this.turnIdx];
					break;
				}

				this.missingTurn.delete(this.players[this.turnIdx]);
			}

			this.currentPlayer = nextPlayer;
			isCallbackActive = false;
		});
	}

	update() {
		this.currentPlayerText?.setText(
			`Turno do ${this.getFormattedPlayerName(this.currentPlayer)}`,
		);

		this.turnText?.setText(`Turno: ${this.turn}`);
	}
}

export default Game;
