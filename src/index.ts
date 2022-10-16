import * as Phaser from "phaser";
import { GameScene } from "./scenes/Game";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.ScaleModes.NONE,
    width: 800,
    height: 608,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 700 },
      debug: false,
    },
  },
  scene: [GameScene],
};

let game = new Phaser.Game(config);