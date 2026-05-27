/* LazerMazer Custom styled Button Class */

var fontFamily = "Magneto";
var shadowColor  = "rgb(0, 0, 255)";
var neutralColor = "rgb(255, 0, 0)";
var hoveredColor = "rgb(255, 153, 153)";
var pressedColor = "rgb(153, 0, 0)";

const buttonState = {
  NEUTRAL: 'neutral',
  HOVER:   'hover',
  PRESSED: 'pressed'
};

function Button(text, fontSize, x, y, width, height) {
  this.state = buttonState.NEUTRAL;

  this.text = text;
  this.fontSize = fontSize; //in pixels
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  //optional adjustments that can be set to manually tweak the shadow
  this.drawShadow = true;
  this.shadowOffsetX = 0;
  this.shadowOffsetY = 0;
  this.shadowOffsetFontSize = 0;

  //check if given mouse coordinates is over the button
  this.inRange = function(X, Y) {
    //console.log(this.text + ": " + X + " " + this.x + " " + (this.x + this.width) + " | " + Y + " " + this.y + " " + (this.y + this.height + 5));
    return X >= this.x && X <= this.x + this.width &&
           Y >= this.y && Y <= this.y + this.height;
  };

  this.updateState = function(X, Y, mouseHeld) {
    //console.log(this.inRange(X, Y));
    if (!this.inRange(X, Y)) {
      this.state = buttonState.NEUTRAL;
    } else if (!mouseHeld) {
      this.state = buttonState.HOVER;
    } else {
      this.state = buttonState.PRESSED;
    }
  };

  this.draw = function(ctx) {
    ctx.textBaseline = "top";
    if (this.drawShadow) {
      //draw the shadow
      ctx.font = (this.fontSize + this.shadowOffsetFontSize) + "px " + fontFamily;
      ctx.fillStyle = shadowColor;
      ctx.fillText(this.text, this.x + this.shadowOffsetX, this.y + this.shadowOffsetY);
    }
    //draw the text
    ctx.font = (this.fontSize - 5) + "px " + fontFamily;
    if (this.state == buttonState.NEUTRAL) {
      ctx.fillStyle = neutralColor;
    } else if (this.state == buttonState.HOVER) {
      ctx.fillStyle = hoveredColor;
    } else { //buttonState.PRESSED
      ctx.fillStyle = pressedColor;
    }
    ctx.fillText(this.text, this.x + 7, this.y);
  };
}
