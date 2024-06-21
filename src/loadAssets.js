export function loadAssets(k) {
  k.loadSpriteAtlas("sprites/sprites.png", {
    ship: { x: 0, y: 0, width: 16, height: 16, sliceX: 0, sliceY: 0 },
    background: { x: 16, y: 16, width: 16, height: 16, sliceX: 0, sliceY: 0 },
    laser: { x: 32, y: 0, width: 16, height: 16, sliceX: 0, sliceY: 0 },
    enemy: { x: 16, y: 0, width: 16, height: 16, sliceX: 0, sliceY: 0 },
    bullet: { x: 0, y: 16, width: 16, height: 16, sliceX: 0, sliceY: 0 },
  });

  k.loadFont("press2p", "./fonts/PressStart2P-Regular.ttf");

  k.loadSound("laser", "./sfx/laser.wav");
  k.loadSound("bullet", "./sfx/bullet.wav");
  k.loadSound("explode", "./sfx/explode.wav");

  k.loadSound("bg", "./music/Groove1.ogg");
}
