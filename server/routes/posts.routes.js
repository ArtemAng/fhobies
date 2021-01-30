const { Router } = require('express');
const User = require('../models/User');
const Collection = require('../models/Collection');
const {cloudinary} = require('../cloud');

const router = Router();

router.post(
    '/addpost',
    async (req, res) => {
        try {
            const candidateItem = req.body;

            // console.log(candidateItem.image);
            const uploadedResponse = await cloudinary.uploader.upload(
                req.body.image,
                { upload_preset: "ml_default" }
            );
            // if (!collection)
            // res.status(400).json({ message: 'This collection does not exist.' });
            const user = await User.findOne({ _id: candidateItem.userId });
            console.log(candidateItem.userId);
            // console.log(user);
            const newCollection = {
                userName: user.name,
                title: candidateItem.title,
                description: candidateItem.description,
                // collectionId: collection._id,
                image: uploadedResponse.public_id,
                userId: candidateItem.userId,
            }
            
            const collection = await new Collection({ ...newCollection });
            await collection.save();
            res.status(200).json({ message: 'Collection is added' });

        } catch (e) {
            console.log(e.message);
            res.status(500).json({ message: 'Something wrong, try again.' })
        }
    }
);

router.post('/like', async (req, res) => {
    try {
        const { userId, idPost } = req.body;
        const items = await Item.find();
        // const currentIndex = items.length - idPost - 1;
        const currentItem = await Item.findOne({ _id: items[idPost]._id });
        const candidate = currentItem.likes.indexOf(userId);
        if (candidate !== -1)
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
        const { postIdx } = req.body;
        console.log(postIdx, 'items');
        const items = await Collection.find();
        const newItem = await Collection.findOneAndRemove({ _id: postIdx });
        newItem.save();

        res.status(200).json({ message: 'item is liked' });
    } catch (e) {
        res.status(500).json({ message: 'Something wrong, try again.' });
    }
})

router.get('/', async (req, res) => {
    try {
        const posts = await Collection.find();
        // console.log(posts);

        res.status(200).json({ posts })
    } catch (error) {
        res.status(500).json({ message: 'Something wrong, try again.' })
    }
});

module.exports = router;