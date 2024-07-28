const express = require("express");
const app = express();
const port = 5173; // Ensure this port matches the one in your frontend request
const dayCardsRouter = require("./path/to/dayCardsRouter"); // Adjust the path accordingly

app.use(express.json());
app.use("/api/dayCards", dayCardsRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
