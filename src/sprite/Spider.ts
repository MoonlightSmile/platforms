import * as Phaser from "phaser";
import Start from "../scene/Start";

class Spider extends Phaser.Physics.Arcade.Sprite {
  static SPEED: number = 200;
  public body: Phaser.Physics.Arcade.Body;
  public scene: Start;
  constructor(scene: Start, x: number, y: number) {
    super(scene, x, y, "spider");
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.body.velocity.x = Spider.SPEED;
  }

  public reverse() {
    this.body.velocity.x *= -1;
  }
  public update(): void {
    if (this.body.touching.right || this.body.blocked.right) {
      this.body.velocity.x = -Spider.SPEED; // turn left
    } else if (this.body.touching.left || this.body.blocked.left) {
      this.body.velocity.x = Spider.SPEED; // turn right
    }
  }
}
export default Spider;
