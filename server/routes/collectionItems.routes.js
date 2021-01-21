const { Router } = require('express');
const Item = require('../models/Item');
const User = require('../models/User');
const Comment = require('../models/Comment');
const auth = require('../midlewares/auth.midleware');

const router = Router();

router.get('/', async (req, res) => {
    try {
        // const {postId} = req.body;
        const items = await Item.find();
        // console.log(req.body, items);
        res.status(200).json({ items });
    } catch (e) {
        res.status(500).json({ message: 'Something wrong, try again.' })
    }
})

router.post('/like', async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        const item = await Item.findById({ _id: itemId });
        // const currentIndex = items.length - idPost - 1;
        // const currentItem = await Item.findOne({_id: items[idPost]._id});
        const candidate = item.likes.indexOf(userId);
        if (candidate !== -1)
            item.likes.splice(candidate, 1);
        else
            item.likes.push(userId);
        await item.save();
        // // items.save();
        // console.log(items);
        res.status(200).json({ message: 'item is liked' });

    } catch (e) {
        res.status(500).json({ message: 'Something wrong, try again.' });
    }
});

router.post('/addItem', async (req, res) => {
    try {
        const item = await new Item({ ...req.body, likes: [] });
        await item.save();

        res.status(200).json({ message: 'item added successfully' });
    } catch (e) {
        res.status(500).send({ message: 'Error' });
    }
});

module.exports = router;