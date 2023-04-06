let dots = [];
let gridSize = 40;
let dotSize = 3;
let maxDistance = 100;



function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);

  canvas.parent('sketch-container');
  noStroke();
 fill(255, 0, 0, 50)

  
  // Create the grid of dots
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let x = map(i, 0, gridSize-1, dotSize, width-dotSize);
      let y = map(j, 0, gridSize-1, dotSize, height-dotSize);
      dots.push(createVector(x, y));
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  let gridSize = round(windowWidth/100) + 10;
  let dotSize = round(windowHeight/400) ;
  
   /*remove this to create insane effect*/
  
  for (let i = 0; i < dots.length; i++) {
    let distance = dist(mouseX, mouseY, dots[i].x, dots[i].y);
    if (distance < maxDistance) {
      // Calculate the angle between the cursor and the dot
      let angle = atan2(mouseY - dots[i].y, mouseX - dots[i].x);
      // Update the dot position based on the angle
      dots[i].x += cos(angle) * 10;
      dots[i].y += sin(angle) * 10;
    } else {
      // Return the dot to its original position
      let originalX = map(i % gridSize, 0, gridSize-1, dotSize, width-dotSize);
      let originalY = map(floor(i/gridSize), 0, gridSize-1, dotSize, height-dotSize);
      dots[i].x += (originalX - dots[i].x + random(-500,500)) * 0.1;
      dots[i].y += (originalY - dots[i].y + random(-500,500)) * 0.1;
    }
    ellipse(dots[i].x, dots[i].y, dotSize, dotSize);
  }
}