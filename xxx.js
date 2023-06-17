const canvas = document.querySelector('#canvas'),
   ctx = canvas.getContext('2d');

const player = {
   w: 60,
   h: 50,
   x: 0,
   y: 0,
   speed: 3,
   dx: 0,
   dy: 0
};

const image = document.querySelector('#source');

function drawPlayer() {
   ctx.save();
   ctx.translate(player.x + player.w / 2, player.y + player.h / 2);

   if (player.dy > 0) {
      ctx.rotate(Math.PI / 2);
   } else if (player.dy < 0) {
      ctx.rotate(-Math.PI / 2);
   } else if (player.dy > 0) {
      ctx.rotate(Math.PI);
   } else if (player.dx < 0) {
      ctx.rotate(Math.PI);
   }
   ctx.drawImage(image, -player.w / 2, -player.h / 2, player.w, player.h);
   ctx.restore();
}
function clear() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos() {
   player.x += player.dx;
   player.y += player.dy;
   detectBored();
}

function detectBored() {
   if (player.x < 0) {
      player.x = 0;
   }
   if (player.x + player.w > canvas.width) {
      player.x = canvas.width - player.w;
   }
   if (player.y < 0) {
      player.y = 0;
   }
   if (player.y + player.h > canvas.height) {
      player.y = canvas.height - player.h;
   }
}
function update() {
   clear();
   drawPlayer();
   newPos();
   requestAnimationFrame(update);
}

function moveUp() {
   player.dy = -player.speed;
}

function moveDown() {
   player.dy = player.speed;
}

function moveRight() {
   player.dx = player.speed;
}

function moveLeft() {
   player.dx = -player.speed;
}

function keyDown(e) {
   console.log(e.key);
   if (e.key === 'ArrowRight' || e.key === 'Right') {
      moveRight();
   } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
      moveLeft();
   } else if (e.key === 'ArrowUp' || e.key === 'Up') {
      moveUp();
   } else if (e.key === 'ArrowDown' || e.key === 'Down') {
      moveDown();
   }
}

function keyUp(e) {
   if (
      e.key === 'ArrowRight' ||
      e.key === 'ArrowLeft' ||
      e.key === 'Right' ||
      e.key === 'Left'
   ) {
      player.dx = 0
   }
   if (
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown' ||
      e.key === 'Up' ||
      e.key === 'Down'
   ) {
      player.dy = 0
   }
}
update();
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);