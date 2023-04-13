document.addEventListener('touchstart', {})
//WARNING: i think the frames may be bad on laptops
//images and font
let font;
let ghost;
let bg;
let thylacine;
let finalThy;
let bgAudio;
var hitbox; 

let startTime;
const duration = 8; // fade duration in seconds
const curveExponent = 1; // controls the rate of the fade



//radius
let r = 300;
//ghost location
var imageWidth = 600;
var imageHeight = 600;
var maxX
var maxY
var randomX = 0;
var randomY = 0;
var redThyClicked = 1;
var offset = 0


//distance for flashlight circle and dg for distance to ghost
let d;
let dg;
//colour around flashlight
let flash = "black";
//score to keep track of ghosts captured
var score = 0;
//preloading images and font
function preload() {
  font = loadFont("images/minecraft_font.ttf")
  bg = loadImage("images/thybg.gif");


  thylacine = loadImage("images/thefinalthy.png");
  finalThy = loadImage("images/thefinalthy.png");
  overlay = loadImage("images/OVERLAY.jpg");
  soundFormats('ogg');
  splat = loadSound('sounds/splat.ogg');
}

function setup() {
  startTime = millis();
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('flashlight-container');
  frameRate(60);



  //Sound 
  //bgAudio = loadSound('sounds/binural.ogg');
  //soundFormats('ogg');


  //Radius
  r = windowWidth*0.40*redThyClicked;
  
      if (r >=300 ){
      r=300
    }
      if (r <= 250) {
        imageHeight = 200;
        imageWidth = 200;
        ghost = finalThy;
        finalThy.resize(imageWidth, imageHeight);
        thylacine.resize(imageWidth,imageHeight);
        overlay.resize(windowWidth, windowHeight);
        ghost.resize(imageWidth, imageHeight);
      }
    hitbox = r;
    maxX = windowWidth - imageWidth;
    maxY = windowHeight - imageHeight;
    randomX = random(offset, maxX);
    randomY = random(offset, maxY);
    
}

function mouseClicked() {
  //changes flash colour to white to simulate camera flash
  flash = "rgb(229,231,219)";
  
  //rect(bg.width,bg.height,bg.width,bg.height);
  //gets distance from the middle of ghost, +42 is the offset as ghost images are rendered from the top left
  dg = dist(mouseX, mouseY, randomX + hitbox, randomY + hitbox);
  
  //console.log(dg);
  //if the distance is just touching the ghost (give or take a pixel)
  if (dg <= r / 1) {

    //add 1 to score
    score++;
    splat.play();

      if(score >= 4){
        //bgAudio.setVolume(0.1);
        //bgAudio.play();
    redThyClicked = redThyClicked+0.3;
    r = windowWidth*0.40*redThyClicked;
    ghost = finalThy;

    finalThy.resize(imageHeight +redThyClicked*150, imageWidth + redThyClicked*150);
    thylacine.resize(imageHeight +redThyClicked*150, imageWidth + redThyClicked*150);
    ghost.resize(imageHeight +redThyClicked*150, imageWidth + redThyClicked*150);
    offset =  imageHeight +redThyClicked*150 /2; 
    randomX = random(-1* offset, maxX-150);
    randomY = random(-1* offset, maxY-150);
    console.log(-1* offset)
    if(score >=5) {
      flash = "blue";
    }
    }
  else{
    
    ghost = finalThy;
          
  }
    //If score is 5
    if(score == 7){
      randomX = -2000;
      window.location.href = "poem.html"

    }
    else{
      // set the image size

      
      // calculate the maximum random X and Y coordinates to ensure the image is within the screen bounds

      
      
      //new ghost location
      
      // generate new random X and Y coordinates within the screen bounds
      randomX = random(0, maxX);
      randomY = random(0, maxY);
      //console.log(randomX);
      //console.log(randomY);
    }

    
  }
}
function flashlight(x, y) {
  // Set the distance threshold for rendering squares
  const threshold = r / 2;
  
  // Calculate the bounds for the loop
  const startX = mouseX - threshold;
  const endX = mouseX + threshold +5;
  const startY = mouseY - threshold;
  const endY = mouseY + threshold +5 ;
  
  // Loop through the squares within the bounds
  for (let xPos = startX; xPos < endX; xPos += 5) {
    for (let yPos = startY; yPos < endY; yPos += 5) {
      d = dist(mouseX, mouseY, xPos, yPos);
      if (d <= threshold) {
        lightsquare(xPos, yPos);
      } else {

        fill(flash);
        stroke(flash);
        square(xPos - 2.5, yPos - 2.5, 5);
      }
    }
  }

  // Draw black rectangles around the flashlight
  noStroke();
  fill(flash);
  rect(0, 0, windowWidth, mouseY - threshold); // Top rectangle
  rect(0, mouseY + threshold, windowWidth, windowHeight - (mouseY + threshold)); // Bottom rectangle
  rect(0, mouseY - threshold, mouseX - threshold, threshold * 2); // Left rectangle
  rect(mouseX + threshold, mouseY - threshold, windowWidth - (mouseX + threshold), threshold * 2); // Right rectangle

  flash = "red";
  image(overlay, 0, 0, windowWidth, windowHeight);

  tint(255, 110);
 

}

function lightsquare(x, y) {
  //!!!! code adapted from tutrial 4 drawcell() not sure how to link it !!!!
  // Switch to RGB color mode to correctly sample colour.
  colorMode(RGB);
  //Change thylacine image based on the score

  
  let pixColor = ghost.get(x-randomX, y-randomY);
  let hu = hue(pixColor);
  let sa = saturation(pixColor);
  let br = brightness(pixColor);
  fill(pixColor);
  stroke(pixColor);
  square(x, y, 6);
  
}

  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    r = windowWidth*0.50
    if (r >=300 ){
      r=300
    }
  }
  function draw() {
    clear();
    //background(bg);
    flashlight(mouseX, mouseY);

    //convert score to string, dont know if this is needed but i thought it would be good form
    let strSC = String(score);
    fill("0");
    textFont(font)
    textSize(20);
    
    //Change instructions text when score is greater than or equal 4
    if (score >= 4){

      text("Exterminate The Final \nThylacine", 10, windowHeight - 60);
      fill(0);
    }
    else{
      
      text("Destroy 5 Thylacines", 10, windowHeight - 40);
    }
    
    text("Thylacines Captured: "+strSC, 10, windowHeight - 10);
    

    const elapsedTime = (millis() - startTime) / 1000; // elapsed time in seconds
    if (elapsedTime > duration) {
      return; // fade is complete, do nothing
    }
    const opacity = 255 * pow(1 - elapsedTime/duration, curveExponent);


    fill(255, 0, 0, opacity);
    textSize(28);
    stroke('black');
      text('Exterminate it.', windowWidth / 2 - 100, 50);
      

  }

  
