import * as Phaser from "phaser";
import Player from "../sprite/Player";
class Start extends Phaser.Scene {
  bg: Phaser.GameObjects.TileSprite;
  player: Player;
  constructor() {
    super({ key: "start" });
  }
  public create() {
    const { width, height } = this.game.config;
    this.bg = this.add
      .tileSprite(0, 0, width as number, height as number, "background")
      .setOrigin(0, 0)
      .setScale(2);
    this.player = new Player(this);
  }
  public update() {
    this.bg.tilePositionY -= 0.3;
    this.player.update();
  }
}

export default Start;
