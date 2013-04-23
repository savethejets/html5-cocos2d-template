//noinspection JSValidateTypes
/**
 * Created with JetBrains WebStorm.
 * User: kylereczek
 * Date: 2013-04-21
 * Time: 5:38 PM
 * To change this template use File | Settings | File Templates.
 */

var Ghost = cc.Node.extend({
    id:null,
    sprite:null,
    init:function() {

        this.sprite = cc.Sprite.create("/resources/ghost.png");
        this.sprite.position = this.position;

        return this;
    },
    update:function (delta) {
        this.sprite.setPosition(this.getPosition());
    }
});