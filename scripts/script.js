let memoryArray = ['img/1.png','img/1.png','img/2.png','img/2.png','img/3.png','img/3.png','img/4.png','img/4.png','img/5.png','img/5.png','img/6.png','img/6.png',
	'img/7.png','img/7.png','img/8.png','img/8.png','img/9.png','img/9.png','img/10.png','img/10.png','img/11.png','img/11.png','img/12.png','img/12.png', 'img/13.png',
	'img/13.png', 'img/14.png', 'img/14.png', 'img/15.png', 'img/15.png'];
let memoryValues = [];
let memoryTileId = [];
let flippedTiles = 0;
let startTime;


Array.prototype.memory_tile_shuffle = function() {
	let i = this.length;
	let j;
	let temp;
	while(--i > 0){
		j = Math.floor(Math.random() * (i+1));
		temp = this[j];
		this[j] = this[i];
		this[i] = temp;
	}
};

const newGame = () => {
	flippedTiles = 0;
	let output = '';
	memoryArray.memory_tile_shuffle();
	$.each(memoryArray, i => {
		output += `<div id="tile_${i}" onclick="memoryFlipTile(this,'${memoryArray[i]}')"></div>`;
	});
	$('#memory_board').html(output);
	$('div').animate({'opacity': '1.0'},1200);
	startTime = performance.now();
};
const memoryFlipTile = (tile,val) =>{
	if(tile.style.backgroundImage != `url("${val}")` && memoryValues.length < 2){
		$(tile).animate({'opacity': '0.1', 'background-size': '-=111'}, 400, () => {
			$(tile).css({'background': `url(${val}) no-repeat`,'background-position': 'center'});
		}).animate({'opacity': '1', 'background-size': '+=111'}, 400);
		if(memoryValues.length === 0){
			memoryValues.push(val);
			memoryTileId.push(tile.id);
		} else if(memoryValues.length === 1){
			memoryValues.push(val);
			memoryTileId.push(tile.id);
			if(memoryValues[0] === memoryValues[1]){
				flippedTiles += 2;
				memoryValues = [];
				memoryTileId = [];
				if(flippedTiles === memoryArray.length){
					const finishTime = (performance.now() - startTime)/1000;
					alert(`You finished in ${Math.round(finishTime)} seconds.`);
					$("#memory_board").html('<button type="submit" onclick="newGame();">Start Game</button>');
				}
			} else {
				setTimeout(flip2Back, 1100);
			}
		}
	}
};
const flip2Back = () => {
	$(`#${memoryTileId[0]},#${memoryTileId[1]}`).css({'background': 'url(img/bg.jpg) no-repeat',
		'background-size': '111px','background-position': 'center'});
	memoryValues = [];
	memoryTileId = [];
};