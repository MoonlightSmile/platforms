import * as Phaser from "phaser";
class Hello extends Phaser.Scene {
  bg: Phaser.GameObjects.TileSprite;
  public constructor() {
    super({ key: "hello" });
  }
  public preload() {
    this.load.image("background", "assets/images/background.png");
    //
    this.load.spritesheet("ship", "assets/spritesheets/ship.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("ship2", "assets/spritesheets/ship2.png", {
      frameWidth: 32,
      frameHeight: 16
    });
    this.load.spritesheet("ship3", "assets/spritesheets/ship3.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("explosion", "assets/spritesheets/explosion.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("power-up", "assets/spritesheets/power-up.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("player", "assets/spritesheets/player.png", {
      frameWidth: 16,
      frameHeight: 24
    });
    this.load.spritesheet("beam", "assets/spritesheets/beam.png", {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.bitmapFont(
      "pixelFont",
      "assets/font/font.png",
      "assets/font/font.xml"
    );

    // 1.1 load sounds in both formats mp3 and ogg
    this.load.audio("audio_beam", [
      "assets/sounds/beam.ogg",
      "assets/sounds/beam.mp3"
    ]);
    this.load.audio("audio_explosion", [
      "assets/sounds/explosion.ogg",
      "assets/sounds/explosion.mp3"
    ]);
    this.load.audio("audio_pickup", [
      "assets/sounds/pickup.ogg",
      "assets/sounds/pickup.mp3"
    ]);
    this.load.audio("music", [
      "assets/sounds/sci-fi_platformer12.ogg",
      "assets/sounds/sci-fi_platformer12.mp3"
    ]);
  }
  public create() {
    const { width, height } = this.game.config;
    this.bg = this.add
      .tileSprite(0, 0, width as number, height as number, "background")
      .setOrigin(0, 0)
      .setScale(2);
  }
  public update() {
    this.bg.tilePositionY -= 0.3;
  }
}

export default Hello;
