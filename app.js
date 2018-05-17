'use strict'

let linksToParse = [
'http://www.sanatorii.by/?Alesya',
'http://www.sanatorii.by/?Belaya_vezha',
/*'http://www.sanatorii.by/?Berestie',
'http://www.sanatorii.by/?Bug',
'http://www.sanatorii.by/?Kolos',
'http://www.sanatorii.by/?Magistralny',
'http://www.sanatorii.by/?Nadzeya',
'http://www.sanatorii.by/?Ruzhanski',
'http://www.sanatorii.by/?Svitanak_Brest',
'http://www.sanatorii.by/?Svitanok_Brest',
'http://www.sanatorii.by/?Solnechny',
'http://www.sanatorii.by/?Chabarok',
'http://www.sanatorii.by/?Energia',
'http://www.sanatorii.by/?Yaselda',
'http://www.sanatorii.by/?Borovoe',
'http://www.sanatorii.by/?Vetraz',
'http://www.sanatorii.by/?Zheleznodorozhnik',
'http://www.sanatorii.by/?Jeleznyaki',
'http://www.sanatorii.by/?Jemchujina_Vitebsk',
'http://www.sanatorii.by/?Lepelski',
'http://www.sanatorii.by/?Lesnoe',
'http://www.sanatorii.by/?Lesnie_Ozera',
'http://www.sanatorii.by/?Letcy',
'http://www.sanatorii.by/?Naftan',
'http://www.sanatorii.by/?Plissa',
'http://www.sanatorii.by/?Rosinka',
'http://www.sanatorii.by/?Sosnovi_Bor_Vitebsk',
'http://www.sanatorii.by/?Vasilek',
'http://www.sanatorii.by/?Gomelskogo_otdelenie_BJD',
'http://www.sanatorii.by/?Zolotie_peski',
'http://www.sanatorii.by/?Mashinostroitel',
'http://www.sanatorii.by/?Pridneprovsky',
'http://www.sanatorii.by/?Serebryanie_Klyuchi',
'http://www.sanatorii.by/?Sidelniki',
'http://www.sanatorii.by/?Solnechny_Bereg',
'http://www.sanatorii.by/?Sosny_Gomel',
'http://www.sanatorii.by/?Chonki',
'http://www.sanatorii.by/?Alfa_Radon',
'http://www.sanatorii.by/?Jemchujina_Grodno',
'http://www.sanatorii.by/?Neman_72',
'http://www.sanatorii.by/?Ozerny',
'http://www.sanatorii.by/?Porechie',
'http://www.sanatorii.by/?Praleska_Grodno',
'http://www.sanatorii.by/?Radon',
'http://www.sanatorii.by/?Raduga_Grodno',
'http://www.sanatorii.by/?Svitiaz',
'http://www.sanatorii.by/?Energetik',
'http://www.sanatorii.by/?BATE',
'http://www.sanatorii.by/?Belaya_Rus',
'http://www.sanatorii.by/?Belino',
'http://www.sanatorii.by/?Belorusochka',
'http://www.sanatorii.by/?Berezina',
'http://www.sanatorii.by/?Berezina_Borisov',
'http://www.sanatorii.by/?Berezka',
'http://www.sanatorii.by/?Vesta',
'http://www.sanatorii.by/?Volma',
'http://www.sanatorii.by/?Viaguti',
'http://www.sanatorii.by/?Gorodische',
'http://www.sanatorii.by/?Dudinka',
'http://www.sanatorii.by/?Jdanovichy',
'http://www.sanatorii.by/?Juravushka',
'http://www.sanatorii.by/?Zeleni_Bor',
'http://www.sanatorii.by/?Zeleni_bor_RC',
'http://www.sanatorii.by/?Isloch',
'http://www.sanatorii.by/?Krinitsa',
'http://www.sanatorii.by/?Lazurny',
'http://www.sanatorii.by/?Nadezhda',
'http://www.sanatorii.by/?Narochanka',
'http://www.sanatorii.by/?Narochanski_Bereg',
'http://www.sanatorii.by/?Naroch',
'http://www.sanatorii.by/?Ostroshickij_gorodok',
'http://www.sanatorii.by/?Podjelniki',
'http://www.sanatorii.by/?Praleska_Minsk',
'http://www.sanatorii.by/?Primorski',
'http://www.sanatorii.by/?Priozerny',
'http://www.sanatorii.by/?Priozerny',
'http://www.sanatorii.by/?Raketa',
'http://www.sanatorii.by/?Rassvet_Luban',
'http://www.sanatorii.by/?The_Republican_Hospital_of_Speleo_treatment',
'http://www.sanatorii.by/?Rudnya',
'http://www.sanatorii.by/?Svitanok_Minsk',
'http://www.sanatorii.by/?Solnyshko',
'http://www.sanatorii.by/?Sosnovi_Bor_Minsk',
'http://www.sanatorii.by/?Sosny_Minsk',
'http://www.sanatorii.by/?Sputnik',
'http://www.sanatorii.by/?Talka',
'http://www.sanatorii.by/?Balneolecheniya',
'http://www.sanatorii.by/?Energetik_Minsk',
'http://www.sanatorii.by/?Yunost',
'http://www.sanatorii.by/?Dubrovenka',
'http://www.sanatorii.by/?Lenina',
'http://www.sanatorii.by/?Orlovskogo',
'http://www.sanatorii.by/?Sosny_Mogilev',
'http://www.sanatorii.by/?Chaika',
'http://www.sanatorii.by/?Shinnik',
'http://www.sanatorii.by/?Energetik_Mogilev'*/
]


console.log (linksToParse.length)

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');


const cheerio = require('cheerio');

var request = require('request');
var iconv = require('iconv');


// while for strings url at array, splice for reduce


while ( linksToParse.length != 0 ) {

let currentLink = linksToParse.splice (0,1)
 currentLink = currentLink.join()
 console.log (currentLink)
 console.log (typeof currentLink)
 startParse (currentLink)


}

function startParse (currentLink) {

  request.get({
    url: currentLink,
    //url: "http://www.sanatorii.by/?Alesya",
    //url:'http://www.sanatorii.by/?Belaya_vezha',
    encoding: null,
  }, function(err, res, body) {

    var ic = new iconv.Iconv('CP1251', 'utf-8');
    var buf = ic.convert(body);
    var utf8String = buf.toString('utf-8');
    const $ = cheerio.load(utf8String,  { decodeEntities: false })

    let currentObj = {}


    let rooms = []



    class roomDescription {

    constructor(roomName, roomAccamodation, roomDetails) {

      this.roomName = roomName
      this.roomAccamodation = roomAccamodation
      this.roomDetails = roomDetails

    }

  }


    // название и местонахождения объекта

  let objectName = $('.obj_name').find('h1').text()
  let objectObl = $('.obj_name').find('.box_obl').text()
  currentObj.name = objectName
  currentObj.region = objectObl
  console.log (currentObj)




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
            //console.log (elem.children[0].data) // room details
          } else {
            roomAccamodation.push (elem.attribs.title)
            //console.log (elem.attribs.title) // room accomodation strings
          }



        }

        if (elem.hasOwnProperty ('data')) {
          //console.log (elem.data) // room name
          roomName = elem.data
        }



      })
      //console.log (rooms.length)
      let currentRoom= new roomDescription(roomName, roomAccamodation, roomDetails)
      rooms.push (currentRoom)
    }


    currentObj.rooms= rooms


  // цены по датам и вариантам размещения
  let roomSeparator = '';
  let roomSeparatorStatus = false;

  let priceTableAsString = ''
  let index = 0;

  let priceTables = $('.newtab_noborder').find('td').each (function(i, elem) {


    if ($(this).text() == roomSeparator) {

      console.log ('Номер---------------------------------'+index+1);

       currentObj.rooms[index].priceTableAsString = priceTableAsString
       priceTableAsString = ''
       index++
    }

  priceTableAsString += 'separator'+$(this).text()

  if (index == currentObj.rooms.length-1) {
  currentObj.rooms[index].priceTableAsString = priceTableAsString

  }

  if (!roomSeparatorStatus) {
    $(this).text()
    //console.log ($(this).text().length)
    roomSeparator = $(this).text()
    //console.log(roomSeparator)
    roomSeparatorStatus = true

  }


  })


  // статическая информация по объекту
  /*
  let textInfo = ''
  $('#staticContent').find ('p').each (function (i, e) {
    console.log ($(this).text()) // текст из абзацев в статическом контенте
    textInfo +=$(this).text()
  })


  let listInfo = ''
  $('#staticContent').find ('li').each (function (i, e){
  console.log ($(this).text()) // списки, общие описание
  listInfo += $(this).text()
  })

  let linkInfo= ''
  $('#staticContent').find ('a').each (function (i, e) {
    console.log ($(this).attr('href'))
  linkInfo+=$(this).attr('href')
     // линки на фото
  })


  currentObj.textInfo = textInfo
  currentObj.lists = listInfo
  currentObj.links = linkInfo
  */






  MongoClient.connect('mongodb://localhost:27017/sanatoriiby', { useNewUrlParser: true }, function(err, result) {
    assert.equal(null, err);
    const db = result.db('sanatoriiby');
    db.collection('sanatorium').insert (currentObj)
    currentObj = {} // clean after iteration

  });

console.log ('DONE')

  });

}
