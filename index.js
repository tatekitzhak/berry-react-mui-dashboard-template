import express from "express";
import cors from "cors";
 
const app = express();
const PORT = 5000;
 
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send('Hello from express!'));

app.listen(PORT, () => console.log(`Server is listening on port: http://loclalhost:${PORT}`)
);