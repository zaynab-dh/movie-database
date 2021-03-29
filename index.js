const express = require('express');
const port = 3000;
const app = express();
const router = express.Router();
const date = new Date();
const hour = date.getHours();
var seconds = date.getSeconds();
app.get('/', (req, res) => {
    res.send('ok')
  });
app.get('/test', (req, res,next)=> {
    res.send({status:200, message:"ok"})
});
app.get('/time', (req, res,next)=> {
    res.send({status:200, message:hour +":"+ seconds});
    
});
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });



