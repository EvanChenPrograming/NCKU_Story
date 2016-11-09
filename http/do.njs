#!/usr/local/bin/node

var querystring = require('querystring');
var param = querystring.parse(process.env.QUERY_STRING);


var name = require("./name.json");

console.log('Content-type: text/html; charset=utf-8\n');

if(name.hasOwnProperty(param.number))
{
console.log('<h1>Hello !! '+name[param.number]+'. </h1>' );
}
if(!name.hasOwnProperty(param.number))
{
console.log('<h1>Sorry!!! '+param.number+' '+',you are not one of us yet. Come and join us!!!</h1>');
}
