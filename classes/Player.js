//noinspection JSValidateTypes
var Player = cc.Node.extend({
    id:null,
    sprite:null,
    speed:220,
    init:function () {

        this.sprite = cc.Sprite.create("/resources/player.png");
        this.sprite.position = this.position;

        return this;
    },
    update:function (delta) {

        var winSize = cc.sharedDirector.getWinSize();
        var pos = this.getPosition();
        if ((Keys[cc.KEY.w] || Keys[cc.KEY.up])) {
            pos.y += delta * this.speed;
        }
        if ((Keys[cc.KEY.s] || Keys[cc.KEY.down]) ) {
            pos.y -= delta * this.speed;
        }
        if ((Keys[cc.KEY.a] || Keys[cc.KEY.left]) ) {
            pos.x -= delta * this.speed;
        }
        if ((Keys[cc.KEY.d] || Keys[cc.KEY.right])) {
            pos.x += delta * this.speed;
        }
        this.setPosition(pos);

        this.sprite.setPosition(pos);


    }
});