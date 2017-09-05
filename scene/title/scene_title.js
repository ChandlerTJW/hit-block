class SceneTitle extends GuaScene{
    constructor(game) {
        super(game)
        game.registerAction('k', function(){
            var s = Scene.new(game)
            game.replaceScene(s)
        })
        game.registerAction('e', function(){
            var s = EditorLevel.new(game)
            game.replaceScene(s)
        })
    }
    draw(){
        var game = this.game
        //draw background
        game.context.fillStyle = "#554"
        game.context.fillRect(0, 0, 400, 300)
        // draw labels
        game.context.fillStyle = "#fff"
        game.context.font="30px 微软雅黑";
        game.context.fillText('按k游戏开始', 120, 150)
        game.context.fillText('按e编辑关卡', 120, 200)
    }
}
