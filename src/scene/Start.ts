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
  public spiders: Phaser.Physics.Arcade.Group;
  public enemyWalls: Phaser.Physics.Arcade.StaticGroup;
  constructor() {
    super({ key: "start" });
  }

  public create() {
    this.background = this.add.image(0, 0, "background").setOrigin(0, 0);
    this.platforms = this.physics.add.staticGroup();
    this.coins = this.physics.add.staticGroup();
    this.enemyWalls = this.physics.add.staticGroup();
    this.spiders = this.physics.add.group();
    this._loadLevel(this.cache.json.get("level:1"));
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.hero, this.platforms);
    this.physics.add.collider(this.spiders, this.platforms);
    this.physics.add.collider(this.spiders, this.platforms);
    this.physics.add.collider(this.spiders, this.enemyWalls);
    this.physics.add.overlap(this.hero, this.coins, this._eatCoin, null, this);
  }
  private _eatCoin(hero: Player, coin: Phaser.GameObjects.GameObject): void {
    this.sound.play("sfx:coin");
    coin.destroy();
  }
  private _loadLevel(json: Level): void {
    const { platforms, hero, coins, spiders } = json;
    platforms.forEach(this.__spawnPlatform, this);
    coins.forEach(this._spawnCoin, this);
    spiders.forEach(this._spawnSpider, this);
    this.hero = new Player(this, hero.x, hero.y);
  }
  private _spawnSpider(spider: Point) {
    const { x, y } = spider;
    this.spiders.add(new Spider(this, x, y));
  }
  private _spawnEnemyWall(x: number, y: number, side: "left" | "right") {
    this.enemyWalls
      .create(x, y, "invisible-wall")
      .setOrigin(side === "left" ? 1 : 0, 1)
      .refreshBody();
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

    if (up.isDown) {
      this.hero.jump();
    }
  }

  public update() {
    this._inputHander();
    this.spiders.getChildren().forEach(spider => spider.update());
  }
}

export default Start;
