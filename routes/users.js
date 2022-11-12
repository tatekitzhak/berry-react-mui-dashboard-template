import express from "express";

const router = express.Router();

router.get("/users", (req, res) => {
    console.log('Users list:');
    res.send('/users')
});


export default router;
