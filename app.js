'use strict'

const scrape = require('website-scraper');//del
const cheerio = require('cheerio');
const utf8 = require('utf8');//del
var encoding = require("encoding");//del
var xmaccyrillic = require('x-mac-cyrillic');//del

var Buffer = require('buffer').Buffer;//del





//const crawler = require("crawlerr");
//const spider = crawler("http://www.sanatorii.by/");


var request = require('request');
var iconv = require('iconv');

request.get({
  //url: 'http://www.sanatorii.by/?Alesya',
  url:'http://www.sanatorii.by/?Belaya_vezha',
  encoding: null,
}, function(err, res, body) {

  var ic = new iconv.Iconv('CP1251', 'utf-8');
  var buf = ic.convert(body);
  var utf8String = buf.toString('utf-8');
  const $ = cheerio.load(utf8String,  { decodeEntities: false })

  let rooms = []


  class roomDescription {

  constructor(roomName, roomAccamodation, roomDetails) {

    this.roomName = roomName
    this.roomAccamodation = roomAccamodation
    this.roomDetails = roomDetails

  }

}




  // размещение и название номера
  let costTable = $('#costtable').find('.tr_hover.acceptor').find('.shadow').toArray()
  for (var i = 0; i < costTable.length; i++) {
    let roomAccamodation = []
    let roomDetails = null
    let roomName = null

    costTable[i].children.forEach((elem, index)=>{
      if (elem.hasOwnProperty ('attribs')) {
        if (elem.attribs.title == undefined) {
          roomDetails = elem.children[0].data
          console.log (elem.children[0].data) // room details
        } else {
          roomAccamodation.push (elem.attribs.title)
          console.log (elem.attribs.title) // room accomodation strings
        }



      }

      if (elem.hasOwnProperty ('data')) {
        console.log (elem.data) // room name
        roomName = elem.data
      }



    })
    //console.log (rooms.length)
    let currentRoom= new roomDescription(roomName, roomAccamodation, roomDetails)
    rooms.push (currentRoom)
  }

  console.log (rooms)

// цены по датам и вариантам размещения
/*
let priceTables = $('.newtab_noborder').toArray()
//console.log (priceTables.length)

priceTables.forEach ((elem1, index1)=>{


elem1.children.forEach ((elem2 , index2)=>{ // tr
  if (elem2.children == undefined) {


  } else {

    elem2.children.forEach ((elem3 , index3)=>{ // td


if (elem3.children != undefined) {
  elem3.children.forEach ((elemnt4, index4)=>{

if (elemnt4.children != undefined) {
  if (elemnt4.hasOwnProperty ('attribs')) {

    if (elemnt4.attribs.title == undefined) {

    } else {
      console.log ("elemnt4.attribs.title")
      console.log (elemnt4.attribs.title)


    }
  }

  if (elemnt4.hasOwnProperty ('data')) {
      console.log (elemnt4.data)
      console.log ("elemnt4.data") //
  }

  elemnt4.children.forEach ((elemnt5, index5)=>{
    if (elemnt5.hasOwnProperty ('attribs')) {

      if (elemnt5.attribs.title == undefined) {
        //console.log (elemnt4) //
      } else {
        console.log (elemnt5.attribs.title)
          console.log ('elemnt5.attribs.title') //
      }
    }

    if (elemnt5.hasOwnProperty ('data')) {

      if (elemnt5.data == '') {

      } else {

        console.log (elemnt5.data)
        console.log ('elemnt5.data')

       if (elemnt5.data.indexOf('16-Мая') != -1){
          console.log ('new')

        }
      }

    }

  })

}


  })
}


    })


  }


})

})*/








});
