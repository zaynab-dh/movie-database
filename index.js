const express = require('express');
const port = 3000;
const app = express();
app.use(express.json());
const router = express.Router();
const date = new Date();
const hour = date.getHours();
var seconds = date.getSeconds();
const movies = [
    { id: 1,title: 'Jaws', year: 1975, rating: 8 },
    { id: 2,title: 'Avatar', year: 2009, rating: 7.8 },
    { id: 3,title: 'Brazil', year: 1985, rating: 8 },
    { id: 4,title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
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
app.get('/movies/read/id/:id', (req, res)=> {
    const mov = movies.find(c=>c.id===parseInt(req.params.id));
    if(!mov)res.send({status:404, error:true, message:'the movie id does not exist'});
    res.send({status:200, data:mov}); 
});
app.get('/movies/add', (req, res)=> {
    let ttl = req.query.title;
    let yr = req.query.year;
    let rt = req.query.rating;

    if(ttl === '' || yr === '' || yr.length !== 4 || isNaN(yr))
    {
        res.send({status:403, error:true, message:'you cannot create a movie without providing a title and a year'}) 
    }
    else
    {
        if (rt == '')
        {
            rt = 4;
        }
        const newMovie = {
            id:movies.length+1,
            title:ttl,
            year:yr,
            rating:rt,
        };
        movies.push(newMovie);
        res.send({status:200, data:movies}); 
    }
   
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



