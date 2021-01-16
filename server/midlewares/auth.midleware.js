const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        const { id } = req.headers;
        const secret = config.get('jwtSecret');
        if (!token)
            res.status(401).json({ message: 'Do not have authorization1' });

        const decoded = jwt.verify(token, secret)
        console.log(decoded, 'asdad')
        req.user = decoded;
        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({ message: 'Do not have authorization' });
    }
}