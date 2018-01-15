class MyClock extends HTMLElement {
  constructor() {
    super();

    var wcParent = this.parentNode;

    var shadow = this.attachShadow({mode: 'open'});

    var text = document.createElement('span');
    text.textContent = new Date();

    shadow.appendChild(text);

    setInterval(function() {
      var time = new Date();
      text.textContent = time.toString();
    }, 1000);
  }
}

customElements.define('my-clock', MyClock, {extends: 'p'});
