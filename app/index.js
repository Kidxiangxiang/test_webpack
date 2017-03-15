require('./main.scss');
//import "./main.scss";

var sub = require('./sub');
var $ = require('webpack-zepto');
var app  = document.createElement('div');
app.innerHTML = '<h1>Hello World</h1>';
app.appendChild(sub());
document.body.appendChild(app);
$('body').append('<p>这是引用zepto追加上去的</p>');
