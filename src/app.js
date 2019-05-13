const path = require('path')
const express = require('express')
require('./db/mongoose')
const hbs = require('hbs')
var bodyParser = require('body-parser');
const port = process.env.PORT || 3000
const app = express();
const User = require('../src/models/user');
var helmet = require('helmet')
app.use(helmet());

app.disable('x-powered-by')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

app.get('/excel/authenticate', (req, res) => {
    const user = new User()

    try {
        User.findByCredentials(req.body.email, req.body.password)
        res.send({ user })
    } catch (e) {
        res.status(500).send(e)
    }
})

app.listen(port, () => {
    console.log(`Connected to Port: ${port}`);
})