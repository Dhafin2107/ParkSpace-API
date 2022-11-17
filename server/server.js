require("dotenv").config({path: "../config.env"});
const express = require('express'),
  app = express();
  apiPort = process.env.PORT || 8000,
  cors = require('cors'),
  mongoose = require('mongoose'),
  AdminRouter = require('./routes/adminRoutes'), //created route loading here 
  //feRouter = require('./routes/feRoutes'), 
  bodyParser = require('body-parser');
  path = require('path');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
try {
  mongoose.connect(process.env.MONGO_URI); 
  console.log("MongoDB Connection Success!")
} catch (error){
  console.log("MongoDB Connection Failed!")
  process.exit(1);
}

/*app.set('view engine', 'ejs')
app.set('views', 'views/pages')
app.use(express.static('public'))*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

//db.on('error', console.error.bind(console, 'MongoDB connection error:'))

/*if(process.env.NODE_ENV === 'production'){
  console.log('ENV: Production');
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.use(feRouter)
} else {
  console.log('ENV: Development');
  app.get('/', (req, res) => {
    res.render('')
  })
}*/

/*app.get('/api/documentation', (req, res) => {
    res.render('')
})*/

app.use('/api', AdminRouter)

app.listen(apiPort, () => console.log(`Server running on port: ${apiPort}`))