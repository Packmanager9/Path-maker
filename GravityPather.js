const tutorial_canvas = document.getElementById("tutorial");
const tutorial_canvas_context = tutorial_canvas.getContext('2d');
let totalsaws = 110
const restart = document.getElementById("start");
const rotator = document.getElementById("rot");
let whackout = -1
restart.onclick = flip

function flip() {
 gravs = []

for(let t = 0;t<200;t++){
    gravs.push(new Gravatoli())
}
 gravsb = []

for(let t = 0;t<200;t++){
    gravsb.push(new Gravatoli())
    gravsb[t].body.color = "blue"
} 
gen = rotator.value
counter = 0
}


rotator.addEventListener('input', function () {
    gen = rotator.value
  }, false);


tutorial_canvas.style.background = "white"

let flex = tutorial_canvas.getBoundingClientRect();

// Add the event listeners for mousedown, mousemove, and mouseup
const tip = {}
let xs
let ys

// tutorial_canvas_context.scale(1/3, 1/3)


tutorial_canvas.addEventListener('mousedown', e => {

    flex = tutorial_canvas.getBoundingClientRect();
    xs = e.clientX - flex.left;
    ys = e.clientY - flex.top;
    tip.x = xs
    tip.y = ys

    tip.body = tip

    fitnessdot.x = tip.x
    fitnessdot.y = tip.y
})

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.height = h
        this.width = w
        this.color = "white"

    }
    draw() {
        tutorial_canvas_context.fillStyle = this.color
        if (this.dir == 0) {
            tutorial_canvas_context.fillStyle = "#FFFFFF"
        }
        if (this.dir == 1) {
            tutorial_canvas_context.fillStyle = "#F8F8F8"
        }
        if (this.dir == 2) {
            tutorial_canvas_context.fillStyle = "#F0F0F0"
        }
        if (this.dir == 3) {
            tutorial_canvas_context.fillStyle = "#E8E8E8"
        }
        if (this.dir == 4) {
            tutorial_canvas_context.fillStyle = "#e0e0e0"
        }
        if (this.dir == 5) {
            tutorial_canvas_context.fillStyle = "#d8d8d8"
        }
        if (this.dir == 6) {
            tutorial_canvas_context.fillStyle = "#d0d0d0"
        }
        if (this.dir == 7) {
            tutorial_canvas_context.fillStyle = "#c8c8c8"
        }
        tutorial_canvas_context.strokeStyle = "black"
        tutorial_canvas_context.lineWidth = 2
        tutorial_canvas_context.fillRect(this.x, this.y, this.width, this.height)
        tutorial_canvas_context.strokeRect(this.x, this.y, this.width, this.height)

    }

    isPointInside(point) {
        if (point.x >= this.x) {
            if (point.y >= this.y) {
                if (point.x <= this.x + this.width) {
                    if (point.y <= this.y + this.height) {
                        return true
                    }
                }
            }
        }
        return false
    }
}

class Grid {
    constructor() {
        this.blocks = []
        // this.dirs = []
        for (let t = 0; t < tutorial_canvas.width; t += 10) {
            this.holdblocks = []
            for (let k = 0; k < tutorial_canvas.height; k += 10) {
                const rect = new Rectangle(k, t, 10, 10)
                rect.dir = Math.floor(Math.random() * 8)
                // this.dirs.push(rect.dir)
                this.holdblocks.push(rect)
            }
            this.blocks.push([...this.holdblocks])
        }
    }
    draw() {
        for (let t = 0; t < this.blocks.length; t++) {
            for (let k = 0; k < this.blocks[t].length; k++) {
                this.blocks[t][k].draw()
            }
        }
    }

    clone() {
        let clone = new Grid()
        clone.blocks = []
        // let dirindex = 0
        for (let t = 0; t < tutorial_canvas.width; t += 10) {
            clone.holdblocks = []
            for (let k = 0; k < tutorial_canvas.height; k += 10) {
                const rect = new Rectangle(k, t, 10, 10)
                rect.dir = this.blocks[Math.floor(t / 10)][Math.floor(k / 10)].dir
                if (Math.random() < .01) {
                    rect.dir = Math.floor(Math.random() * 8)
                }
                clone.holdblocks.push(rect)

            }
            clone.blocks.push([...clone.holdblocks])
        }
        return clone
    }
    mutate() {
        for (let t = 0; t < tutorial_canvas.width; t += 10) {
            for (let k = 0; k < tutorial_canvas.height; k += 10) {
                if (Math.random() < .01) {
                    this.blocks[Math.floor(t / 10)][Math.floor(k / 10)].dir = Math.floor(Math.random() * 8)
                }
            }
        }
    }
}

class Walker {
    constructor() {
        this.r = 255//Math.random() * 255
        this.g = Math.random() * 9
        this.b = Math.random() * 0

        this.grid = new Grid()
        this.body = new Bosscircle(10, 10, 3, `rgba(${this.r},${this.g},${this.b}, 1)`)
        this.gridspot = [0, 0]

        for (let t = 0; t < this.grid.blocks.length; t++) {
            for (let k = 0; k < this.grid.blocks[t].length; k++) {
                if (this.grid.blocks[t][k].isPointInside(this.body)) {
                    this.gridspot = [t, k]
                }
            }
        }
        this.hit = 0
    }
    draw() {
        this.body.color = `rgba(${this.r},${this.g},${this.b}, 1)`
        if (this.hit == 0) {
            // console.log(this.grid)
            this.hit = 1

        }

        if (this.grid.blocks[this.gridspot[0]][this.gridspot[1]].dir == 0) {
            this.gridspot[1] -= 0
            this.gridspot[0] += 1
        } else if (this.grid.blocks[this.gridspot[0]][this.gridspot[1]].dir == 1) {
            this.gridspot[1] -= 1
            this.gridspot[0] += 1
        } else if (this.grid.blocks[this.gridspot[0]][this.gridspot[1]].dir == 2) {
            this.gridspot[1] -= 1
            this.gridspot[0] += 0
        } else if (this.grid.blocks[this.gridspot[0]][this.gridspot[1]].dir == 3) {
            this.gridspot[1] -= 1
            this.gridspot[0] -= 1
        } else if (this.grid.blocks[this.gridspot[0]][this.gridspot[1]].dir == 4) {
            this.gridspot[1] -= 0
            this.gridspot[0] -= 1
        } else if (this.grid.blocks[this.gridspot[0]][this.gridspot[1]].dir == 5) {
            this.gridspot[1] += 1
            this.gridspot[0] -= 1
        } else if (this.grid.blocks[this.gridspot[0]][this.gridspot[1]].dir == 6) {
            this.gridspot[1] += 1
            this.gridspot[0] -= 0
        } else if (this.grid.blocks[this.gridspot[0]][this.gridspot[1]].dir == 7) {
            this.gridspot[1] += 1
            this.gridspot[0] += 1
        } else {
            // console.log(this.grid.blocks[this.gridspot[0]][this.gridspot[1]].dir)
        }
        if (this.gridspot[1] < 0) {
            this.gridspot[1] = 0
        }
        if (this.gridspot[0] < 0) {
            this.gridspot[0] = 0
        }
        if (this.gridspot[1] > this.grid.blocks.length - 1) {
            this.gridspot[1] = this.grid.blocks.length - 1
        }
        if (this.gridspot[0] > this.grid.blocks.length - 1) {
            this.gridspot[0] = this.grid.blocks.length - 1
        }
        this.body.x = this.grid.blocks[this.gridspot[0]][this.gridspot[1]].x + 5
        this.body.y = this.grid.blocks[this.gridspot[0]][this.gridspot[1]].y + 5
        this.body.draw()

    }

}
class Line {
    constructor(x, y, x2, y2, color, width) {
        this.x1 = x
        this.y1 = y
        this.x2 = x2
        this.y2 = y2
        this.color = color
        this.width = width
        this.dir = 0
    }
    hypotenuse() {
        const xdif = this.x1 - this.x2
        const ydif = this.y1 - this.y2
        const hypotenuse = (xdif * xdif) + (ydif * ydif)
        return Math.sqrt(hypotenuse)
    }
    draw() {
        tutorial_canvas_context.strokeStyle = this.color
        tutorial_canvas_context.lineWidth = this.width
        tutorial_canvas_context.beginPath()
        tutorial_canvas_context.moveTo(this.x1, this.y1)
        tutorial_canvas_context.lineTo(this.x2, this.y2)
        tutorial_canvas_context.stroke()
        tutorial_canvas_context.lineWidth = 1
    }
}
class Blade {
    constructor(dis, angle, size, king) {
        this.king = king
        this.dis = dis
        this.angle = angle
        this.spin = (Math.random() - .5) * .1
        this.body = new Bosscircle(this.king.body.x, this.king.body.y, size, "gray")
        this.body.x = this.king.body.x + (Math.cos(this.king.angle + this.angle) * this.dis)
        this.body.y = this.king.body.y + (Math.sin(this.king.angle + this.angle) * this.dis)
    }
    draw() {
        this.body.color = this.king.color
        this.angle += this.spin
        this.body.x = this.king.body.x + (Math.cos(this.king.angle + this.angle) * this.dis)
        this.body.y = this.king.body.y + (Math.sin(this.king.angle + this.angle) * this.dis)
        this.body.draw()
    }

}
class Sawoid {
    constructor(x = Math.random() * tutorial_canvas.width, y = tutorial_canvas.height * Math.random(), r = 5, s = 1, saws = []) {
        this.marked = 0
        this.saws = saws
        // if(s>3){
        //     s=3
        // }
        this.s = s
        this.r = Math.random() * 255
        this.g = Math.random() * 255
        this.b = Math.random() * 255
        this.turns = 0
        this.angle = 0
        this.body = new Bosscircle(x, y, r, `rgba(${this.r},${this.g},${this.b}, 1)`, Math.random() - .5, Math.random() - .5)

        this.sawhold = this.saws.length
        // for(let t = this.saws.length;t<this.s; t++){
        //     this.saws.push(new Blade((this.body.radius*1.5)+Math.random()*25, Math.random()*Math.PI*2, Math.random()+1, this))
        // }


    }
    draw() {
        for (let t = this.sawhold; t < this.s; t++) {
            if (this.saws.length < this.s) {
                this.saws.push(new Blade((this.body.radius * 1.5) + Math.random() * 25, Math.random() * Math.PI * 2, Math.random() + 1, this))

            }
        }

        this.body.color = `rgba(${this.r},${this.g},${this.b}, 1)`
        this.turns
        this.body.draw()
        for (let t = 0; t < this.saws.length; t++) {
            this.saws[t].draw()
        }
        this.body.move()
    }
    clonesaws(target) {
        target.saws = []
        for (let t = 0; t < this.saws.length; t++) {
            let sizer = this.saws[t].body.radius + ((Math.random() - .5) * .1)
            target.saws.push(new Blade(Math.max(sizer, this.saws[t].dis + (Math.random() - .5)), this.saws[t].angle + (Math.random() - .5), sizer, target))
            target.saws[t].spin = this.saws[t].spin
        }


    }
    reproduce() {
        if (this.marked == 2) {
            if (saws.length <= totalsaws) {
                this.marked = 0
                let sawyer = new Sawoid(this.body.x, this.body.y, this.body.radius + ((Math.random() - .5) * .15), (this.saws.length - 1))
                if (Math.random() < (1 / (totalsaws * 3))) {
                    sawyer.s += 2
                }
                sawyer.r = this.r + ((Math.random() - .5) * 16)
                sawyer.g = this.g + ((Math.random() - .5) * 16)
                sawyer.b = this.b + ((Math.random() - .5) * 16)
                if (sawyer.r > 255) {
                    sawyer.r = 255
                }
                if (sawyer.r < 0) {
                    sawyer.r = 0
                }
                if (sawyer.g > 255) {
                    sawyer.g = 255
                }
                if (sawyer.g < 0) {
                    sawyer.g = 0
                }
                if (sawyer.b > 255) {
                    sawyer.b = 255
                }
                if (sawyer.b < 0) {
                    sawyer.b = 0
                }

                sawyer.body.color = this.body.color
                this.clonesaws(sawyer)
                sawyer.sawhold = this.saws.length
                saws.push(sawyer)
            }
        }
    }
    clean() {
        if (this.marked == 1) {
            if (saws.length >= totalsaws - 1) {
                saws.splice(saws.indexOf(this), 1)
            }
        }
    }
    colorDistance(target) {
        let rk = (this.r - target.r) * (this.r - target.r)
        let gk = (this.g - target.g) * (this.g - target.g)
        let bk = (this.b - target.b) * (this.b - target.b)

        return Math.sqrt(rk + bk + gk)

    }
}
class Bosscircle {
    constructor(x, y, radius, color, xmom = 0, ymom = 0) {
        this.height = 0
        this.width = 0
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.xmom = xmom
        this.ymom = ymom
    }
    draw() {
        tutorial_canvas_context.fillStyle = this.color
        tutorial_canvas_context.lineWidth = 0
        tutorial_canvas_context.strokeStyle = this.color
        tutorial_canvas_context.beginPath();
        if (this.radius < 1) {
            this.radius = 1
        }
        tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), true)
        tutorial_canvas_context.fill()
        tutorial_canvas_context.stroke();
    }
    move() {
        this.x += this.xmom
        this.y += this.ymom
        if (this.x + this.radius > tutorial_canvas.width) {
            this.x = tutorial_canvas.width - this.radius
            if (this.xmom > 0) {
                this.xmom *= -1
                this.marked= 1
            }
        }
        if (this.y + this.radius > tutorial_canvas.height) {
            this.y = tutorial_canvas.height - this.radius
            if (this.ymom > 0) {
                this.ymom *= -1
                this.marked= 1
            }
        }
        if (this.x - this.radius < 0) {
            this.x = 0 + this.radius
            if (this.xmom < 0) {
                this.xmom *= -1
                this.marked= 1
            }
        }
        if (this.y - this.radius < 0) {
            this.y = 0 + this.radius
            if (this.ymom < 0) {
                this.ymom *= -1
                this.marked= 1
            }
        }
    }
    isPointInside(point) {
        let link = new Line(this.x, this.y, point.x, point.y, "red", 1)
        if (link.hypotenuse() <= this.radius) {
            return true
        }
        return false
    }
    repelCheck(point) {
        let link = new Line(this.x, this.y, point.x, point.y, "red", 1)
        if (link.hypotenuse() <= this.radius + point.radius) {
            return true
        }
        return false
    }
}


let forcegrid = []
let yeet = 50
let xeet = 50


class Node {
    constructor() {
        this.body = new Bosscircle(xeet, yeet, 3, "black")
        this.x = xeet
        this.y = yeet
        this.bigbody = new Bosscircle(xeet, yeet, 100, "black")
        if (xeet == tutorial_canvas.width - 50) {
            yeet += 50
            xeet = 0
        }
        xeet += 50
        forcegrid.push(this)
    }

}

for (let t = 0; yeet <= tutorial_canvas.height - 50; t++) {
    let node = new Node()
    if (t > 10000) {
        break
    }
}

class Gravatoli {
    constructor() {
        this.body = new Bosscircle(tutorial_canvas.width * .501, tutorial_canvas.height * .499, 1.8, "red")
        this.match = []
        this.body.marked = 0
        for (let t = 0; t < forcegrid.length; t++) {
            this.match.push(((Math.random() - .5)*.05))
            // this.match.push(-.01)
        }

        console.log(this.match)
    }
    mutate(){
        for(let t = 0;t<this.match.length;t++){
            if(Math.random()< .014){
                this.match[t]+=  ((Math.random() - .5)*.017)
            }
        }

    }
    draw() {
        if(this.body.marked == 0){
            this.body.move()
        }
        this.body.draw()
        for (let t = 0; t < forcegrid.length; t++) {

            if(this.body.color == "blue"){
                if(this.match[t]<0){
                    forcegrid[t].body.color = "cyan"
                }else{
                    forcegrid[t].body.color = "magenta"
                }
            }
            forcegrid[t].body.radius = Math.abs(this.match[t]*70)
            if(forcegrid[t].bigbody.isPointInside(this.body)){

                // const angleRadians = (Math.atan2(this.body.y - forcegrid[t].y , this.body.x - forcegrid[t].x));

                let angleRadians
                if(this.body.color == "blue"){
                     angleRadians = (Math.atan2(forcegrid[t].y - this.body.y ,  forcegrid[t].x - this.body.x));
                }else{
                     angleRadians = (Math.atan2(this.body.y - forcegrid[t].y , this.body.x - forcegrid[t].x));
                }

                // if(this.match[t] < 0){
                //     angleRadians+=Math.PI
                // }

                // const angleRadians = (Math.atan2(this.body.y - forcegrid[t].y , this.body.x - forcegrid[t].x))+Math.PI;

                let xdim = Math.cos(angleRadians)//*this.match[t]
                let ydim = Math.sin(angleRadians)//*this.match[t]

                xdim*= 10000000
                xdim = Math.round(xdim)/10000000
                ydim*= 10000000
                ydim = Math.round(ydim)/10000000
                // let hyper = (new Line(xdim, 0, 0, ydim, "red", 1)).hypotenuse()
                // let rat = hyper*this.match[t]

                // console.log(xdim)
                // if(this.match[t] < 0){

                    this.body.xmom += Math.abs(xdim)*this.match[t]
                    this.body.ymom += Math.abs(ydim)*this.match[t]
                // }
                
                // if(this.body.color == "red"){
                //     if(this.match[t] > 0){
                //         this.body.xmom += xdim*rat
                //         this.body.ymom -= ydim*rat
                //     }else{
                //         this.body.xmom += xdim*rat
                //         this.body.ymom -= ydim*rat
                //     }

                // }else{
                //     if(this.match[t] < 0){
                //         this.body.xmom -= xdim*rat
                //         this.body.ymom += ydim*rat
                //         // this.body.y = 140
                //     }else{
                //         this.body.xmom += xdim*rat
                //         this.body.ymom -= ydim*rat
                //         // this.body.y = 100
                //         //  this.body.y = 140
                //     }
                // }

                // if(this.body.x > tutorial_canvas.width){
                //     this.body.x = tutorial_canvas.width
                // }
                // if(this.body.y > tutorial_canvas.height){
                //     this.body.y = tutorial_canvas.height
                // }
                // if(this.body.x < 0){
                //     this.body.x = 0
                // }
                // if(this.body.y < 0){
                //     this.body.y = 0
                // }
            }
        }
    }
}

let saws = []

// for (let t = 0; t < totalsaws; t++) {
//     let sawyer = new Sawoid(Math.random() * tutorial_canvas.width, tutorial_canvas.height * Math.random(), 10, 1)
//     saws.push(sawyer)

// }


let gen = 250
let counter = 0
// let rect = new Grid()
// rect.draw()
// console.log(rect)
let walkers = []
// for (let t = 0; t < 250; t++) {
//     let walker = new Walker()
//     walkers.push(walker)
// }
let fitnessgoal = new Bosscircle(700, 700, 20, "gold")
let cutindex = 0
let cutindexb = 0


let gravs = []

for(let t = 0;t<200;t++){
    gravs.push(new Gravatoli())
}
let gravsb = []

for(let t = 0;t<200;t++){
    gravsb.push(new Gravatoli())
    gravsb[t].body.color = "blue"
}

let fitnessdot = new Bosscircle(57,670, 8, "gold")

window.setInterval(function () {
    tutorial_canvas_context.clearRect(0, 0, tutorial_canvas.width, tutorial_canvas.height)
    for (let t = 0; t < forcegrid.length; t++) {
        forcegrid[t].body.draw()
    }
    for(let t = 0;t<gravs.length;t++){
        gravs[t].draw()
        gravsb[t].draw()
    }
    fitnessdot.draw()

    counter++

    if (counter > gen) {
        let fitnesscutoff = 1000000
        cutindex = 0
        for (let t = 0; t < gravs.length; t++) {
            let line = new Line(gravs[t].body.x, gravs[t].body.y, fitnessdot.x, fitnessdot.y, "black", .5)
            line.draw()
            if (fitnesscutoff > line.hypotenuse()) {
                fitnesscutoff = line.hypotenuse()
                cutindex = t
            }
        }
        fitnesscutoff = 1000000
        cutindexb = 0
        for (let t = 0; t < gravsb.length; t++) {
            let line = new Line(gravsb[t].body.x, gravsb[t].body.y, fitnessdot.x, fitnessdot.y, "black", .5)
            line.draw()
            if (fitnesscutoff > line.hypotenuse()) {
                fitnesscutoff = line.hypotenuse()
                cutindexb = t
            }
        }
        gravRefresh()
        gravbRefresh()
            // gen++
            // if(gen > 250){
            //     gen = 250
            // }
        counter = 0
    }
}, 12)

function gravRefresh(){

    let grabs = []
    for(let t = 0;t<gravs.length;t++){


        let grab = new Gravatoli()
        grab.match = [...gravs[cutindex].match]
        if(Math.random()<.97){
            grab.mutate()
            if(Math.random()<.5){
            grab.mutate()
            }
            if(Math.random()<.25){
            grab.mutate()
            }
        }
        grabs.push(grab)
    }

    // for(let t = 0;t<5;t++){


    //     let grab = new Gravatoli()
    //     grabs.push(grab)
    // }


    gravs = []
    gravs = [...grabs]
    // console.log(gravs)
}




function gravbRefresh(){

    let grabs = []
    for(let t = 0;t<gravsb.length;t++){


        let grab = new Gravatoli()
        grab.body.color = "blue"
        grab.match = [...gravsb[cutindexb].match]
        grab.mutate()
        grabs.push(grab)
    }

    gravsb = []
    gravsb = [...grabs]
    // console.log(gravsb)
}


function getRandomLightColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[(Math.floor(Math.random() * 14) + 1)];
    }
    return color;
}
