const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const cors = require("cors");
// const totalScrabbleScore = require("./utils/scrabbleScoreLogic");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(pino);

// app.get("/api/greeting", (req, res) => {
//   res.setHeader("Content-Type", "application/json");
//   res.send(JSON.stringify({ greeting: `Hello World!` }));
// });

// app.post("/api/scrabble-score", (req, res) => {
//   const word = req.body.word;
//   try {
//     const score = totalScrabbleScore(word);
//     res.setHeader("Content-Type", "application/json");
//     res.send(JSON.stringify({ score: score }));
//   } catch (error) {
//     res.setHeader("Content-Type", "application/json");
//     res.status(500).send(
//       JSON.stringify({
//         error:
//           "An error occurred while calculating the Scrabble score. You can only use letters in the alphabet.",
//       })
//     );
//   }
// });

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
