'use strict'

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var S = require('string');

/*
function clearRange(string) {

let counter = 0
let result = {}
let mounths = ['января', 'февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']

if (string.indexOf ('не') != -1 ) {
  return result.data = string
  // не определены цены
} else {

  let tmp = S(string).stripLeft().stripRight().strip(' ').s
  console.log (tmp)
  let tmpArray = tmp.split ('-')
  tmpArray.splice (-1,1)
  tmpArray.forEach ( (e, i)=>{

          if (counter > 1) {
            if (mounths.indexOf (e) != -1) {
              e = mounths.indexOf (e)+1
              result.toMounth = e
            } else {
              result.toDay = e
            }


          } else {

            if (mounths.indexOf (e) != -1) {
              e = mounths.indexOf (e)+1
              result.fromMounth = e
            } else {
              result.fromDay = e
            }


          }



  })

  return result


}






}
*/
MongoClient.connect('mongodb://localhost:27017/sanatoriiby', { useNewUrlParser: true }, function(err, result) {
  assert.equal(null, err);
  const db = result.db('sanatoriiby');

  let currentObj = {}
  let newRooms = []

  db.collection('sanatorium').find({}, {projection:{ _id: 0 }} ).toArray(function (error, res){



    res.forEach ((elem, index)=>{


      //extract type name and region
      let tmp = elem.name.split(' ')
      currentObj.type = tmp.splice(0,1).join('')
      currentObj.name =  tmp.join(' ')

      currentObj.region = S (elem.region).stripLeft('()').stripRight('()').s

// extract links for roomSeparator
// not at that way
/*
    let curerntRoomFotoLinks = []

    let separatedLinks = elem.links.split ('separator')
    console.log (separatedLinks)

*/



// rooms transforming for prodaction
      elem.rooms.forEach ((e, i)=>{

        let singleRoom = {}
          singleRoom.roomName = S(e.roomName).stripLeft().stripRight().s
          //newRooms.push (singleRoom)

          singleRoom.roomDetails = S(e.roomDetails).strip('(',')').s
          singleRoom.roomAccamodation = e.roomAccamodation

          let firstPriseDecoration = S(e.priceTableAsString).collapseWhitespace().s

          let  secondPriseDecoration = firstPriseDecoration.split('separator')
          //console.log (secondPriseDecoration)


          let ranges = []
          let rangePrices = []
          let node = {}
          let doneWithFirstDate = false
          let doneWithFirstAccType = false
          let k = 0;

          while (secondPriseDecoration.length !=0) {

            let tmp = secondPriseDecoration.splice (0,1).toString()

              if (tmp == '' || tmp.indexOf ('Показать')!= -1) {
                  // empty elem
                  // useless elem
              } else {

                if (tmp.indexOf ('2018') != -1 || tmp.indexOf ('2019') != -1) {

                  if (doneWithFirstDate  == false) {

                    // обработать в дату перед сохранением в массив

                    ranges.push (S(tmp).stripLeft().stripRight()) // сюда сложить после обработки
                    doneWithFirstDate = true
                    rangePrices.push([])

                  } else {

                    ranges.push (S(tmp).stripLeft().stripRight())
                    k++
                    rangePrices.push([])
                  }



                }

                if ( tmp.indexOf ('место') != -1) {

                  node.accType = S(tmp).stripLeft().stripRight().s
                  doneWithFirstAccType = true

                } else {
                  if (doneWithFirstAccType == false) {

                  } else {
                    node.price = S(tmp).stripLeft().stripRight(' BYN').s
                  }

                }

                if (node.accType != undefined && node.price != undefined) {

                  rangePrices[k].push (node)
                  node = {}
                }


                }


} // done with tmp


  singleRoom.ranges = ranges;
  singleRoom.rangePrices = rangePrices;
  newRooms.push (singleRoom)


ranges = []
rangePrices = []
doneWithFirstDate = false
doneWithFirstAccType = false
k = 0;



})// end for each elem.rooms

     currentObj.rooms = newRooms
     newRooms = []
    db.collection('prod_sanatorium').insert (currentObj)
    currentObj = {}


    }) // forEach end in query to DB result



  })// end requesst to db
  console.log ('DONE with converting')
})// end connection
