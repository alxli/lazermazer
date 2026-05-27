const WIDTH = 960;
const HEIGHT = 720;

const FPS = 30;

//number of "cells" in the 2D map
const ROWS = HEIGHT / 8;
const COLS = WIDTH / 8;

/****************************************************/
/*                   Game Resources                 */
/****************************************************/

const numResources = 9; //excludes music files
var loadedResources = 0;

var loading = new Image();
loading.src = "images/loading.png";
loading.onload = function() { loadedResources++; }

var background = new Image();
background.src = "images/background.png";
background.onload = function() { loadedResources++; }

var menulogo = new Image();
menulogo.src = "images/menulogo.png";
menulogo.onload = function() { loadedResources++; }

var instructions = new Image();
instructions.src = "images/instructions.png";
instructions.onload = function() { loadedResources++; }

var credits = new Image();
credits.src = "images/credits.png";
credits.onload = function() { loadedResources++; }

var space = new Image();
space.src = "images/space.png";
space.onload = function() { loadedResources++; }

var wall = new Image();
wall.src = "images/wall.png";
wall.onload = function() { loadedResources++; }

var darkness = new Image();
darkness.src = "images/darkness.png";
darkness.onload = function() { loadedResources++; }

var end = new Image();
end.src = "images/end.png";
end.onload = function() { loadedResources++; }

//music files

var menuTheme = new Audio('misc/gilded_darkness.mp3');
menuTheme.loop = true;

var gameTheme = new Audio('misc/broken_umbrella.mp3');
gameTheme.loop = true;