export class GameField {
  constructor(element) {
    this._element = element;
    this.started = false;
    this.goblin = null;
    this.interval = null;
    this.knocked = false;
  }

  startGame() {
    const inputs = document.querySelectorAll("input");
    this._createCells();
    const cells = this._element.querySelectorAll(".cell");
    this._createGoblin();
    this._addCellClickListeners(cells, inputs);
    this._startGoblinMovement(cells);
    this.started = true;
  }

  _addCellClickListeners(cells, inputs) {
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        if (!cell.classList.contains("withGoblin")) {
          inputs[1].value = (parseInt(inputs[1].value) || 0) + 1;
        } else {
          inputs[0].value = (parseInt(inputs[0].value) || 0) + 1;
          this.knocked = true;
          this._resetGoblinMovement(cells);
        }
      });
      const pos = this._getGoblinPosition(cells);
      this._moveGoblin(pos, cells);
    });
  }

  resetGame() {
    clearInterval(this.interval);
    this._element.innerHTML = "";
    this.started = false;
    document.querySelectorAll("input").forEach((element) => {
      element.value = 0;
    });
  }

  _createCells() {
    for (let i = 0; i < 16; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      this._element.appendChild(cell);
    }
  }

  _createGoblin() {
    const goblin = document.createElement("div");
    goblin.classList.add("goblin");
    this.goblin = goblin;
  }

  _getGoblinPosition(cells) {
    return Array.prototype.indexOf.call(cells, this.goblin.closest(".cell"));
  }

  _moveGoblin(pos, cells) {
    let newPos;
    do {
      newPos = this._getRandomInt(0, 16);
    } while (pos === newPos);

    if (pos !== -1) {
      cells[pos].classList.remove("withGoblin");
    }

    const cellWithGoblin = cells[newPos];
    cellWithGoblin.appendChild(this.goblin);
    cellWithGoblin.classList.add("withGoblin");
  }

  _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  _startGoblinMovement(cells) {
    const pos = this._getGoblinPosition(cells);
    this._moveGoblin(pos, cells);
    this.interval = setInterval(() => {
      this._moveGoblin(pos, cells);
    }, 1500);
  }

  _resetGoblinMovement(cells) {
    clearInterval(this.interval);
    this._startGoblinMovement(cells);
  }
}
