var Keys = {},
    player = null,
    ghosts = [],
    layer = null;

//noinspection JSValidateTypes
var MyLayer = cc.LayerColor.extend({
    init:function () {
        this.initWithColor(cc.ccc4(0, 0, 0, 255));

        this.scheduleUpdate();
        this._isKeypadEnabled = true;

        player = new Player();
        player.init();
        player.id = Math.random();
        player.setPosition(50, 50);
        this.addChild(player.sprite);

        return this;
    },

    update:function (delta) {
        player.update(delta);

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