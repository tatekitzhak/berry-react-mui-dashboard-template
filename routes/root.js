import express from 'express';
import path from 'path';
import axios from 'axios';

const rootRouter = express.Router();


rootRouter.get('/', async (req, res) => {
    console.log('root:', req.query)
    // res.sendFile(path.join(path.resolve(), '..', 'views', 'index.html'));
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/comments?postId=1');
      console.log('response:',response.status);
    
      if (response.status === 200) {
        res.status(response.status).json(response.data)
      } else {
        res.status(response.status).json({ message: `No data were found with ... ` });
      }
    } catch (error) {
      console.log('catch error:',error);
      res.status(500).json({ error, message: 'Error retrieving the job' })
    }

});

export { rootRouter };