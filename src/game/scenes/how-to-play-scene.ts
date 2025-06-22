import { Text } from "../components";

class HowToPlayScene extends Phaser.Scene {
  constructor() {
    super({ key: "how-to-play" });
  }

  create() {
    this.cameras.main.setBackgroundColor("#ffffff");

    const close = this.add.image(+this.game.config.width - 70, 50, "close");
    close.scale = 0.05;

    close.setInteractive();
    close.on("pointerdown", () => {
      this.scene.start("menu");
    });

    new Text(this, +this.game.config.width / 2, 20, "Como Jogar").setOrigin(
      0.5
    );

    new Text(
      this,
      +this.game.config.width / 2,
      150,
      [
        " - Na sua vez, role o dado e o seu peão vai avançar de acordo com o número sorteado",
        ' - Se cair em uma casa marcada com "?" um sorte ou revés pode sair',
        " - A cada turno o monstro aparece em uma casa aleatória",
        " - Se o monstro aparecer na sua casa você é eliminado",
        " - Ganha quem chegar ao fim do tabuleiro primeiro",
      ],
      {
        fontSize: "28px",
      }
    ).setOrigin(0.5);
  }
}

export default HowToPlayScene;
