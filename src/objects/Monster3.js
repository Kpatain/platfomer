class Monster3 extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {

        super(scene, x, y, "monster3");
        //pas de gravité
        this.body.allowGravity=false;

        //gestion de la taille
        this.setDisplaySize(64,64);

        //on réduit un peu la zone de hit
        this.setBodySize(this.body.width-400,this.body.height-400);
        this.setOffset(150, 250);

        //définir les propriété que l'on va utiliser dans notre animation

        // X
        this.originalX=x;
        this.minX=x-100;
        this.maxX=x+200;

        // Y
        this.originalY=y;
        this.minY=y-100;
        this.maxY=y;

        // on applique les propriété du début de l'animation
        this.x=this.minX;
        this.y=this.minY;
        this.alpha=0;
        let me=this;

    

        //on fait apparaitre notre objet avec un petit delay, puis on lance l'animation
        //ceci a pour effet de décaler les animations pour ce même objet
        
        scene.tweens.add({
                targets:this,
                duration:200,
                delay:Math.random()*1000,
                alpha:{
                    startDelay:Math.random()*5000,
                    from:0,
                    to:1,
                },
                onComplete: function () {
                    me.start();
                }
            })
        
    


    }


    start(){
        this.scene.tweens.add({
            targets: this,
            x: {
                from: this.minX,
                to:this.maxX,
                duration: 10*1000,
                ease: 'Elastic.Out',
                yoyo: -1,
                repeat:-1,
                flipX:true,
            },
            y: {
                from: this.minY,
                to:this.maxY,
                duration: 5000,
                ease: 'Elastic.Out',
                yoyo: -1,
                repeat:-1
            }
        });
    }


    

}