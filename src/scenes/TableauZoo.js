class TableauZoo extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('monster1', 'assets/monster1.png');
        this.load.image('monster-violet', 'assets/monster-violet.png');

    }
    create() {
        super.create();
        //quelques étoiles
        let largeur=64*2;
        this.stars=this.physics.add.group();
        for(let posX=largeur/2;posX<largeur*7;posX+=largeur){
            this.stars.create(posX ,0,"star");
        }
        this.stars.children.iterate(function (child) {
            child.setBounce(1);
            child.setGravity(1);
            child.setCollideWorldBounds(true);
            child.setVelocity( 0,Phaser.Math.Between(-100, 100));
            child.setMaxVelocity(0,500);
        });
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);

        //notre monstre

        /*
        function spawn(){
            this.monstre=this.physics.add.sprite(300,this.sys.canvas.height-70,"monster-violet");
            this.monstre.setOrigin(0,0);
            this.monstre.setDisplaySize(64,64);
            this.monstre.setCollideWorldBounds(true);
            this.monstre.setBounce(1);
            this.monstre.setVelocityX(50);
            this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);
        };
        */


        new Monster1(this, 0.1*width + 250, 0.9*height);
        new Monster2(this, 300, 300);


    }

}

