const express = require('express');
const cookies = require('cookie-parser');
const cors = require('cors');
const { login, register, getUsers, getUserById, deleteUser } = require('./functions/users.js');
const { authenticateToken } = require('./JWT/jwt.js');
const {
  testGameEndpoint,
  addGame,
  getAllGames,
  getGameById,
  deleteGame,
  buyGame
} = require('./functions/games.js');
require('dotenv').config();
let games = [{ id: 1, name: "Feeding Frenzy", description: "Game about feeding fish", price: 999999999, category: "Gold Games", users: [] }];


const app = express();
const port = process.env.PORT || 6962;
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'], // Specify allowed origins
  credentials: true // Allow credentials (cookies)
}));
app.use(express.json());
app.use(cookies());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the event");
});

app.get("/api/test", (req, res) => {
  res.send("API test endpoint");
});

app.get("/users", getUsers);
app.get('/users/:id', getUserById);
app.delete('/users/:id', deleteUser);

app.post('/register', register);
app.post('/login', login);

app.get("/game/test", testGameEndpoint);
app.post("/game", addGame);
app.get("/games", getAllGames);
app.get("/game/:id", getGameById);
app.delete("/game/:name", deleteGame);
app.post("/game/:id/buy", buyGame);



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
