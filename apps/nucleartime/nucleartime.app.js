// Load fonts
require("Font7x11Numeric7Seg").add(Graphics);
// position on screen
const X = 160, Y = 140;

function draw() {
  // work out how to display the current time
  var d = new Date();
  var h = d.getHours(), m = d.getMinutes();
  var time = (" "+h).substr(-2) + ":" + ("0"+m).substr(-2);
  // Reset the state of the graphics library
  g.reset();


  // ----TIME---- //
  // Set clock color
  g.setColor("#ff1e1e");

  // Draw the current time (4x size 7 segment)
  g.setFont("7x11Numeric7Seg",3);
  g.setFontAlign(1,1); // align right bottom
  g.drawString(time, X - 15, Y, true /*clear background*/);

  // Draw the seconds (2x size 7 segment)
  g.setFont("7x11Numeric7Seg",2);
  g.drawString(("0"+d.getSeconds()).substr(-2), X+15, Y, true /*clear background*/);

  // ----DATE---- //
  // Draw the date
  g.setFont("7x11Numeric7Seg",1);
  g.setFontAlign(0,1); // align center bottom

  g.setColor("#ff1e1e");
  // Pad the date - this clears the background if the date were to change length
  var dateStr = require("locale").date(d);
  g.drawString(dateStr, g.getWidth()/2, Y + 15, true /*clear background*/);
}

// Clear the screen once, at startup
g.clear();

// Draw immediately at first
draw();
var secondInterval = setInterval(Draw, 1000);

// Show launcher when middle button pressed
Bangle.setUI("clock");

// Stop updates when LCD is off, restart when on
Bangle.on('lcdPower',on=>{
  if (secondInterval) clearInterval(secondInterval);
  secondInterval = undefined;
  if (on) {
    secondInterval = setInterval(draw, 1000);
    draw(); // draw immediately
  }
});