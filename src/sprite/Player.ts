import * as Phaser from "phaser";
import Start from "../scene/Start";

class Player extends Phaser.Physics.Arcade.Sprite {
  public speed: number = 0;
  public body: Phaser.Physics.Arcade.Body;
  public scene: Start;
  constructor(scene: Start, x: number, y: number, speed: number = 200) {
    super(scene, x, y, "hero");
    this.scene = scene;
    this.speed = speed;
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    // this.setBounceY(0.2);

    this.setCollideWorldBounds(true);
  }
  public move(step: number) {
    this.body.setVelocityX(step * this.speed);
  }
  public jump() {
    const canJump = this.body.touching.down;
    if (canJump) {
      this.body.setVelocityY(-600);
      this.scene.sound.play("sfx:jump");
    }
  }
}
export default Player;
