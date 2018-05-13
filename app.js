/*
var express = require('express');
var app = express();
*/
//app.listen(3000, ()=>{console.log ('listen on 3000')});
/*
const axios = require('axios');
//http://www.sanatorii.by/?Alesya
//https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
axios.get('http://www.sanatorii.by/?Alesya')
  .then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });
*/
//const express = require('express');
//const app = express();
const scrape = require('website-scraper');
const cheerio = require('cheerio');
const utf8 = require('utf8');
var encoding = require("encoding");
var xmaccyrillic = require('x-mac-cyrillic');

var Buffer = require('buffer').Buffer;





//const crawler = require("crawlerr");
//const spider = crawler("http://www.sanatorii.by/");


var request = require('request');
var iconv = require('iconv');

request.get({
  url: 'http://www.sanatorii.by/?Alesya',
  encoding: null,
}, function(err, res, body) {

  var ic = new iconv.Iconv('CP1251', 'utf-8');
  var buf = ic.convert(body);
  var utf8String = buf.toString('utf-8');
  const $ = cheerio.load(utf8String,  { decodeEntities: false })
  //  console.log ($.html())
    //tr_hover acceptor
  let rooms = $( ".tr_hover.acceptor" )
  let roomNames = $('.shadow')
  let costTable = $('#costtable').find('.tr_hover.acceptor').find('.shadow')

console.log ( costTable.length)
console.log ( typeof costTable)
console.log(Object.keys(costTable))
//console.log ( costTable[0].children)



/*
for (var variable in roomNames) {
  if (roomNames.hasOwnProperty(variable)) {
    if (roomNames[variable].hasOwnProperty('children')) {






//console.log(Object.keys(roomNames[variable]['children']))



 for (var variable1 in roomNames[variable]['children']) {
   console.log ((roomNames[variable]['children'][variable1].hasOwnProperty('attribs')))
   if (roomNames[variable]['children'][variable1].hasOwnProperty('attribs')) {
      console.log (roomNames[variable]['children'][variable1]['attribs']['title'])
   }
 }
/*
    if (roomNames[variable]['children'].hasOwnProperty('attribs')) {
      console.log (roomNames[variable]['children']['attribs'])
    }
*/


        //console.log (roomNames[variable]["children"])

    /*}
  }
}
*/




});
