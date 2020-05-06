const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:
app.get('/',(request, response)=>{
  response.render('index')
})

app.get('/beers',(request, response)=>{
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    console.log('Beers from the database: ', beersFromApi)
    response.render('beers', {beer: beersFromApi}) 
  })
  .catch(error => console.log(error))
  })

app.get('/random-beers',(request, response)=>{
  punkAPI.getRandom()
  .then(beersFromApi => {
    console.log('Beers from the database', beersFromApi);
    response.render('random-beers', {randombeer: beersFromApi})
  })
  .catch(error => console.log(error))
})


app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('Visit at http://localhost:3000'));


// app.get(`/beer/:id`,(request, response)=>{
//   const id = request.params.id
//   punkAPI
//   .getBeer(id)
//   .then(beerFromApi => {
//     console.log('Beer from the database: ', beerFromApi);
//     response.render('beer',{beer: beerFromApi});
//   })
//   .catch(error => console.log(error));
// });