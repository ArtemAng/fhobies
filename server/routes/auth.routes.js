const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const auth = require('../midlewares/auth.midleware');

const router = Router();

router.post(
    '/signup',
    [
        check('email', 'Invalid email or password.').isEmail(),
        check('password', 'Invalid email or password.').isLength({ min: 1 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({ errors: errors.array(), message: 'Wrong data.' });
            const { email, password, name } = req.body;
            const candidate = await User.findOne({ email });
            if (candidate !== null)
                res.status(400).json({ message: 'This user already exists.' });
            // хешируем пароль
            const hashedPassword = await bcrypt.hash(password, 12);
            // const date = new Date().toString().split(' ');
            // добавляем нового пользователя
            const user = new User({ email, password: hashedPassword });
            user.save();
            console.log('hello', candidate == false);

            res.status(200).json({ message: 'User registered.' });

        } catch (e) {
            res.status(500, 'Something wrong, try again.');
        }
    }
);

router.post('/logout', auth, async (req, res) => {
    try {

        console.log(req.user);
        const user = await User.findById(req.user.userId);
        user.status = false;
        user.save();
        res.status(200).json({ message: 'You are logouted.' });
    } catch (e) {
        res.status(500).json({ message: 'Not availible id or token.' });
    }
});

router.post(
    '/signin',
    [
        check('email', 'Invalid email address.').normalizeEmail().isEmail(),
        check('password', 'Minimal password length is 1 symbol.').isLength({ min: 1 })
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty) {
                return res.status(400).json({ errors: errors.array(), message: 'Wrong data.' })
            }
            const { email, password } = req.body;
            
            const user = await User.findOne({ email });
            if (!user) {
                res.status(400).json({ message: 'This user does not exist.' });
            }
            const comparePasswords = await bcrypt.compare(password, user.password);
            if (!comparePasswords) {
                res.status(400).json({ message: 'Invalid password.' }); //or email
            }
            const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' });
            res.json({ token, id: user.id, email })
            user.save();///
        } catch (e) {
            res.status(500).json({ message: 'Something wrong, try again.' })
        }
    }
    );

module.exports = router;