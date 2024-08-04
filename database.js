const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('contactForm.db', (err) => {
  if (err) {
    console.error('Erro ao abrir banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      message TEXT
    )`, (err) => {
      if (err) {
        console.error('Erro ao criar tabela contacts:', err.message);
      } else {
        console.log('Tabela contacts criada ou já existe.');
      }
    });
    db.run(`CREATE TABLE IF NOT EXISTS newsletters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT
    )`, (err) => {
      if (err) {
        console.error('Erro ao criar tabela newsletters:', err.message);
      } else {
        console.log('Tabela newsletters criada ou já existe.');
      }
    });
  }
});

module.exports = db;
