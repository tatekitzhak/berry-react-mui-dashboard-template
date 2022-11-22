import express from 'express';
import path from 'path';
import axios from 'axios'; 
import { Post } from '../model/Post.js'; 

const rootRouter = express.Router();


rootRouter.route('/').get(async (req, res) => {
    
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/comments?postId=1');
      const posts = await Post.find()
      console.log('posts:',posts);
    
      if (response.status === 200) {
        res.status(response.status).json(posts)
      } else {
        res.status(response.status).json({ message: `No data were found with ... ` });
      }
    } catch (error) {
      console.log('catch error:',error);
      res.status(500).json({ error, message: 'Error retrieving the job' })
    }

}).post(async (req, res) => {
	const post = new Post({
		title: req.body.title,
		content: req.body.content,
	})
	await post.save()
	res.send(post)
})

export { rootRouter };