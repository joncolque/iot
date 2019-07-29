var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://20.1.2.123')
var sus = "servidor/publicaciones";
var pub = "servidor/notificaciones";



function connectionMQTT() {
  client.on('connect', function () {
      client.subscribe(sus, function (err) {
        if (!err) {
          client.publish(pub, 'Mensaje desde JS')
        }
      })
  })

  client.on('message', function (topic, message) {
    // message is Buffer
    console.log("Mensaje de rasp",message.toString())
    console.log("Topic",topic.toString())
    //client.end()
  })
}
connectionMQTT();
