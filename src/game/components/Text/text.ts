class Text extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string | string[],
    style: Phaser.Types.GameObjects.Text.TextStyle = {}
  ) {
    super(scene, x, y, text, {
      fontSize: "32px",
      color: "#000000",
      ...style,
    });
    this.scene.add.existing(this);
  }
}

export default Text;
