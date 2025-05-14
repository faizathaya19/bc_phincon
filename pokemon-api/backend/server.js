const express = require('express');
const axios = require('axios');
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());

app.get('/api/pokemon/:name', async (req, res) => {
  const name = req.params.name;
  console.log(`[API HIT] Pokémon requested: ${name}`);

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    console.log("Data received from PokeAPI:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error(`[ERROR] Fetching ${name}:`, error.message);
    res.status(500).json({ message: 'Failed to fetch Pokémon data' });
  }
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});

