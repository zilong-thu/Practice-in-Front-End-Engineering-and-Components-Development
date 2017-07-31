import React from 'react';
import Page, {page} from '$root/client/components/layout/page.jsx';


@page
export default class HomePage extends Page {
  componentDidMount() {
    console.log('hahahah');
  }

  renderMain() {
    return (
      <div class="home-page">
        Hello World.
      </div>
    );
  }
}
