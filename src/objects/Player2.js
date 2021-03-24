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



        this._directionX=0;
        this._directionY=0;

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
        if (this.directionY==0){

            this.setVelocity(0,0);
        }

        this.forceX = ui.pad.circleDrag.x;
        this.forceY = ui.pad.circleDrag.y;

        if(ui.pad.circleDrag.x + ui.pad.circleDrag.y !== 0)
        {
            this.oldforceX = this.forceX;
            this.oldforceY = this.forceY;
            this.randomBool = 1;

            //console.log("grabbed");
        }

        else
        {
            //console.log("a zero");
            if(Math.abs(this.forceX - this.oldforceX) == Math.abs(this.oldforceX)
                && Math.abs(this.forceY - this.oldforceY) == Math.abs(this.oldforceY)
                && this.randomBool == 1)
            {
                //console.log("released");
                //console.log(this.oldforceX, this.oldforceY);
                this.randomBool = 0;
                //console.log("X :", ui.pad.circleDrag.x, "Y :", ui.pad.circleDrag.y);

                this.setVelocityX(-this.oldforceX * 9);
                this.setVelocityY(-this.oldforceY * 15);
            }

        }

        console.log(this._directionX);




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


}