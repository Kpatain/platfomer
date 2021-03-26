class Player2 extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0.3);
        this.setGravityY(700)
        this.setFriction(1,1);

        this.setBodySize(this.body.width-6,this.body.height-10);
        this.setOffset(3, 10);
        this.setSize(32, 32);

        this.forceX = 0;
        this.forceY = 0;
        this.oldforceX = 1;
        this.oldforceY = 1;
        this.randomBool = 0;
        this.randomBool2 = 0;
        this.oldX = 0;
        this.oldY = 1;



        this._directionX=0;
        this._directionY=0;

        this.anims.create({
            key: 'right',
            frames: [ { key: 'player', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'left',
            frames: [ { key: 'player', frame: 7 } ],
            frameRate: 20
        });

        console.log("Player2");
    }

    set directionX(value){
        this._directionX=value;
    }
    set directionY(value){
        this._directionY=value;
    }



    /**
     * NOUVELLE METHODE SLINGSHOT
     */
    move()
    {
        /**
        this.oldPos();

        if (this.oldY - this.y == 0){

            this.x = this.oldX;
        }
         */

        this.forceX = ui.pad.circleDrag.x;
        this.forceY = ui.pad.circleDrag.y;

        if(ui.pad.circleDrag.x + ui.pad.circleDrag.y !== 0 && this.body.deltaY() > 0 && this.body.onFloor())
        {
            this.oldforceX = this.forceX;
            this.oldforceY = this.forceY;
            this.randomBool = 1;


            if (this.oldforceX > 0){
                console.log("droite");
                this.anims.keyframe = "right";
            }
            else{
                console.log("gauche");
                this.anims.keyframe = "left";
            }

        }

        else
        {

            if(Math.abs(this.forceX - this.oldforceX) == Math.abs(this.oldforceX)
                && Math.abs(this.forceY - this.oldforceY) == Math.abs(this.oldforceY)
                && this.randomBool == 1 && this.body.deltaY() > 0 && this.body.onFloor())
            {
                this.randomBool = 0;
                this.setVelocityX(-this.oldforceX * 9);
                this.setVelocityY(-this.oldforceY * 15);
            }

        }


        if (this.forceY==0){
            this.forceX = 0;
        }

        /**
        if(this.body.deltaY() > 0 && this.body.onFloor())
        {
            console.log(this.body.deltaY());
            this.setVelocityX(0);


        }
        */

    }


    /**
     * arrête le joueur
     */
    stop(){
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.directionY=0;
        this.directionX=0;
    }


    oldPos(){
        if(this.randomBool2%2 == 1) {
            this.oldX = this.x;
            this.oldY = this.y;
        }

        this.randomBool2 = Math.abs(this.randomBool2 - 5);
        console.log("oldPos");
    }

}