class EditorLevel extends GuaScene{
    constructor(game){
        super(game)
        this.img = game.imageByName('block')
        this.blocks = []
        this.enableDrag = false
        this.init()

        game.registerAction('k', function(){
            var s = Scene.new(game)
            game.replaceScene(s)
        })
    }

    init(){
        var game = this.game
        var blocks = this.blocks
        var img = this.img

        var getBlocks = function(x, y){
            x = parseInt(x/img.w) * img.w
            y = parseInt(y/img.h) * img.h
            var list = JSON.stringify([x, y])
            if (blocks.indexOf(list)==-1){
                blocks.push(list)
                // log('blocks', blocks)
            }
        }

        // mouse event
        game.canvas.addEventListener('mousedown', function(event){
            var x = event.offsetX
            var y = event.offsetY
            this.enableDrag = true
            getBlocks(x, y)

        })
        game.canvas.addEventListener('mousemove', function(event){
            var x = event.offsetX
            var y = event.offsetY
            if(this.enableDrag) {
                getBlocks(x, y)
            }
        })
        game.canvas.addEventListener('mouseup', function(event){
            var x = event.offsetX
            var y = event.offsetY
            this.enableDrag = false
            getBlocks(x, y)

            localStorage.blocks = JSON.stringify(blocks)
            log('localStorage.blocks', localStorage.blocks)
        })
    }

    update() {

    }

    draw() {
        var game = this.game
        var blocks = this.blocks
        //draw background
        game.context.fillStyle = "#554"
        game.context.fillRect(0, 0, 400, 300)
        //draw blocks
        for(var i=0;i<blocks.length;i++){
            var block = Block(game, JSON.parse(blocks[i]))
            game.drawImage(block)
        }
        // draw labels
        game.context.fillStyle = "#fff"
        game.context.font = "15px 微软雅黑"
        game.context.fillText('点击屏幕编辑', 10, 270)
        game.context.fillText('按k 开始游戏', 10, 290)
    }
}
