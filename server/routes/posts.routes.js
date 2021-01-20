const { Router } = require('express');
const Item = require('../models/Collection');
const User = require('../models/User');
const Collection = require('../models/Item');

const router = Router();

router.post(
    '/addpost',
    async (req, res) => {
        try {
            const condidateItem = req.body;
            const collection = await Collection.findOne({ collectionName: condidateItem.collectionName });

            if (!collection)
                res.status(400).json({ message: 'This collection does not exist.' });

            const user = await User.findOne({ _id: condidateItem.userId });
            // console.log(user);
            const newItem = {
                userName: user.name,
                collectionName: condidateItem.collectionName,
                title: condidateItem.title,
                description: condidateItem.description,
                likes: [],
                collectionId: collection._id,
                userId: condidateItem.userId,
                comments: ''
            }

            const item = await new Item({ ...newItem });
            item.save();
            res.status(200).json({ message: 'item is added' });

        } catch (e) {
            res.status(500).json({ message: 'Something wrong, try again.' })
        }
    }
);

router.post('/like', async (req, res) => {
    try {
        const { userId, idPost } = req.body;
        const items = await Item.find();
        // const currentIndex = items.length - idPost - 1;
        const currentItem = await Item.findOne({_id: items[idPost]._id});
        const candidate = currentItem.likes.indexOf(userId);
        if(candidate!==-1)
            currentItem.likes.splice(candidate, 1);
        else
            currentItem.likes.push(userId);
        currentItem.save();
        // items.save();
        console.log(items);
        res.status(200).json({ message: 'item is liked' });

    } catch (e) {
        res.status(500).json({ message: 'Something wrong, try again.' });
    }
});

router.post('/deleteItem', async (req, res) => {
    try {
        const {postIdx} = req.body;
        const items = await Item.find();
        const newItem = await Item.findOneAndRemove({_id: items[postIdx]._id});
        newItem.save();
        console.log(items[postIdx], postIdx);

        res.status(200).json({ message: 'item is liked' });
    } catch (e) {
        res.status(500).json({ message: 'Something wrong, try again.' });
    }
})

router.get('/', async (req, res) => {
    try {
        const posts = await Item.find();
        // console.log(posts);

        res.status(200).json({ posts })
    } catch (error) {
        res.status(500).json({ message: 'Something wrong, try again.' })
    }
});

module.exports = router;