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
    this._initAnims();
    this.play("stop");
    this.setCollideWorldBounds(true);
  }

  private _initAnims(): void {
    this.scene.anims.create({
      key: "stop",
      frames: [{ key: "hero", frame: 0 }]
    });
    this.scene.anims.create({
      key: "run",
      frames: [1, 2].map(frame => ({ key: "hero", frame })),
      frameRate: 8,
      repeat: -1
    });
    this.scene.anims.create({
      key: "jump",
      frames: [{ key: "hero", frame: 3 }]
    });
    this.scene.anims.create({
      key: "fall",
      frames: [{ key: "hero", frame: 4 }]
    });
    this.scene.anims.create({
      key: "player_die",
      frames: [5, 6, 5, 6, 5, 6, 5, 6].map(frame => ({ key: "hero", frame })),
      frameRate: 8
    });
    this.on("animationcomplete", (a: any) => {
      const { key } = a;
      if (key === "player_die") {
        this.body.setEnable(true);
        this.scene.scene.restart();
      }
    });
  }
  private _getAnimationName(): string {
    let name = "stop";
    const {
      velocity: { x, y },
      touching: { down }
    } = this.body;
    if (!this.body.enable) {
      name = "player_die";
    } else if (y < 0) {
      name = "jump";
    } else if (y >= 0 && !down) {
      name = "fall";
    } else if (x !== 0 && down) {
      name = "run";
    }
    return name;
  }
  public bound(): void {
    this.setVelocityY(-200);
  }
  public move(step: number): void {
    this.body.setVelocityX(step * this.speed);

    if (step > 0) {
      this.setFlipX(false);
    } else if (step < 0) {
      this.setFlipX(true);
    }
  }
  public die(): void {
    this.body.setEnable(false);

    // this.scene.scene.restart();
  }
  public jump(): void {
    const canJump = this.body.touching.down;
    if (canJump) {
      this.body.setVelocityY(-600);
      this.scene.sound.play("sfx:jump");
    }
  }
  public update(): void {
    this.play(this._getAnimationName(), true);
  }
}
export default Player;
