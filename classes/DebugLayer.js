var MyLayer = cc.LayerColor.extend({
    player:null,
    update:function (delta) {


        cc.drawingUtil.drawPoly([cc.ccp(this.desiredPosition.x, this.desiredPosition.y),
            cc.ccp(this.desiredPosition.x + this.sprite.getTextureRect().size.width, this.desiredPosition.y),
            cc.ccp(this.desiredPosition.x, this.desiredPosition.y + this.sprite.getTextureRect().size.height),
            cc.ccp(this.desiredPosition.x + this.sprite.getTextureRect().size.width, this.desiredPosition.y + this.sprite.getTextureRect().size.height)
        ], 4, true, true);
    }
});
