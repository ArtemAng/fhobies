const { Router } = require('express');
const Collection = require('../models/Item');
const auth = require('../midlewares/auth.midleware');
const router = Router();

router.post( '/addcollection', async (req, res) => {
        try {
            // const item = req.body;
            console.log(req.body);
            const { userId, collectionName } = req.body;
            const collection = await new Collection({ userId, collectionName });
            collection.save();
            // item.save();
            res.status(200).json({ message: 'Collection is added' });

        } catch (e) {
            res.status(500).json({ message: 'Something wrong, try again.' })
        }
    }
);

router.get('/', async (req, res)=>{
        try {
            console.log( 'asdas');
            const collections = await Collection.find();

            res.status(200).json({ collections: collections.map(i=>i.collectionName) });
            
        } catch (e) {
            res.status(500).json({ message: 'Something wrong, try again.' })
        }
    }
)

module.exports = router;