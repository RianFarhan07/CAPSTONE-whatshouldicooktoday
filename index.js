import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const API_URL =
  process.env.API_URL || "https://www.themealdb.com/api/json/v1/1/";

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
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

app.get("/test", (req, res) => {
  res.send("test");
});

app.listen(port, () => {
  console.log(`server are running on port ${port}`);
});

export default app;
