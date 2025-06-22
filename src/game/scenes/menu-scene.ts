import { Button } from "../components";

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "menu" });
  }
  create() {
    this.cameras.main.setBackgroundColor("#ffffff");

    const htmlContainer = this.add
      .dom(+this.game.config.width / 2, +this.game.config.height / 2 - 100)
      .createFromCache("game-config-form");

    const quantityOfPlayersInput = htmlContainer.getChildByID(
      "quantity-of-players"
    )! as HTMLInputElement;

    new Button(
      this,
      +this.game.config.width / 2 - 105,
      +this.game.config.height / 2 + 80,
      "Como jogar",
      () => {
        this.scene.start("how-to-play");
      }
    );

    new Button(
      this,
      +this.game.config.width / 2 - 105,
      +this.game.config.height / 2,
      "Jogar",
      () => {
        const value = Number.isNaN(Number(quantityOfPlayersInput.value))
          ? 1
          : Number(quantityOfPlayersInput.value);

        this.scene.start("game", {
          quantityOfPlayers: value > 4 ? 4 : value < 1 ? 1 : value,
        });
      }
    );
  }
}

export default MenuScene;
