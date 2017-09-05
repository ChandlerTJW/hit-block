class Scene extends GuaScene{
    constructor(game){
        super(game)
        this.paddle = Paddle(game)
        this.ball = Ball(game)
        this.blocks = JSON.parse(localStorage.blocks)
        for(var i=0;i<this.blocks.length;i++){
            this.blocks[i] = Block(game, JSON.parse(this.blocks[i]))
        }
        this.enableDrag = false
        this.score = 0
        this.init()
    }

    init(){
        var game = this.game
        var paddle = this.paddle
        var ball = this.ball
        var blocks = this.blocks
        game.registerAction('a', function(){
            paddle.moveLeft()
        })
        game.registerAction('d', function(){
            paddle.moveRight()
        })
        game.registerAction('f', function(){
            ball.fire()
        })

        // mouse event
        game.canvas.addEventListener('mousedown', function(event){
            var x = event.offsetX
            var y = event.offsetY
            if(ball.hasPoint(x, y)){
                this.enableDrag = true
                // log(enableDrag)
            }
        })
        game.canvas.addEventListener('mousemove', function(event){
            var x = event.offsetX
            var y = event.offsetY
            if(this.enableDrag){
                ball.x = x
                ball.y = y
            }
        })
        game.canvas.addEventListener('mouseup', function(event){
            this.enableDrag = false
        })
    }

    update() {
        var game = this.game
        var paddle = this.paddle
        var ball = this.ball
        var blocks = this.blocks
        if (window.paused) {
            return
        }
        ball.move()
        //gameover
        if(ball.y > paddle.y){
            var end = SceneEnd.new(game)
            game.replaceScene(end)
        }
        // 判断相撞
        if (paddle.collide(ball)) {
            // 这里应该调用一个 ball.反弹() 来实现
            ball.反弹()
        }
        // 判断 ball 和 blocks 相撞
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.collide(ball)) {
                // log('block 相撞')
                block.kill()
                ball.反弹()
                // 更新分数
                this.score += 100
            }
        }
    }

    draw() {
        var game = this.game
        var paddle = this.paddle
        var ball = this.ball
        var blocks = this.blocks
        //draw background
        game.context.fillStyle = "#554"
        game.context.fillRect(0, 0, 400, 300)
        // draw
        game.drawImage(paddle)
        game.drawImage(ball)
        // draw blocks
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        // draw labels
        game.context.fillStyle = "#fff"
        game.context.font = "15px 微软雅黑"
        game.context.fillText('分数: ' + this.score, 10, 290)
        game.context.fillText('按f 发射小球', 300, 290)
    }
}
