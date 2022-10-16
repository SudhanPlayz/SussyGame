import Phaser from "phaser";

export class GameScene extends Phaser.Scene {
    public player: Phaser.Physics.Arcade.Sprite;
    public cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    public speed = 150;
    public spawnPoint: Phaser.Types.Tilemaps.TiledObject;
    public finishPoint: Phaser.Types.Tilemaps.TiledObject;

    constructor() {
        super({ key: "MainScene" });
    }

    preload() {
        this.load.image("tiles", "https://siasky.net/CACYUIXLLYZo2O2DLptVaytzFFLca7Us1ht3P8vVuhF6pw");
        this.load.tilemapTiledJSON("map", "https://siasky.net/MAAwoeZ06mZ0SpJSKVVKElkEYhQ2W8i3jZpCw2bytT_nCQ");
        this.load.atlas("player", "https://siasky.net/CAC9mbLYferJAlp8hmw0w41KuOFPFRl5_6P2141b8UIPqQ", "https://siasky.net/CACIDQs8jHFl-IYCnJeoGElXg4t0sQnP1eA96DBenp1rIg")
    }

    create() {
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("dark_castle_tileset", "tiles");
        const background = map.createLayer("bg", tileset, 0, 0);
        const decors = map.createLayer("decors", tileset, 0, 0);
        const base = map.createLayer("base", tileset, 0, 0);

        map.objects.find(x => x.name == "texts")?.objects.forEach(obj => {
            //@ts-ignore
            this.add.text(obj.x, obj.y, obj.text.text, obj.text);
        })

        this.spawnPoint = map.findObject("points", obj => obj.name === "spawn");
        this.finishPoint = map.findObject("points", obj => obj.name === "finish");

        base.setCollisionByExclusion([-1], true)

        //@ts-ignore
        this.player = this.physics.add.sprite(this.spawnPoint.x, this.spawnPoint.y, "player");
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
            frameRate: 30,
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
            frameRate: 30,
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
            frameRate: 30,
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
            frameRate: 30,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1.5);

        //Custom func
        //@ts-ignore
        window.reset = () => {
            this.player.setX(this.spawnPoint.x);
            this.player.setY(this.spawnPoint.y);
        }
        //@ts-ignore
        window.finish = () => {
            this.player.setX(this.finishPoint.x);
            this.player.setY(this.finishPoint.y);
        }
    }

    update() {
        //movements
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
        }//@ts-ignore
        if (this.cursors.up.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-this.speed * 3);
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

        //@ts-ignore
        if (this.player.x >= this.finishPoint.x - 30 && this.player.x <= this.finishPoint.x + 30 && this.player.y >= this.finishPoint.y - 30 && this.player.y <= this.finishPoint.y + 30) {
            console.log("yey")
        }
    }
}