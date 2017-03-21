var $ = require('webpack-zepto');

var sub = require('./sub');
require('./aa')
$(function(){
	$("body").html(sub());
});
