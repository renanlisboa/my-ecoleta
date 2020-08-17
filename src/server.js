
const express = require('express')
const server = express()

// Get database
const db = require('./database/db.js')

// Config public folder containing css and js files.
server.use(express.static('public'))

// Enable use of req.body in the application
server.use(express.urlencoded({ extended: true }))

// Using Template Engine
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
  express: server,
  noCache: true
})

// Config routs to your application.
  // Home
  server.get('/', (req, res) => {
    return res.render('index.html')
  })

  // Create Point
  server.get('/create-point', (req, res) => {
    // Using req.query to get query strings from the url
      // console.log(req.query)
    return res.render('create-point.html')
  })

  server.post('/savepoint', (req, res) => {
    // Using req.body to get the form's body
    // console.log(req.body)

    // inserting data from the form to database
    const query = `
      INSERT INTO places (
          image,
          name,
          address,
          address2,
          state,
          city,
          items
      ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `
    const values = [
      req.body.image,
      req.body.name,
      req.body.address,
      req.body.address2,
      req.body.state,
      req.body.city,
      req.body.items
    ]

    function afterDataInsert (err) {
      if (err) {
        console.log(err)
        return res.send('Erro no cadastro')
      }
      console.log('Cadastrado com sucesso')
      console.log(this)

      return res.render('create-point.html', {saved: true})
    }
  
  db.run(query, values, afterDataInsert)
})

  // Search Results
  server.get('/search', (req, res) => {

    const search = req.query.search
    if(search == '') {
      // Empt search
      return res.render('search-results.html', {total: 0})
    } 

    // Get data from database
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
      if (err) {
        return console.log(err)
      }

    // Show total rows
      const total = rows.length

    // Show HTML page with the data from the database
      return res.render('search-results.html' ,{places: rows, total: total})
    })
  })

// Run Server
server.listen(3000)