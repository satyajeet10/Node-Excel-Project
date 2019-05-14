const path = require('path')
const express = require('express')
require('./db/mongoose')
const hbs = require('hbs')
var bodyParser = require('body-parser');
const port = process.env.PORT || 3000
const User = require('../src/models/user');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var helmet = require('helmet')
app.use(helmet());

app.disable('x-powered-by')


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../views')
    // const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
    // hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('login');
})

app.get('/excel/authenticate', async(req, res) => {
    try {
        // console.log(req.query.email)
        const user1 = await User.findByCredentials(req.query.email, req.query.password)
        console.log(user1)
        res.status(200).send(user1)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

app.listen(port, () => {
    console.log(`Connected to Port: ${port}`);
})