let games = [{
  id: 1,
  name: "Feeding Frenzy",
  description: "Game about feeding fish",
  price: 999999999,
  category: "Gold Games",
  users: []
}];

function testGameEndpoint(req, res) {
  res.send("Test Game endpoint");
}

function addGame(req, res) {
  const { id, name, description, price, category } = req.body;
  if (!id || !name || !description || !price || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const game = { id, name, description, price, category, users: [] };
  games.push(game);
  res.status(201).json(game);
}

function getAllGames(req, res) {
  res.json(games);
}

function getGameById(req, res) {
  const id = parseInt(req.params.id);
  const game = games.find(game => game.id === id);
  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }
  res.json(game);
}

function deleteGame(req, res) {
  const name = req.params.name;
  games = games.filter(game => game.name !== name);
  res.status(204).send();
}

function buyGame(req, res) {
  const id = parseInt(req.params.id);
  const game = games.find(game => game.id === id);

  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }

  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required to buy a game" });
  }

  game.users.push({ userId });
  res.status(200).json({ message: "Game purchased successfully", game });
}

// Export the functions
module.exports = {
  testGameEndpoint,
  addGame,
  getAllGames,
  getGameById,
  deleteGame,
  buyGame
};
