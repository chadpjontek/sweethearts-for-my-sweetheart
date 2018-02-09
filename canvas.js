const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const c = canvas.getContext('2d')

const mouse = {
  x: undefined,
  y: undefined
}
const maxRadius = 80
const maxScale = 3

const colorArray = [
  '#62eb93',
  '#f790b8',
  '#fff34f',
  '#d691e7',
  '#fe9d54',
  '#9ad1fe'
]

const heartMsgArr = [
  '#\nLOVE',
  'LIVE N\nLOVE',
  'BE\nHAPPY',
  'GIGGLE',
  'ANGEL',
  'ASK\nME',
  'QT\nPIE',
  'FIRST\nKISS',
  'HUG\nME',
  'LOVE\nBUG',
  'LOVE\nME',
  'I LOVE\nYOU',
  'MARRY\nME',
  'YOU\n& I',
  'MISS\nYOU',
  'MY\nLOVE',
  'SAY\nYES',
  'SMILE',
  'SOUL\nMATE',
  'SWEET\nTALK',
  'TRUE\nLOVE',
  'XOXO',
  'LET’S\nKISS',
  'MELT\nMY <3',
  'SWEET\nSTUFF',
  'OCCUPY\nMY <3',
  'TEXT\nME',
  'TWEET',
  'WINK\nWINK',
  'BE\nMINE',
  'CRAZY\n4 U',
  'OOH\nLA LA',
  'U R\nHOT',
  'CALL\nME',
  '143',
  'REAL\n<3',
  'KISS\nME',
  'HEART\nTHROB',
  'HOT\nDAWG',
  'IN THE\nMOOD',
  'ME +\nYOU',
  'YUM\nYUM',
  'YOU\nROCK'
]

window.addEventListener('mousemove', function (event) {
  mouse.x = event.x
  mouse.y = event.y
})

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

function fillTextMultiLine(ctx, text, x, y) {
  var lineHeight = ctx.measureText("M").width * 1.2;
  var lines = text.split("\n");
  for (var i = 0; i < lines.length; ++i) {
    ctx.fillText(lines[i], x, y);
    y += lineHeight;
  }
}

function Heart(x, y, dx, dy, scale) {
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.scale = scale
  this.minScale = scale
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
  this.msg = heartMsgArr[Math.floor(Math.random() * heartMsgArr.length)]
  this.draw = function () {
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.bezierCurveTo((0*this.scale + this.x), (-3*this.scale + this.y), (-5*this.scale + this.x), (-15*this.scale + this.y), (-25*this.scale + this.x), (-15*this.scale + this.y));
    c.bezierCurveTo((-55*this.scale + this.x), (-15*this.scale + this.y), (-55*this.scale + this.x), (22.5*this.scale + this.y), (-55*this.scale + this.x), (22.5*this.scale + this.y));
    c.bezierCurveTo((-55*this.scale + this.x), (40*this.scale + this.y), (-35*this.scale + this.x), (62*this.scale + this.y), (0*this.scale + this.x), (80*this.scale + this.y));
    c.bezierCurveTo((35*this.scale + this.x), (62*this.scale + this.y), (55*this.scale + this.x), (40*this.scale + this.y), (55*this.scale + this.x), (22.5*this.scale + this.y));
    c.bezierCurveTo((55*this.scale + this.x), (22.5*this.scale + this.y), (55*this.scale + this.x), (-15*this.scale + this.y), (25*this.scale + this.x), (-15*this.scale + this.y));
    c.bezierCurveTo((10*this.scale + this.x), (-15*this.scale + this.y), (0*this.scale + this.x), (-3*this.scale + this.y), (0*this.scale + this.x), (20*this.scale + this.y));
    c.fillStyle = this.color
    c.fill();
    c.fillStyle = "#f00"
    c.font = `${this.scale*20}px serif`
    c.textAlign = 'center'
    c.textBaseline = "top"
    fillTextMultiLine(c,this.msg,this.x,this.y)
    
  }
  this.update = function () {
    if (this.x + 55*this.scale > innerWidth || this.x - 55*this.scale < 0) {
      this.dx = -this.dx
    }
    if (this.y + 62*this.scale > innerHeight || this.y - 62*this.scale < 0) {
      this.dy = -this.dy
    }
    this.x += this.dx
    this.y += this.dy

    // interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50
      && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.scale < maxScale) {
        this.scale += .1
      }
    } else if (this.scale > this.minScale) {
      this.scale -= .1
    }

    this.draw()
  }
}

const heartArr = []
for (let i = 0; i < 300; i++) {
  let scale = Number((Math.random() * .1 + .05).toFixed(2))
  let x = Math.random() * (innerWidth - scale * 55 * 2) + (scale * 55)
  let y = Math.random() * (innerHeight - scale * 62 * 2) + (scale * 62)
  let dx = (Math.random() - 0.5) * 2
  let dy = (Math.random() - 0.5) * 2

  heartArr.push(new Heart(x, y, dx, dy, scale))
}

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, innerHeight)
  for (let i of heartArr) {
    i.update()
  }
}

animate()