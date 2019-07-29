# MQTT con JS

## Instalar MQTT con Node

sudo npm install mqtt --save
sudo npm install mqtt -g

## Cargar script en la misma carpeta que la carpeta "node_modelues", con el nombre test.js

```
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://20.1.2.123')
var pub = "servidor/publicaciones";
var sus = "servidor/notificaciones";
 
client.on('connect', function () {
  client.subscribe(sus, function (err) {
    if (!err) {
      client.publish(pub, 'Tu vieja')
    }
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
```

## Ejecutar el comnado

```
node test.js
```

## PAra limpiar cache del Broken

mosquitto_pub -h hostname -t the/topic -n -r -d
Fuente: https://community.openhab.org/t/clearing-mqtt-retained-messages/58221
