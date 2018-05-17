'use strict'

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var S = require('string');


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

                if (tmp.indexOf ('2018') != -1) {

                  if (doneWithFirstDate  == false) {

                    ranges.push (S(tmp).stripLeft().stripRight().s)
                    doneWithFirstDate = true
                    rangePrices.push([])

                  } else {

                    ranges.push (S(tmp).stripLeft().stripRight().s)
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

    db.collection('prod_sanatorium').insert (currentObj)
    currentObj = {}


    }) // forEach end in query to DB result



  })// end requesst to db
})// end connection
