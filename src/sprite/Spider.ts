import * as Phaser from "phaser";
import Start from "../scene/Start";

class Spider extends Phaser.Physics.Arcade.Sprite {
  static SPEED: number = 100;
  public body: Phaser.Physics.Arcade.Body;
  public scene: Start;
  constructor(scene: Start, x: number, y: number) {
    super(scene, x, y, "spider");
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.world.enableBody(this);

    this._initAnims();
    this.play("crawl");
    this.setVelocityX(-Spider.SPEED);
  }
  private _initAnims(): void {
    this.scene.anims.create({
      key: "crawl",
      frames: [0, 1, 2].map(frame => ({ key: "spider", frame })),
      frameRate: 8,
      repeat: -1
    });
    this.scene.anims.create({
      key: "die",
      frames: [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3].map(frame => ({
        key: "spider",
        frame
      }))
    });
  }
  public die() {
    this.body.enable = false;
    this.play("die").once("animationcomplete", () => this.destroy());
  }
  public update(): void {
    if (this.body.touching.right || this.body.blocked.right) {
      this.body.velocity.x = -Spider.SPEED; // turn left
      this.setFlipX(false);
    } else if (this.body.touching.left || this.body.blocked.left) {
      this.body.velocity.x = Spider.SPEED; // turn right
      this.setFlipX(true);
    }
  }
}
export default Spider;
