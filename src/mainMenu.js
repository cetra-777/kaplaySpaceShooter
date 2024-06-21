export function makeMenu(k) {
  return k.scene("menu", () => {
    k.add([
      k.text("Space to fire, arrow keys to move around", {
        size: 16,
        font: "press2p",
      }),
      k.anchor("center"),
      k.color(k.Color.fromHex("#e0f8cf")),
      k.pos(k.center().x, k.center().y + 128),
    ]);
    const startButton = k.add([
      k.rect(32 * 6, 16 * 4, 0, 0),
      k.pos(k.center().x, k.center().y),
      k.color(k.Color.fromHex("#306850")),
      k.anchor("center"),
      k.area(),
      "startButton",
    ]);

    startButton.add([
      k.text("Start", { size: 32, font: "press2p" }),
      k.anchor("center"),
      k.color(k.Color.fromHex("#071821")),
    ]);

    k.onHover("startButton", () => {
      startButton.color = k.Color.fromHex("#e0f8cf");
    });

    k.onHoverEnd("startButton", () => {
      startButton.color = k.Color.fromHex("#306850");
    });

    k.onClick("startButton", () => {
      k.go("game");
    });

    k.onKeyPress("enter", () => {
      k.go("game");
    });
  });
}
