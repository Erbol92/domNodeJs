// TODO: write code here
import { GameField } from "./gameField/gameField.js";

document.addEventListener("DOMContentLoaded", () => {
  const game = new GameField(document.getElementById("gameField"));
  window.game = game;

  const start = document.querySelector("button.start");
  const reset = document.querySelector("button.reset");

  start.addEventListener("click", () => {
    if (confirm("начать игру?")) {
      game.startGame();
    }
  });

  reset.addEventListener("click", () => {
    if (game.started && confirm("сбросить игру?")) {
      game.resetGame();
    }
  });
});
