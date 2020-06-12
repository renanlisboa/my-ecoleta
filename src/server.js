// Server Configuration

// Importing Express and Setting Up Variables
const express = require('express')
const server = express()

// Importing and Configuring the Nunjucks Template Engine
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
  express: server,
  noCache: true
})

// Config Public Folder
server.use(express.static('public'))

// Configuring Routs to Your Application
server.get('/', (req, res) => {
  return res.render('index.html')
})

// Turning Server On
server.listen(3000)