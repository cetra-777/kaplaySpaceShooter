export function makeGame(k) {
  return k.scene("game", () => {
    // Create Game Objects

    const music = k.play("bg", { volume: 0.8, loop: true });
    const background = k.add([
      k.pos(0, 0),
      k.sprite("background", { width: 1280, height: 720, tiled: true }),
      k.scale(4),
    ]);

    const hudBox = k.add([
      k.pos(0, 0),
      k.rect(1280, 64),
      k.outline(4),
      k.color(k.Color.fromHex("#071821")),
      k.z(10),
    ]);

    const score = k.add([
      k.pos(20, 20),
      k.color(k.Color.fromHex("#e0f8cf")),
      k.text("Score: 0", {
        size: 32,
        font: "press2p",
      }),
      k.z(10),
      { value: 0 },
    ]);

    const player = k.add([
      k.pos(k.center().x, 700 - 64),
      k.sprite("ship"),
      k.area(),
      k.body(),
      k.anchor("center"),
      k.scale(4),
      {
        speed: 800,
      },
      "player",
    ]);

    function makeEnemy() {
      return k.add([
        k.pos(k.rand(k.vec2(k.width(), 0))),
        k.sprite("enemy"),
        k.area(),
        k.anchor("center"),
        k.scale(4),
        {
          speed: 300,
          fireTimer: 0,
          fireTime: k.rand(10, 100),
        },
        "enemy",
      ]);
    }

    makeEnemy();
    makeEnemy();
    makeEnemy();
    makeEnemy();
    makeEnemy();

    // Controls
    k.onKeyDown("left", () => {
      player.move(-player.speed, 0);
      if (player.pos.x <= 32) {
        player.pos.x = 32;
      }
    });

    k.onKeyDown("right", () => {
      player.move(player.speed, 0);
      if (player.pos.x >= 1280 - 32) {
        player.pos.x = 1280 - 32;
      }
    });

    k.onKeyDown("up", () => {
      player.move(0, -player.speed);
      if (player.pos.y <= 0) {
        player.pos.y = 0;
      }
    });

    k.onKeyDown("down", () => {
      player.move(0, player.speed);
      if (player.pos.y >= 720 - 32) {
        player.pos.y = 720 - 32;
      }
    });

    k.onKeyPress("space", () => {
      k.play("laser", { volume: 0.3 });
      k.add([
        k.pos(player.pos.x, player.pos.y - 64),
        k.sprite("laser"),
        k.area(),
        k.anchor("center"),
        k.offscreen({ destroy: true }),
        k.scale(4),
        {
          speed: 1000,
        },
        "laser",
      ]);
    });

    // Game Loop
    k.onUpdate("laser", (laser) => {
      laser.move(0, -laser.speed);
    });

    k.onUpdate("bullet", (bullet) => {
      bullet.move(0, bullet.speed);
    });

    k.onUpdate("enemy", (enemy) => {
      enemy.move(0, enemy.speed);
      enemy.fireTimer++;

      if (enemy.pos.y >= 784) {
        k.destroy(enemy);
        makeEnemy(k);
      }
      if (enemy.fireTimer >= enemy.fireTime) {
        k.play("bullet", { volume: 0.3 });
        k.add([
          k.pos(enemy.pos.x, enemy.pos.y + 32),
          k.sprite("bullet"),
          k.area(),
          k.anchor("center"),
          k.offscreen({ destroy: true }),
          k.scale(4),
          {
            speed: 500,
          },
          "bullet",
        ]);
        enemy.fireTimer = 0;
      }
    });

    // Collision
    k.onCollide("laser", "enemy", (laser, enemy) => {
      k.play("explode", { volume: 0.6 });
      score.value += 1;
      score.text = "Score: " + score.value;
      k.destroy(enemy);
      k.destroy(laser);
      makeEnemy();
    });

    k.onCollide("player", "enemy", (player, enemy) => {
      k.destroy(enemy);
      k.destroy(player);
      k.play("explode");
      music.stop();
      k.go("gameOver");
    });

    k.onCollide("player", "bullet", (player, bullet) => {
      k.destroy(player);
      k.destroy(bullet);
      k.play("explode");
      music.stop();
      k.go("gameOver");
    });
  });
}
