const jwt = require('jsonwebtoken');
const { parseConnectionUrl } = require('nodemailer/lib/shared');
let secret = 'randomPassword'

// verify a token
const verifyToken = (req, res, next) => {
    try {
        if (!req.session && !req.headers.token) {
            return res.status(401).json({ error: 'Access Denied' });
        }

        let token
        if (req.session.token)
            token = req.session.token
        if (req.headers.token)
            token = req.headers.token
        const verify = jwt.verify(token, secret);
        req.user = verify;
        next();
    } catch (err) {
        //TODO redirect to the error page
        res.status(403).json({ error: 'invalid token' });
    }
}

module.exports = verifyToken;
