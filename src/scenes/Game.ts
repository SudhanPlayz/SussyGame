import Phaser from "phaser";

export class GameScene extends Phaser.Scene {
    public player: Phaser.Physics.Arcade.Sprite;
    public cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super({ key: "MainScene" });
    }

    preload() {
        this.load.image("tiles", "https://cors-anywhere.herokuapp.com/https://cdn.discordapp.com/attachments/853488449038581770/1030798917798989834/dark_castle_tileset.png");
        this.load.tilemapTiledJSON("map", "https://cors-anywhere.herokuapp.com/https://cdn.discordapp.com/attachments/853488449038581770/1030802194955518022/main.json");
        this.load.atlas("player", "https://5005bo8grc2acq2thke1l2drmliu002qhup6jb3f2fvdntviggto320.siasky.net/player.png", "https://5005bo8grc2acq2thke1l2drmliu002qhup6jb3f2fvdntviggto320.siasky.net/player.json")
    }

    create() {
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("dark_castle_tileset", "tiles");
        const base = map.createLayer("base", tileset, 0, 0);
        const background = map.createLayer("background", tileset, 0, 0);
        const misc = map.createLayer("misc", tileset, 0, 0);

        base.setCollisionByExclusion([-1], true)

        this.player = this.physics.add.sprite(50, 10, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, base);

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
        this.cameras.main.setZoom(1.5);
    }

    update() {
        //control this.player using this.cursors
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        
    }
}