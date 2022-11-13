import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import userRoutes from "./routes/users.js";
import tasksRoutes from './routes/tasks.js';
import axiosAPI from './routes/categories.js';

const app = express();
const PORT = 5000;

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.json())
/* 
allowing below URL to access these APIs end-points
you can replace this URL(http://localhost:8100) with your
application URL from where you are calling these APIs

app.use(cors({origin: 'http://localhost:8100'}));
 */

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);
app.use('/tasks', tasksRoutes);

app.get("/", (req, res) => {
    res.status(200).json('Hello from node-express-api !')
    // res.send('Hello from node-express-api !')
});

//axiosAPI
app.use('/axiosAPI', axiosAPI);

// If Routes not match
app.all("*", (req, res, next) => {
    
    console.log('The request not exist!', next);
    res.status(404).json('Not Found: ' +404)
});

app.listen(PORT, () => {
    console.log(`Server is listening on port: http://loclalhost:${PORT}`)
});
