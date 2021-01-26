const { Router } = require('express');
const Category = require('../models/Category');
const auth = require('../midlewares/auth.midleware');
const router = Router();

router.post('/addCategory', async (req, res) => {
    try {
        // const item = req.body;
        console.log(req.body);
        const { name, props } = req.body.data;
        const newCategory = await new Category({ name, props });
        await newCategory.save();
        res.status(200).json({ message: 'Category is added' });

    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Something wrong, try again.' })
    }
}
);

router.post('/removecategory', async (req, res) => {
    try {
        // const item = req.body;
        console.log(req.body.categoryId);
        const { categoryId } = req.body.categoryId;
        const remove = await Category.findOneAndRemove({ _id: req.body.categoryId });
        // await remove.save();
        const categories = await Category.find();
        console.log(remove, categoryId);
        // const newCategory = await new Category({name, props});
        // await newCategory.save();
        res.status(200).json({ categories });

    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Something wrong, try again.' })
    }
}
);

router.get('/', async (req, res) => {
    try {
        console.log('asdas');
        const categories = await Category.find();

        res.status(200).json({ categories });

    } catch (e) {
        res.status(500).json({ message: 'Something wrong, try again.' })
    }
}
)

module.exports = router;