"""
bounce the ball at the edges
"""
import pgzrun
from random import randint


WIDTH = 800
HEIGHT = 600
BLACK = (0, 0, 0)
PADDLE_SIZE = (200, 25)
paddle = {"x": 20, "y": HEIGHT-100, "length": 200, "width":25}
ball = {"x": 0, "y": 0, "move_x": 5, "move_y": 5}
BALL_RADIUS = 25
WHITE = (255, 255, 255)
game_status = {"game_over": False}


def draw():
    screen.clear()
    screen.fill(BLACK)
    screen.draw.filled_circle((ball["x"], ball["y"]), BALL_RADIUS, 'red')
    screen.draw.filled_rect(Rect(paddle["x"],paddle["y"],paddle["length"],paddle["width"]),'white')
    if game_status["game_over"]:
        draw_end_game()


def update():
    if not game_status["game_over"]:
        move_ball()
        bounce()
        detect_collision()


def move_ball():
    ball["x"] += ball["move_x"]
    ball["y"] += ball["move_y"]


def on_mouse_move(pos):
    paddle["x"] = pos[0]


def bounce():
    if (ball["x"] > (WIDTH - BALL_RADIUS)) or (ball["x"] < BALL_RADIUS):
        ball["move_x"] *= -1
    if ball["y"] < BALL_RADIUS:
        ball["move_y"] *= -1


def detect_collision():
    if (ball["y"] + BALL_RADIUS) > (paddle["y"]):
        if((ball["x"] + BALL_RADIUS) > paddle["x"]) and ((ball["x"]-BALL_RADIUS) <= (paddle["x"] + paddle["length"])):
            ball["move_y"] *= -1

        else:
            game_status["game_over"] = True


def position_ball():
    ball["x"] = randint(BALL_RADIUS, WIDTH-BALL_RADIUS)
    ball["y"] = BALL_RADIUS


def draw_end_game():
    screen.draw.text("GAME OVER", (WIDTH - 130, 10), fontsize=30, color=WHITE)


position_ball()
pgzrun.go()