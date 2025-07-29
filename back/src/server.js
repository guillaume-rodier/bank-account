import express from "express";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend actif !");
});

app.listen(port, () => {
  console.log(`✅ Backend lancé sur http://localhost:${port}`);
});
