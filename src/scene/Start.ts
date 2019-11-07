import * as Phaser from "phaser";
import Spider from "../sprite/Spider";
import Player from "../sprite/Player";
import { Level, Point } from "../types/game";
class Start extends Phaser.Scene {
  public cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  public background: Phaser.GameObjects.Image;
  public hero: Player;
  public platforms: Phaser.Physics.Arcade.StaticGroup;
  public coins: Phaser.Physics.Arcade.StaticGroup;
  public spiders: Phaser.GameObjects.Group;
  public enemyWalls: Phaser.Physics.Arcade.StaticGroup;
  public hud: Phaser.GameObjects.Group;
  public coinPickupCount: number = 0;
  public count: Phaser.GameObjects.BitmapText;
  public key: Phaser.Physics.Arcade.Sprite;
  public door: Phaser.Physics.Arcade.Sprite;
  public hasKey: boolean;
  public keyIcon: Phaser.GameObjects.Sprite;
  public level: number;
  constructor() {
    super({ key: "start" });
    this.hasKey = false;
    this.level = 0;
  }

  public create() {
    this.cameras.main.flash(300, 0, 0, 0);
    this.sound.stopAll();
    this.sound.play("bgm", { loop: true });
    this.background = this.add.image(0, 0, "background").setOrigin(0, 0);

    this.platforms = this.physics.add.staticGroup();
    this.coins = this.physics.add.staticGroup();
    this.enemyWalls = this.physics.add.staticGroup();
    this.spiders = this.add.group();
    this.hud = this.add.group();

    this._loadLevel(this.cache.json.get(`level:${this.level}`));
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this._createHud();

    this.physics.add.collider(this.hero, this.platforms);
    this.physics.add.collider(this.spiders, this.platforms);
    this.physics.add.collider(this.spiders, this.platforms);
    this.physics.add.collider(this.spiders, this.enemyWalls);

    this.physics.add.overlap(this.hero, this.coins, this._eatCoin, null, this);
    this.physics.add.overlap(this.hero, this.key, this._getKey, null, this);
    this.physics.add.overlap(this.hero, this.door, this._touchDoor, null, this);
    this.physics.add.overlap(
      this.hero,
      this.spiders,
      this._onHeroVsEnemy,
      null,
      this
    );
  }
  private _touchDoor(hero: Player, door: Phaser.Physics.Arcade.Sprite): void {
    if (this.hasKey) {
      this.sound.play("sfx:door");
      this.hasKey = false;
      this.level += 1;
      this.scene.restart();
    }
  }
  private _getKey(hero: Player, key: Phaser.Physics.Arcade.Sprite): void {
    this.hasKey = true;
    this.sound.play("sfx:key");
    key.destroy();
  }
  private _eatCoin(hero: Player, coin: Phaser.GameObjects.GameObject): void {
    this.coinPickupCount += 1;
    this.sound.play("sfx:coin");
    coin.destroy();
  }
  private _createHud(): void {
    // ...
    this.keyIcon = this.hud.create(10, 13, "icon:key").setOrigin(0, 0);
    const icon = this.hud
      .create(this.keyIcon.x + this.keyIcon.width + 10, 10, "icon:coin")
      .setOrigin(0, 0);
    this.count = this.add.bitmapText(
      icon.x + icon.width + 5,
      icon.height / 2,
      "font",
      "0"
    );
    this.hud.add(this.count);
  }
  private _loadLevel(json: Level): void {
    const { platforms, hero, coins, spiders, key, door, decoration } = json;
    this.key = this.physics.add.staticSprite(key.x, key.y, "key");
    decoration.forEach(({ x, y, frame }) => {
      this.add.image(x, y, "decoration", frame).setOrigin(0, 0);
    });
    this.door = this.physics.add
      .staticSprite(door.x, door.y, "door")
      .setOrigin(1, 1)
      .refreshBody();
    this.add.tween({
      targets: this.key,
      duration: 800,
      y: "+=6",
      ease: "Sine.easeInOut",
      repeat: -1,
      yoyo: true
    });
    platforms.forEach(this.__spawnPlatform, this);
    coins.forEach(this._spawnCoin, this);
    spiders.forEach(this._spawnSpider, this);
    this.hero = new Player(this, hero.x, hero.y);
  }
  private _spawnSpider(spider: Point) {
    const { x, y } = spider;
    this.spiders.add(new Spider(this, x, y));
  }
  private _onHeroVsEnemy(hero: Player, spider: Spider): void {
    if (hero.body.velocity.y) {
      hero.bound();
      spider.die();
      this.sound.play("sfx:stomp");
    } else {
      this.sound.play("sfx:stomp");
      this.hasKey = false;
      hero.die();
    }
  }
  private _spawnEnemyWall(x: number, y: number, side: "left" | "right") {
    this.enemyWalls
      .create(x, y, "invisible-wall")
      .setOrigin(side === "left" ? 1 : 0, 1)
      .refreshBody().visible = false;
  }
  private __spawnPlatform(platform: Point): void {
    const { x, y, image } = platform;
    const platformObj = this.platforms
      .create(x, y, image)
      .setOrigin(0, 0)
      .refreshBody();
    this._spawnEnemyWall(x, y, "left");
    this._spawnEnemyWall(x + platformObj.width, y, "right");
  }
  private _spawnCoin(icon: Point): void {
    const { x, y } = icon;
    this.coins.create(x, y, "coin").play("rotate");
  }
  private _inputHander(): void {
    const { left, right, up, down } = this.cursorKeys;
    if (left.isDown) {
      this.hero.move(-1);
    } else if (right.isDown) {
      this.hero.move(1);
    } else {
      this.hero.move(0);
    }
    if (Phaser.Input.Keyboard.JustDown(up)) {
      this.hero.jump();
    }
  }

  public update() {
    this._inputHander();
    this.count.text = `x${String(this.coinPickupCount)}`;
    this.spiders.getChildren().forEach(spider => spider.update());
    this.hero.update();
    this.keyIcon.setFrame(this.hasKey ? 1 : 0);
    this.door.setFrame(this.hasKey ? 1 : 0);
  }
}

export default Start;
