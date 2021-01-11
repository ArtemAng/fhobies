const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        const {id} = req.headers
        console.log(id)
        if (!token)
            res.status(401).json({ message: 'Do not have authorization' });
        
            const decoded = jwt.verify(token, config.get('jwtSecret'));
            req.user = decoded;
            next();
    } catch (e) {
        res.status(401).json({ message: 'Do not have authorization' });
    }
}