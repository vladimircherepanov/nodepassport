const express = require('express');
const router = express.Router();
router.get(
    '/cookies',
    (req, res, next) => {
        res.json({
            message: 'Cookies',
            //user: req.user,
            //token: req.query.secret_token
        })
    }
);
module.exports = router;