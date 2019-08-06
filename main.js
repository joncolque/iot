var mqtt = require('mqtt');
//var clear = require('clear');

var client  = mqtt.connect('mqtt://20.1.2.123');

var novedades = "planta/circulo/topadora/estado";
var rfid = "planta/circulo/rfid/id";
var autorizacion = "planta/circulo/rfid/autorizacion";
var emergencia = "planta/detectores/humo";

var data = require("./json/tag.json");

var msj = new Array(2);
var first = true

function connectionMQTT() {
  client.on('connect', function () {
      client.subscribe(emergencia, function (err) {
        if (!err) {
          client.publish(novedades, 'Integrador activo.');
        }
      })
      client.subscribe(rfid);
    })

  client.on('message', function (topic, message) {
    if(first){
      console.log("\n");
      console.log("\t| TOPICO \t\t\t| MENSAJE \t");
      console.log("       \t|              \t\t|       \t");
      first = false;
    }
    // message is Buffer
    msj[0] = topic.toString();
    msj[1] = message.toString();
    var long = Object.keys(data.cube.authorized).length
    for(var i = 0; i <= long; i++){
      if(i == long){
        console.log("NOVEDAD\t|",msj[0],"\t| OBJ. DESCONOCIDO\t");
        break;
      }
      if(msj[1] == data.cube.authorized[i]){
        console.log("NOVEDAD\t|",msj[0],"\t| OBJ. CONOCIDO\t");
        client.publish(autorizacion, '3');
        break;
      };
    }
    // clear();
    //client.end()
  })
}

connectionMQTT()
/*****************************************************************************/
var express = require('express');
var app = express();
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

app.get('/', function (req, res) {
  // res.send(`NOVEDAD ${msj[0]} ${msj[1]}`);
  wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
    });
   
    ws.send(`NOVEDAD ${msj[0]} ${msj[1]}`);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
/******************************************************************************/
 
 