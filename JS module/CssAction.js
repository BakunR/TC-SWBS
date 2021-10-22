export class CssAction {
  constructor(selector) {
    this.$el = document.querySelector(selector);
  }
  //Actions with opponent card
  hide() {
    this.$el.style.display = "none";
  }

  show() {
    this.$el.style.display = "block";
  }
}

export class TextColor extends CssAction {
  // class for CSS manipulation
  constructor(options) {
    super(options.selector);
    this.$el.style.color = options.color;
  }
  colorChange() {
    this.$el.style.color = this.getRandomColor();
  }
  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

export class Spinner extends CssAction {
  // loading class
  constructor(selector) {
    super(selector);
  }
  spinnerOn() {
    return (this.$el.innerHTML = `<div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`);
  }

  spinnerOff() {
    return (this.$el.innerHTML = "");
  }
}
