var Paddle = function(game) {
    var o = game.imageByName('paddle')
    // var o = {
    //     image: image,
    //     x: 100,
    //     y: 250,
    //     speed: 15,
    // }
    o.x = 100
    o.y = 250
    o.speed = 15
    var paddle = o
    o.move = function(x) {
        if (x < 0) {
            x = 0
        }
        if (x > 400 - o.image.width) {
            x = 400 - o.image.width
        }
        o.x = x
    }
    o.moveLeft = function() {
        o.move(paddle.x - paddle.speed)
    }
    o.moveRight = function() {
        o.move(paddle.x + paddle.speed)
    }
    var aInb = function(x, x1, x2){
        return x >= x1 && x <= x2
    }
    o.collide = function(ball) {
        var a = o
        var b = ball
        if(aInb(b.x, a.x, a.x + a.w) || aInb(a.x, b.x, b.x + b.w)){
            if(aInb(b.y, a.y, a.y + a.h) || aInb(a.y, b.y, b.y + b.h)){
                return true
            }
        }
        return false
    }
    return o
}
