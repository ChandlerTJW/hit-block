class SceneEnd extends GuaScene{
    constructor(game) {
        super(game)
        game.registerAction('r', function(){
            var s = SceneTitle.new(game)
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
        game.context.fillText('按r重新开始游戏', 100, 150)
    }
}
