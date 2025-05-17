class Dice extends Phaser.GameObjects.Mesh {
  private readonly duration: number;
  private readonly shadowFX: Phaser.FX.Shadow;
  private diceIsRolling = false;

  constructor(scene: Phaser.Scene, x: number, y: number, duration = 1000) {
    super(scene, x, y, "dice-albedo");
    this.duration = duration;
    this.shadowFX = this.postFX.addShadow(0, 0, 0.006, 2, 0x111111, 10, 0.8);
    this.addVerticesFromObj("dice-obj", 0.15);
    this.panZ(6);
    this.setInteractive();
    this.modelRotation.x = Phaser.Math.DegToRad(0);
    this.modelRotation.y = Phaser.Math.DegToRad(-90);
    this.scene.add.existing(this);
  }

  public onRoll(callback: (diceValue: number) => Promise<void>) {
    this.on("pointerdown", () => {
      if (!this.diceIsRolling) {
        this.diceIsRolling = true;
        const diceRoll = Phaser.Math.Between(1, 6);

        this.scene.add.tween({
          targets: this.shadowFX,
          x: -8,
          y: 10,
          duration: this.duration - 250,
          ease: "Sine.easeInOut",
          yoyo: true,
        });

        this.scene.add.tween({
          targets: this,
          from: 0,
          to: 1,
          duration: this.duration,
          onUpdate: () => {
            this.modelRotation.x -= 0.02;
            this.modelRotation.y -= 0.08;
          },
          onComplete: () => {
            switch (diceRoll) {
              case 1:
                this.modelRotation.x = Phaser.Math.DegToRad(0);
                this.modelRotation.y = Phaser.Math.DegToRad(-90);
                break;
              case 2:
                this.modelRotation.x = Phaser.Math.DegToRad(90);
                this.modelRotation.y = Phaser.Math.DegToRad(0);
                break;
              case 3:
                this.modelRotation.x = Phaser.Math.DegToRad(180);
                this.modelRotation.y = Phaser.Math.DegToRad(0);
                break;
              case 4:
                this.modelRotation.x = Phaser.Math.DegToRad(180);
                this.modelRotation.y = Phaser.Math.DegToRad(180);
                break;
              case 5:
                this.modelRotation.x = Phaser.Math.DegToRad(-90);
                this.modelRotation.y = Phaser.Math.DegToRad(0);
                break;
              case 6:
                this.modelRotation.x = Phaser.Math.DegToRad(0);
                this.modelRotation.y = Phaser.Math.DegToRad(90);
                break;
            }
          },
          ease: "Sine.easeInOut",
        });

        this.scene.add.tween({
          targets: [this],
          duration: this.duration - 200,
          yoyo: true,

          ease: Phaser.Math.Easing.Quadratic.InOut,
          onComplete: async () => {
            this.scale = 1;
            if (callback !== undefined) {
              await callback(diceRoll);
              this.diceIsRolling = false;
            }
          },
        });
      }
    });
  }
}

export default Dice;
