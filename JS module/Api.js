export default class Api {
  //get Api class for fetch
  constructor(url) {
    this.url = url;
  }

  async getRandomShip() {
    const response = await fetch(
      `${this.url}/starships/${this.randomNumber()}`
    );
    return await response.json();
  }
  randomNumber() {
    //Ship random
    let arr = [2, 3, 5, 9, 10, 11, 12, 13, 15, 21, 22, 23];
    let playRandom = Math.floor(Math.random() * 12);
    return arr[playRandom];
  }
}
