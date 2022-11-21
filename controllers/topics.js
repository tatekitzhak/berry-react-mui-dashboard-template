import { topics } from "../model/topics.js";

const data = {
    topics: topics,
    setTopics: function (data) { this.topics = data }
};

const getAllTopics = (req, res) => {
   
    if (0) {
        return res
            .status(404)
            .json({
                "message": "lng and lat query parameters are required"
            });
    }
    try {

        res
            .status(200)
            .json(data.topics);
    } catch (err) {
        res
            .status(404)
            .json(err);
    }
}

export {
    getAllTopics
}