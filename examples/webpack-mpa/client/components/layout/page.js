import React from 'react';
import ReactDOM from 'react-dom';
import BasePage from './base-page';

export default class Page extends BasePage {
  static page(PageConent) {
    window.onload = function () {
      const container = document.getElementById('react-app');
      ReactDOM.render(<PageConent />, container);
    };
  }
}
