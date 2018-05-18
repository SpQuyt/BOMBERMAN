var nam = document.getElementById("quoc");
var point = document.getElementById("point");

var maxpoint = 110;
var count = 0;

var map = [
	['╔','═','═','═','═','═','═','═','═','═','═','═','═','═','╗'],
	['║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║'],
	['║',' ','═','═','═','═','═','╗',' ','║',' ','╔','═',' ','║'],
	['║',' ',' ',' ',' ',' ',' ','║',' ','║',' ','║',' ',' ','║'],
	['║',' ',' ',' ',' ',' ',' ','║',' ','║',' ','║',' ',' ','║'],
	['╠','═','═','═','═','═','═','╝',' ','║',' ','║',' ',' ','║'],
	['║',' ',' ',' ',' ',' ',' ',' ',' ','║',' ','║',' ',' ','║'],
	['║',' ','═','═','═','═','═','═','═','╝',' ','╚','═',' ','║'],
	['║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║'],
	['║',' ','═','═','═','═','═','═','═','═',' ','═','═',' ','║'],
	['║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║'],
	['║',' ','╔','═','═','═','═','═','═','═',' ','═','═',' ','║'],
	['║',' ','║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║'],
	['║',' ',' ',' ',' ',' ',' ','║',' ',' ',' ',' ',' ',' ','║'],
	['╚','═','═','═','═','═','═','╩','═','═','═','═','═','═','╝']	
];

var bomb_map = [
	['╔','═','═','═','═','═','═','═','═','═','═','═','═','═','╗'],
	['║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║'],
	['║',' ','═','═','═','═','═','╗',' ','║',' ','╔','═',' ','║'],
	['║',' ',' ',' ',' ',' ',' ','║',' ','║',' ','║',' ',' ','║'],
	['║',' ',' ',' ',' ',' ',' ','║',' ','║',' ','║',' ',' ','║'],
	['╠','═','═','═','═','═','═','╝',' ','║',' ','║',' ',' ','║'],
	['║',' ',' ',' ',' ',' ',' ',' ',' ','║',' ','║',' ',' ','║'],
	['║',' ','═','═','═','═','═','═','═','╝',' ','╚','═',' ','║'],
	['║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║'],
	['║',' ','═','═','═','═','═','═','═','═',' ','═','═',' ','║'],
	['║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║'],
	['║',' ','╔','═','═','═','═','═','═','═',' ','═','═',' ','║'],
	['║',' ','║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║'],
	['║',' ',' ',' ',' ',' ',' ','║',' ',' ',' ',' ',' ',' ','║'],
	['╚','═','═','═','═','═','═','╩','═','═','═','═','═','═','╝']
];


map[1][1] = '☺';
map[13][13] = '☻';

var brick = "╬╩╦╣╠╝╚╗╔║═";

var output = '';

var  bbman = {
	pos_x: 1, 
	pos_y: 1,
	dx: 1,
	dy: 0,
	move: function() {

		this.plant_bomb();
		this.pos_x += this.dx;
		this.pos_y += this.dy;
		map[this.pos_x][this.pos_y] = '☺';
		display();
	},
	// plant_bomb: function() {
	// 	bomb_map[this.pos_x][this.pos_y] = 1;
	// 	update_bomb();
	// 	display();
	// 	var explode = setTimeout (function() {
	// 		bomb_map[this.pos_x][this.pos_y] = 0.5;
	// 		bomb_map[this.pos_x+1][this.pos_y] = 0.5;
	// 		bomb_map[this.pos_x-1][this.pos_y] = 0.5;
	// 		bomb_map[this.pos_x][this.pos_y+1] = 0.5;
	// 		bomb_map[this.pos_x][this.pos_y-1] = 0.5;
	// 		update_bomb();
	// 		display();
	// 		clearTimeout(explode);
	// 	}, 2000);
	// 	bomb_map[this.pos_x][this.pos_y] = 0;
	// 	update_bomb();
	// 	display();
		
	// }
};

var ghost = {
	pos_x: 13, 
	pos_y: 13,
	dx: -1,
	dy: 0,
	foot: ' ',
	move: function() {
		map[this.pos_x][this.pos_y] = this.foot;
		this.pos_x += this.dx;
		this.pos_y += this.dy;
		this.foot = map[this.pos_x][this.pos_y];
		map[this.pos_x][this.pos_y] = '☻';
		display();
	}
};

function plant_bomb(pos_x, pos_y) {
		bomb_map[pos_x][pos_y] = 1;
		update_bomb();
		display();
		var explode = setTimeout (function() {
			bomb_map[pos_x][pos_y] = 0.5;
			bomb_map[pos_x+1][pos_y] = 0.5;
			bomb_map[pos_x-1][pos_y] = 0.5;
			bomb_map[pos_x][pos_y+1] = 0.5;
			bomb_map[pos_x][pos_y-1] = 0.5;
			update_bomb();
			display();
			clearTimeout(explode);
		}, 2000);
		bomb_map[pos_x][.pos_y] = 0;
		update_bomb();
		display();
		
	}

function update_bomb() {
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 15; j++) {
			if (bomb_map[i]]j == 1){
				map[i][j] = 'B';
			}
			else if (bomb_map[i]]j == 0.5){
				map[i][j] = 'X';
			}
		}
	}	
}

function start() {
	display();

	//  bbman move
	var time1 =  setInterval(loop bbman, 300);
	function loop bbman() {
		if (brick.indexOf(map[ bbman.pos_x +  bbman.dx][ bbman.pos_y +  bbman.dy]) < 0){
			 bbman.move();
		}
		check();
	}

	// ghost move
	var time2 = setInterval(loopGhost, 300);
	function loopGhost() {
		if (brick.indexOf(map[ghost.pos_x + ghost.dx][ghost.pos_y + ghost.dy]) < 0){
			ghost.move();
		}
		else {
			newdir = Math.floor((Math.random() * 4) + 1);
			switch (newdir) {
		    	case 1:
		    		ghost.dx = 0;
		    		ghost.dy = 1;
		    		break;
		    	case 2:
		    		ghost.dx = 0;
		    		ghost.dy = -1;
		    		break;
		    	case 3:
		    		ghost.dx = -1;
		    		ghost.dy = 0;
		    		break;
		    	case 4:
		    		ghost.dx = 1;
		    		ghost.dy = 0;
		    		break;
    		}
		}
		check();
	}

	function check() {
		if ( bbman.pos_x == ghost.pos_x &&  bbman.pos_y == ghost.pos_y) {
			clearInterval(time1);
			clearInterval(time2);
			map[ bbman.pos_x][ bbman.pos_y] = '۩';
			display();
		}
		if (count == maxpoint) {
			clearInterval(time1);
			clearInterval(time2);
			setTimeout(function(){ alert("YOU WIN! FUCK!!!"); }, 500);
		}
	}

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

document.addEventListener("keydown", (event) => {
    switch (event.keyCode) {
    	case 39:
    		 bbman.dx = 0;
    		 bbman.dy = 1;
    		break;
    	case 37:
    		 bbman.dx = 0;
    		 bbman.dy = -1;
    		break;
    	case 38:
    		 bbman.dx = -1;
    		 bbman.dy = 0;
    		break;
    	case 40:
    		 bbman.dx = 1;
    		 bbman.dy = 0;
    		break;
    }
});
