// CommonJS
var React = require('react');
var ReactDOMServer = require('react-dom/server');

const html = ReactDOMServer.renderToString(<div>Hello</div>);

console.log(html);
