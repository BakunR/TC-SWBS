export class Person {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

export class Player extends Person {
  constructor(name) {
    super(name);
    this.win = 0;
    this.lose = 0;
  }

  getWin() {
    return this.win;
  }

  getLose() {
    return this.lose;
  }

  addWin() {
    this.win++;
  }

  addLose() {
    this.lose++;
  }
}
