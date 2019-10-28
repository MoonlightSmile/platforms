import * as Phaser from "phaser";
import Hello from "./scene/Hello";
import Start from "./scene/Start";
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 512,
  height: 544,
  physics: {
    arcade: {
      gravity: {
        y: 200
      },
      debug: true
    }
  },
  scene: [Hello, Start]
};
new Phaser.Game(config);
