import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class BasePage extends Component {
  renderMain() {
    return <h1>I'm a base page!</h1>;
  }

  render() {
    return (
      {this.renderMain()}
    );
  }
}


export function initPage(PageContent) {
  window.onload = function() {
    const container = document.getElementById('react-app');
    ReactDOM.render(<PageContent />, container);
  }
}