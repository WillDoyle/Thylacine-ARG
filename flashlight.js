//DXB211 Creative codeing AS1: Task 2, Recombination effects
//Alex Ward n10753010
//
//This sketch is intended to be a 'horror' game using the get() function to create a flashlight to see ghosts, aesthetically the game is in a pixelated format. The code itselfis adapted from the tutorial 4 drawcell() function, getting the pixels from the ghost and only displaying them if they're in the radius of the flashlight - it also makes all pixels outside of the flashlight black to emulate darkness. To play the game, click on the ghosts to take photos of them. THe code works by calulating the distance between the mouse and the origin of the ghost (which has been offsetted). 

//WARNING: i think the frames may be bad on laptops
//images and font
let font;
let ghost;
let bg;
let thylacine;
//radius
let r = 160;
//ghost location
var randomX = 250;
var randomY = 100;
//distance for flashlight circle and dg for distance to ghost
let d;
let dg;
//colour around flashlight
let flash = "black";
//score to keep track of ghosts captured
var score = 0;
//preloading images and font
function preload() {
  font = loadFont("data/minecraft_font.ttf")
  bg = loadImage("data/forest2.png");
  ghost = loadImage("data/ghost-1.png");
  thylacine = loadImage("data/thylacine.png");
}

function mouseClicked() {
  //changes flash colour to white to simulate camera flash
  flash = "rgb(229,231,219)";
  
  //rect(bg.width,bg.height,bg.width,bg.height);
  //gets distance from the middle of ghost, +42 is the offset as ghost images are rendered from the top left
  dg = dist(mouseX, mouseY, randomX + 42, randomY + 42);
  //console.log(dg);
  //if the distance is just touching the ghost (give or take a pixel)
  if (dg <= r / 1.5) {
    for(i=30; i< 255; i++){
        background(i);
    }
    //add 1 to score
    score++;
    //console.log(score);
    //new ghost location
    randomX = random(0, windowWidth - (windowWidth/60));
    randomY = random(0, windowHeight - (windowHeight/60));
  }
}
function flashlight(x, y) {
    // Calculate the bounds of the loop based on the distance between the mouse and the edge of the flashlight.
    let startX = mouseX - r / 2;
    let startY = mouseY - r / 2;
    let endX = mouseX + r / 2;
    let endY = mouseY + r / 2;
    //!!!! code adapted from tutrial 4 drawcell() not sure how to link it !!!!
    for (let x = startX; x < endX; x += 5) {
      for (let y = startY; y < endY; y += 5) {
        d = dist(mouseX - 2.5, mouseY - 2.5, x, y);
        if (d <= r / 2) {
          
          lightsquare(x - 10, y - 10, 5);
          
        } else {
          
          fill(0);
          square(x - 2.5, y - 2.5, 3);
        }
      }
    }
    flash = "black";
  }

function lightsquare(x, y) {
  //!!!! code adapted from tutrial 4 drawcell() not sure how to link it !!!!
  // Switch to RGB color mode to correctly sample colour.
  colorMode(RGB);
  
  let pixColor = thylacine.get(x-randomX, y-randomY);
  let hu = hue(pixColor);
  let sa = saturation(pixColor);
  let br = brightness(pixColor);
  fill(255);

  stroke(pixColor);
  circle(x, y, 10);
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('flashlight-container');
    frameRate(60);
  }
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
  function draw() {
    background(0);
    flashlight(mouseX, mouseY);

    //convert score to string, dont know if this is needed but i thought it would be good form
    let strSC = String(score);
    fill("white");
    textFont(font)
    textSize(20);
    text("Thylacines Captured: "+strSC, 10, windowHeight - 10);
  }
