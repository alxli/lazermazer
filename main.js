var canvas, ctx;

/****************************************************/
/*                   Game Variables                 */
/****************************************************/

//game states
const state = {
  LOADING:      'loading',
  MENU:         'menu',
  INSTRUCTIONS: 'instructions',
  CREDITS:      'credits',
  PLAY:         'play',
  WIN:          'win',
  LOSE:         'lose',
  QUIT:         'quit'
};

var GAME_STATE = state.LOADING;

//if state is LOADING, what are we loading? ["Menu", "Map"]
const loadingState = {
  MENU:  'menu',
  MAP:   'map'
};

var CURR_LOADING = loadingState.MENU;


//Button class is found in button.js
var playButton, instructionsButton, creditsButton; //for menu
var backButton; //for instructions/credit pages

var currLevel = 1;
var map;

/****************************************************/
/*                   I/O Handlers                   */
/****************************************************/

//mouse stuff - all values are relative to topleft corner of canvas
var X = null, Y = null;           //current location of the mouse
var clickX = null, clickY = null; //last point that was clicked
var mouseHeld = false;            //is the mouse button currently being held?

function handleMouseMove(event) {
  X = event.offsetX;
  Y = event.offsetY;
  //console.log("(" + event.offsetX + ", " + event.offsetY + ")");
}

function handleMouseClick(event) {
  clickX = X;
  clickY = Y;
  //console.log("Clicked (" + clickX + ", " + clickY + ")");
}

function handleMouseDown(event) {
  mouseHeld = true;
  //console.log("HELD");
}

function handleMouseUp(event) {
  mouseHeld = false;
  //console.log("RELEASED");
}


/****************************************************/
/*                Game Entry Point                  */
/****************************************************/

window.onload = function() {
  canvas = document.getElementById("main-canvas");
  ctx = canvas.getContext("2d");

  //bind handlers
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("click",     handleMouseClick);
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup",   handleMouseUp);
  //document.onkeydown = handleKeyDown;
  //document.onkeyup = handleKeyUp;

  //instantiate buttons: Button(text, fontSize, x, y, width, height)
  playButton = new Button("Play", 40, 432, 500, 100, 45);
  instructionsButton = new Button("Instructions", 40, 360, 555, 250, 40);
  instructionsButton.shadowOffsetX = -5;
  instructionsButton.shadowOffsetFontSize = -2;
  creditsButton = new Button("Credits", 40, 405, 605, 150, 40);
  creditsButton.shadowOffsetX = -4;
  backButton = new Button("< Back", 40, 80, 80, 145, 40);

  setInterval(function() {
    update();
    draw();
  }, 1000 / FPS);
};


/****************************************************/
/*                  Update Handlers                 */
/****************************************************/

function update() {
  if (GAME_STATE == state.LOADING) {
    updateLoading();
  } else if (GAME_STATE == state.MENU) {
    updateMenu();
  } else if (GAME_STATE == state.INSTRUCTIONS) {
    updateInstructions();
  } else if (GAME_STATE == state.CREDITS) {
    updateCredits();
  }
}

function updateLoading() {
  if (CURR_LOADING == loadingState.MENU) {
    if (loadedResources == numResources) {
      GAME_STATE = state.MENU;
      menuTheme.play();
    }
  } else if (CURR_LOADING == loadingState.MAP) {
    if (mapLoaded) {
      GAME_STATE = state.PLAY;
    }
  }
}

function updateMenu() {
  if (checkClicked(playButton)) {
    map = new Map(currLevel);

    GAME_STATE = state.LOADING;
    CURR_LOADING = loadingState.MAP;
    menuTheme.pause();
    gameTheme.play();

  } else if (checkClicked(instructionsButton)) {
    GAME_STATE = state.INSTRUCTIONS;
  } else if (checkClicked(creditsButton)) {
    GAME_STATE = state.CREDITS;
  }
}

function updateInstructions() {
  if (checkClicked(backButton)) {
    GAME_STATE = state.MENU;
  }
}

function updateCredits() {
  if (checkClicked(backButton)) {
    GAME_STATE = state.MENU;
  }
}

function checkClicked(button) {
  button.updateState(X, Y, mouseHeld);
  if (clickX != null && button.inRange(clickX, clickY)) {
    clickX = null;
    clickY = null;
    return true;
  }
  return false;
}

/****************************************************/
/*                   Draw Handlers                  */
/****************************************************/

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (GAME_STATE == state.LOADING) {
    drawLoading();
  } else if (GAME_STATE == state.MENU) {
    drawMenu();
  } else if (GAME_STATE == state.PLAY) {
    drawPlay();
  } else if (GAME_STATE == state.INSTRUCTIONS) {
    drawInstructions();
  } else if (GAME_STATE == state.CREDITS) {
    drawCredits();
  }
}

function drawLoading() {
  ctx.drawImage(loading, 0, 0);
}

function drawMenu() {
  ctx.drawImage(background, 0, 0);
  ctx.drawImage(menulogo, 250, 100);
  playButton.draw(ctx);
  instructionsButton.draw(ctx);
  creditsButton.draw(ctx);
}

function drawPlay() {

}

function drawInstructions() {
  ctx.drawImage(instructions, 0, 0);
  backButton.draw(ctx);
}

function drawCredits() {
  ctx.drawImage(credits, 0, 0);
  backButton.draw(ctx);
}
