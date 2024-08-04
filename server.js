const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database'); // Importa o banco de dados

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  const stmt = db.prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)");

  stmt.run(name, email, message, function(err) {
    if (err) {
      res.status(500).send('Erro ao salvar contato');
    } else {
      res.status(200).send('Contato salvo com sucesso');
    }
  });

  stmt.finalize();
});

app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  const stmt = db.prepare("INSERT INTO newsletters (email) VALUES (?)");

  stmt.run(email, function(err) {
    if (err) {
      res.status(500).send('Erro ao salvar inscrição');
    } else {
      res.status(200).send('Inscrição salva com sucesso');
    }
  });

  stmt.finalize();
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
