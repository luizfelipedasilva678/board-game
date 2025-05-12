class Tile extends Phaser.GameObjects.Graphics {
	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		width: number,
		height: number,
		color: number,
	) {
		super(scene, { x, y });
		this.lineStyle(2, 0x000000, 1);
		this.fillStyle(color, 1);
		this.fillRect(0, 0, width, height);
		this.strokeRect(0, 0, width, height);
		this.scene.add.existing(this);
	}
}

export default Tile;
