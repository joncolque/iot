var mqtt = require('mqtt');
//var clear = require('clear');
var client  = mqtt.connect('mqtt://20.1.2.123');
var novedades = "planta/#";
var estado = "planta/circulo/topadora/estado"
var buscador = "planta/circulo/topadora/buscador"
var rfid = "planta/circulo/rfid/id";
var autorizacion = "planta/circulo/rfid/autorizacion";
var emergencia = "planta/detectores/humo";

var refresco = 10

var data = require("./json/tag.json");

//var msj = new Array(2);
var first = true;
var x = Date.now();

function connectionMQTT() {
  client.on('connect', function () {
      client.subscribe(emergencia, function (err) {
        if (!err) {
          client.publish(estado, 'Integrador activo.');
        }
      })
      client.subscribe(novedades);
      //client.subscribe(rfid);
    })

  client.on('message', function (topic, message) {
    var y = Date.now();
    var tiempo = y - x
    /*
    if(tiempo > (refresco*1000)){
      console.log('\033[2J');
      x = y;
    }else{
      x = y;
    }
    */
    function table(Topico, Mensaje) {
      this.Topico = Topico;
      this.Mensaje = Mensaje;
    }
    var row = new table(topic.toString(), message.toString());
    console.table([row])
    if(rfid == topic.toString()){
      var long = Object.keys(data.cube.authorized).length
      for(var i = 0; i < long; i++){
        if(message.toString() == data.cube.authorized[i]){
          var row = new table(topic.toString(), 'OBJ. AUTORIZADO');
          console.table([row]);
          client.publish(autorizacion, '3');
          break;
        };
        var row = new table(topic.toString(), 'OBJ. DESCONOCIDO');
        console.table([row]);
        client.publish(autorizacion, '2');
      }
    }
    /*
    // clear();
    //client.end()
    */
  })
}

connectionMQTT()
/*
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send(`NOVEDAD ${msj[0]} ${msj[1]}`);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
*/
