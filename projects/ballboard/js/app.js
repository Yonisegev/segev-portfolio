const WALL = 'WALL';
const FLOOR = 'FLOOR';
const PASSAGE = 'PASSAGE';
const BALL = 'BALL';
const GAMER = 'GAMER';
const GLUE = 'GLUE';

const GAMER_IMG = '<img src="img/gamer.png" />';
const BALL_IMG = '<img src="img/ball.png" />';
const GLUE_IMG = '<img src = "img/candy.png"/>';

var gBoard;
var gGamerPos;
var gRandBallsInterval;
var gGlueInterval;
var gBallCount = 0;
var gIsGlued = false;
var gIsGameOn = true
function initGame() {
	document.querySelector('button').style.display = 'none';
	gBallCount = 0;
	if (gRandBallsInterval) clearInterval(gRandBallsInterval)
	gGamerPos = { i: 2, j: 9 };
	gBoard = buildBoard();
	renderBoard(gBoard);
	document.querySelector('.score').innerText = 0;
	gRandBallsInterval = setInterval(renderRandBall, 3000, gBoard);
	gGlueInterval = setInterval(spawnGlue, 5000, gBoard)
}


function buildBoard() {
	// Create the Matrix
	var board = createMat(10, 12)


	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			// Put FLOOR in a regular cell
			var cell = { type: FLOOR, gameElement: null };

			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
			}

			// Add Passages
			if (i === 0 && j === 5 || i === 9 && j === 5 ||
				i === 5 && j === 0 || i === 5 && j === 11) {
				cell.type = FLOOR;
			}


			// Add created cell to The game board
			board[i][j] = cell;
		}
	}

	// Place the gamer at selected position
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
	// Place the Balls (currently randomly chosen positions)

	// board[3][8].gameElement = BALL;
	// board[7][4].gameElement = BALL;

	console.log(board);
	return board;
}

// Render balls at a random location
function renderRandBall(board) {
	var i = getRandomInteger(1, board.length - 1);
	var j = getRandomInteger(1, board.length + 1);
	if (board[i][j].type === FLOOR && !board[i][j].gameElement) {
		board[i][j].gameElement = BALL;
		renderCell({ i, j }, BALL_IMG);
		return;
	} else renderRandBall(board);
}

// Render glue at a random location
function spawnGlue(board) {
	var i = getRandomInteger(1, board.length - 1);
	var j = getRandomInteger(1, board.length + 1);
	if (board[i][j].type === FLOOR && !board[i][j].gameElement) {
		board[i][j].gameElement = GLUE;
		renderCell({ i, j }, GLUE_IMG);

		setTimeout(function () {
			if (board[i][j].gameElement === GAMER) return
			board[i][j].gameElement = null
			renderCell({ i, j }, '');
		}, 3000)

		return;
	} else spawnGlue(board);
}

// Render the board to an HTML table
function renderBoard(board) {

	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			// TODO - change to short if statement
			if (currCell.type === FLOOR || currCell.type === PASSAGE)
				cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';


			// TODO - Change To template string
			// strHTML += '\t<td class="cell ' + cellClass +
			// 	'"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			strHTML += `\t<td class="cell ${cellClass}" onclick="moveTo(${i},${j})">\n`;

			// TODO - change to switch case statement
			var currCellValue = currCell.gameElement;
			switch (currCellValue) {
				case GAMER:
					strHTML += GAMER_IMG;
					break;
				case BALL:
					strHTML += BALL_IMG;
					break;
			}
			// if (currCell.gameElement === GAMER) {
			// 	strHTML += GAMER_IMG;
			// } else if (currCell.gameElement === BALL) {
			// 	strHTML += BALL_IMG;
			// }

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}

	console.log('strHTML is:');
	console.log(strHTML);
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {
	// If user hits glue, freeze for 3 seconds
	if (!gIsGameOn) return
	if (gIsGlued) return;
	if (isVictory(gBoard)) {
		clearInterval(gRandBallsInterval);
		document.querySelector('button').style.display = 'block';
		gIsGameOn = false
		return
	}
	// Passages if's
	if (i === -1) i = 9;
	if (i === 10) i = 0;
	if (j === -1) j = 11;
	if (j === 12) j = 0;

	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0 || (iAbsDiff === 9 && jAbsDiff === 0) || (iAbsDiff === 0 && jAbsDiff === 11))) {

		// Count balls and make sound
		if (targetCell.gameElement === BALL) {
			var audio = new Audio('./sound/sound.mp3')
			audio.play();
			var elBallCount = document.querySelector('.score');
			console.log('Collecting!');
			gBallCount++;
			elBallCount.innerText = gBallCount;

		}
		// Handle glue penalty
		if (targetCell.gameElement === GLUE) {
			var glueAudio = new Audio('./sound/gluesound.mp3')
			glueAudio.play();
			var elBgc = document.querySelector('body');
			elBgc.style.backgroundColor = 'darkred';
			gIsGlued = true;
			setTimeout(function () {
				gIsGlued = false;
				elBgc.style.backgroundColor = 'black';
			}, 3000);
		}



		// MOVING from current position
		// Model:
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		// Dom:
		renderCell(gGamerPos, '');

		// MOVING to selected position
		// Model:
		gGamerPos.i = i;
		gGamerPos.j = j;
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		// DOM:
		renderCell(gGamerPos, GAMER_IMG);

	} // else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

	var i = gGamerPos.i;
	var j = gGamerPos.j;


	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;

	}

}

// Check victory
function isVictory(board) {
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[i].length; j++) {
			if (board[i][j].gameElement === BALL) return false;
		}
	}
	console.log('checking victory', gBallCount);
	if (gBallCount > 0) return true;
}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

