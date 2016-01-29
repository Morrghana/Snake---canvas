	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	var snake = {
			x: 0,
			y: 100,
			w: 10,
			l: 20
	};

	var step = 3;

	var move = {
			x: 3,
			y: 0
	};

	var statusUp = 1;
	var statusRight = 2;
	var statusDown = 3;
	var statusLeft = 4;
	var status = statusRight;

	var food = {
			w: 10,
			x: generateNumber(),
			y: generateNumber()
	};

	var score = 0;

	ctx.fillStyle = "#eee";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	document.addEventListener("keydown", keyDownHandler, false);

	function keyDownHandler(e) {
		if(e.keyCode == 38) {
			if(status != statusDown) {
		    	status = statusUp;
			}
	    }
		else if(e.keyCode == 39) {
			if(status != statusLeft) {
	        	status = statusRight;
			}
	    }
		else if (e.keyCode == 40) {
			if(status != statusUp) {
		    	status = statusDown;
			}
	    }
	    else if(e.keyCode == 37) {
	    	if(status != statusRight) {
		        status = statusLeft;
	    	}
	    }
	}

	function drawSnake(width, length) {
		ctx.beginPath();
		ctx.fillStyle = "green";
		ctx.rect(snake.x, snake.y, width, length);
		ctx.fill();
		ctx.closePath();
	}

	function generateFood() {
		food.x = generateNumber();
		food.y = generateNumber();
	}

	function generateNumber() {
		console.log(food);
		return Math.floor((Math.random()*(canvas.width - 10 * 2)) + 1);
	}

	function drawFood() {
		ctx.beginPath();
		ctx.fillStyle = "#0095DD";
		ctx.rect(food.x, food.y, food.w, food.w);
		ctx.fill();
		ctx.closePath();
	}

	function drawScore() {
		ctx.font = "16px Arial";
		ctx.fillStyle = "#0095DD";
		ctx.fillText("Score: " + score, 8, 20);
	}

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawFood();
		drawScore();

		if(status == statusUp) {
			move.x = 0;
			move.y = -step;
			drawSnake(snake.w, snake.l);
		}
		else if(status == statusRight) {
			move.x = step;
			move.y = 0;
			drawSnake(snake.l, snake.w);
		}
		else if(status == statusDown) {
			move.x = 0,
			move.y = step;
			drawSnake(snake.w, snake.l);
		}
		else if(status == statusLeft) {
			move.x = -step;
			move.y = 0;
			drawSnake(snake.l, snake.w);
		}

		if((food.x <= snake.x && snake.x <= food.x + food.w && food.y <= snake.y && snake.y <= food.y + food.w) ||
			(food.x <= snake.x + snake.w && snake.x + snake.w <= food.x + food.w && food.y <= snake.y + snake.w && snake.y + snake.w <= food.y + food.w)) {
			score ++;
			generateFood();
			drawFood();
		}

		if(snake.x < 0 || snake.x > canvas.width || snake.y < 0 || snake.y > canvas.height) {
			alert("Game over!");
			document.location.reload();
		}

		snake.x += move.x;
		snake.y += move.y;

		requestAnimationFrame(draw);
	}

	draw();
