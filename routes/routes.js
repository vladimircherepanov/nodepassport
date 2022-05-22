const express = require('express');
const passport = require('passport');
const jwt = require("jsonwebtoken");
const router = express.Router();

const cookies = require('../routes/cookies');
const secureRoute = require('../routes/secure-routes');


router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        res.json({
            message: 'Signup successful',
            user: req.user
        });
    }
);

router.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error("error some");
                        return next(info);
                    }
                    req.login(
                        user,
                        {session: false},
                        async (error) => {
                            if (error) return next(error);
                            const body = {_id: user._id, email: user.email};
                            const token = jwt.sign({user: body}, 'TOP_SECRET');
                            return res.json({token});
                        }
                    );
                } catch (error) {
                    return next(error);
                }
            })
        (req, res, next);
    }
);

//JWT implementation
router.post('/user', passport.authenticate('jwt', { session: false }), secureRoute);
router.get('/cookies', passport.authenticate('jwt', {session: false}), cookies);

module.exports = router;