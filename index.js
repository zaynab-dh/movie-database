const express = require('express');
const port = 3000;
const app = express();
const router = express.Router();
const date = new Date();
const hour = date.getHours();
var seconds = date.getSeconds();
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

app.get('/', (req, res) => {
    res.send('ok')
  });
app.get('/test', (req, res)=> {
    res.send({status:200, message:"ok"})
});
app.get('/time', (req, res)=> {
    res.send({status:200, message:hour +":"+ seconds});
    
});
app.get('/hello/:id', (req, res)=> {
    res.send({status:200, message:"Hello, "+ req.params.id});
    
});
app.get('/search', (req, res)=> {
    search = req.query.s
    if(!search){
        res.send({status:500, error:true, message:"you have to provide a search"});
    }else{
        res.send({status:200, message:"ok", data:req.query});
    }

});
app.get('/movies/create', (req, res)=> {
    res.send({status:200, message:"Hello, "});
    
});
app.get('/movies/read', (req, res)=> {
    res.send({status:200, data:movies});
    
});
app.get('/movies/read/by-date', (req, res)=> {
    movies.sort((a, b) => (a.year > b.year) ? 1 : -1) 
    let movie = movies.map(({ title }) => title)
    res.send({status:200, data:movie}); 
});
app.get('/movies/read/by-rating', (req, res)=> {
    movies.sort((a, b) => (a.rating > b.rating) ? 1 : -1) 
    let movie = movies.map(({ title }) => title)
    res.send({status:200, data:movie}); 
});
app.get('/movies/read/by-title', (req, res)=> {
    movies.sort((a, b) => (a.title > b.title) ? 1 : -1) 
    let movie = movies.map(({ title }) => title)
    res.send({status:200, data:movie}); 
});
app.get('/movies/update', (req, res)=> {
    res.send({status:200, message:"Hello, "});
    
});
app.get('/movies/delete', (req, res)=> {
    res.send({status:200, message:"Hello, "});
    
});
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });



