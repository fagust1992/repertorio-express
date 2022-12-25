const express = require("express"); 
const cors = require("cors");
const app = express();
const fs = require("fs");
app.use(express.json());
app.use(cors());
const PORT = 3002;

app.get("/", function (request, response) {
  try {
    response.sendFile(__dirname + "/index.html");
  } catch (error) {
    response
    .json({ message: "error en cargar " });
  }
});

app.get("/canciones", (request, response) => {
  const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
  response.json(canciones);
});

app.post("/canciones", (request, response) => {
  const song = request.body;
  const songs = JSON.parse(fs.readFileSync("repertorio.json"));
  songs.push(song);
  fs.writeFileSync("repertorio.json", JSON.stringify(songs));
  response.send("Canción registrada con éxito!");
});

app.put("/canciones/:id", (request, response) => {
  const { id } = request.params;
  const song = request.body;
  const songs = JSON.parse(fs.readFileSync("repertorio.json"));
  const indice = songs.findIndex((x) => x.id == id);
  songs[indice] = song;
  fs.writeFileSync("repertorio.json", JSON.stringify(songs));
  response.send("Canción modificada!");
});

app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const songs = JSON.parse(fs.readFileSync("repertorio.json"));
  const i = songs.findIndex((a) => a.id == id);
  songs.splice(i, 1);
  fs.writeFileSync("repertorio.json", JSON.stringify(songs));
  res.send("Canción eliminada !");
});

app.listen(PORT, () => {
  console.log(`estoy en el puerto ${PORT}`);
});
