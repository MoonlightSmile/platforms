import * as Phaser from "phaser";
const speed = 200;

class Player extends Phaser.GameObjects.Sprite {
  public cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  public body: Phaser.Physics.Arcade.Body;
  constructor(scene: Phaser.Scene) {
    const { width, height } = scene.game.config;
    super(scene, (width as number) / 2, (height as number) - 100, "player");
    scene.add.existing(this);
    this.play("thrust");
    this.cursorKeys = scene.input.keyboard.createCursorKeys();
    scene.physics.world.enableBody(this);
    this.body.collideWorldBounds = true;
  }
  public update() {
    const { up, down, left, right } = this.cursorKeys;
    const body = this.body;
    if (left.isDown) {
      body.setVelocityX(-speed);
    } else if (right.isDown) {
      body.setVelocityX(speed);
    } else {
      body.setVelocityX(0);
    }
    if (up.isDown) {
      body.setVelocityY(-speed);
    } else if (down.isDown) {
      body.setVelocityY(speed);
    } else {
      body.setVelocityY(0);
    }
  }
}
export default Player;
