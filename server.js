const express = require("express");
const stockfish = require("stockfish");

const app = express();
app.use(express.json());

app.post("/bestmove", (req, res) => {
  const { fen } = req.body;

  const engine = stockfish();
  engine.postMessage("uci");
  engine.postMessage("position fen " + fen);
  engine.postMessage("go depth 15");

  engine.onmessage = function (event) {
    if (typeof event === "string" && event.startsWith("bestmove")) {
      const move = event.split(" ")[1];
      res.json({ bestmove: move });
      engine.terminate();
    }
  };
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
