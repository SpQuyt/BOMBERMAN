var nam = document.getElementById("quoc");
var point = document.getElementById("point");

var maxpoint = 110;
var count = 0;
var power_len = 5;
var max_bomb = 3;
var count_bomb = 0;
var brick = "╬╩╦╣╠╝╚╗╔║═BDO";

var map = [
	['╔', '═', '═', '═', '═', '═', '═', '═', '═', '═', '═', '═', '═', '═', '╗'],
	['║', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '║'],
	['║', ' ', '═', '═', '═', '═', '═', '╗', ' ', '║', ' ', '╔', '═', ' ', '║'],
	['║', ' ', ' ', ' ', ' ', ' ', ' ', '║', ' ', '║', ' ', '║', ' ', ' ', '║'],
	['║', ' ', ' ', ' ', ' ', ' ', ' ', '║', ' ', '║', ' ', '║', ' ', ' ', '║'],
	['╠', '═', '═', '═', '═', '═', '═', '╝', ' ', '║', ' ', '║', ' ', ' ', '║'],
	['║', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '║', ' ', '║', ' ', ' ', '║'],
	['║', ' ', '═', '═', '═', '═', '═', '═', '═', '╝', ' ', '╚', '═', ' ', '║'],
	['║', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '║'],
	['║', ' ', '═', '═', '═', '═', '═', '═', '═', '═', ' ', '═', '═', ' ', '║'],
	['║', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '║'],
	['║', ' ', '╔', '═', '═', '═', '═', '═', '═', '═', ' ', '═', '═', ' ', '║'],
	['║', ' ', '║', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '║'],
	['║', ' ', ' ', ' ', ' ', ' ', ' ', '║', ' ', ' ', ' ', ' ', ' ', ' ', '║'],
	['╚', '═', '═', '═', '═', '═', '═', '╩', '═', '═', '═', '═', '═', '═', '╝']
];

var bomb_map = [
	['╔', '═', '═', '═', '═', '═', '═', '═', '═', '═', '═', '═', '═', '═', '╗'],
	['║', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '║'],
	['║', ' ', '═', '═', '═', '═', '═', '╗', ' ', '║', ' ', '╔', '═', ' ', '║'],
	['║', ' ', ' ', ' ', ' ', ' ', ' ', '║', ' ', '║', ' ', '║', ' ', ' ', '║'],
	['║', ' ', ' ', ' ', ' ', ' ', ' ', '║', ' ', '║', ' ', '║', ' ', ' ', '║'],
	['╠', '═', '═', '═', '═', '═', '═', '╝', ' ', '║', ' ', '║', ' ', ' ', '║'],
	['║', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '║', ' ', '║', ' ', ' ', '║'],
	['║', ' ', '═', '═', '═', '═', '═', '═', '═', '╝', ' ', '╚', '═', ' ', '║'],
	['║', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '║'],
	['║', ' ', '═', '═', '═', '═', '═', '═', '═', '═', ' ', '═', '═', ' ', '║'],
	['║', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '║'],
	['║', ' ', '╔', '═', '═', '═', '═', '═', '═', '═', ' ', '═', '═', ' ', '║'],
	['║', ' ', '║', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '║'],
	['║', ' ', ' ', ' ', ' ', ' ', ' ', '║', ' ', ' ', ' ', ' ', ' ', ' ', '║'],
	['╚', '═', '═', '═', '═', '═', '═', '╩', '═', '═', '═', '═', '═', '═', '╝']
];


map[1][1] = '☺';
map[13][13] = '☻';


var bbman = {
	pos_x: 1,
	pos_y: 1,
	dx: 1,
	dy: 0,
	move: function () {
		if (map[this.pos_x][this.pos_y] == 'B') {
			map[this.pos_x][this.pos_y] = 'B';
			this.pos_x += this.dx;
			this.pos_y += this.dy;
			map[this.pos_x][this.pos_y] = '☺';
		}
		else if (map[this.pos_x][this.pos_y] == 'D') {
			map[this.pos_x][this.pos_y] = 'D';
			this.pos_x += this.dx;
			this.pos_y += this.dy;
			map[this.pos_x][this.pos_y] = '☺';
		}
		else {
			map[this.pos_x][this.pos_y] = ' ';
			this.pos_x += this.dx;
			this.pos_y += this.dy;
			map[this.pos_x][this.pos_y] = '☺';
		}
		display();
	}
};

var ghost = {
	pos_x: 13,
	pos_y: 13,
	dx: -1,
	dy: 0,
	foot: ' ',
	move: function () {
		map[this.pos_x][this.pos_y] = this.foot;
		this.pos_x += this.dx;
		this.pos_y += this.dy;
		this.foot = map[this.pos_x][this.pos_y];
		map[this.pos_x][this.pos_y] = '☻';
		display();
	}
};

function plant_bomb(bomb_pos_x, bomb_pos_y) {
	count_bomb++;
	map[bomb_pos_x][bomb_pos_y] = 'B';					//bomb blinking
	display();
	var countX = 0;
	var loopX = setInterval(function () {
		if (countX > 4) {
			clearInterval(loopX);
		}
		if (countX % 2 == 0) {
			map[bomb_pos_x][bomb_pos_y] = 'D';
			display();
		}
		else if (countX % 2 != 0) {
			map[bomb_pos_x][bomb_pos_y] = 'B';
			display();
		}
		countX++;
	}, 200);

	var explode = setTimeout(function () {		//bomb exploding and vanishing
		map[bomb_pos_x][bomb_pos_y] = 'O';
		for (var i = 1; i <= power_len; i++) {
			if (brick.indexOf(map[bomb_pos_x + i][bomb_pos_y + 0]) < 0) {
				map[bomb_pos_x + i][bomb_pos_y] = 'X';
			}
			else {
				break;
			}
		}
		for (var i = 1; i <= power_len; i++) {
			if (brick.indexOf(map[bomb_pos_x - i][bomb_pos_y + 0]) < 0) {
				map[bomb_pos_x - i][bomb_pos_y] = 'X';
			}
			else {
				break;
			}
		}
		for (var i = 1; i <= power_len; i++) {
			if (brick.indexOf(map[bomb_pos_x + 0][bomb_pos_y + i]) < 0) {
				map[bomb_pos_x][bomb_pos_y + i] = 'X';
			}
			else {
				break;
			}
		}
		for (var i = 1; i <= power_len; i++) {
			if (brick.indexOf(map[bomb_pos_x + 0][bomb_pos_y - i]) < 0) {
				map[bomb_pos_x][bomb_pos_y - i] = 'X';
			}
			else {
				break;
			}
		}

		var over = setTimeout(function () {
			map[bomb_pos_x][bomb_pos_y] = ' ';
			for (var i = 1; i <= power_len; i++) {
				if (brick.indexOf(map[bomb_pos_x + i][bomb_pos_y + 0]) < 0) {
					map[bomb_pos_x + i][bomb_pos_y] = ' ';
				}
				else {
					break;
				}
			}
			for (var i = 1; i <= power_len; i++) {
				if (brick.indexOf(map[bomb_pos_x - i][bomb_pos_y + 0]) < 0) {
					map[bomb_pos_x - i][bomb_pos_y] = ' ';
				}
				else {
					break;
				}
			}
			for (var i = 1; i <= power_len; i++) {
				if (brick.indexOf(map[bomb_pos_x + 0][bomb_pos_y + i]) < 0) {
					map[bomb_pos_x][bomb_pos_y + i] = ' ';
				}
				else {
					break;
				}
			}
			for (var i = 1; i <= power_len; i++) {
				if (brick.indexOf(map[bomb_pos_x + 0][bomb_pos_y - i]) < 0) {
					map[bomb_pos_x][bomb_pos_y - i] = ' ';
				}
				else {
					break;
				}
			}
			display();
		}, 200);
		clearTimeout(explode);
		count_bomb--;
	}, 1600);
}

function start() {
	display();
	// ghost move
	// var time2 = setInterval(loopGhost, 300);
	// function loopGhost() {
	// 	if (brick.indexOf(map[ghost.pos_x + ghost.dx][ghost.pos_y + ghost.dy]) < 0){
	// 		ghost.move();
	// 	}
	// 	else {
	// 		newdir = Math.floor((Math.random() * 4) + 1);
	// 		switch (newdir) {
	// 	    	case 1:
	// 	    		ghost.dx = 0;
	// 	    		ghost.dy = 1;
	// 	    		break;
	// 	    	case 2:
	// 	    		ghost.dx = 0;
	// 	    		ghost.dy = -1;
	// 	    		break;
	// 	    	case 3:
	// 	    		ghost.dx = -1;
	// 	    		ghost.dy = 0;
	// 	    		break;
	// 	    	case 4:
	// 	    		ghost.dx = 1;
	// 	    		ghost.dy = 0;
	// 	    		break;
	//    		}
	// 	}
	// 	check();
	// }

	// function check() {
	// 	if ( map[bbman.pos_x][bbman.pos_y] == 'X' || map[bbman.pos_x][bbman.pos_y] == 'O') {
	// 		// clearInterval(time2);
	// 		// map[ bbman.pos_x][ bbman.pos_y] = '۩';
	// 		display();
	// 		setTimeout(function(){ alert("YOU LOSE!!!"); }, 500);
	// 	}
	// 	if (count == maxpoint) {
	// 		clearInterval(time1);
	// 		clearInterval(time2);
	// 		setTimeout(function(){ alert("YOU WIN! FUCK!!!"); }, 500);
	// 	}
	// }
}

function display() {
	output = '';
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 15; j++) {
			output += map[i][j];
		}
		output += '<br>';
	}
	nam.innerHTML = output;
}

function display_bomb() {
	output = '';
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 15; j++) {
			output += bomb_map[i][j];
		}
		output += '<br>';
	}
	nam.innerHTML = output;
}

setTimeout(function () {

}, 1400);
document.addEventListener("keydown", (event) => {
	if (event.repeat == true) {      // event repeat

	}
	else {
		switch (event.keyCode) {
			case 39:
				bbman.dx = 0;
				bbman.dy = 1;
				if (brick.indexOf(map[bbman.pos_x + bbman.dx][bbman.pos_y + bbman.dy]) < 0) {
					bbman.move(bbman.pos_x, bbman.pos_y);
					display();
				}
				break;
			case 37:
				bbman.dx = 0;
				bbman.dy = -1;
				if (brick.indexOf(map[bbman.pos_x + bbman.dx][bbman.pos_y + bbman.dy]) < 0) {
					bbman.move(bbman.pos_x, bbman.pos_y);
					display();
				}
				break;
			case 38:
				bbman.dx = -1;
				bbman.dy = 0;
				if (brick.indexOf(map[bbman.pos_x + bbman.dx][bbman.pos_y + bbman.dy]) < 0) {
					bbman.move(bbman.pos_x, bbman.pos_y);
					display();
				}
				break;
			case 40:
				bbman.dx = 1;
				bbman.dy = 0;
				if (brick.indexOf(map[bbman.pos_x + bbman.dx][bbman.pos_y + bbman.dy]) < 0) {
					bbman.move(bbman.pos_x, bbman.pos_y);
					display();
				}
				break;
			case 32:
				console.log(count_bomb);
				if (count_bomb >= max_bomb) {

				}
				else {
					plant_bomb(bbman.pos_x, bbman.pos_y);
				}
				break;
		}
	}

});


