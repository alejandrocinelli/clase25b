No se aprecia diferencias entre la ruta comprimida y la no comprimida. 

necesitas configurar un archivo .env con los siguientes parametros 

MONGO_URI = 
NODE_ENV=prod
TPWD=
MAIL_ADMIN=
accountSid_ENV = 
authToken_ENV = 
adminPhono_ENV = 
db=MONGO

node --prof src/server.js
artillery quick --count 20 -n 50 http://localhost:8080/info > result.txt
node --prof-process result-v8.log > processed.txt

node --inspect src/server.js

artillery quick --count 20 -n 50 http://localhost:8080/info > resultInspect.txt

cambiar el scrip para usar 0x y autocanon

"scripts": {
    "start": "0x ./src/server.js ",
    "test": "node src/benchmark.js"
  },

  