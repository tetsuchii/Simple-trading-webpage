
const requireOption = require('../requireOption');
/**
 * Törli a kijelölt csokit a bejelentkezett felhasználó csokijai közül.
 */
module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (typeof res.locals.csoki === 'undefined') {
            return next();
        }

        res.locals.csoki.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect(`/${res.locals.user._id}/edit`);
        });
    };
};