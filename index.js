import express from "express";
import cors from "cors";

import userRoutes from "./routes/users.js";
 
const app = express();
const PORT = 5000;
 
app.use(cors());
app.use(express.json());

app.use("/", userRoutes);

app.get("/", (req, res) => res.send('Hello from express!'));

// If Routes not match
app.all("*", (req, res) => {
    console.log('The request noy exist!');
    res.send("The route doesn't exist!")
});

app.listen(PORT, () => {
    console.log(`Server is listening on port: http://loclalhost:${PORT}`)

});