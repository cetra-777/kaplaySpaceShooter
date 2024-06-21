import startGame from "kaplay";
import { makeGame } from "./game";
import { makeMenu } from "./mainMenu";
import { makeGameOver } from "./gameOver";
import { loadAssets } from "./loadAssets";

const k = startGame({
  global: false,
  width: 1280,
  height: 720,
  canvas: document.getElementById("game"),
  letterbox: true,
  texFilter: "nearest",
});

k.setBackground(k.Color.fromHex("071821"));

loadAssets(k);
makeMenu(k);
makeGameOver(k);
makeGame(k);

k.go("menu");
