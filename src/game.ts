import * as Phaser from "phaser";
import Loading from "./scene/Loading";
import Start from "./scene/Start";
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 960,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1200 },
      debug: false
    }
  },
  scene: [Loading, Start]
};
new Phaser.Game(config);
