const express = require("express");
const axios = require('axios');

const rootRouter = express.Router();


rootRouter.route('/').get( async (req, res) => {
    
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
      // console.log('response:',response.data)
      if (response.status === 200) {
        res.status(response.status).send(response.data)
      } else {
        res.status(response.status).json({ message: `No data were found with ... ` });
      }
    } catch (error) {
      console.log('catch error:',error);
      res.status(500).json({ error, message: 'Error retrieving the ...' })
    }

}).post(async (req, res) => {
	const post = new Post({
		title: req.body.title,
		content: req.body.content,
	})
  await post.save()
  
	res.send(post)
})

module.exports = rootRouter;