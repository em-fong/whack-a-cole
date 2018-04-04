//global vars
var score = 0;
var objects = [];
var time = 0;
var started = false;

//preload assets
function preload() {
  hammer = loadImage("assets/hammer.png");
  mole = loadImage("assets/mole.png");
  ding = loadSound("assets/ding.mp3");
  disney = loadFont("assets/dis.ttf");
}

//create a Mole class
class Mole {

  //set x position, y position, "state", counter, and frames to hold state
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.state = 0;
    this.count = 0;
    this.hold = 150;
  }

  //display the mole
  display() {
    if (this.state == 0) {
      fill(255, 0, 0);
      ellipse(this.x, this.y, 80, 80);
    } else {
      fill(0,255,0);
      image(mole, this.x, this.y);
    }
    //add to the counter
    this.count += 1;
  }


  //change states
  update() {
    if (this.count >= this.hold) {
      if (this.state == 0) {
          this.state = 1;
      } else {
          this.state = 0;
      }
      this.count = 0;
    }

  }

  //hit detection with mouse
  checkHit(x, y) {
    if (mouseIsPressed && dist(x, y, this.x, this.y) < 60) {
      if (this.state == 1) {
        this.state = 0;
        score += 1;
        ding.play();
      }
    }
  }

}

//create 9 moles and populate an array with them for easy displaying
//iterators map to x and y positions
for(var row = 150; row < 600; row++) {
  for(var col = 150; col < 600; col++){
    var test = new Mole(row, col);
    objects.push(test);
    col += 150;
  }
  row += 150;
}


function setup() {

  //general setup
  var canv = createCanvas(600, 600);
  canv.parent("#game");
  noStroke();
  imageMode(CENTER);
  cursor(HAND);

  //opening screen
  background(114, 202, 224);
  textSize(40);
  fill(255);
  textFont(disney);
  text("Disney Channel Presents: Whack A Mole", 45, 200);
  text("Press Space to Start!", 150, 280);
  text("You have 30 seconds!", 160, 320);

  //randomize mole display times
  for(var x = 0; x < objects.length; x++) {
    var rand = random(70, 200);
    objects[x].hold = rand;
  }

}

function draw() {

  //check for start screen condition
  if(keyIsDown(32)) {
    started = true;
  }

  //play the game if started!!
  if (started == true) {

    //wipe
    background(255);

    //use object array to keep Moles updated
    for(var i = 0; i < objects.length; i++){
      objects[i].display();
      objects[i].update();
      objects[i].checkHit(mouseX, mouseY);
    }

    //timer
    time = parseInt(millis()/1000);

    //display info & hammer
    fill(0);
    textSize(20);
    text("Score: " + score, 20, 40);
    text("Time: " + time, 20, 60);
    image(hammer, mouseX, mouseY);

    //check timer
    if(time === 30) {
      gameOver();
    }
  }

}


function gameOver() {

  //wipe screen & display message
  background(0);
  fill(255);
  textSize(30);
  text("Game over!", 260, 250);
  text("Your final score was: " + score, 200, 300);

  //prevent game from running again
  noLoop();
}
