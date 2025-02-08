import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;
const API_URL = process.env.API_URL;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app
  .use(bodyParser.urlencoded({ extended: true }))

  .get("/", async (req, res) => {
    try {
      const result = await axios.get(API_URL + "random.php");
      console.log(result.data.meals[0]);
      res.render("index.ejs", {
        data: result.data.meals[0],
      });
    } catch (error) {
      res.render("index.ejs", {
        error: error,
      });
    }
  });

app.listen(port, () => {
  console.log(`server are running on port ${port}`);
});

export default app;
