(function(){
document.body.innerHTML += `<canvas id="canvas" style="position:fixed; top:0; left:0; right:0; bottom:0; z-index: -999999;" 
				width="`+window.innerWidth+`"
				height="`+window.innerHeight+`"></canvas>`;
fontSize = 30;
columns = Math.floor(window.innerWidth/fontSize);

var ctx = canvas.getContext('2d');
var t = text();
var logo = document.getElementById('logo');
var lines = [];
var fullColumns = Array(columns).fill(0);

window.setInterval(draw, 100);

function draw()
{
  if (Math.floor(Math.random() * 10) === 0 && lines.length < columns/2)
  	lines.push(new textLine());
  ctx.fillStyle="#232323";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  lines.forEach(function(tl) {
    ctx.drawImage(tl.text, tl.posX, tl.animate(), 20, 1000);
  });

}

function textLine() {
  this.text = t;
  var newColumn = 0;
  do
  {
  	newColumn = Math.floor(Math.random() * columns);
  }while(fullColumns[newColumn]!=0);
  fullColumns[newColumn] = 1;

  this.posX = newColumn * fontSize;
  this.offsetY = -1000;
  this.animate = function() {
    if (this.offsetY >= 0) {
      this.offsetY = -1000;
    }
    this.offsetY += 10;
    return this.offsetY;
  };
}

function text() {
  var offscreenCanvas = document.createElement('canvas');
  offscreenCanvas.width = "30";
  offscreenCanvas.height = "1000";
  offscreenCanvas.style.display = "none";
  document.body.appendChild(offscreenCanvas);
  var octx = offscreenCanvas.getContext('2d');
  octx.textAlign = "center";
  octx.font= fontSize+"px Arial";
  octx.fillStyle = 'rgb(46, 176, 143)';
  octx.textAlign = "left";
  var step = 10;
  for (i = 0; i < 50; i++) 
  {
    var charCode = Math.round(Math.random());
    octx.fillText(charCode, 0, step);
    step += fontSize;
  }
  return offscreenCanvas;
}
})();
