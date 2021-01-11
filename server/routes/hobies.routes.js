const { Router } = require('express');
const User = require('../models/User');
const auth = require('../midlewares/auth.midleware');
const config = require('config');

const router = Router();

router.get('/',
    // auth, 
    async (req, res) => {
        try {
            const users = await User.find();
            // const curentUser = await User.findById(req.user.userId);
            // if (curentUser.isBlocked) {
            //     curentUser.status = false;
            //     curentUser.save();
            //     res.status(401).json({ message: 'You are blocked' });
            //     throw 'eee';
            // }
            res.json(Array.from(users).map(i => ({ ...i })));
        } catch (e) {
            res.status(500).json({ message: 'Something wrong...' })
        }
    })

module.exports = router;