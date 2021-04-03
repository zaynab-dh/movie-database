const express = require('express');
const port = 3000;
const app = express();
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const db = require('./config/db');
const bodyParser = require('body-parser');
const router = express.Router();
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
const {users} = require('./users');
const { authUser } = require('./authen');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(setUser);

mongoose.connect('mongodb+srv://Abdallah:YX8aR8B7kBA9g7G@firstcluster.b8kmg.mongodb.net/test')
// MongoClient.connect(db.url, (err, database) => {  if (err) return console.log(err)  };                     
//  // Make sure you add the database name and not the collection name 
//   const database = database.db("note-api")  
//   require('./app/routes')(app, database);
// const database = database.db("MovieDB-app");
const moviesSchema = new mongoose.Schema({
    title: String,
    year: Number,
    rating: Number
    });
const Movies = mongoose.model('moviedb', moviesSchema);

app.get('/dashboard', authUser, (req, res)=>{
    res.send('Dashboard Page')
});
function setUser(req, res, next) {
    const password = req.body.password
    if (password) {
        req.user = users.find(user =>user.id === parseInt(password))
    }
    next()
};      

// app.get('/movies/read/id/:id', (req, res)=> {
//     let id = req.params.id;
//     //const mov = movies.find(c=>movies[id]===parseInt(id));
//     const mov = movies[id-1];
//     if(!mov)res.send({status:404, error:true, message:'the movie id does not exist'});
//     res.send({status:200, data:mov}); 
// });

const date = new Date();
const hour = date.getHours();
var seconds = date.getSeconds();
const movies = [
    {title: 'Jaws', year: 1975, rating: 8 },
    {title: 'Avatar', year: 2009, rating: 7.8 },
    {title: 'Brazil', year: 1985, rating: 8 },
    {title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
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
    let id = req.params.id;
    //const mov = movies.find(c=>movies[id]===parseInt(id));
    const mov = movies[id-1];
    if(!mov)res.send({status:404, error:true, message:'the movie id does not exist'});
    res.send({status:200, data:mov}); 
});
// app.get('/movies/add', (req, res)=> {
//     let ttl = req.query.title;
//     let yr = req.query.year;
//     let rt = req.query.rating;

//     if(ttl === '' || yr === '' || yr.length !== 4 || isNaN(yr))
//     {
//         res.send({status:403, error:true, message:'you cannot create a movie without providing a title and a year'}) 
//     }
//     else
//     {
//         if (rt == '')
//         {
//             rt = 4;
//         }
//         const newMovie = {
//             //id:movies.length+1,
//             title:ttl,
//             year:yr,
//             rating:rt,
//         };
//         movies.push(newMovie);
//         res.send({status:200, data:movies}); 
//     }
   
// });
app.post('/movies/add', (req, res)=> {
        let ttl = req.body.title;
        let yr = req.body.year;
        let rt = req.body.rating;
    
        if(ttl === '' || yr === '' || yr.length !== 4 || isNaN(yr))
        {
            res.status(403).send('you cannot create a movie without providing a title and a year') 
        }
        else
        {
            if (rt == '')
            {
                rt = 4;
            }
            const newMovie = {
                title:ttl,
                year:yr,
                rating:rt,
            };
            movies.push(newMovie);
            res.send(movies);
        }
   
});
// app.get('/movies/update/:id', (req, res)=> {
//     var ttle = req.query.title;
//     var rate = req.query.rating;
//     let idd = req.params.id;
//     // movies.map((element)=>{
//     //     if(element.id===parseInt(idd)) {
//              if (ttle !== ''){
//              movies[idd-1].title = ttle;
//              }
//             if (rate !== ''){
//                 //if (element.id===parseInt(idd)){
//                     movies[idd-1].rating = parseInt(rate);
//                 //}
//              }
//          //}
//     //});    
//     res.send({status:200, data:movies}); 
// });
app.put('/movies/update/:id', (req, res)=> {
    var ttle = req.body.title;
    var rate = req.body.rating;
    let idd = req.params.id;
             if (ttle !== ''){
             movies[idd-1].title = ttle;
             }
            if (rate !== ''){ 
                movies[idd-1].rating = parseInt(rate);
             }   
    res.send(movies); 
});

// app.get('/movies/delete/:id', (req, res)=> {
//     let iddl = req.params.id-1;
//     const mov = movies[iddl];
//     //const filtermv = movies.filter((movies[id]) => movies[id] !== parseInt(iddl));
//     movies.splice(iddl, 1);
//     if(!mov)res.send({status:404, error:true, message:'the movie id does not exist'});
//     //res.send({status:200, data:filtermv});
//     res.send({status:200, data:movies});
    
// });
app.delete('/movies/delete/:id', (req, res)=> {
    let iddl = req.params.id-1;
    const mov = movies[iddl];
    movies.splice(iddl, 1);
    if(!mov)res.status(404).send('the movie id does not exist');
    res.send(movies);
});
  
  app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });



