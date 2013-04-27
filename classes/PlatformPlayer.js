//noinspection JSValidateTypes
var PlatformPlayer = cc.Node.extend({
    id:null,
    sprite:null,
    speed:220,
    jumpTimer:null,
    velocity:null,
    desiredPosition:null,
    isOnGround:null,
    init:function () {
        this.sprite = cc.Sprite.create("/resources/player.png");
        this.sprite.position = this.position;
        this.sprite.setAnchorPoint(cc.ccp(0, 0));

        this.velocity = cc.ccp();

        return this;
    },
    update:function (delta) {

        var gravity = cc.ccp(0.0, -640.0);
        var gravityStep = cc.ccpMult(gravity, delta);

        var forwardMove = cc.ccp(950, 0);
        var forwardStep = cc.ccpMult(forwardMove, delta);

        this.velocity = cc.ccpAdd(this.velocity, gravityStep);
        this.velocity = cc.ccp(this.velocity.x * 0.93, this.velocity.y);

        if ((Keys[cc.KEY.w] || Keys[cc.KEY.up]) && this.isOnGround) {
            var jumpVelocity = cc.ccp(0, 9500);
            this.velocity = cc.ccpAdd(this.velocity, jumpVelocity);
            this.jumpTimer= 0.6;
        }

        if ((Keys[cc.KEY.a] || Keys[cc.KEY.left])) {
            this.velocity = cc.ccpSub(this.velocity, forwardStep);
        }

        if ((Keys[cc.KEY.t])) {
            player.position = cc.ccp(cc.sharedDirector._winSizeInPixels.width/2,cc.sharedDirector._winSizeInPixels.height/2);
        }

        if ((Keys[cc.KEY.d] || Keys[cc.KEY.right])) {
            this.velocity = cc.ccpAdd(this.velocity, forwardStep);
        }

        var minMovement = cc.ccp(-850, -450);
        var maxMovement = cc.ccp(850, 350);

        this.velocity = cc.ccpClamp(this.velocity, minMovement, maxMovement);

        var stepVelocity = cc.ccpMult(this.velocity, delta);

        this.desiredPosition = cc.ccpAdd(this.position, stepVelocity);

        this.sprite.setPosition(this.position);

    },
    tileCoordinateForPosition:function (tileSizeWidth, tileSizeHeight, mapSizeHeight) {

        var x = Math.floor(this.position.x / tileSizeWidth);
        var levelHeightInPixel = mapSizeHeight * tileSizeHeight;
        var y = Math.floor((levelHeightInPixel - this.position.y) / tileSizeHeight);

        return cc.ccp(x, y);
    },
    tileRectFromTileCoordinates:function(tileCoordinates, layer){
        var levelHeightInPixels = layer.getMapTileSize().height * layer.getLayerSize().height;

        var origin = cc.ccp(tileCoordinates.x * layer.getMapTileSize().width, levelHeightInPixels - (tileCoordinates.y + 1) * layer.getMapTileSize().height);

        return cc.RectMake(origin.x, origin.y, layer.getMapTileSize().width, layer.getMapTileSize().height);
    },
    getSurroundingTiles:function (layer) {
        var playerPos = this.tileCoordinateForPosition(layer.getMapTileSize().width, layer.getMapTileSize().height, layer.getLayerSize().height);

        var gids = [];

        for (var i = 0; i < 9; i++) {
            var c = i % 3;
            var r = Math.floor(i / 3);

            var tilePos = cc.ccp((playerPos.x + (c - 1)), (playerPos.y + (r - 1)));

            var tgid = layer.tileGIDAt(tilePos);

            var tileRect = this.tileRectFromTileCoordinates(tilePos, layer);

            gids.push({gid:tgid, x:tileRect.origin.x, y:tileRect.origin.y, tilePos:tilePos});
        }

        gids.splice(4, 1);

        var sorted = [];

        sorted[0] = gids[6];
        sorted[1] = gids[1];
        sorted[2] = gids[3];
        sorted[3] = gids[4];
        sorted[4] = gids[0];
        sorted[5] = gids[5];
        sorted[6] = gids[2];
        sorted[7] = gids[7];

        return sorted;
    },
    testCollision:function (objects) {
        this.isOnGround = false;

        var collisionRect = cc.RectMake(
            this.desiredPosition.x,
            this.desiredPosition.y,
            this.sprite.getTextureRect().size.width,
            this.sprite.getTextureRect().size.height);

        for (var i = 0; i < objects.getObjects().length; i++) {

            var obj = objects.getObjects()[i];
            var rect = cc.RectMake(obj.x, obj.y, obj.width, obj.height);

            if (cc.Rect.CCRectIntersectsRect(rect, collisionRect)) {

                var intersection = cc.Rect.CCRectIntersection(rect, collisionRect);

                if (intersection.size.width < intersection.size.height) {
                    if (intersection.origin.x > this.desiredPosition.x) {
                        this.desiredPosition = cc.ccp(this.desiredPosition.x - intersection.size.width, this.desiredPosition.y);
                        this.velocity = cc.ccp(0, this.velocity.y);
                    } else {
                        this.desiredPosition = cc.ccp(this.desiredPosition.x + intersection.size.width, this.desiredPosition.y);
                        this.velocity = cc.ccp(0, this.velocity.y);
                    }
                } else if (intersection.size.width > intersection.size.height) {
                    if (intersection.origin.y > this.desiredPosition.y) {
                        this.desiredPosition = cc.ccp(this.desiredPosition.x, this.desiredPosition.y - intersection.size.height);
                        this.velocity = cc.ccp(this.velocity.x, 0);
                    } else if (intersection.origin.y == this.desiredPosition.y) {
                        this.desiredPosition = cc.ccp(this.desiredPosition.x, this.desiredPosition.y + intersection.size.height);
                        this.velocity = cc.ccp(this.velocity.x, 0);
                        this.isOnGround = true;
                    }
                }

            }
        }

        this.position = cc.ccp(this.desiredPosition.x, this.desiredPosition.y);
    }


});