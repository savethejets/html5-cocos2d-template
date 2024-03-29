
var cc = cc = cc || {};
//Cocos2d directory
cc.Dir = './';//in relate to the html file or use absolute
cc.loadQue = [];//the load que which js files are loaded
cc.COCOS2D_DEBUG = 2;
cc._DEBUG = 1;
cc._IS_RETINA_DISPLAY_SUPPORTED = 0;
//html5 selector method
cc.$ = function (x) {
    return document.querySelector(x);
};
cc.$new = function (x) {
    return document.createElement(x);
};

cc.loadjs = function (filename) {
    //add the file to the que
    var script = cc.$new('script');
    script.src = cc.Dir + filename;
    script.order = cc.loadQue.length;
    cc.loadQue.push(script);


    script.onload = function () {
        //file have finished loading,
        //if there is more file to load, we should put the next file on the head
        if (this.order + 1 < cc.loadQue.length) {
            cc.$('head').appendChild(cc.loadQue[this.order + 1]);
            //console.log(this.order);
        }
        else {
            cc.setup("gameCanvas");
            jQuery.get("/api/hello", function(data,textStatus,jqXHR){
                cc.Log(data);
            });
            cc.AudioManager.sharedEngine().init("mp3,ogg");
            //we are ready to run the game
            cc.Loader.shareLoader().onloading = function () {
                cc.LoaderScene.shareLoaderScene().draw();
            };
            cc.Loader.shareLoader().onload = function () {
                cc.AppController.shareAppController().didFinishLaunchingWithOptions();
            };
            //preload ressources
            cc.Loader.shareLoader().preload([
                {type:"tmx", src:"/resources/level1.tmx"},
                {type:"image", src:"/resources/tile_set.png"}
//                {type:"bgm", src:"resources/background"},
//                {type:"effect", src:"resources/effect2"}
            ]);
        }
    };
    if (script.order === 0)//if the first file to load, then we put it on the head
    {
        cc.$('head').appendChild(script);

    }
};

// Engine files,
// They can be packeted to a single file using the Ant tool.
// The shell files and Closure Compiler which Ant needs are provided in tools folder and cocos2d folder.
cc.loadjs('cocos2d/platform/CCClass.js');//0
cc.loadjs('cocos2d/platform/CCCommon.js');//1
cc.loadjs('cocos2d/cocoa/CCGeometry.js');//3
cc.loadjs('cocos2d/platform/ZipUtils.js');//1
cc.loadjs('cocos2d/platform/base64.js');//1
cc.loadjs('cocos2d/platform/gzip.js');//1
cc.loadjs('cocos2d/platform/platform.js');//2
cc.loadjs('cocos2d/cocoa/CCSet.js');//4
cc.loadjs('cocos2d/platform/CCTypes.js');//5
cc.loadjs('cocos2d/cocoa/CCAffineTransform.js');//5
cc.loadjs('cocos2d/support/CCPointExtension.js');//12
cc.loadjs('cocos2d/base_nodes/CCNode.js');//6
cc.loadjs('cocos2d/platform/CCMacro.js');//7
cc.loadjs('cocos2d/platform/CCConfig.js');//7
cc.loadjs('cocos2d/textures/CCTexture2D.js');//12
cc.loadjs('cocos2d/textures/CCTextureCache.js');//12
cc.loadjs('cocos2d/actions/CCAction.js');//7
cc.loadjs('cocos2d/actions/CCActionInterval.js');//7
cc.loadjs('cocos2d/actions/CCActionManager.js');//7
cc.loadjs('cocos2d/actions/CCActionEase.js');//7
cc.loadjs('cocos2d/layers_scenes_transitions_nodes/CCScene.js');//8
cc.loadjs('cocos2d/layers_scenes_transitions_nodes/CCLayer.js');//9
cc.loadjs('cocos2d/layers_scenes_transitions_nodes/CCTransition.js');
cc.loadjs('cocos2d/sprite_nodes/CCSprite.js');//10
cc.loadjs('cocos2d/label_nodes/CCLabelTTF.js');//11
cc.loadjs('cocos2d/text_input_node/CCIMEDispatcher.js');//12
cc.loadjs('cocos2d/touch_dispatcher/CCTouchDelegateProtocol.js');//12
cc.loadjs('cocos2d/touch_dispatcher/CCTouchHandler.js');//12
cc.loadjs('cocos2d/touch_dispatcher/CCTouchDispatcher.js');//12
cc.loadjs('cocos2d/keypad_dispatcher/CCKeypadDelegate.js');//12
cc.loadjs('cocos2d/keypad_dispatcher/CCKeypadDispatcher.js');//12
cc.loadjs('cocos2d/CCDirector.js');//13
cc.loadjs('cocos2d/CCScheduler.js');//14
cc.loadjs('cocos2d/CCLoader.js');//14
cc.loadjs('cocos2d/CCDrawingPrimitives.js');//15
cc.loadjs('cocos2d/platform/CCApplication.js');//16
cc.loadjs('cocos2d/platform/CCSAXParser.js');//16
cc.loadjs('cocos2d/platform/AppControl.js');//18
cc.loadjs('cocos2d/menu_nodes/CCMenuItem.js');
cc.loadjs('cocos2d/menu_nodes/CCMenu.js');
cc.loadjs('cocos2d/misc_nodes/CCRenderTexture.js');
cc.loadjs('cocos2d/textures/CCTextureAtlas.js');
cc.loadjs('cocos2d/sprite_nodes/CCSpriteBatchNode.js');
//cc.loadjs('cocos2d/tileMap_parallax_nodes/CCTileMapAtlas.js');
cc.loadjs('cocos2d/tileMap_parallax_nodes/CCTMXTiledMap.js');
cc.loadjs('cocos2d/tileMap_parallax_nodes/CCTMXXMLParser.js');
cc.loadjs('cocos2d/tileMap_parallax_nodes/CCTMXObjectGroup.js');
cc.loadjs('cocos2d/tileMap_parallax_nodes/CCTMXLayer.js');
cc.loadjs('cocos2d/tileMap_parallax_nodes/CCParallaxNode.js');
cc.loadjs('cocosDenshion/SimpleAudioEngine.js');

// User files
cc.loadjs('classes/AppDelegate.js');//17
cc.loadjs('classes/PlatformPlayer.js');//19
cc.loadjs('classes/Ghosts.js');//19
cc.loadjs('classes/MyLayer.js');//19
