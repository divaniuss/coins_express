const express = require('express');
const mongoose = require('mongoose');
const Coin = require('./models/coin');

 
const app = express();
app.use(express.json());
 
mongoose.connect('mongodb+srv://admin:adminpass@bd1.vay3lbr.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));
 
// GET: Получить пользователя по ID
app.get('/coins/:id', async (req, res) => {
  try {
    const coin = await Coin.findById(req.params.id);
    if (!coin) return res.status(404).send('Coin not found');
    res.json(coin);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
 

app.delete('/coins/:id', async (req, res) => {
    try {
      const coin = await Coin.findByIdAndDelete(req.params.id);
      if (!coin) return res.status(404).send('Coin not found');
      else return res.status(200).send('Coin deleted');

    //   res.json(coin);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

app.get('/coins', async (req, res) => {
    try {
      const coin = await Coin.find();
      if (!coin) return res.status(404).send('Coin not found');
      res.json(coin);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

app.post('/coins', async (req, res) => {
    try {
      const { name, description, denomination, year, country, material} = req.body;
      const coin = new Coin({ name, description, denomination, year, country, material});
      await coin.save();
      res.status(201).json(coin);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

// PUT: Обновить имя пользователя
app.put('/coins/:id', async (req, res) => {
  try {
    const { name, description, denomination, year, country, material} = req.body;
    const coin = await Coin.findByIdAndUpdate(
      req.params.id,
      { name, description, denomination, year, country, material},
      { new: true }
    );
    if (!coin) return res.status(404).send('Coin not found');
    res.status(404).send('Coin added');
  } catch (err) {
    res.status(500).send(err.message);
  }
});
 
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});