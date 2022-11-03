const express = require("express");
const app = express();
const cors = require("cors");
const mainRouter = require("./routes/index");
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: true,
  }),
  express.urlencoded({ extended: true }),
  express.json(),
  express.text()
);
app.use("/api", mainRouter);
app.use((error, req, res, next) => {
  console.error(error);

  if (error.name === "HTTPError") {
    return res
      .status(error.response.statusCode)
      .send({ message: error.message });
  }

  return res.sendStatus(error.status || 500);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
