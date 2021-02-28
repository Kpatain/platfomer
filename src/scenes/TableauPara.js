class TableauPara extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('sky-2', 'assets/sky-2.jpg');
        this.load.image('1', 'assets/1.png');
        this.load.image('2', 'assets/2.png');
        this.load.image('3', 'assets/3.png');
        this.load.image('4', 'assets/4.png');
        this.load.image('monster1', 'assets/monster_algue.png');
        this.load.image('monster7', 'assets/monster7.png');
        this.load.image('monster2', 'assets/Plastique.png');
    }
    create() {
        super.create();

        //on définit la taille du tableau
        let largeurDuTableau=4000;
        let hauteurDuTableau=600; //la hauteur est identique au cadre du jeu
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);

        this.cameras.main.startFollow(this.player, false, 0.05, 0.05);

        //quelques étoiles et plateformes qui vont avec
        


        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.sky=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            '3'
        );
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra
        this.sky.setDepth(0);
        


        //on ajoute une deuxième couche de ciel
        this.sky2=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            '2'
        );
        this.sky2.setScrollFactor(0);
        this.sky2.setOrigin(0,0);
        this.sky2.setDepth(5);
        //this.sky.tileScaleX=this.sky.tileScaleY=0.8;

        //on ajoute une troisieme couche de ciel
        this.sky4=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            '4'
        );
        this.sky4.setScrollFactor(0);
        this.sky4.setOrigin(0,0);
        this.sky4.setDepth(0);

        //on ajoute une troisieme couche de ciel
        this.sky3=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            '1'
        );
        this.sky3.setScrollFactor(0);
        this.sky3.setOrigin(0,0);
        this.sky3.setDepth(12);
        
        this.stars=this.physics.add.group();
        this.platforms=this.physics.add.staticGroup();
        for(let posX=20;posX<largeurDuTableau;posX+=200){
            let etoileY=Math.random()*150 + 300;
            let star=this.stars.create(posX ,etoileY,"star");
            star.body.allowGravity=false;
            let plate=this.platforms.create(posX ,etoileY+50,"ground");
            plate.setVisible(1);
            plate.setDisplaySize(50,20);
            plate.refreshBody();

            new Algues(this, posX + 100, 800);
        }
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);
        this.physics.add.collider(this.player,this.platforms);

        new Filet(this, 400, 350);
        new Filet(this, 700, 350);

        new Plastique(this, 600, 500);

        //fait passer les éléments devant le ciel
        this.platforms.setDepth(10);
        this.stars.setDepth(10);
        this.player.setDepth(10);

    }

    update(){
        super.update();
        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.sky.tilePositionX=this.cameras.main.scrollX*0.3;
        this.sky.tilePositionY=this.cameras.main.scrollY*0.1;
        //le deuxième ciel se déplace moins vite pour accentuer l'effet
        this.sky2.tilePositionX=this.cameras.main.scrollX*0.6;
        this.sky2.tilePositionY=this.cameras.main.scrollY*0.2;

        this.sky3.tilePositionX=this.cameras.main.scrollX*1.2;
        this.sky3.tilePositionY=this.cameras.main.scrollY*0.4;

        this.sky4.tilePositionX=this.cameras.main.scrollX*0.3;
        this.sky4.tilePositionY=this.cameras.main.scrollY*0.1;
    }



}

