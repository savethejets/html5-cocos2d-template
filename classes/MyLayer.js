var Keys = {},
    player = null,
    ghosts = [],
    layer = null;

//noinspection JSValidateTypes
var MyLayer = cc.LayerColor.extend({
    tileMap: null,
    init:function () {
        this.initWithColor(cc.ccc4(0, 0, 0, 255));

        this.scheduleUpdate();

        this.tileMap = cc.TMXTiledMap.create("/resources/level1.tmx");

        this.tileMap.position = cc.ccp(cc.sharedDirector._winSizeInPixels.width/2,cc.sharedDirector._winSizeInPixels.height/2);
        this.addChild(this.tileMap);

        this._isKeypadEnabled = true;
        player = new Player();
        player.init();
        player.id = Math.random();
        player.desiredPosition = cc.ccp(cc.sharedDirector._winSizeInPixels.width/2,cc.sharedDirector._winSizeInPixels.height/2);
        player.position = cc.ccp(cc.sharedDirector._winSizeInPixels.width/2,cc.sharedDirector._winSizeInPixels.height/2);

        this.tileMap.addChild(player.sprite);

        return this;
    },
    setViewPointCenter:function() {
        var winSize = cc.sharedDirector.getWinSize();

        var x = Math.max(player.position.x, winSize.width / 2);
        var y = Math.max(player.position.y, winSize.height / 2);

        x = Math.min(x, (this.tileMap.getMapSize().width * this.tileMap.getTileSize().width) - winSize.width / 2);
        y = Math.min(y, (this.tileMap.getMapSize().height * this.tileMap.getTileSize().height) - winSize.height / 2);

        var actualPosition = cc.ccp(x, y);

        var centerOfView = cc.ccp(winSize.width / 2, winSize.height / 2);

        this.tileMap.setPosition(cc.ccpSub(centerOfView, actualPosition));
    },
    update:function (delta) {

        player.update(delta);

        player.testCollision(this.tileMap.objectGroupNamed("collision"));

        this.setViewPointCenter();

        for (var i = 0; i < ghosts.length; i++) {
            ghosts[i].update(delta);
        }

    },
    keyDown:function (e) {
        Keys[e] = true;
    },
    keyUp:function (e) {
        Keys[e] = false;
    }
});

MyLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = MyLayer.layer();

    scene.addChild(layer);
    return scene;
};

MyLayer.layer = function () {
    var pRet = new MyLayer();

    layer = pRet;

    if (pRet && pRet.init()) {
        return pRet;
    }
    return null;
};