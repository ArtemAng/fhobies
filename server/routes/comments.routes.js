const { Router } = require('express');
const Item = require('../models/Collection');
const User = require('../models/User');
const Comment = require('../models/Comment');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json({comments});
    } catch (e) {
        res.status(500).json({message: 'Something wrong, try again.'})
    }
})

router.post('/addComment', async (req, res)=>{
    try {
        const {itemId, userId, text} = req.body;
        // const items = await Item.find();
        
        console.log('sdec');
        if (!text) {
            res.status(400).send({message:'Text is empty'});       
        }

        const comment = new Comment({userId, text, itemId});
        comment.save();
        res.status(200).send({message: 'Comment added'});
    } catch (e) {
        res.status(500).send({ message: 'Error'});
    }
});

module.exports = router;