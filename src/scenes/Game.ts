import Phaser from "phaser";

export class GameScene extends Phaser.Scene {
    public player: Phaser.Physics.Arcade.Sprite;
    public cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    public speed = 100;

    constructor() {
        super({ key: "MainScene" });
    }

    preload() {
        this.load.image("tiles", "https://cors-anywhere.herokuapp.com/https://cdn.discordapp.com/attachments/853488449038581770/1030798917798989834/dark_castle_tileset.png");
        this.load.tilemapTiledJSON("map", "https://cors-anywhere.herokuapp.com/https://cdn.discordapp.com/attachments/853488449038581770/1030802194955518022/main.json");
        this.load.atlas("player", "https://cors-anywhere.herokuapp.com/https://cdn.discordapp.com/attachments/853488449038581770/1030860748026564700/player.png", "https://cors-anywhere.herokuapp.com/https://cdn.discordapp.com/attachments/853488449038581770/1030860747066069052/player.json")
    }

    create() {
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("dark_castle_tileset", "tiles");
        const base = map.createLayer("base", tileset, 0, 0);
        const background = map.createLayer("background", tileset, 0, 0);
        const misc = map.createLayer("misc", tileset, 0, 0);
        const base2 = map.createLayer("base2", tileset, 0, 0);

        base.setCollisionByExclusion([-1], true)
        base2.setCollisionByExclusion([-1], true)

        this.player = this.physics.add.sprite(50, 200, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, base);
        this.physics.add.collider(this.player, base2);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'player-',
                start: 3,
                end: 5,
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'player-',
                start: 6,
                end: 8,
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'player-',
                start: 9,
                end: 11,
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'player-',
                start: 0,
                end: 2,
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1.3);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-this.speed);
            this.player.anims.play('left', true);
        }
        if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.speed);
            this.player.anims.play('right', true);
        }
        if (this.cursors.down.isDown) {
            this.player.anims.play('down', true);
        }
        if (this.cursors.up.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-this.speed * 3.5);
            this.player.anims.play('up', true);
        }
        if (this.cursors.down.isUp &&
            this.cursors.left.isUp &&
            this.cursors.right.isUp &&
            this.player.anims.isPlaying
        ) {
            this.player.setVelocityX(0);
            this.player.anims.stop()
        }
    }
}