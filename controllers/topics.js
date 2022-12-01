
const Post = require('../model/Post');
async function getAllTopics(req, res) {
    try {
        
        const posts = await Post.find()
        
        if (posts.length) {
          res.status(200).send({ status: 200, data: posts })
        } else {
          res.status(404).json({ status: 404, message: `Not Found ` });
        }
      } catch (error) {
        console.log('catch error:',error);
        res.status(500).json({ status: 500 , message: error })
      }
}

module.exports = getAllTopics;