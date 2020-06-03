var ball_X = 300;
var ball_Y = 100;
var ballDiameter = 50;
var ballRadius = ballDiameter/2;
var ball_X_Move = 10;
var ball_Y_Move = 10;
var paddleWidth = 200;
var paddleHeight = 25;
var paddle_Y;
var score = 0;
var is_game_over = false;
var button, ball_color;

function setup() {
  createCanvas(windowWidth-50, windowHeight-50);
  insert_button();
  ball_color = get_random_color();
}

function draw() {
  background(0);
  draw_ball();
  draw_paddle();
  if(!is_game_over){
    move_ball();
    detect_paddle_collision();
  }
  else{
    display_game_over();
  }
  display_score();
}

function insert_button(){
  button = createButton('Reset');
  button.size(100,50);
  button.position(width-200, 50);
  button.style('font-size', '24px');
  button.style("background-color","#e61d19");
  button.style("color","#fff");
  button.mousePressed(reset);
}

function draw_ball(){
  fill(ball_color);
  noStroke();
  circle(ball_X, ball_Y, ballDiameter);
}

function draw_paddle(){
  paddle_Y = height-100;
  fill(0, 255, 255);
  noStroke();
  rect(mouseX, paddle_Y, paddleWidth, paddleHeight);
}

function move_ball(){
  ball_X += ball_X_Move;
  ball_Y += ball_Y_Move;
  bounce();

}

function bounce(){
  if(ball_X <  ballRadius|| ball_X > windowWidth-ballRadius){
    ball_X_Move *= -1;
  }
  if(ball_Y <  ballRadius){
    ball_Y_Move *= -1;
  }
  if(ball_Y > windowHeight-ballRadius){
    is_game_over = true;
  }
}

function detect_paddle_collision(){
  if((((ball_X + ballRadius) > mouseX) && ((ball_X - ballRadius) < (mouseX + paddleWidth)))&&((ball_Y + ballRadius) >= paddle_Y)){
      score++;
      ball_X_Move *= -1;
      ball_Y_Move *= -1;
      if(ball_Y > paddle_Y){
        is_game_over = true;
      }
  }
}

function display_score(){
  fill(255, 255, 255);
  textSize(32);
  text("Score: " + score, 50, 75);
}

function display_game_over(){
  fill(255, 0, 0);
  textSize(48);
  text("GAME OVER!!!", width/3, height/2);
}

function reset(){
  ball_X = 300;
  ball_Y = 100;
  is_game_over = false;
  score = 0;
  ball_color = get_random_color();
}

function get_random_color(){
  let colour = color(random(150,255), random(150,255), random(150,255));
  return colour;
}
