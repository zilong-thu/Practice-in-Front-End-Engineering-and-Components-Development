class WordCount extends HTMLElement {
  constructor() {
    super();

    var wcParent = this.parentNode;

    function countWords(node) {
      var text = node.innerText || node.textContent;
      var count = text.split(/\s+/g).length;
      var countDesc = 'Words: ' + countWords(node);

      return countDesc;
    }

    var shadow = this.attachShadow({mode: 'open'});

    var i = 0;
    var text = document.createElement('span');
    text.textContent = i; // countWords(wcParent);

    shadow.appendChild(text);

    setInterval(function() {
      text.textContent = i++;
    }, 1000);
  }
}


customElements.define('word-count', WordCount, {extends: 'p'});
