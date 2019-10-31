import * as Phaser from "phaser";
class Hello extends Phaser.Scene {
  public constructor() {
    super({ key: "hello" });
  }
  public preload() {
    this.load.json("level:0", "data/level00.json");
    this.load.json("level:1", "data/level01.json");

    this.load.bitmapFont("font", "images/font.png", "images/font.fnt");

    this.load.image("icon:coin", "images/coin_icon.png");
    this.load.image("background", "images/background.png");
    this.load.image("invisible-wall", "images/invisible_wall.png");
    this.load.image("ground", "images/ground.png");
    this.load.image("grass:8x1", "images/grass_8x1.png");
    this.load.image("grass:6x1", "images/grass_6x1.png");
    this.load.image("grass:4x1", "images/grass_4x1.png");
    this.load.image("grass:2x1", "images/grass_2x1.png");
    this.load.image("grass:1x1", "images/grass_1x1.png");
    this.load.image("key", "images/key.png");

    this.load.spritesheet("decoration", "images/decor.png", {
      frameWidth: 42,
      frameHeight: 42
    });
    this.load.spritesheet("hero", "images/hero.png", {
      frameWidth: 36,
      frameHeight: 42
    });
    this.load.spritesheet("coin", "images/coin_animated.png", {
      frameWidth: 22,
      frameHeight: 22
    });
    this.load.spritesheet("spider", "images/spider.png", {
      frameWidth: 42,
      frameHeight: 32
    });
    this.load.spritesheet("door", "images/door.png", {
      frameWidth: 42,
      frameHeight: 66
    });
    this.load.spritesheet("icon:key", "images/key_icon.png", {
      frameWidth: 34,
      frameHeight: 30
    });

    this.load.audio("sfx:jump", "audio/jump.wav");
    this.load.audio("sfx:coin", "audio/coin.wav");
    this.load.audio("sfx:key", "audio/key.wav");
    this.load.audio("sfx:stomp", "audio/stomp.wav");
    this.load.audio("sfx:door", "audio/door.wav");
    this.load.audio("bgm", ["audio/bgm.mp3", "audio/bgm.ogg"]);
  }
  public create() {
    this.anims.create({
      key: "rotate",
      frames: [0, 1, 2, 1].map(frame => ({ key: "coin", frame })),
      frameRate: 6,
      repeat: -1
    });
    this.scene.start("start");
  }
}

export default Hello;
