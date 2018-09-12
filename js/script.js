const holes = document.querySelectorAll('.hole');
const score = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

const start = document.querySelector('#start');
let lastHole;
let isPlaing = false;
let gameOver = false;

function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
	const holeIndex = Math.floor(Math.random() * holes.length);
	const hole = holes[holeIndex];
	if(lastHole === hole) {
		console.log('powtórka');
		return randomHole(holes);
	}
	lastHole = hole;
	return hole;
}
function showMole() {
	const time = randomTime(500, 1000);
	const hole = randomHole(holes);
	hole.classList.add('up');
	setTimeout(() => {
		hole.classList.remove('up');
		if(!gameOver) showMole();
	}, time);
}

function startGame() {
	if(isPlaing) return;
	gameOver = false;
	isPlaing = true;
	score.textContent = 0;
	showMole();
	setTimeout(() => {
		gameOver = true;
		isPlaing = false;
	}, 10000)
}

function hitTheMole(e) {
	if(!e.isTrusted) return; 
	const hits = this.querySelector('span');
	console.log(e, hits);
	hits.classList.add('hited');
	score.textContent++;
	setTimeout(() => {
		hits.classList.remove('hited');
	}, 300)

}

start.addEventListener('click', startGame);
moles.forEach( mole => {
	mole.addEventListener('click', hitTheMole);
})