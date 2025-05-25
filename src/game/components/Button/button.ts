import { LIGHT_BLUE } from "../../../configs/colors";
import Text from "../Text";

class Button extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    onClick: () => void,
    color = LIGHT_BLUE,
    width = 200,
    height = 60
  ) {
    super(scene, x, y);
    this.scene.add.existing(this);

    const rectangle = this.scene.add.graphics({
      x: 0,
      y: 0,
    });
    rectangle.fillStyle(color, 1);
    rectangle.fillRect(0, 0, width, height);
    rectangle.lineStyle(2, 0x000000, 1);
    rectangle.strokeRect(0, 0, width, height);

    this.setSize(width, height);
    this.setInteractive();
    this.add([
      rectangle,
      new Text(this.scene, width / 2, height / 2, text).setOrigin(0.5),
    ]);

    this.on("pointerdown", onClick);
  }
}

export default Button;
