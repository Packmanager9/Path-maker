const tutorial_canvas = document.getElementById("tutorial");
const tutorial_canvas_context = tutorial_canvas.getContext('2d');
let totalsaws = 110
const restart = document.getElementById("start");
const wallbtn = document.getElementById("wall");
const rotator = document.getElementById("rot");
let whackout = -1
let runanyway = -1
restart.onclick = flip
wallbtn.onclick = wallflip
function flip() {
    gravs = []
    for (let t = 0; t < 200; t++) {
        gravs.push(new Gravatoli())
    }
    gravsb = []
    for (let t = 0; t < 200; t++) {
        gravsb.push(new Gravatoli())
        gravsb[t].body.color = "blue"
    }
    gen = rotator.value
    counter = 0
}
function wallflip() {
    runanyway *= -1
    if (runanyway == 1) {
        wallbtn.innerText = "Wall stop is off"
    } else {
        wallbtn.innerText = "Wall stop is on"
    }
}
rotator.addEventListener('input', function () {
    gen = rotator.value
}, false);
tutorial_canvas.style.background = "white"
let flex = tutorial_canvas.getBoundingClientRect();
const tip = {}
let xs
let ys
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
                this.marked = 1
            }
        }
        if (this.y + this.radius > tutorial_canvas.height) {
            this.y = tutorial_canvas.height - this.radius
            if (this.ymom > 0) {
                this.ymom *= -1
                this.marked = 1
            }
        }
        if (this.x - this.radius < 0) {
            this.x = 0 + this.radius
            if (this.xmom < 0) {
                this.xmom *= -1
                this.marked = 1
            }
        }
        if (this.y - this.radius < 0) {
            this.y = 0 + this.radius
            if (this.ymom < 0) {
                this.ymom *= -1
                this.marked = 1
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
            this.match.push(((Math.random() - .5) * .001))
        }
    }
    mutate() {
        for (let t = 0; t < this.match.length; t++) {
            if (Math.random() < .014) {
                this.match[t] += ((Math.random() - .5) * .0017)
            }
        }
    }
    draw() {
        if (this.body.marked == 0) {
            this.body.move()
        } else if (runanyway == 1) {
            this.body.move()
        }
        this.body.draw()
        for (let t = 0; t < forcegrid.length; t++) {
            if (this.body.color == "blue") {
                if (this.match[t] < 0) {
                    forcegrid[t].body.color = "cyan"
                } else {
                    forcegrid[t].body.color = "magenta"
                }
            }
            forcegrid[t].body.radius = Math.abs(this.match[t] * 1001)
            if (forcegrid[t].bigbody.isPointInside(this.body)) {
                let angleRadians
                if (this.body.color == "blue") {
                    angleRadians = (Math.atan2(forcegrid[t].y - this.body.y, forcegrid[t].x - this.body.x));
                } else {
                    angleRadians = (Math.atan2(this.body.y - forcegrid[t].y, this.body.x - forcegrid[t].x) + Math.PI);
                }
                let xdim = Math.cos(angleRadians)
                let ydim = Math.sin(angleRadians)
                xdim *= 10000000
                xdim = Math.round(xdim) / 10000000
                ydim *= 10000000
                ydim = Math.round(ydim) / 10000000
                this.body.xmom += Math.abs(xdim) * this.match[t]
                this.body.ymom += Math.abs(ydim) * this.match[t]

            }
        }
    }
}
let gen = 250
let counter = 0
let cutindex = 0
let cutindexb = 0
let gravs = []
for (let t = 0; t < 200; t++) {
    gravs.push(new Gravatoli())
}
let gravsb = []
for (let t = 0; t < 200; t++) {
    gravsb.push(new Gravatoli())
    gravsb[t].body.color = "blue"
}
let fitnessdot = new Bosscircle(157, 571, 8, "gold")
window.setInterval(function () {
    tutorial_canvas_context.clearRect(0, 0, tutorial_canvas.width, tutorial_canvas.height)
    for (let t = 0; t < forcegrid.length; t++) {
        forcegrid[t].body.draw()
    }
    for (let t = 0; t < gravs.length; t++) {
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
        counter = 0
    }
}, 12)
function gravRefresh() {
    let grabs = []
    for (let t = 0; t < gravs.length; t++) {
        let grab = new Gravatoli()
        grab.match = [...gravs[cutindex].match]
        if (Math.random() < .93) {
            grab.mutate()
            if (Math.random() < .5) {
                grab.mutate()
            }
            if (Math.random() < .25) {
                grab.mutate()
            }
            if (Math.random() < .005) {
                grab.mutate()
                grab.mutate()
                grab.mutate()
                grab.mutate()
                grab.mutate()
                grab.mutate()
            }
        }
        grabs.push(grab)
    }
    gravs = []
    gravs = [...grabs]
}
function gravbRefresh() {
    let grabs = []
    for (let t = 0; t < gravsb.length; t++) {
        let grab = new Gravatoli()
        grab.body.color = "blue"
        grab.match = [...gravsb[cutindexb].match]
        if (Math.random() < .93) {
            grab.mutate()
            if (Math.random() < .5) {
                grab.mutate()
            }
            if (Math.random() < .25) {
                grab.mutate()
            }
            if (Math.random() < .005) {
                grab.mutate()
                grab.mutate()
                grab.mutate()
                grab.mutate()
                grab.mutate()
                grab.mutate()
            }
        }
        grabs.push(grab)
    }
    gravsb = []
    gravsb = [...grabs]
}
function getRandomLightColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[(Math.floor(Math.random() * 14) + 1)];
    }
    return color;
}
