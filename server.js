import express from "express";
import path from "path";
import ejs from "ejs";
import fs from "fs";

const app = express();

app.engine("html", ejs.renderFile);
app.set("view engine", "html");

app.use(express.static("src"));

// const json = fs.readFileSync("./src/image/test.json");
// console.log(json.toString());

let ImageList = fs.readdirSync("./src/image");
const regx = /(.png|.jpg|.jpeg|.gif)$/;
ImageList = ImageList.filter((value) => regx.test(value));
console.log(ImageList);
fs.writeFileSync("./src/image/List.json", JSON.stringify(ImageList));

app.get("/", (req, res) => {
  res.render("./index.html");
});

app.listen(3000, () => {
  console.log(`server open`);
});
