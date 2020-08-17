// Import SQLite3 dependencies
const sqlite3 = require('sqlite3').verbose()

// Create object that will operate the database
const db = new sqlite3.Database('./src/database/database.db')

module.exports = db

// Using the database object in our application
// db.serialize(() => {
  // Create a table with SQL commands
  // db.run(`
  //   CREATE TABLE IF NOT EXISTS places (
  //       id INTEGER PRIMARY KEY AUTOINCREMENT,
  //       image TEXT,
  //       name TEXT,
  //       address TEXT,
  //       address2 TEXT,
  //       state TEXT,
  //       city TEXT,
  //       items TEXT
  //   );
  // `)

  // // Insert data into the table
  // const query = `
  //   INSERT INTO places (
  //       image,
  //       name,
  //       address,
  //       address2,
  //       state,
  //       city,
  //       items
  //   ) VALUES (?,?,?,?,?,?,?);
  // `
  // const values = [
  //   'https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
  //   'Papersider',
  //   'Guilherme Gemballa, Jardim América',
  //   'Nº 260',
  //   'Santa Catarina',
  //   'Rio do Sul',
  //   'Papéis e Papelão'
  // ]

  // function afterDataInsert (err) {
  //   if (err) {
  //     return console.log(err)
  //   }
  //   console.log('Cadastrado com sucesso')
  //   console.log(this)
  // }
  
  // db.run(query, values, afterDataInsert)

  // Check the data in the table
    // db.all(`SELECT name FROM places`, function(err, rows) {
    //   if (err) {
    //     return console.log(err)
    //   }

    //   console.log('Aqui estão seus registros: ')
    //   console.log(rows)
    // })

  // Delete data from the table
//     db.run(`DELETE FROM places WHERE id = ?`, [4], function(err) {
//       if (err) {
//         return console.log(err)
//       }

//       console.log('Registro deletado com sucesso')
//     })
// })